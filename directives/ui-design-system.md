# Directive: UI Design System

## Purpose

Define the visual aesthetic, component patterns, and layout conventions for all UI work. This is the single source of truth for styling decisions. All colors, typography, and component patterns are implemented via Tailwind CSS utilities mapped through `tailwind.config.ts`.

## Trigger

- [x] Manual (when building or modifying UI components, pages, or layouts)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| UI type | string | Yes | What kind of interface: landing page, dashboard, form, settings, data view |
| Content requirements | string | Yes | What the page needs to display or collect |

## Steps

1. **Read this directive fully** before writing any UI markup
2. **Verify `tailwind.config.ts`** has the custom theme tokens (colors, fonts, shadows, animations)
3. **Pick a layout pattern** from the Layout Patterns section:
   - Marketing page or form → Centered Container
   - Dashboard with cards/stats → Dashboard Grid
   - Sidebar navigation + content → Split View
4. **Compose with core components** using the Tailwind utility patterns below
5. **Add interaction polish** — hover states, focus-visible outlines, transitions
6. **Verify accessibility** — run through the Accessibility Checklist
7. **Test responsiveness** — check at mobile (`sm:`), tablet (`md:`), and desktop (`lg:`)

## Design Principles

1. **Minimalist First**: Remove visual noise. Use whitespace generously.
2. **Warm & Approachable**: Purple accents convey creativity and trust without being cold.
3. **Responsive Feedback**: Every interaction provides smooth visual feedback.
4. **Accessibility Built-In**: Focus states, reduced motion support, semantic HTML.
5. **Progressive Enhancement**: Start with clean, functional layouts; add polish through Tailwind utilities.

## Color System

All colors are defined in `tailwind.config.ts` under `theme.extend.colors`. Use Tailwind classes, not raw hex values.

| Element | Tailwind Classes | Usage |
|---------|-----------------|-------|
| **Primary Actions** | `bg-primary text-white` | Buttons, links, CTAs |
| **Primary Hover** | `hover:bg-primary-dark` | Darkened purple on hover |
| **Subtle Tint** | `bg-primary-light` | Hover backgrounds, selected states |
| **Medium Tint** | `bg-primary-medium` | Active nav items, icon button backgrounds |
| **Body Text** | `text-primary` | Main content text |
| **Secondary Text** | `text-secondary` | Subtitles, timestamps, helper text |
| **Muted Text** | `text-muted` | Placeholders, disabled states |
| **Page Background** | `bg-surface-muted` | Page-level backgrounds |
| **Card Background** | `bg-surface` or `bg-white` | Cards, panels, modals |
| **Borders** | `border-light` | Dividers, card borders |
| **Success** | `bg-success-light text-success` | Success badges/alerts |
| **Warning** | `bg-warning-light text-warning` | Warning badges/alerts |
| **Error** | `bg-error-light text-error` | Error badges/alerts |

## Typography System

### Font Loading

Load Inter via `next/font/google` in the root layout:

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### Typography Scale

| Element | Tailwind Classes | Usage |
|---------|-----------------|-------|
| **H1** | `text-3xl font-semibold` | Page titles |
| **H2** | `text-2xl font-semibold` | Section headers |
| **H3** | `text-xl font-semibold` | Subsections |
| **Body** | `text-base` | Default text (16px) |
| **Small** | `text-sm` | Labels, metadata (14px) |
| **Tiny** | `text-xs` | Timestamps, captions (12px) |

Use `font-serif` (Georgia) for logos, marketing headings, or decorative elements to add warmth.

## Core UI Components

### Buttons

**Primary Button:**
```tsx
<button className="bg-primary text-white rounded-card px-6 py-3 font-medium
  hover:bg-primary-dark hover:-translate-y-px hover:shadow-medium
  active:translate-y-0 transition-all duration-fast
  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
  Get Started
</button>
```

**Secondary Button:**
```tsx
<button className="bg-primary-light text-primary rounded-card px-6 py-3 font-medium
  border-2 border-transparent hover:bg-primary-medium hover:border-primary
  transition-all duration-fast
  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
  Learn More
</button>
```

