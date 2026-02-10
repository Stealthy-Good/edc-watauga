# Project Planning

> This document defines the overall architecture and build structure. Update it when major decisions change.

## Overview

A public-facing economic development website for Watauga County that balances three core pillars: **Tourism Destination**, **Mountain Living**, and **University Town**. The site serves multiple audiences (businesses, investors, visitors, prospective residents, students/faculty) with a unifying theme: *"Where Mountains Meet Innovation."*

This is a static marketing site with a contact form — no auth, no database, no billing. Content is hardcoded in TypeScript data files, ready for future CMS integration.

## Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (custom EDC design tokens)
- **Analytics**: Google Analytics 4
- **Email**: Resend (contact form delivery)
- **Deployment**: Vercel
- **Validation**: Zod (contact form)

### Page Structure

```
Public Pages
├── Homepage (hero, quick-access tiles, stats, industries, map placeholder)
├── Do Business (available sites, workforce, incentives, industries)
├── Live Here (relocate, quality of life, mountain living)
├── Visit (tourism, outdoor adventure, downtown Boone)
├── Data Center (community profiles, reports, location advantages)
├── University Connection (App State partnership, academics)
└── Contact (lead capture form, newsletter signup placeholder)

API Layer
└── app/api/contact/ — Contact form submission handler

Content Layer (static TypeScript data files)
├── lib/content/site-config.ts
├── lib/content/navigation.ts
├── lib/content/stats.ts
├── lib/content/industries.ts
└── lib/content/pages/ — Per-page content data
```

### Component Structure

```
components/
├── ui/              — Reusable UI primitives (Button, Card, Container, etc.)
├── layout/          — Site-wide layout (Header, Footer, MegaMenu, MobileNav)
└── features/        — Feature-specific components
    ├── hero/        — Homepage hero section
    ├── quick-access/ — Quick-access tiles
    ├── stats/       — Animated statistics counter
    ├── industries/  — Target industries section
    ├── map/         — Map placeholder (future Mapbox)
    ├── contact/     — Contact form, newsletter signup
    └── ga4/         — Analytics provider
```

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#1B4D3E` | Deep forest green — headers, buttons, nav, authority |
| `accent` | `#C75B12` | Burnt orange/gold — CTAs, highlights, warmth |
| `sky` | `#5B9BD5` | Sky blue — secondary accents, data visualizations |
| `earth` | `#8B6F47` | Warm brown — heritage elements, supporting text |
| `surface-muted` | `#f8f7f5` | Warm off-white page backgrounds |

### Typography

- **Body**: Inter (clean, accessible sans-serif)
- **Display/Headlines**: Outfit (geometric, confident)
- **Decorative**: Georgia serif for optional warmth

### Brand Voice

- Warm but professional
- Authentic, not cliche
- Forward-looking while heritage-proud
- Inclusive and welcoming

## Key Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Static content first, no CMS | Gets site live faster; CMS can be added later by swapping data source | 2026-02-09 |
| No auth/database/billing | Pure public marketing site — complexity not needed | 2026-02-09 |
| Google Analytics 4 | Industry standard, EDC staff familiarity, matches brief | 2026-02-09 |
| Placeholder interactive tools | Build page structure now; implement map/calculators later | 2026-02-09 |
| Content in TypeScript data files | Type-safe, co-located, easy CMS migration (swap data source, keep components) | 2026-02-09 |
| Resend for contact email | Simple API, good deliverability, generous free tier | 2026-02-09 |
| Outfit for display font | Geometric sans-serif pairs well with Inter; bold weights convey confidence | 2026-02-09 |

## Milestones

### Phase 0: Template Cleanup
- [x] Update tailwind.config.ts with EDC color palette
- [x] Rewrite PLANNING.md for EDC site
- [x] Rewrite TODO.md with EDC tasks
- [x] Update .env.example
- [x] Update lib/_registry.md

### Phase 1: Foundation
- [ ] Scaffold Next.js app
- [ ] Install dependencies
- [ ] Configure TypeScript strict mode
- [ ] Create core utilities (cn, logger, env)
- [ ] Create root layout with fonts
- [ ] Create globals.css

### Phase 2: Homepage
- [ ] Build hero section with gradient placeholder
- [ ] Build quick-access tiles (3 pillars)
- [ ] Build animated statistics counter
- [ ] Build target industries section
- [ ] Build map placeholder
- [ ] Assemble homepage

### Phase 3: Navigation
- [ ] Build sticky header with mega-menu
- [ ] Build mobile navigation
- [ ] Build footer
- [ ] Build breadcrumbs
- [ ] Integrate into root layout

### Phase 4: Content Pages
- [ ] Build Do Business page
- [ ] Build Live Here page
- [ ] Build Visit page
- [ ] Build Data Center page
- [ ] Build University Connection page

### Phase 5: Contact & Forms
- [ ] Build contact form with Zod validation
- [ ] Build API route for email delivery
- [ ] Build contact page
- [ ] Build newsletter signup placeholder

### Phase 6: SEO & Analytics
- [ ] Add per-page metadata
- [ ] Create sitemap and robots.txt
- [ ] Create OG image
- [ ] Add JSON-LD structured data
- [ ] Integrate GA4

### Phase 7: Polish
- [ ] Add scroll animations
- [ ] Build error and 404 pages
- [ ] Accessibility audit
- [ ] Responsive testing
- [ ] Performance optimization

## High-Risk Functions

| Function | File | Status | Last Reviewed |
|----------|------|--------|---------------|
| sendContactEmail | lib/api/email.ts | UNREVIEWED | — |

## Open Questions

- Mapbox vs Google Maps for future interactive map?
- Which headless CMS when ready? (Sanity, Contentful, Payload)
- Real photography assets — when available?
- Domain name for the EDC site?

## References

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Google Analytics 4 Docs](https://developers.google.com/analytics)
