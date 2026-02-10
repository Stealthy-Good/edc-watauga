# Directive: Auth

## Purpose

NextAuth v5 authentication configuration, providers, session handling, and route protection for the SaaS application.

## Trigger

- [x] Manual (when building or modifying auth)
- [ ] Scheduled
- [x] On event (before any auth changes)

> **WARNING**: ALL functions in this directive are HIGH-RISK per `ai-review-policy.md`. Improper implementation can compromise user security and data access.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| provider | 'google' \| 'github' \| 'email' | Yes | Auth provider to configure |
| user_id | string | Yes | User ID for session lookup |
| role | 'OWNER' \| 'ADMIN' \| 'MEMBER' | No | Required role for protected routes |

## Steps

### 1. NextAuth v5 Config with Prisma Adapter

Create auth configuration at `lib/auth/index.ts`:

```typescript
// lib/auth/index.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import { prisma } from '@/lib/db/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  session: {
    strategy: 'database', // Recommended for SaaS — enables revocation
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, user }) {
      // Include user ID and role in session
      if (session.user) {
        session.user.id = user.id

        // Fetch user's primary team and role
        const teamMember = await prisma.teamMember.findFirst({
          where: { userId: user.id },
          include: { team: true },
          orderBy: { createdAt: 'asc' }, // First team joined
        })

        if (teamMember) {
          session.user.role = teamMember.role
          session.user.teamId = teamMember.teamId
          session.user.teamSlug = teamMember.team.slug
        }
      }
      return session
    },
  },
})
```

Update `next-auth.d.ts` to extend session type:

```typescript
// types/next-auth.d.ts
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role?: Role
      teamId?: string
      teamSlug?: string
    }
  }
}
```

### 2. Route Handler

Create API route at `app/api/auth/[...nextauth]/route.ts`:

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
```

### 3. Middleware for Route Protection

Create middleware at `middleware.ts`:

```typescript
// middleware.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Public routes
  const isPublicRoute =
    pathname.startsWith('/auth') ||
    pathname === '/' ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/blog')

  // Protected dashboard routes
  const isDashboardRoute = pathname.startsWith('/dashboard')

  // Protected API routes
  const isProtectedApi = pathname.startsWith('/api/protected')

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && (isDashboardRoute || isProtectedApi)) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### 4. OAuth Providers

Google setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
4. Add to `.env.local`:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

GitHub setup:

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL: `https://yourdomain.com/api/auth/callback/github`
4. Add to `.env.local`:

```env
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

Pattern for adding new providers:

```typescript
// In lib/auth/index.ts
import NewProvider from 'next-auth/providers/new-provider'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // ... existing providers
    NewProvider({
      clientId: process.env.NEW_PROVIDER_CLIENT_ID!,
      clientSecret: process.env.NEW_PROVIDER_CLIENT_SECRET!,
    }),
  ],
})
```

### 5. Email/Magic Link via Resend

Resend integration (already in config above):

```typescript
// In lib/auth/index.ts
import Resend from 'next-auth/providers/resend'