**Icon Button:**
```tsx
<button className="w-11 h-11 rounded-full bg-primary-medium text-primary
  flex items-center justify-center
  hover:bg-primary hover:text-white hover:scale-105
  active:scale-95 transition-all duration-fast
  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
  aria-label="Settings">
  <SettingsIcon className="w-5 h-5" />
</button>
```

### Cards

**Standard Card:**
```tsx
<div className="bg-white border-2 border-light rounded-card p-5
  hover:border-primary hover:bg-primary-light hover:-translate-y-0.5
  hover:shadow-medium transition-all duration-fast">
  {/* Card content */}
</div>
```

**Dashboard Card (stat block):**
```tsx
<div className="bg-white rounded-dashboard p-6 shadow-soft">
  <h3 className="text-xl font-semibold mb-4 text-primary">Active Users</h3>
  <p className="text-3xl font-semibold text-primary mb-4">1,847</p>
  <p className="text-sm text-secondary">+8% vs last week</p>
</div>
```

### Input Fields

**Text Input:**
```tsx
<div className="bg-surface-muted rounded-card px-4 py-3 border-2 border-transparent
  focus-within:border-primary focus-within:ring-4 focus-within:ring-primary-light
  focus-within:bg-white transition-all duration-fast">
  <input
    type="text"
    className="w-full bg-transparent text-primary outline-none placeholder:text-muted"
    placeholder="Enter your email"
  />
</div>
```

**Textarea:**
```tsx
<div className="bg-surface-muted rounded-dashboard px-4 py-3 border-2 border-transparent
  focus-within:border-primary focus-within:ring-4 focus-within:ring-primary-light
  focus-within:bg-white transition-all duration-fast">
  <textarea
    className="w-full bg-transparent text-primary outline-none placeholder:text-muted
      resize-y min-h-[100px] font-sans"
    placeholder="Write your message..."
  />
</div>
```

### Navigation

**Sidebar Nav Link:**
```tsx
<a href="#" className="flex items-center gap-3 px-5 py-3 mx-2 rounded-lg
  text-secondary hover:bg-primary-light hover:text-primary
  transition-all duration-fast
  aria-[current=page]:bg-primary-medium aria-[current=page]:text-primary aria-[current=page]:font-medium">
  <DashboardIcon className="w-5 h-5" />
  Dashboard
</a>
```

### Tables

```tsx
<table className="w-full bg-white rounded-card overflow-hidden shadow-soft">
  <thead className="bg-surface-muted">
    <tr>
      <th className="px-4 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
        Name
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t border-light hover:bg-primary-light transition-colors duration-fast">
      <td className="px-4 py-4 text-primary">Row content</td>
    </tr>
  </tbody>
</table>
```

### Status Badges

```tsx
<span className="inline-block px-3 py-1 rounded-card text-xs font-medium uppercase tracking-wider
  bg-success-light text-success">
  Active
</span>

<span className="inline-block px-3 py-1 rounded-card text-xs font-medium uppercase tracking-wider
  bg-warning-light text-warning">
  Pending
</span>

<span className="inline-block px-3 py-1 rounded-card text-xs font-medium uppercase tracking-wider
  bg-error-light text-error">
  Failed
</span>

<span className="inline-block px-3 py-1 rounded-card text-xs font-medium uppercase tracking-wider
  bg-primary-light text-primary">
  Info
</span>
```

### Loading & Empty States

**Loading Dots:**
```tsx
<div className="flex gap-1.5 p-3">
  <div className="w-2 h-2 rounded-full animate-typing-bounce" />
  <div className="w-2 h-2 rounded-full animate-typing-bounce [animation-delay:0.2s]" />
  <div className="w-2 h-2 rounded-full animate-typing-bounce [animation-delay:0.4s]" />
</div>
```

**Empty State:**
```tsx
<div className="flex flex-col items-center justify-center py-16 px-5 text-center">
  <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-5 text-primary text-3xl">
    <InboxIcon className="w-8 h-8" />
  </div>
  <h3 className="text-xl font-semibold mb-2 text-primary">No items yet</h3>
  <p className="text-secondary max-w-sm">Get started by creating your first item.</p>
</div>
```

## Layout Patterns

### Centered Container (marketing pages, forms)

```tsx
<div className="max-w-3xl mx-auto px-5">
  {/* Content */}
</div>

{/* With card wrapper on desktop */}
<div className="max-w-3xl mx-auto px-5 md:my-5 md:rounded-dashboard md:bg-white md:shadow-soft">
  {/* Content */}
</div>
```

