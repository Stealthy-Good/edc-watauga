# Directive: Database

## Purpose

Prisma schema conventions, migrations, seeding, and connection management for the SaaS application database.

## Trigger

- [x] Manual (when building or modifying database schema)
- [ ] Scheduled
- [x] On event (before running migrations or modifying data models)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model_name | string | Yes | Entity name in PascalCase (e.g., `User`, `Team`) |
| migration_name | string | Yes | Descriptive migration name (e.g., `add-user-roles`) |
| environment | 'dev' \| 'production' | Yes | Target environment for migration |

## Steps

### 1. Schema Conventions

Follow these conventions in `prisma/schema.prisma`:

```prisma
// Model naming: PascalCase
model User {
  // Field naming: camelCase
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  accounts  Account[]
  sessions  Session[]
  teamMembers TeamMember[]

  // Map to snake_case table name
  @@map("users")
}

// Always include:
// - id (primary key)
// - createdAt
// - updatedAt
// - @@map for snake_case tables
// - Index foreign keys for performance
model TeamMember {
  id        String   @id @default(cuid())
  userId    String
  teamId    String
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@unique([userId, teamId])
  @@index([userId])
  @@index([teamId])
  @@map("team_members")
}
```

### 2. Prisma Client Singleton Pattern

Create singleton at `lib/db/prisma.ts` with global dev cache:

```typescript
// lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

Usage:

```typescript
import { prisma } from '@/lib/db/prisma'

// In any server component or API route
const users = await prisma.user.findMany()
```

### 3. Query Function Organization

One file per entity in `lib/db/`:

```
lib/db/
├── prisma.ts          # Prisma client singleton
├── users.ts           # User queries
├── teams.ts           # Team queries
├── subscriptions.ts   # Subscription queries
└── invoices.ts        # Invoice queries
```

Example structure:

```typescript
// lib/db/users.ts
import { prisma } from './prisma'
import { Prisma } from '@prisma/client'

// Select only what you need
const userSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
} satisfies Prisma.UserSelect

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  })
}

export async function getUserWithTeams(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      ...userSelect,
      teamMembers: {
        include: {
          team: true,
        },
      },
    },
  })
}

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
    select: userSelect,
  })
}
```

### 4. Always Use Select or Include Explicitly

Never return full models to the client:

```typescript
// BAD — Returns all fields including sensitive data
const user = await prisma.user.findUnique({ where: { id } })

// GOOD — Explicitly select fields
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    name: true,
  },
})

// GOOD — Use include for relations
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
  },
  include: {
    teams: true,
  },
})
```

### 5. Migration Workflow

Development migrations:

```bash
# Create and apply migration
npx prisma migrate dev --name descriptive-name

# Example
npx prisma migrate dev --name add-user-roles
npx prisma migrate dev --name add-team-billing
```

Production migrations:

```bash
# Deploy pending migrations (CI/CD)
npx prisma migrate deploy
```

Reset database (dev only):

```bash
npx prisma migrate reset
```

### 6. Seeding

Create idempotent seed script at `prisma/seed.ts`:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Use upsert for idempotency
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
    },
  })

  // Seed plans
  const plans = [
    { id: 'free', name: 'Free', price: 0 },
    { id: 'pro', name: 'Pro', price: 2900 },
    { id: 'enterprise', name: 'Enterprise', price: 9900 },
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan.id },
      update: { price: plan.price },
      create: plan,
    })
  }

  console.log('Seeding complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run with:

```bash
npx prisma db seed
```

### 7. Connection Pooling for Serverless

For serverless environments (Vercel, AWS Lambda), use connection pooling:

Option 1: Prisma Accelerate (recommended)

```typescript
// lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

export const prisma = new PrismaClient().$extends(withAccelerate())
```

Option 2: PgBouncer (self-hosted)

Update `DATABASE_URL` to point to PgBouncer:

```env
DATABASE_URL="postgresql://user:password@pgbouncer:6432/db"
DIRECT_URL="postgresql://user:password@postgres:5432/db"
```

Update `schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 8. Base SaaS Schema Template

Standard schema for multi-tenant SaaS:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts     Account[]
  sessions     Session[]
  teamMembers  TeamMember[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}

model Team {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members       TeamMember[]
  subscriptions Subscription[]

  @@map("teams")
}

model TeamMember {
  id        String   @id @default(cuid())
  userId    String
  teamId    String
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@unique([userId, teamId])
  @@index([userId])
  @@index([teamId])
  @@map("team_members")
}

enum Role {
  OWNER
  ADMIN
  MEMBER
}

model Subscription {
  id                 String    @id @default(cuid())
  teamId             String
  stripeCustomerId   String    @unique
  stripeSubscriptionId String? @unique
  stripePriceId      String?
  status             String
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  cancelAtPeriodEnd  Boolean   @default(false)
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  team     Team      @relation(fields: [teamId], references: [id], onDelete: Cascade)
  invoices Invoice[]

  @@index([teamId])
  @@map("subscriptions")
}

model Invoice {
  id             String   @id @default(cuid())
  subscriptionId String
  stripeInvoiceId String  @unique
  amountPaid     Int
  status         String
  invoicePdf     String?
  createdAt      DateTime @default(now())

  subscription Subscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)

  @@index([subscriptionId])
  @@map("invoices")
}
```

## Outputs

- Properly structured Prisma schema following conventions
- Type-safe query functions organized by entity
- Migration files for schema changes
- Seed data for development and testing
- Singleton Prisma client with connection pooling

## Tools Used

- `lib/db/prisma.ts` — Prisma client singleton
- `lib/db/users.ts` — User query functions
- `lib/db/teams.ts` — Team query functions
- `lib/db/subscriptions.ts` — Subscription query functions
- `lib/db/invoices.ts` — Invoice query functions
- `prisma/seed.ts` — Database seeding script

## Error Handling

| Error | Recovery |
|-------|----------|
| Connection pool exhausted | Prisma handles retries; use connection pooling (Accelerate or PgBouncer) |
| Unique constraint violation | Catch and return user-friendly error (e.g., "Email already exists") |
| Migration conflict | Review migration files, reset dev DB if needed, never reset production |
| Seed script fails | Check for duplicate unique values, ensure upsert logic is correct |
| Query timeout | Add indexes to foreign keys and frequently queried fields |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
