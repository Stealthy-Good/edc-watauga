# Directive: Performance Optimization

## Purpose

Optimize Core Web Vitals and runtime performance for a Next.js SaaS application, targeting LCP < 2.5s, INP < 200ms, CLS < 0.1, and TTFB < 600ms through font loading, image optimization, code splitting, caching strategies, and database query optimization.

## Trigger

When should this directive be invoked?
- [x] Manual (user requests performance optimization or audit)
- [x] Scheduled (run Lighthouse CI on every deploy)
- [x] On event (Core Web Vitals degrade below targets)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| targetLCP | number | No | Largest Contentful Paint target in seconds (default: 2.5) |
| targetINP | number | No | Interaction to Next Paint target in milliseconds (default: 200) |
| targetCLS | number | No | Cumulative Layout Shift target (default: 0.1) |
| targetTTFB | number | No | Time to First Byte target in milliseconds (default: 600) |
| analyzeBundle | boolean | No | Whether to run bundle analysis (default: false) |

## Steps

### 1. Optimize Font Loading with `next/font`

Use `next/font/google` to self-host Google Fonts and eliminate external requests:

```typescript
// app/fonts.ts
import { Inter, Roboto_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Prevents invisible text during font load
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})
```

**Apply in layout:**

```typescript
// app/layout.tsx
import { inter, robotoMono } from './fonts'

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

**Configure Tailwind to use the CSS variables:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
}
```

**Why this works**: `next/font` automatically optimizes fonts, self-hosts them, eliminates layout shift, and uses `font-display: swap` for better FCP.

### 2. Optimize Images with `next/image`

Always use `next/image` for automatic WebP/AVIF conversion and responsive sizing:

```typescript
import Image from 'next/image'

// Good: Responsive with proper sizing
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Good: Fill container with aspect ratio
<div className="relative aspect-video">
  <Image
    src={post.coverImage}
    alt={post.title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 800px"
  />
</div>
```

**Best practices**:
- Set `priority` for above-fold images (LCP candidates)
- Define `sizes` attribute based on responsive breakpoints
- Use `fill` with `sizes` for images in responsive containers
- Serve images in modern formats (WebP/AVIF) automatically
- Compress images before upload (use tools like Sharp or ImageOptim)

### 3. Implement Code Splitting with Dynamic Imports

Split large client components to reduce initial bundle size:

```typescript
// Good: Lazy load heavy components
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  loading: () => <EditorSkeleton />,
  ssr: false, // Disable SSR for client-only components
})

// Good: Split chart libraries
const ChartComponent = dynamic(() => import('@/components/Chart'), {
  loading: () => <div>Loading chart...</div>,
})

// Good: React.lazy for client components
import { lazy, Suspense } from 'react'

const HeavyModal = lazy(() => import('@/components/HeavyModal'))

function Page() {
  return (
    <Suspense fallback={<ModalSkeleton />}>
      {showModal && <HeavyModal />}
    </Suspense>
  )
}
```

**When to split**:
- Rich text editors (TipTap, Quill, Monaco)
- Chart libraries (Recharts, Chart.js)
- Heavy UI libraries (date pickers, data tables)
- Client-only features (browser APIs, third-party widgets)

### 4. Configure Incremental Static Regeneration (ISR) for Marketing Pages

Cache static content and revalidate on a schedule:

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  return <Article post={post} />
}

// app/pricing/page.tsx
export const revalidate = 86400 // Revalidate daily

export default async function Pricing() {
  const plans = await getPlans()
  return <PricingTable plans={plans} />
}
```

**Cache strategy**:
- Marketing pages: 24-hour revalidation
- Blog posts: 1-hour revalidation
- Dashboard pages: No static generation (`export const dynamic = 'force-dynamic'`)
- API routes: Manual cache headers (see step 7)

### 5. Analyze Bundle Size with `@next/bundle-analyzer`

Install and configure bundle analyzer:

```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your Next.js config
})
```

**Run analysis:**

```bash
ANALYZE=true npm run build
```

**What to look for**:
- Large dependencies imported on every page (move to dynamic imports)
- Duplicate dependencies (check for multiple versions in `package.json`)
- Unused code (use tree-shaking, check imports)
- Target: Initial JS bundle < 100KB gzipped for critical path

### 6. Optimize Database Queries and Avoid N+1 Problems

Use Prisma's `select` to fetch only needed fields and include related data in a single query:

```typescript
// Bad: N+1 query problem
const posts = await prisma.post.findMany()
for (const post of posts) {
  post.author = await prisma.user.findUnique({ where: { id: post.authorId } })
}