### Dashboard Grid (stats, cards)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {/* Dashboard cards */}
</div>
```

### Split View (sidebar + main content)

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen bg-surface-muted">
  <aside className="hidden lg:block bg-white border-r border-light p-5">
    {/* Sidebar navigation */}
  </aside>
  <main className="p-6 overflow-y-auto">
    {/* Main content */}
  </main>
</div>
```

## Animation & Transitions

- **Hover/active interactions**: `transition-all duration-fast` (150ms)
- **Complex animations**: `transition-all duration-normal` (250ms)
- **Fade-in**: `animate-fade-in` (opacity + translateY, 300ms)
- **Scale-in** (modals): `animate-scale-in` (opacity + scale, 200ms)
- **Hover lift**: `hover:-translate-y-px` or `hover:-translate-y-0.5`
- **Click squish**: `active:scale-95`

### Reduced Motion (mandatory)

Add to `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Breakpoints

Use Tailwind's mobile-first breakpoints:

| Prefix | Min Width | Target |
|--------|-----------|--------|
| *(none)* | 0px | Mobile (default) |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large desktops |

**Pattern**: Design for mobile first, then add `md:` and `lg:` overrides.

## Tailwind Conventions

### Utility Ordering

When writing Tailwind classes, follow this order for readability:

1. Layout (`flex`, `grid`, `block`, `hidden`)
2. Sizing (`w-`, `h-`, `max-w-`, `min-h-`)
3. Spacing (`p-`, `m-`, `gap-`)
4. Typography (`text-`, `font-`, `leading-`, `tracking-`)
5. Color (`bg-`, `text-`, `border-`)
6. Effects (`shadow-`, `opacity-`, `rounded-`)
7. Transitions (`transition-`, `duration-`, `ease-`)
8. States (`hover:`, `focus:`, `active:`, responsive prefixes)

Install `prettier-plugin-tailwindcss` to enforce this automatically.

### When to Extract Components

- If a pattern repeats **3+ times** with identical utility strings, extract to `components/ui/`
- Create the component as a `.tsx` file with typed props
- Use the `cn()` helper from `lib/utils/cn.ts` for conditional class merging

### The `cn()` Helper

```tsx
// lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Usage:
```tsx
<button className={cn(
  "bg-primary text-white rounded-card px-6 py-3",
  disabled && "opacity-50 cursor-not-allowed",
  className
)}>
```

### Avoid `@apply`

Do **not** use `@apply` in component styles. Exceptions:
- Base styles in `globals.css` (e.g., body defaults, prose styles)
- Third-party component overrides that can't use utility classes

### Dark Mode (Future)

The config is prepared for dark mode. When ready, add `darkMode: "class"` to `tailwind.config.ts` and define dark variants.

## Accessibility Checklist

- [ ] All interactive elements have `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`
- [ ] Color contrast ratio >= 4.5:1 for normal text, >= 3:1 for large text
- [ ] `prefers-reduced-motion` media query in `globals.css`
- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`, `<button>`, etc.)
- [ ] `aria-label` on icon-only buttons
- [ ] Keyboard navigation works for all interactive elements
- [ ] Form `<input>` elements have associated `<label>` elements
- [ ] Images have `alt` text (use `alt=""` for decorative images)

## Outputs

- Tailwind-styled React components using the design system tokens from `tailwind.config.ts`
- Semantic HTML with responsive layouts across mobile, tablet, and desktop
- Accessible interactions with focus states and reduced motion support

## Tools Used

- `tailwind.config.ts` — Custom theme with all design tokens (colors, fonts, shadows, animations)
- `lib/utils/cn.ts` — Class merging utility (clsx + tailwind-merge)

## Error Handling

| Error | Recovery |
|-------|----------|
| Component doesn't match design system | Check this directive for the correct Tailwind pattern, do not improvise colors or spacing |
| Accessibility audit fails | Review the checklist above and fix missing focus states, labels, or contrast |
| Layout breaks on mobile | Check responsive breakpoints — ensure mobile-first approach with `md:` and `lg:` overrides |
| Tailwind class not recognized | Verify the token exists in `tailwind.config.ts` — extend theme if needed |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
