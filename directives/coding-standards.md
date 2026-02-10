# Directive: Coding Standards

## Purpose

Patterns and conventions for writing code in this project. Read this when building new features or reviewing code.

## Trigger

- [x] Manual (when building or reviewing code)

## File Organization

**Target directory structure** (create these directories as you scaffold the project):

```
├── CLAUDE.md              # Agent instructions (core architecture)
├── PLANNING.md            # Overall build structure and architecture decisions
├── TODO.md                # Active task tracking
├── CONSTITUTION.md        # Core principles governing agent behavior
├── tsconfig.json          # TypeScript config (strict mode)
├── eslint.config.mjs      # ESLint flat config
├── .prettierrc            # Prettier formatting rules
├── app/                   # Next.js App Router pages and layouts
│   ├── api/              # API route handlers
│   ├── (routes)/         # Page routes
│   └── layout.tsx        # Root layout
├── tailwind.config.ts     # Tailwind theme (design tokens)
├── components/           # React components
│   ├── ui/              # Reusable UI primitives (Tailwind-styled)
│   └── features/        # Feature-specific components
├── lib/                  # Execution layer (deterministic TypeScript)
│   ├── _registry.md     # Index of all lib modules
│   ├── auth/            # NextAuth configuration and guards
│   ├── api/             # External API clients (Stripe, Resend, etc.)
│   ├── db/              # Prisma client and query functions
│   └── utils/           # Helper functions (logger, cn, analytics, env)
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Prisma schema (source of truth for DB)
│   ├── migrations/      # Migration history
│   └── seed.ts          # Development seed data
├── tests/
│   └── specs/           # Human-owned spec tests (AI cannot edit)
├── directives/          # SOPs in Markdown (instruction set)
├── types/               # TypeScript type definitions (create as needed)
├── .env.local          # Environment variables (gitignored)
└── .tmp/               # Intermediate files (gitignored, regeneratable)
```

### Deliverables vs Intermediates

- **Deliverables**: The deployed application (e.g., Next.js on Vercel)
- **Intermediates**: Temporary files needed during processing, live in `.tmp/`

Local files in `.tmp/` are only for processing and can be deleted and regenerated.

## Component Patterns

**Structure components by concern:**
- `components/ui/` — Reusable primitives (Button, Input, Card, Modal). No business logic. Props-driven.
- `components/features/` — Feature-specific components that compose UI primitives. May contain hooks and business logic.

**Component guidelines:**
- One component per file, named export matching filename
- Co-locate component-specific hooks, types, and utilities
- Use composition over configuration — prefer children and render props over complex prop APIs
- Keep components pure when possible; lift state to the nearest common ancestor

**Example structure:**
```
components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
└── features/
    └── user-profile/
        ├── user-profile.tsx
        ├── user-avatar.tsx
        └── use-user-data.ts
```

## Tailwind Conventions

> For the full design system (colors, components, layout patterns), see `directives/ui-design-system.md`.

**Utility ordering** — for readability, order classes as:
1. Layout (`flex`, `grid`, `block`, `hidden`)
2. Sizing (`w-`, `h-`, `max-w-`)
3. Spacing (`p-`, `m-`, `gap-`)
4. Typography (`text-`, `font-`, `leading-`)
5. Color (`bg-`, `text-`, `border-`)
6. Effects (`shadow-`, `opacity-`, `rounded-`)
7. Transitions and states (`transition-`, `hover:`, `focus:`)

Install `prettier-plugin-tailwindcss` to enforce automatically.

**When to extract components:**
- If a Tailwind pattern repeats 3+ times identically, extract to `components/ui/`
- Use the `cn()` helper from `lib/utils/cn.ts` for conditional class merging:
  ```typescript
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
  ```

**Avoid `@apply`** — use direct utility classes. Allow `@apply` only in `globals.css` for base styles or third-party overrides.

## Prisma Conventions

> For full database patterns (schema template, migrations, seeding), see `directives/database.md`.

**Schema naming:**
- PascalCase model names, camelCase fields
- Always include `id`, `createdAt`, `updatedAt` on every model
- Use `@@map("table_name")` for snake_case table names if needed
- Always index foreign keys and frequently queried fields