// Good: Single query with select and include
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    excerpt: true,
    publishedAt: true,
    author: {
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    },
  },
  where: { published: true },
  orderBy: { publishedAt: 'desc' },
  take: 10, // Pagination
})
```

**Pagination patterns**:

```typescript
// Cursor-based pagination (efficient for large datasets)
const posts = await prisma.post.findMany({
  take: 20,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: 'desc' },
})

// Offset-based pagination (simpler, less efficient)
const page = 1
const pageSize = 20
const posts = await prisma.post.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
})
```

**Index frequently queried fields** in your Prisma schema:

```prisma
model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  authorId    String
  publishedAt DateTime

  @@index([authorId])
  @@index([publishedAt])
}
```

### 7. Implement API Route Caching with `Cache-Control` Headers

Cache public API responses at the edge:

```typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    take: 10,
  })

  return Response.json(posts, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

**Cache header patterns**:
- `public, s-maxage=3600` — Cache at CDN for 1 hour
- `stale-while-revalidate=86400` — Serve stale content while revalidating in background
- `private, max-age=60` — Cache in browser only for 1 minute (user-specific data)
- `no-store` — Never cache (sensitive data, real-time updates)

**Never cache**:
- User-specific data (unless using `Vary: Cookie`)
- Authentication endpoints
- POST/PUT/DELETE requests
- Error responses

### 8. Load Third-Party Scripts Lazily with `next/script`

Defer analytics, chat widgets, and other third-party scripts:

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}

        {/* Analytics - load after page interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="lazyOnload"
        />

        {/* Chat widget - load only when needed */}
        <Script
          id="intercom"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.intercomSettings = { app_id: "APP_ID" };
              (function(){var w=window;var ic=w.Intercom;...})();
            `,
          }}
        />
      </body>
    </html>
  )
}
```

**Script loading strategies**:
- `beforeInteractive` — Load before page is interactive (critical polyfills only)
- `afterInteractive` (default) — Load after page is interactive
- `lazyOnload` — Load during idle time (analytics, chat, ads)
- `worker` — Load in a Web Worker (experimental)

**Conditional loading**:

```typescript
// Only load on certain pages
{pathname.startsWith('/blog') && (
  <Script src="https://cdn.embedly.com/widgets/platform.js" strategy="lazyOnload" />
)}
```

## Outputs

- Optimized font loading configuration in `app/fonts.ts`
- Image optimization using `next/image` across all pages
- Code-split heavy components using `dynamic()` and `React.lazy()`
- ISR configuration on marketing pages with `revalidate`
- Bundle analysis report (when `ANALYZE=true`)
- Optimized database queries with proper `select` and `include`
- API route caching headers for public endpoints
- Third-party scripts loaded with `next/script` and `strategy="lazyOnload"`

## Tools Used

- `next/font` for font optimization
- `next/image` for image optimization
- `next/dynamic` for code splitting
- `@next/bundle-analyzer` for bundle size analysis
- Prisma for database query optimization
- `next/script` for third-party script loading
- Chrome DevTools Lighthouse for Core Web Vitals measurement
- Vercel Analytics or Web Vitals library for real-user monitoring

## Error Handling

| Error | Recovery |
|-------|----------|
| Font loading fails | Fallback to system fonts; verify font file availability |
| Image optimization fails | Return original image; log error; check image format and size limits |
| Dynamic import fails | Show error boundary; log component name and error; verify export name matches import |
| Bundle size exceeds limit | Run analyzer; identify large dependencies; split or remove |
| Database query timeout | Add query timeout; optimize with indexes; implement pagination |
| Third-party script blocks render | Verify `strategy="lazyOnload"`; consider removing non-essential scripts |
| ISR revalidation fails | Serve stale content; log error; verify data source availability |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
