# Directive: Security Policy

## Purpose

Mandatory security requirements for every feature. Read this before implementing anything that touches auth, user input, environment variables, or external data.

## Trigger

- [ ] Manual (user requests it)
- [ ] Scheduled
- [x] On event (before implementing any feature involving auth, user input, APIs, or deployment)

## Environment Variables

- See `.env.example` at the project root for the template; copy to `.env.local` before development
- **Never** prefix secrets with `NEXT_PUBLIC_` — this exposes them to the browser
- Server-only secrets: `DATABASE_URL`, `AUTH_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`
- Client-safe values only: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`
- Before committing, verify `.env.local` is in `.gitignore`
- Use `@t3-oss/env-nextjs` or a similar validated env module to enforce server/client boundaries:

```typescript
// env.mjs
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
```

If not using `@t3-oss/env-nextjs`, keep server and client env exports **separate** to prevent accidental client-side bundling of secrets:

```typescript
// env.mjs (manual approach)
import { z } from 'zod'

// NEVER merge these into a single export
export const serverEnv = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
}).parse(process.env)

export const clientEnv = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
}).parse(process.env)
```

## Input Validation

- Validate **all** external input at API boundaries using Zod
- Never trust client data — re-validate on the server even if validated client-side
- Sanitize before database queries (use parameterized queries/ORMs)
- Sanitize before rendering user content (React escapes by default, but watch `dangerouslySetInnerHTML`)

### Prisma Security

- Prisma uses parameterized queries by default — safe from SQL injection
- **Warning**: `$queryRaw` and `$executeRaw` bypass parameterization. Never interpolate user input:
  ```typescript
  // DANGEROUS — SQL injection risk
  prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`  // Safe (tagged template)
  prisma.$queryRawUnsafe(`SELECT * FROM users WHERE email = '${userInput}'`)  // UNSAFE
  ```
- Prefer Prisma's typed query builder over raw queries in all cases
- If raw queries are unavoidable, use tagged template literals (the safe `$queryRaw` form)

## Auth & Authorization

- Use Next.js middleware for route protection (`middleware.ts` at project root)
- Check authorization in **every** API route — don't assume middleware caught it
- Pattern: validate session -> check user permissions -> proceed

```typescript
// middleware.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
})

export const config = { matcher: ['/dashboard/:path*', '/api/protected/:path*'] }
```

```typescript
// In API routes, always verify authorization
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const resource = await getResource(params.id)
  if (resource.ownerId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Now safe to delete
}
```

## Rate Limiting

- Every public-facing API route must have rate limiting
- Use middleware-based rate limiting (e.g., `upstash/ratelimit` with Redis, or Vercel's edge config)
- Default limits: 60 requests/minute for authenticated users, 20/minute for anonymous
- Return `429 Too Many Requests` with a `Retry-After` header
- Apply stricter limits to sensitive endpoints (login, registration, password reset)

```typescript
// Example: rate limiting with Upstash
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, '1 m'),
})

// In your API route or middleware:
const identifier = session?.user.id ?? ip
const { success, reset } = await ratelimit.limit(identifier)

if (!success) {
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429, headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) } }
  )
}
```

## NextAuth Security

- **Session strategy**: Use database sessions for SaaS (enables server-side revocation). Configure in `lib/auth/index.ts`:
  ```typescript
  session: { strategy: "database" }
  ```
- **Callback URL validation**: NextAuth v5 validates callback URLs by default. Add custom logic in `callbacks.redirect` if your app uses multiple domains
- **Token rotation**: Database sessions handle this automatically. For JWT strategy, configure `maxAge` and implement token rotation in callbacks
- **Provider security**: Always use the state parameter for OAuth (NextAuth handles this). Verify provider response using PKCE where supported
- **Session invalidation**: On password change or security events, delete sessions from the database:
  ```typescript
  await prisma.session.deleteMany({ where: { userId: user.id } })
  ```

## Content Security Policy

Configure CSP headers in `middleware.ts` or `next.config.js`:

```typescript
// next.config.js — headers approach
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Tighten in production
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://us.i.posthog.com",  // Analytics endpoint
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
```

Tighten `script-src` in production by removing `unsafe-eval` and using nonce-based CSP if possible.

## CSRF Protection

- Next.js App Router server actions have built-in CSRF protection via the `Origin` header check
- For custom API routes that use cookie-based auth and accept mutations (POST/PUT/DELETE):
  - Verify the `Origin` or `Referer` header matches your domain
  - Or use a CSRF token pattern (double-submit cookie)
- GET requests must **never** perform mutations
- Set `SameSite=Lax` (or `Strict`) on auth cookies

## Dependency Hygiene

- Run `npm audit` before each deploy
- Fix critical/high vulnerabilities before merging
- Update dependencies monthly (or use Dependabot/Renovate)
- Prefer well-maintained packages with recent commits
- Pin major versions in `package.json` to avoid surprise breaking changes

## Security Checklist Before Deploy

- [ ] No secrets in `NEXT_PUBLIC_*` vars
- [ ] Server and client env vars are in separate exports
- [ ] All API inputs validated with Zod
- [ ] Protected routes have middleware + route-level auth checks
- [ ] Public API routes have rate limiting
- [ ] Mutation endpoints have CSRF protection
- [ ] `npm audit` shows no critical/high vulnerabilities
- [ ] `.env.local` is gitignored
- [ ] Auth cookies use `SameSite=Lax` or `Strict`
- [ ] CSP headers configured (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] NextAuth callback URLs validated
- [ ] No `$queryRawUnsafe` with user input interpolation
- [ ] Stripe webhook signatures verified with `stripe.webhooks.constructEvent()`
- [ ] Database sessions enabled for production (enables revocation)

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Format: - YYYY-MM-DD: What was learned
-->
