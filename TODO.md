# TODO

> Active task tracking. Agent reads and updates this file as work progresses.
> Each task must start with a verb: Build, Fix, Add, Investigate, Update, Remove, etc.

## In Progress

_(none)_

## Up Next

- Add vitest configuration and basic component tests
- Build interactive map with Mapbox integration (replace community showcase with real map)
- Build property search tool with GIS data
- Consider CMS integration (Sanity, Contentful, or similar) for content management
- Replace placeholder testimonials with real business quotes
- Add team/staff bios to About page when available
- Create Data Center interactive stat cards with source tooltips
- Add real photography to replace Unsplash stock images

## Blocked

| Task | Blocked By | Since |
|------|------------|-------|

## Done

<!-- Move completed items here. Clear periodically to keep file manageable. -->

### Phase 0: Template Cleanup
- Update tailwind.config.ts with EDC color palette (forest green, burnt orange, sky blue, warm brown)
- Rewrite PLANNING.md for EDC website architecture
- Update .env.example (remove SaaS vars, add GA4 and Resend)
- Update lib/_registry.md with EDC modules

### Phase 1: Foundation
- Scaffold Next.js 16 project with TypeScript, Tailwind v4, App Router
- Create core utilities: cn.ts, logger.ts, env.ts
- Create root layout with Inter + Outfit fonts
- Set up globals.css with Tailwind v4 @theme tokens

### Phase 2: Homepage
- Build hero section with gradient background and mountain SVG overlay
- Build quick-access tiles (Explore & Visit, Live & Work, Grow & Invest)
- Build animated statistics counter with IntersectionObserver
- Build target industries section (6 industry cards)
- Build interactive map placeholder with town badges
- Build CTA banner component
- Assemble homepage from all components

### Phase 3: Navigation & Layout
- Build sticky header with scroll detection and mega-menu
- Build mobile navigation (slide-in overlay with accordion sections)
- Build footer with 4-column layout and social icons
- Integrate header/footer into root layout

### Phase 4: Content Pages
- Build Do Business page (available sites, workforce, incentives)
- Build Live Here page (relocate, quality of life, mountain living)
- Build Visit page (outdoor adventure, downtown Boone, dining)
- Build Data Center page (community stats, reports, infrastructure)
- Build University Connection page (App State, academics, workforce pipeline)

### Phase 5: Contact & Forms
- Build contact form with Zod validation and honeypot spam protection
- Build contact API route with Resend email integration
- Build contact page with form + sidebar (address, hours, info)

### Phase 6: SEO & Analytics
- Create sitemap.ts and robots.ts
- Add per-page SEO metadata and Open Graph tags
- Build GA4 analytics provider and typed event helpers
- Integrate analytics into root layout

### Phase 7: Polish
- Build custom 404 page
- Build error boundary page with retry
- Configure next.config.ts with AVIF/WebP image optimization and security headers (CSP, X-Frame-Options, etc.)

### Phase 8: Images, OG, Animations & Accessibility
- Download and integrate Unsplash photography (8 images: hero, downtown, campus, hiking, cabin, business, vista, community)
- Add background images to HeroSection and all PageHero components via next/image
- Create dynamic per-page OG image generation using Next.js ImageResponse API (root + 6 routes)
- Build AnimateOnScroll client component with IntersectionObserver + prefers-reduced-motion
- Integrate scroll-triggered fade-in animations on homepage sections
- Run accessibility audit: aria-live on form status, aria-hidden on decorative SVGs, color contrast fix (text-muted #7a7a7a → #6b6b6b)

### Phase 9: UI/UX Rebuild
- Fix OG image fallback URLs (layout.tsx, env.ts) — changed from localhost to wataugaedc.org
- Add 4 industry sections to Do Business page (outdoor, tech, arts, health) with anchor targets
- Fix broken navigation anchor links (footer: #industries → #outdoor-industry, #events → #downtown-boone)
- Replace property search "Coming Soon" with site selection CTA and contact button
- Replace contact page map placeholder with Google Maps iframe embed
- Replace homepage map placeholder with community showcase cards (5 communities)
- Replace Data Center report card "Coming Soon" with "Request Report" CTAs
- Add JSON-LD structured data (Organization + GovernmentOffice) to root layout
- Create breadcrumbs component with BreadcrumbList JSON-LD schema
- Add breadcrumbs to all 6 inner pages
- Add canonical URL alternates to all page metadata
- Create testimonials/success stories section for homepage (placeholder content)
- Create About page with mission, services, and partners
- Create About page OG image
- Add About page to footer navigation and sitemap
- Add icons to "I want to..." dropdown in header and mobile nav
- Enhance AnimateOnScroll with fade-up variant (translateY + opacity transition)
- Update CSP to allow Google Maps iframe embedding
- Add scroll animations (AnimateOnScroll) to all 7 inner page sections

---

## Notes

<!-- Discoveries, context, or things to remember -->
- Tech stack: Next.js 16.1.6 + Tailwind v4 + TypeScript + GA4 + Resend + Vercel
- No auth, no database, no billing — pure public marketing site
- Color palette: primary green (#1B4D3E), accent orange (#C75B12), sky blue (#5B9BD5), earth brown (#8B6F47)
- Display font: Outfit (headlines) + Inter (body)
- Tailwind v4 uses CSS-based @theme in globals.css, NOT tailwind.config.ts
- Content lives in lib/content/ as TypeScript data files — CMS swap target
- Interactive tools (map, property search, calculator) are placeholder sections for now
- Only HIGH-RISK function: sendContactEmail in lib/api/email.ts
- 8 client components total (added AnimateOnScroll)
- Production build generates all pages as static, except /api/contact and OG images (dynamic)
- Unsplash images stored in public/images/ (self-hosted, no external dependency)
- OG images: dynamic per-page via Next.js ImageResponse API (1200x630, branded green + orange)
- Testimonials in lib/content/testimonials.ts are placeholder — replace with real business quotes
- About page team section is minimal — add staff bios when available
- .env.local keeps localhost:3000 for local dev; production needs NEXT_PUBLIC_APP_URL set on Vercel
