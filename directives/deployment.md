# Deployment Directive

## Purpose

Guide deployment of Next.js SaaS application to Vercel, covering environment configuration, database migrations, preview workflows, and production readiness checks.

## Trigger

- **Manual**: Before deploying to any environment
- **On event**: Before production release, after environment variable changes, after database schema changes

## Inputs

- Vercel account with project linked to GitHub repository
- Environment variables for all environments (development, preview, production)
- Database connection strings (production and preview)
- Third-party API keys (Stripe, Resend, etc.)
- NextAuth configuration (AUTH_SECRET, AUTH_URL per environment)

## Steps

### 1. Vercel Project Setup

**Initial setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Link project (run from project root)
vercel link

# Set project settings
# - Framework Preset: Next.js
# - Build Command: (use default)
# - Output Directory: (use default)
# - Install Command: npm install
```

**Configure vercel.json** at project root:
```json
{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### 2. Environment Variable Management

**Set environment variables per environment:**
```bash
# Development (local .env.local - never commit)
# Preview (Vercel dashboard or CLI)
vercel env add DATABASE_URL preview
vercel env add NEXTAUTH_URL preview
vercel env add NEXTAUTH_SECRET preview
vercel env add STRIPE_SECRET_KEY preview
vercel env add STRIPE_WEBHOOK_SECRET preview

# Production (Vercel dashboard or CLI)
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add RESEND_API_KEY production
```

**Required environment variables checklist:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Full app URL (https://yourdomain.com for production, preview URL for preview)
- `NEXTAUTH_SECRET` - Random string (generate with `openssl rand -base64 32`)
- `STRIPE_SECRET_KEY` - From Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe webhook configuration
- `RESEND_API_KEY` - From Resend dashboard
- Any other third-party API keys

**Important:** `NEXTAUTH_URL` must match the deployment URL exactly. For preview deployments, use the automatic preview URL or set it dynamically.

### 3. Preview Deployment Workflow

Preview deployments are automatic on pull requests.

**Configure preview database:**
- Use separate database for preview (or branch database from provider like Neon, PlanetScale)
- Set `DATABASE_URL` environment variable for preview environment
- Preview deployments run migrations automatically if configured

**Preview checklist:**
- Preview uses preview environment variables
- Preview database is isolated from production
- Stripe uses test mode keys in preview
- Email uses test/sandbox mode

### 4. Database Migration Strategy

**For production deployments:**

Production migrations use `prisma migrate deploy` (NOT `prisma migrate dev`).

Configure in `package.json`:
```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

**Migration workflow:**
1. Develop schema changes locally
2. Create migration: `npx prisma migrate dev --name description`
3. Test migration locally
4. Commit migration files in `prisma/migrations/`
5. Deploy to preview - migrations run automatically
6. Test on preview deployment
7. Deploy to production - migrations run automatically

**Never:**
- Run `prisma migrate dev` in production
- Run `prisma db push` in production
- Manually edit migration files after creation

### 5. Production Deployment Checklist

Before deploying to production, verify:

**Environment variables:**
- [ ] All required env vars set in production environment
- [ ] `NEXTAUTH_URL` matches production domain exactly
- [ ] `NEXTAUTH_SECRET` is unique and secure
- [ ] Stripe keys are **live mode** (not test mode)
- [ ] `STRIPE_WEBHOOK_SECRET` matches production webhook
- [ ] Database URL points to production database

**Database:**
- [ ] Production database is created
- [ ] Migrations tested on preview environment
- [ ] Database connection pooling configured if needed

**Third-party services:**
- [ ] Stripe webhook configured for production domain
- [ ] Resend domain verified (if using custom domain)
- [ ] All API rate limits understood

**Security:**
- [ ] Security headers configured in vercel.json
- [ ] CSP headers set if needed
- [ ] CORS configured if API routes are used externally

**Monitoring:**
- [ ] Error tracking configured (Sentry, LogSnag, etc.)
- [ ] Logging configured (see `debug-and-logging.md`)

**Performance:**
- [ ] `output: "standalone"` in next.config.js for smaller builds
- [ ] Image optimization configured
- [ ] Caching headers set for static assets

### 6. Rollback Procedure

If production deployment fails or introduces bugs:

**Instant rollback:**
```bash
# Via Vercel dashboard: Deployments → [Previous deployment] → Promote to Production
# Via CLI:
vercel rollback
```

**Database rollback (more complex):**
- Prisma migrations are **forward-only** by design
- To rollback database: restore from backup or create new migration to undo changes
- Always test migrations on preview before production

**Mitigation:**
- Keep production deployments small and frequent
- Use preview deployments to catch issues
- Monitor error rates after deployment

### 7. Domain and DNS Configuration

**Add custom domain in Vercel:**
1. Go to Project Settings → Domains
2. Add domain (e.g., `yourdomain.com` and `www.yourdomain.com`)
3. Configure DNS records at your DNS provider:
   - **A record**: `@` → Vercel IP (76.76.21.21)
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours, usually minutes)

**Update environment variables:**
- Set `NEXTAUTH_URL` to `https://yourdomain.com`
- Update Stripe webhook URL to `https://yourdomain.com/api/webhooks/stripe`
- Update any OAuth redirect URIs

### 8. Build Optimization

**Configure next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Reduces build size
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Enable SWC minification
  swcMinify: true,
};

module.exports = nextConfig;
```

**Reduce build time:**
- Use `npm ci` instead of `npm install` in CI
- Cache `node_modules` and `.next` in CI
- Limit build concurrency if needed

## Outputs

- Live production deployment on custom domain
- Preview deployments for all pull requests
- Database migrations applied successfully
- All environment variables configured per environment
- Security headers active
- Monitoring and error tracking operational

## Tools Used

- **Vercel CLI**: Project setup, environment variable management, rollback
- **Prisma CLI**: `prisma generate`, `prisma migrate deploy`
- **GitHub**: Automatic preview deployments on PRs
- **Optional**: GitHub Actions for pre-deployment checks (linting, tests)

## Error Handling

**Build failures:**
- Check Vercel build logs for errors
- Common causes: missing env vars, TypeScript errors, failed migrations
- Fix locally, test with `npm run build`, then redeploy

**Failed migrations:**
- Check migration SQL for errors
- Verify database connection string
- Check database user permissions (needs CREATE, ALTER permissions)
- Rollback: restore database from backup, remove failed migration from `prisma/migrations/`, create new migration

**Missing environment variables:**
- Deployment succeeds but runtime errors occur
- Check Vercel dashboard: Settings → Environment Variables
- Add missing variables, redeploy

**Webhook misconfiguration:**
- Stripe webhooks fail silently
- Verify webhook URL in Stripe dashboard matches deployed URL exactly
- Verify `STRIPE_WEBHOOK_SECRET` matches webhook signing secret
- Test with Stripe CLI: `stripe listen --forward-to https://yourdomain.com/api/webhooks/stripe`

**NextAuth errors:**
- "Invalid callback URL" → `NEXTAUTH_URL` mismatch
- "No secret provided" → `NEXTAUTH_SECRET` not set
- Session issues → Check database connection, verify session table exists

## Learned Constraints

(This section will be populated as deployment issues are discovered and resolved)
