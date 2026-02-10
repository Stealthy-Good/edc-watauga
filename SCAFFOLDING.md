# Scaffolding Checklist

> Step-by-step guide for initializing a new project from this template. Complete these steps **in order** before writing any application code. Skipping steps leads to the kind of drift that's hard to fix later.

## Phase 0: Copy the Template

- [ ] Copy this entire template directory into your new project
- [ ] Initialize git: `git init && git add -A && git commit -m "Initial template"`

## Phase 1: Define the Vision

Before the AI writes a single line of code, the human fills in the blueprint.

- [ ] **Review `PLANNING.md`** — it's pre-filled with SaaS architecture. Customize:
  - [ ] Update the Overview to describe your specific product
  - [ ] Adjust the Data Model if your entities differ
  - [ ] Customize Milestones with your feature priorities
  - [ ] Review Open Questions and resolve any that apply to you
- [ ] **Seed `TODO.md`** — it has default tasks; adjust priorities for your product
- [ ] **Review `CONSTITUTION.md`** — adjust if your project has specific ethical or operational requirements

**Why this comes first:** If `PLANNING.md` is vague, the AI will fill in the gaps with its own assumptions. Those assumptions compound.

## Phase 2: Scaffold the Framework

- [ ] **Create the Next.js app:**
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
  ```
  (Run from project root. Say "yes" to overwrite existing files.)

- [ ] **Copy `.env.example` to `.env.local`** and fill in values:
  ```bash
  cp .env.example .env.local
  ```

- [ ] **Replace the default `tailwind.config.ts`** with the template version (already in the project root — the design system tokens are pre-configured)

- [ ] **Configure TypeScript strict mode** — verify `tsconfig.json` includes:
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

## Phase 3: Install Dependencies

- [ ] **Core dependencies:**
  ```bash
  npm install zod clsx tailwind-merge
  ```

- [ ] **Database (Prisma):**
  ```bash
  npm install prisma @prisma/client
  npx prisma init --datasource-provider postgresql
  ```

- [ ] **Auth (NextAuth v5):**
  ```bash
  npm install next-auth@beta @auth/prisma-adapter
  ```

- [ ] **Dev dependencies (linting + testing):**
  ```bash
  npm install -D @eslint/js typescript-eslint eslint-plugin-tailwindcss @next/eslint-plugin-next
  npm install -D prettier prettier-plugin-tailwindcss
  npm install -D husky lint-staged
  npm install -D vitest @testing-library/react
  npx husky init
  ```

## Phase 4: Configure Core Modules

- [ ] **Create the `cn()` utility** at `lib/utils/cn.ts`:
  ```typescript
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
  ```

- [ ] **Create the logger utility** at `lib/utils/logger.ts` per `directives/debug-and-logging.md`

- [ ] **Create the Prisma client singleton** at `lib/db/client.ts` per `directives/database.md`

- [ ] **Set up the Prisma schema** — copy the base SaaS schema from `directives/database.md` into `prisma/schema.prisma`

- [ ] **Configure NextAuth** at `lib/auth/index.ts` per `directives/auth.md`:
  - Set up Prisma adapter
  - Configure at least one OAuth provider (Google or GitHub)
  - Create route handler at `app/api/auth/[...nextauth]/route.ts`
  - Create middleware at `middleware.ts`

- [ ] **Create ESLint config** (`eslint.config.mjs`) per `directives/coding-standards.md`

- [ ] **Create Prettier config** (`.prettierrc`) per `directives/coding-standards.md`

- [ ] **Set up the root layout** in `app/layout.tsx` with Inter font per `directives/ui-design-system.md`

## Phase 5: Database Setup

- [ ] **Ensure PostgreSQL is running** (local Docker, Supabase, Neon, or Railway)
- [ ] **Run the initial migration:**
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] **Generate the Prisma client:**
  ```bash
  npx prisma generate
  ```
- [ ] **Verify with Prisma Studio** (optional):
  ```bash
  npx prisma studio
  ```

## Phase 6: Set Up Test Infrastructure

Test infrastructure comes before application code.

- [ ] **Create the `tests/specs/` directory** for human-owned spec tests
- [ ] **Write at least one spec test** for the first feature you plan to build
  - Write it based on requirements, not implementation
  - Add the `// HUMAN-OWNED — AI must not edit this file` comment
  - See `directives/testing-policy.md` for the full spec test workflow
- [ ] **Verify tests run** — `npx vitest run` should execute with no errors

**Why specs come first:** If you write the implementation first and tests second, the AI will write tests that match the implementation (including its bugs) rather than testing the actual requirements.

## Phase 7: Identify High-Risk Areas

Before building, identify what's dangerous.

- [ ] **Review `PLANNING.md`** — the High-Risk Functions table is pre-populated with common SaaS entries. Adjust for your specific features.
- [ ] **Decide your review cadence** — how often will you review `HIGH-RISK-UNREVIEWED` items?

## Phase 8: Verify and Start

- [ ] **Verify the toolchain works** — run these and confirm zero errors:
  ```bash
  npx tsc --noEmit
  npx eslint .
  npx prettier --check .
  npx vitest run
  ```

- [ ] **Verify the app starts:**
  ```bash
  npm run dev
  ```

- [ ] **Verify auth works** — visit `http://localhost:3000/api/auth/session`

Now the AI can start working. The first session should follow the flow in `CLAUDE.md` (Session Start Checklist).

## Quick Validation

After completing Phases 0–7, verify the project is ready:

```
✓ PLANNING.md has a customized Overview, Tech Stack, and Milestones
✓ TODO.md has tasks in "Up Next"
✓ tsconfig.json has strict: true
✓ tailwind.config.ts has the design system tokens (primary colors, fonts, shadows)
✓ Prisma schema has base SaaS models (User, Account, Session, Team, etc.)
✓ Prisma generates client without errors: npx prisma generate
✓ NextAuth /api/auth/session endpoint responds
✓ ESLint runs with zero errors: npx eslint .
✓ Prettier runs with zero issues: npx prettier --check .
✓ Pre-commit hooks are installed: git commit --allow-empty -m "test hooks"
✓ Logger exists at lib/utils/logger.ts
✓ cn() helper exists at lib/utils/cn.ts
✓ tests/specs/ directory exists with at least one .spec.ts file
✓ Test suite runs: npx vitest run
✓ High-Risk Functions table exists in PLANNING.md
✓ App starts without errors: npm run dev
```

If any of these fail, fix them before starting AI-assisted development.

## Ongoing Habits

These aren't one-time setup — they're recurring practices:

| Habit | Frequency | Reference |
|-------|-----------|-----------|
| Review `HIGH-RISK-UNREVIEWED` functions | Every session or PR | `directives/ai-review-policy.md` |
| Write spec tests before new features | Before each feature | `directives/testing-policy.md` |
| Check the error log for patterns | Weekly | `directives/error-logging.md` |
| Run the full lint + test suite | Before every commit | `directives/coding-standards.md` |
| Run `npm audit` for vulnerabilities | Before each deploy | `directives/security-policy.md` |
| Update `PLANNING.md` when architecture changes | As needed | `CLAUDE.md` |
| Keep `TODO.md` current | Every session | `CLAUDE.md` |
| Review AI-generated code more carefully than human code | Every PR | `directives/ai-review-policy.md` |