**Client singleton** — use the global cache pattern in `lib/db/client.ts`:
```typescript
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Query organization:**
- One file per entity in `lib/db/` (e.g., `users.ts`, `teams.ts`, `subscriptions.ts`)
- Always use `select` or `include` explicitly — never return full models to the client
- Business logic stays in `lib/`, not in Prisma query files

**Migrations:**
- Development: `npx prisma migrate dev --name descriptive-name`
- Production: `npx prisma migrate deploy` (see `directives/deployment.md`)

## API Route Patterns

**Next.js App Router API conventions:**
- API routes live in `app/api/[route]/route.ts`
- Export named functions for HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- Use Zod for request validation
- Return typed `NextResponse` objects

**Keep routes thin:**
- Routes should validate input, call `lib/` functions, and return responses
- Business logic lives in `lib/`, not in route handlers
- This makes logic testable and reusable

**Example pattern:**
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getUsers, createUser } from '@/lib/api/users'
import { CreateUserSchema } from '@/types/user'

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = CreateUserSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const user = await createUser(parsed.data)
  return NextResponse.json(user, { status: 201 })
}
```

## Testing Guidance

> **Ownership rules**: For test ownership (who can edit which tests) and the spec vs. implementation test split, see `directives/testing-policy.md`.

**Philosophy:** Test behavior, not implementation. Tests should give confidence that the system works, not lock in how it works.

**What to test:**
- `lib/` functions — Unit tests for business logic and utilities
- API routes — Integration tests for request/response cycles
- Critical user flows — E2E tests for high-value paths

**Testing stack:**
- **Unit/Integration**: Vitest or Jest with React Testing Library
- **E2E**: Playwright for critical user journeys
- **API**: Supertest or built-in fetch for route testing

**Test file conventions:**
- Co-locate unit tests: `lib/utils/format.ts` → `lib/utils/format.test.ts`
- E2E tests in `e2e/` or `tests/` at project root
- Name tests descriptively: `it('returns 400 when email is invalid')`

**When to write tests:**
- New `lib/` functions should have tests before merging
- Bug fixes should include a regression test
- E2E tests for any flow involving money, auth, or data mutation

## Linting & Formatting

Linting and formatting must be configured **before any application code is written**. These tools catch style issues and simple bugs automatically for both human- and AI-generated code.

### Required Tooling

Set up all three during project scaffolding:

| Tool | Purpose | Config File |
|------|---------|-------------|
| **TypeScript** (strict mode) | Type safety, catch errors at compile time | `tsconfig.json` |
| **ESLint** | Code quality rules, catch bugs and anti-patterns | `eslint.config.mjs` |
| **Prettier** | Consistent formatting (tabs/spaces, quotes, semicolons) | `.prettierrc` |

### TypeScript — Strict Mode

Always enable strict mode. This catches nullability bugs, implicit `any` types, and other issues that are especially common in AI-generated code.

Key `tsconfig.json` settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

These are the minimum strict settings. The rest of `tsconfig.json` depends on the framework (Next.js generates its own).

### ESLint

Use the flat config format (`eslint.config.mjs`). At minimum, include:

- `@eslint/js` recommended rules
- `typescript-eslint` strict rules
- `no-console` as a warning (use the logger from `directives/debug-and-logging.md` instead)
- Framework-specific plugin if applicable (e.g., `eslint-plugin-react`, `eslint-plugin-next`)

```javascript
// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import tailwindPlugin from "eslint-plugin-tailwindcss";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tailwindPlugin.configs["flat/recommended"],
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "no-console": "warn",
      "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
      "complexity": ["warn", { max: 10 }],
    },
  }
);
```

### Prettier

Keep Prettier config minimal — the defaults are good. Only override what the team has a strong opinion on.

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Enforcement

Linting and formatting are not optional. They must be enforced, not just available.

- **On save**: Configure editor to format on save (add to `.vscode/settings.json` if using VS Code)
- **Pre-commit**: Use a pre-commit hook (e.g., `lint-staged` + `husky`) to run Prettier and ESLint on staged files
- **CI**: Run `eslint --max-warnings=0` and `prettier --check .` in CI so nothing merges without passing

### Agent Rules

- The AI must not disable linter rules inline (`// eslint-disable`) without explaining why in a comment
- If the AI generates code that fails linting, it must fix the lint errors, not suppress them
- The AI must use `logger.*` from `lib/utils/logger.ts` instead of `console.log` (enforced by the `no-console` rule)
- Prefer splitting over nesting. If a function needs a comment to explain a section, that section should be its own function.
- If the `max-lines-per-function` or `complexity` warning fires, refactor the function into smaller pieces rather than suppressing the rule

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Format: - YYYY-MM-DD: What was learned
-->
