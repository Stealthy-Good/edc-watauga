# Directive: Analytics

## Purpose

Privacy-respecting event tracking with PostHog for user behavior analytics and conversion tracking.

## Trigger

- [x] Manual (when implementing or modifying analytics)
- [ ] Scheduled
- [x] On event (before adding new tracking events)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| event_name | string | Yes | Event identifier following taxonomy (e.g., `user.signup`) |
| properties | Record<string, any> | No | Event metadata (must not contain PII) |
| user_id | string | No | Anonymous user identifier (never email/name) |

## Steps

### 1. PostHog Setup

Configure PostHog with lazy-loaded provider wrapper:

```typescript
// lib/analytics/posthog-provider.tsx
'use client'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
        capture_pageviews: false, // We'll handle these manually
        respect_dnt: true, // Respect Do Not Track
      })
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Wrap app in `app/layout.tsx`:

```typescript
import { PHProvider } from '@/lib/analytics/posthog-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  )
}
```

### 2. Event Taxonomy

Standard event naming convention:

| Event | Trigger | Properties |
|-------|---------|------------|
| `user.signup` | User creates account | `{ method: 'email' \| 'google' \| 'github' }` |
| `user.login` | User signs in | `{ method: 'email' \| 'google' \| 'github' }` |
| `user.upgrade` | User upgrades plan | `{ from_plan: string, to_plan: string }` |
| `feature.used` | User uses feature | `{ feature_name: string }` |
| `feature.error` | Feature encounters error | `{ feature_name: string, error_code: string }` |
| `billing.checkout_started` | User starts checkout | `{ plan: string }` |
| `billing.subscription_created` | Subscription created | `{ plan: string, amount: number }` |

### 3. Typed Analytics Wrapper

Create typed wrapper at `lib/utils/analytics.ts`:

```typescript
// lib/utils/analytics.ts
import posthog from 'posthog-js'

type EventName =
  | 'user.signup'
  | 'user.login'
  | 'user.upgrade'
  | 'feature.used'
  | 'feature.error'
  | 'billing.checkout_started'
  | 'billing.subscription_created'

type EventProperties = {
  'user.signup': { method: 'email' | 'google' | 'github' }
  'user.login': { method: 'email' | 'google' | 'github' }
  'user.upgrade': { from_plan: string; to_plan: string }
  'feature.used': { feature_name: string }
  'feature.error': { feature_name: string; error_code: string }
  'billing.checkout_started': { plan: string }
  'billing.subscription_created': { plan: string; amount: number }
}

export const analytics = {
  track: <T extends EventName>(
    event: T,
    properties: EventProperties[T]
  ) => {
    try {
      if (typeof window === 'undefined') return
      posthog.capture(event, properties)
    } catch (error) {
      // Silent failure — never break the app for tracking
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] Track failed:', error)
      }
    }
  },

  identify: (userId: string, traits?: Record<string, any>) => {
    try {
      if (typeof window === 'undefined') return
      // Never pass PII (email, name, IP)
      posthog.identify(userId, traits)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] Identify failed:', error)
      }
    }
  },

  reset: () => {
    try {
      if (typeof window === 'undefined') return
      posthog.reset()
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] Reset failed:', error)
      }
    }
  },

  pageview: () => {
    try {
      if (typeof window === 'undefined') return
      posthog.capture('$pageview')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] Pageview failed:', error)
      }
    }
  },
}
```

### 4. Server-Side Events for Critical Conversions

Use API route pattern for server-side tracking (more reliable for conversions):

```typescript
// app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PostHog } from 'posthog-node'

const posthogServer = new PostHog(
  process.env.POSTHOG_API_KEY!,
  { host: process.env.POSTHOG_HOST }
)

export async function POST(req: NextRequest) {
  try {
    const { event, properties, userId } = await req.json()

    await posthogServer.capture({
      distinctId: userId,
      event,
      properties,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Silent failure
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
```

### 5. Cookie Consent Integration

Respect user preferences with consent banner:

```typescript
// lib/analytics/consent.ts
export const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  const consent = localStorage.getItem('analytics_consent')
  return consent === 'granted'
}

export const grantConsent = () => {
  localStorage.setItem('analytics_consent', 'granted')
}

export const revokeConsent = () => {
  localStorage.setItem('analytics_consent', 'denied')
  analytics.reset()
}
```

Update analytics wrapper to check consent before tracking:

```typescript
// In lib/utils/analytics.ts
import { hasConsent } from '@/lib/analytics/consent'

export const analytics = {
  track: <T extends EventName>(event: T, properties: EventProperties[T]) => {
    try {
      if (typeof window === 'undefined') return
      if (!hasConsent()) return // Respect user preferences
      posthog.capture(event, properties)
    } catch (error) {
      // Silent failure
    }
  },
  // ... rest of implementation
}
```

### 6. Privacy Rules

Never track personally identifiable information:

- NO email addresses
- NO full names
- NO IP addresses (PostHog can anonymize)
- NO phone numbers
- NO physical addresses

Anonymous by default:
- Use database ID (UUID) as distinct_id, not email
- Strip PII from properties before sending
- Enable PostHog IP anonymization in project settings

## Outputs

- Typed event tracking in client and server components
- Privacy-respecting analytics setup
- Cookie consent integration
- Server-side conversion tracking for critical events

## Tools Used

- `lib/utils/analytics.ts` — Typed wrapper for PostHog tracking
- `lib/analytics/posthog-provider.tsx` — Client-side PostHog provider
- `lib/analytics/consent.ts` — Cookie consent management
- `app/api/track/route.ts` — Server-side event tracking

## Error Handling

| Error | Recovery |
|-------|----------|
| PostHog initialization fails | Silent failure, log in dev, app continues normally |
| Network request fails | Silent failure, never throw or block UI |
| Invalid event name | TypeScript prevents at compile time |
| Missing consent | Skip tracking, don't throw error |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
