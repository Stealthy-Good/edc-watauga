# lib/ Registry

> Check this file before creating new modules. Update it when adding or removing modules.
> The agent should read this file to understand what execution tools already exist.

## api/

<!-- External API clients -->

| Module | Purpose | Status | Notes |
|--------|---------|--------|-------|
| `api/email.ts` | Resend email client for contact form | Planned | **HIGH-RISK** — sends to real users. Never log email bodies |

## utils/

<!-- Helper functions and shared logic -->

| Module | Purpose | Status | Notes |
|--------|---------|--------|-------|
| `utils/cn.ts` | Tailwind class merge helper (`clsx` + `tailwind-merge`) | Planned | See `directives/ui-design-system.md` |
| `utils/logger.ts` | Structured application logger | Planned | See `directives/debug-and-logging.md` |
| `utils/analytics.ts` | GA4 event helpers (typed events) | Planned | Google Analytics 4 integration |
| `utils/env.ts` | Environment variable validation (Zod) | Planned | Validates all `.env.local` vars at startup |

## content/

<!-- Static content data files (TypeScript) — future CMS swap target -->

| Module | Purpose | Status | Notes |
|--------|---------|--------|-------|
| `content/site-config.ts` | Site name, tagline, description, social links | Planned | |
| `content/navigation.ts` | Nav structure for header, mega-menu, footer | Planned | |
| `content/stats.ts` | Homepage statistics data | Planned | |
| `content/industries.ts` | Target industry data | Planned | |
| `content/pages/do-business.ts` | Do Business page content | Planned | |
| `content/pages/live-here.ts` | Live Here page content | Planned | |
| `content/pages/visit.ts` | Visit page content | Planned | |
| `content/pages/data-center.ts` | Data Center page content | Planned | |
| `content/pages/university.ts` | University Connection page content | Planned | |
