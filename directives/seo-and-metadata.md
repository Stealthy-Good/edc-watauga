# Directive: SEO and Metadata

## Purpose

Configure comprehensive SEO optimization for a Next.js SaaS application using the App Router metadata API, including dynamic metadata, Open Graph images, structured data, and search engine directives.

## Trigger

When should this directive be invoked?
- [x] Manual (user requests SEO setup or metadata configuration)
- [ ] Scheduled (cron, interval)
- [x] On event (new marketing page created, product info updated)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| appName | string | Yes | Application name for title templates and OG defaults |
| appDescription | string | Yes | Default meta description (150-160 chars) |
| baseUrl | string | Yes | Canonical base URL (e.g., `https://example.com`) |
| ogImagePath | string | No | Default Open Graph image path (defaults to `/opengraph-image`) |
| twitterHandle | string | No | Twitter/X handle for `twitter:site` and `twitter:creator` |
| dynamicRoutes | Array<{path: string, priority: number}> | No | Dynamic routes for sitemap generation |

## Steps

### 1. Configure Root Metadata in `app/layout.tsx`

Set up the base metadata configuration that all pages inherit:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | AppName',
    default: 'AppName - Your SaaS Solution',
  },
  description: 'Default app description (150-160 characters for optimal display)',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AppName',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'AppName',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@handle',
    creator: '@handle',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}
```

Include `<meta charset="utf-8">` by default (Next.js includes this automatically).

### 2. Implement Per-Page Metadata Using `generateMetadata()`

For dynamic pages, use `generateMetadata()` to set page-specific SEO data:

**Example: `app/blog/[slug]/page.tsx`**

```typescript
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}
```

**Pattern**: Always fetch data needed for metadata in `generateMetadata()`, not in the page component. Use database queries or API calls as needed.

### 3. Create `app/robots.ts` for Search Engine Directives

Define crawling rules for search engines:

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/*', '/api/*', '/admin/*', '/_next/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

**Never index**: authenticated routes (`/dashboard`, `/account`, `/settings`), API endpoints, admin panels, or private user data.

### 4. Create `app/sitemap.ts` for Search Engine Discovery

Generate a sitemap with static and dynamic routes:

```typescript
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Static marketing routes
  const staticRoutes = ['', '/pricing', '/about', '/contact', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic blog posts
  const posts = await getPosts()
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
```

**Pattern**: Fetch dynamic routes from your database or CMS. Use appropriate `priority` values (1.0 for homepage, 0.8 for main pages, 0.6 for content).

### 5. Generate Dynamic Open Graph Images with `opengraph-image.tsx`

Create dynamic OG images for marketing pages:

**Example: `app/opengraph-image.tsx`**

```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AppName'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom right, #1e40af, #7c3aed)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        AppName
      </div>
    ),
    {
      ...size,
    }
  )
}
```

**Per-page OG images**: Create `app/blog/[slug]/opengraph-image.tsx` to generate unique images for each blog post using dynamic data.

### 6. Add JSON-LD Structured Data for Rich Snippets

Include structured data for better search result presentation:

**Example: `app/layout.tsx` or page component**

```typescript
export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AppName',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
    },
  }

  return (
    <html>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
```

**Common schema types for SaaS**:
- `SoftwareApplication` for the app itself
- `Organization` for company info
- `FAQPage` for pricing/support pages
- `Article` for blog posts
- `BreadcrumbList` for navigation context

### 7. Set Canonical URLs on All Pages

Prevent duplicate content issues by setting canonical URLs:

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: '/current-page-path',
  },
}
```

**Pattern**: Use absolute paths. For dynamic pages, construct the canonical URL in `generateMetadata()`.

### 8. Configure Essential Meta Tags

Ensure these are set (most are handled by the Metadata API, but verify):

- `<meta charset="utf-8">` (automatic in Next.js)
- `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">` (set in root metadata)
- `<meta name="theme-color" content="#hex">` (supports media queries for light/dark)
- `<link rel="icon" href="/favicon.ico">` (place in `app/` directory as `favicon.ico`)

## Outputs

- Root metadata configuration in `app/layout.tsx`
- `app/robots.ts` with crawling rules
- `app/sitemap.ts` with static and dynamic routes
- `app/opengraph-image.tsx` for dynamic OG image generation
- Per-page metadata using `generateMetadata()` for dynamic routes
- JSON-LD structured data scripts in appropriate pages/layouts
- Canonical URLs configured on all public pages

## Tools Used

- Next.js App Router Metadata API
- `next/og` for Open Graph image generation
- Database queries for dynamic route discovery (e.g., `lib/db/posts.ts`)
- Environment variables from `.env.local` for `NEXT_PUBLIC_BASE_URL`

## Error Handling

| Error | Recovery |
|-------|----------|
| Missing `NEXT_PUBLIC_BASE_URL` in production | Throw error during build; require this env var for sitemaps and canonical URLs |
| Dynamic route fetch fails in `sitemap.ts` | Log error and return static routes only; alert monitoring system |
| Invalid metadata in `generateMetadata()` | Return fallback metadata with app defaults; log warning |
| OG image generation fails | Fall back to static `/opengraph-image.png`; verify image dimensions and edge runtime compatibility |
| Duplicate canonical URLs detected | Log warning during build; each page should have exactly one canonical URL |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