Resend({
  apiKey: process.env.RESEND_API_KEY!,
  from: process.env.EMAIL_FROM!, // e.g., 'noreply@yourdomain.com'
})
```

Environment variables:

```env
RESEND_API_KEY=re_123...
EMAIL_FROM=noreply@yourdomain.com
```

Custom email template (optional):

```typescript
Resend({
  apiKey: process.env.RESEND_API_KEY!,
  from: process.env.EMAIL_FROM!,
  sendVerificationRequest: async ({ identifier: email, url }) => {
    const { host } = new URL(url)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Sign in to ${host}`,
        html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
      }),
    })
  },
})
```

### 6. Session Handling

Database strategy (recommended for SaaS):

```typescript
// In lib/auth/index.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'database', // Enables session revocation
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
})
```

Benefits:
- Session revocation (delete session from DB to log user out)
- Centralized session management
- Better security for SaaS (can track active sessions)

Session callback to include user role and team:

```typescript
// In lib/auth/index.ts
callbacks: {
  async session({ session, user }) {
    if (session.user) {
      session.user.id = user.id

      // Fetch user's team membership
      const teamMember = await prisma.teamMember.findFirst({
        where: { userId: user.id },
        include: { team: true },
        orderBy: { createdAt: 'asc' },
      })

      if (teamMember) {
        session.user.role = teamMember.role
        session.user.teamId = teamMember.teamId
        session.user.teamSlug = teamMember.team.slug
      }
    }
    return session
  },
}
```

### 7. Using Auth in Components

Server components:

```typescript
// app/dashboard/page.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return <div>Welcome {session.user.name}</div>
}
```

Client components:

```typescript
'use client'
import { useSession } from 'next-auth/react'

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Not signed in</div>

  return <div>Signed in as {session.user.email}</div>
}
```

API routes:

```typescript
// app/api/protected/route.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ data: 'Protected data' })
}
```

### 8. Protected Route Patterns

Middleware matcher for protection:

```typescript
// middleware.ts
export const config = {
  matcher: [
    '/dashboard/:path*',      // All dashboard routes
    '/api/protected/:path*',  // Protected API routes
  ],
}
```

Server-side auth checks:

```typescript
// In any server component or API route
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const session = await auth()
if (!session) {
  redirect('/auth/signin')
}
```

### 9. RBAC (Role-Based Access Control)

Roles enum:

```prisma
enum Role {
  OWNER   // Full control, billing access
  ADMIN   // Manage members, settings
  MEMBER  // Basic access
}
```

Auth guards at `lib/auth/guards.ts`:

```typescript
// lib/auth/guards.ts
import { auth } from '@/lib/auth'
import { Role } from '@prisma/client'

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth()

  if (!session.user.role || !allowedRoles.includes(session.user.role)) {
    throw new Error('Forbidden')
  }

  return session
}

export async function requireOwner() {
  return requireRole([Role.OWNER])
}

export async function requireAdmin() {
  return requireRole([Role.OWNER, Role.ADMIN])
}
```

Usage:

```typescript
// app/dashboard/settings/page.tsx
import { requireAdmin } from '@/lib/auth/guards'

export default async function SettingsPage() {
  const session = await requireAdmin() // Throws if not OWNER or ADMIN

  return <div>Admin settings</div>
}
```

```typescript
// app/api/billing/route.ts
import { requireOwner } from '@/lib/auth/guards'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await requireOwner()
    // Only OWNER can modify billing
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}
```

### 10. Auth UI

Sign-in page with OAuth buttons:

```typescript
// app/auth/signin/page.tsx
import { signIn } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Sign In</h1>

        <form
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: '/dashboard' })
          }}
        >
          <Button type="submit" className="w-full">
            Sign in with Google
          </Button>
        </form>

        <form
          action={async () => {
            'use server'
            await signIn('github', { redirectTo: '/dashboard' })
          }}
        >
          <Button type="submit" variant="outline" className="w-full">
            Sign in with GitHub
          </Button>
        </form>

        <form
          action={async (formData: FormData) => {
            'use server'
            const email = formData.get('email') as string
            await signIn('resend', { email, redirectTo: '/dashboard' })
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded border px-3 py-2"
            required
          />
          <Button type="submit" variant="secondary" className="mt-2 w-full">
            Sign in with Email
          </Button>
        </form>
      </div>
    </div>
  )
}
```

Sign-up with team creation:

```typescript
// app/api/auth/signup/route.ts
import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, teamName } = await req.json()

    // Create user and team in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: { email },
      })

      // Create team
      const team = await tx.team.create({
        data: {
          name: teamName,
          slug: teamName.toLowerCase().replace(/\s+/g, '-'),
        },
      })

      // Add user as OWNER
      await tx.teamMember.create({
        data: {
          userId: user.id,
          teamId: team.id,
          role: 'OWNER',
        },
      })

      return { user, team }
    })

    // Sign in the new user
    await signIn('resend', { email, redirectTo: '/dashboard' })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
```

## Outputs

- Fully configured NextAuth v5 with Prisma adapter
- OAuth providers (Google, GitHub) and email/magic link auth
- Database session strategy with revocation support
- Protected routes via middleware and server-side checks
- Role-based access control (OWNER, ADMIN, MEMBER)
- Auth UI components for sign-in and sign-up

## Tools Used

- `lib/auth/index.ts` — NextAuth configuration and exports
- `lib/auth/guards.ts` — Role-based auth guards
- `lib/db/prisma.ts` — Prisma client for session storage
- `middleware.ts` — Route protection middleware
- `app/api/auth/[...nextauth]/route.ts` — NextAuth route handler

## Error Handling

| Error | Recovery |
|-------|----------|
| OAuth provider fails | Show error page with retry option, log error |
| Email delivery fails | Show generic success message (don't leak email existence) |
| Session expired | Redirect to sign-in page with return URL |
| Unauthorized access | Return 401, redirect to sign-in |
| Forbidden access (role) | Return 403, show error message |
| Database connection fails | Show error page, retry with exponential backoff |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
