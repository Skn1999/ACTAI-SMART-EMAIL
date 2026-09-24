# ActAI Design Tokens & Design System Specification

> Extracted directly from [https://actai.company/](https://actai.company/)  
> **Purpose**: Serves as the authoritative visual guardrail and component specification for the **ActAI Delegation Review** MVP prototype ([ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md)).

---

## 1. Brand Philosophy & Aesthetic Identity

ActAI's brand identity communicates **editorial discipline, calm intelligence, and human clarity**:

- **Quiet Confidence over AI Hype**: No decorative purple gradients, no sparkling AI stars, no bubbly chat widgets. The UI treats autonomous agency as serious infrastructure.
- **Editorial Typography**: Generous whitespace, lightweight headings (`font-light`), high contrast, and refined type hierarchy inspired by Swiss and modernist editorial publishing.
- **Tonal Layering**: Instead of heavy drop shadows or bright colors, surfaces use subtle, warm neutral shifts between background (`#fff` / `#0b0b0c`), surfaces (`#efede9` / `#1b1b1f`), panels (`#f2f0ec` / `#1f1f1f`), chips (`#e3dfd9` / `#3a3a3a`), and hair-thin dividing rules (`#e6e4e0` / `#26262a`).
- **Numbered Indexing**: Brand signature index notation (`1.0`, `2.0`, `3.0`, `4.0`) in subdued monospace-proportional style paired with section labels.
- **Bounded Micro-Interactions**: Custom quintic easing curve (`cubic-bezier(.22, .61, .36, 1)`), crisp 180° theme icon rotations, and subtle upward rise animations (`rise` from `translateY(10px)` to `0`).

---

## 2. Core Color Tokens

ActAI utilizes a strict CSS-variable driven color system supporting full dynamic switching between **Light** and **Dark** themes.

### 2.1 CSS Variables & Palette Matrix

| Token Name | Light Theme Hex | Dark Theme Hex | Semantic Role & UI Application |
| :--- | :--- | :--- | :--- |
| `--background` | `#ffffff` | `#0b0b0c` | Canvas / viewport background, main app shell |
| `--foreground` | `#303035` | `#d6d4cf` | Default body text, descriptive copy, paragraphs |
| `--ink-strong` | `#16161a` | `#ffffff` | Headings, active links, primary CTA text, high-emphasis text |
| `--panel` | `#f2f0ec` | `#1f1f1f` | Cards, elevated containers, dropdowns, modal sheets |
| `--surface` | `#efede9` | `#1b1b1f` | Active navigation background, hover states, skeleton loader bg |
| `--chip` | `#e3dfd9` | `#3a3a3a` | Constraint tags, filter pills, metadata badges |
| `--rule` | `#e6e4e0` | `#26262a` | Dividing lines, hairline borders (1px solid), section breaks |
| `--muted` | `#94949b` | `#83838a` | Secondary metadata, index prefixes (`1.0`), timestamps, subtle icons |
| `--logo-invert` | `0` | `1` | Logo SVG filter factor (`[filter:invert(var(--logo-invert))]`) |

### 2.2 Semantic Operational Colors (Prototype Guardrails)

In alignment with ActAI’s minimalist restraint and PRD Section 8, accent colors are **strictly functional**—never used for ambient decoration:

| State | Light Mode Hex | Dark Mode Hex | Usage Rule |
| :--- | :--- | :--- | :--- |
| **Decision Needed (Amber)** | `#b45309` (Amber-700) / `#fef3c7` bg | `#f59e0b` (Amber-500) / `#3b2d14` bg | Used **only** when agent is blocked waiting for user approval |
| **Completed / Healthy (Green)** | `#15803d` (Green-700) / `#dcfce7` bg | `#22c55e` (Green-500) / `#143521` bg | Used **only** for completed tasks or successfully sent items |
| **Active / Focus (Electric Blue)** | `#2563eb` (Blue-600) | `#60a5fa` (Blue-400) | Used sparingly for keyboard focus rings and active primary CTAs |
| **Paused / Neutral** | `--muted` (`#94949b`) | `--muted` (`#83838a`) | Used when task is paused by user or idling |

---

## 3. Typography System

### 3.1 Font Family

- **Primary Font Family**: `Archivo`, `Archivo Fallback`, `Arial`, `Helvetica`, `sans-serif`
  - Variable font weight support: `100` to `900`
  - Google Fonts CDN:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    ```
- **Monospace Font Family**:
  - `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `"Liberation Mono"`, `"Courier New"`, `monospace`
  - Used for timestamps, task IDs, numeric constraint formulas (`≤ €8,000`), code/JSON snippets.

### 3.2 Typography Scale & Style Rules

| Level | Size (rem / px) | Leading | Weight | Tracking | Usage & Sample Classes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `2.6rem` (41.6px) → `3.4rem` (54.4px) | `1.04` | Light (`300`) | `-0.04em` | Landing headlines, hero statements (`leading-[1.04] font-light tracking-[-0.04em] text-balance`) |
| **Page Title (H1)** | `2.0rem` (32px) → `2.5rem` (40px) | `1.16` | Light (`300`) | `-0.03em` | Main screen titles (`Today`, `Delegation Review`) |
| **Section Title (H2)** | `1.5rem` (24px) | `1.3` | Medium (`500`) | `-0.02em` | Task column headers, major panel headers |
| **Card / Task Title (H3)**| `1.2rem` (19.2px) → `1.25rem` (20px) | `1.3` | Medium (`500`) | Normal | Task item titles, card titles (`leading-[1.3] text-ink-strong`) |
| **Body Large** | `1.0625rem` (17px) → `1.125rem` (18px)| `1.65` | Light / Regular (`300`/`400`)| Normal | Narrative descriptions, emails, task summaries (`leading-[1.65]`) |
| **UI Body / Controls** | `1.05rem` (16.8px) | `1.4` | Regular (`400`) | Normal | Navigation links, decision options, dropdown rows |
| **Subhead / Compact UI**| `0.95rem` (15.2px) | `1.4` | Regular / Medium | Normal | Rail nav items, source card titles (`text-[0.95rem]`) |
| **Metadata / Secondary**| `0.85rem` (13.6px) → `0.9rem` (14.4px)| `1.4` | Regular (`400`) | Normal | Timestamps, author names, secondary details (`text-muted`) |
| **Section Overlines** | `0.78rem` (12.5px) | `1.2` | Regular (`400`) | `0.14em` | Spaced uppercase section categories (`text-[0.78rem] tracking-[0.14em] uppercase text-muted`) |
| **Micro / Index Numbers**| `0.78rem` (12.5px) | `1.2` | Regular (`400`) | Normal | Nav prefixes (`1.0`, `2.0`), badge counts (`<span class="tracking-normal">15</span>`) |
| **Tooltips / Mini Badges**| `0.75rem` (12px) | `1.2` | Medium (`500`) | Normal | Tooltip text, floating state indicators |

---

## 4. Spacing, Dimensions & Layout Architecture

### 4.1 Base Spacing Unit
- Base unit: `--spacing: 0.25rem;` (4px)
- Multipliers:
  - `1`: 4px (`gap-1`, `mt-1`)
  - `2`: 8px (`py-2`, `gap-2`)
  - `2.5`: 10px (`py-2.5`, `gap-2.5`)
  - `3.5`: 14px (`gap-3.5`, `px-3.5`)
  - `4`: 16px (`px-4`, `py-4`, `gap-4`)
  - `5`: 20px (`px-5`, `py-5`, `gap-5`)
  - `6`: 24px (`px-6`, `py-6`, `gap-6`)
  - `7`: 28px (`top-7`, `left-7`, `p-7`)
  - `8`: 32px (`px-8`, `gap-8`)
  - `10`: 40px (`py-10`, `gap-10`)
  - `12`: 48px (`py-12`, `space-y-12`)
  - `14`: 56px (`space-y-14`)
  - `16`: 64px (`pt-16`, `mt-16`)
  - `20`: 80px (`mt-20`)
  - `24`: 96px (`pt-24`, `pb-24`)

### 4.2 Breakpoints & Layout Grid

| Breakpoint | CSS Media Query | Width (px) | Application |
| :--- | :--- | :--- | :--- |
| `sm` | `@media (min-width: 40rem)` | 640px | Mobile-to-tablet transition |
| `md` | `@media (min-width: 48rem)` | 768px | Tablet layout adjustments |
| `lg` | `@media (min-width: 64rem)` | 1024px | Minimum desktop frame |
| `rail` | `@media (min-width: 71.25rem)` | **1140px** | **ActAI Brand Rail Breakpoint**: Left navigation rail docks permanently; mobile menu hides |
| `xl` | `@media (min-width: 80rem)` | 1280px | Standard desktop workstation |
| `2xl` | `@media (min-width: 96rem)` | 1536px | Widescreen displays |

### 4.3 MVP Desktop Workspace Dimensions (PRD Aligned)

For the **Delegation Review** prototype:
- **Total Canvas**: Optimized for `1440px × 1024px`, fluid down to `1024px`.
- **Navigation Left Rail**: `w-[200px]`, docked at `fixed top-7 left-7`.
- **Three-Column Delegation Review Workspace**:
  - **Left Column (Tasks List)**: `w-[280px]` shrink-0.
  - **Center Column (Execution Record & Timeline)**: `flex-1 min-w-0 max-w-[680px]` for high-legibility reading.
  - **Right Column (Evidence & Control Drawer)**: `w-[360px]` shrink-0.

---

## 5. Surfaces, Borders, Radii & Shadows

### 5.1 Corner Radii (`border-radius`)

| Class | Computed Size | Used For |
| :--- | :--- | :--- |
| `rounded-[5px]` | 5px | Custom form checkboxes (`size-[18px] rounded-[5px]`) |
| `rounded-md` | `0.375rem` (6px) | Tooltip bubbles (`bg-foreground text-background`) |
| `rounded-lg` | `0.5rem` (8px) | Navigation links, list items, image containers |
| `rounded-xl` | `0.75rem` (12px) | Cards (`bg-panel`), dropdowns, modal dialogs, drawers |
| `rounded-full` | `9999px` | Theme toggle button, constraint chips, status pills, radio buttons |

### 5.2 Borders & Dividers

- **Standard Rule**: `1px solid var(--rule)` (`#e6e4e0` light / `#26262a` dark)
  - Classes: `border border-rule`, `border-t border-rule`, `border-b border-rule`
- **Focus Rings**:
  - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background`

### 5.3 Elevation & Shadows

- Floating Dropdown & Sheets: `shadow-lg` (subtle ambient dispersion with 0 borders or 1px hairline border)

---

## 6. Motion, Animation & Transitions

ActAI features smooth, cinematic easing with strict respect for accessibility preferences:

### 6.1 Timing & Easing Variables

```css
:root {
  --exit: 0.14s;
  --enter: 0.26s;
  --move: 0.42s;
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --default-transition-duration: 0.15s;
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 6.2 Keyframe Animations

```css
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes rise {
  0% { transform: translateY(10px); }
  100% { transform: translateY(0); }
}

@keyframes pulse {
  50% { opacity: 0.5; }
}

/* Page mount transition */
.page-body {
  animation: var(--enter) var(--ease) both fade-in, var(--move) var(--ease) both rise;
}

/* Skeleton loader */
.skeleton {
  background: var(--surface);
  animation: pulse 1.6s var(--ease) infinite;
  border-radius: 4px;
}
```

### 6.3 Reduced Motion Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  .page-body, body {
    animation: none !important;
  }
}
```

---

## 7. Concrete Component Specification & Code Snippets

### 7.1 Logo & Wordmark

The official ActAI logo is an SVG wordmark (`fill="black"`) that dynamically inverts in dark mode via CSS filter:

```tsx
// Assets available at: /assets/act-ai-logo.svg
<img
  src="/assets/act-ai-logo.svg"
  alt="Act AI"
  width={639}
  height={184}
  className="h-7 w-auto [filter:invert(var(--logo-invert))]"
/>
```

### 7.2 Left Rail Navigation Link

Features the distinctive `1.0` index styling:

```tsx
// Active Link
<a
  href="#tasks"
  className="flex items-baseline gap-4 rounded-lg bg-surface px-4 py-2.5 text-[0.95rem] text-ink-strong transition-colors"
>
  <span className="text-[0.78rem] text-muted">1.0</span>
  <span>Delegation</span>
</a>

// Inactive Link
<a
  href="#overview"
  className="flex items-baseline gap-4 rounded-lg px-4 py-2.5 text-[0.95rem] text-foreground transition-colors hover:bg-surface hover:text-ink-strong"
>
  <span className="text-[0.78rem] text-muted">2.0</span>
  <span>Today</span>
</a>
```

### 7.3 Theme Toggle Button

Includes the half-filled circle icon rotating 180° in dark mode:

```tsx
<button
  type="button"
  onClick={toggleTheme}
  aria-label="Switch between light and dark theme"
  className="theme-toggle flex cursor-pointer items-center gap-2.5 rounded-full border border-rule bg-background py-2 pr-3.5 pl-4 text-foreground hover:border-muted"
>
  <span className="text-[0.875rem]">Mode</span>
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    className="theme-icon transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] [html[data-theme='dark']_&]:rotate-180"
  >
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" />
  </svg>
</button>
```

### 7.4 Constraint Tag / Pill Chip

Used for goal constraints (`Budget ≤ €8,000`, `Due Friday`):

```tsx
<span className="inline-block rounded-full bg-chip px-3.5 py-1 text-[0.85rem] font-normal text-ink-strong">
  Budget ≤ €8,000
</span>
```

### 7.5 Section Header with Spaced Uppercase Track

Used for categorizing evidence, task groups, or workflow steps:

```tsx
<h3 className="flex items-center gap-3 text-[0.78rem] tracking-[0.14em] text-muted uppercase">
  Evidence Sources
  <span className="tracking-normal font-normal text-muted">(2)</span>
</h3>
```

### 7.6 Task Card (Delegation Item)

```tsx
// "Needs Decision" (High Attention)
<div className="group cursor-pointer rounded-xl border border-rule bg-panel p-5 transition-colors hover:border-muted">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full bg-amber-500" />
      <span className="text-[0.78rem] font-medium tracking-[0.05em] text-amber-600 uppercase dark:text-amber-400">
        Decision needed
      </span>
    </div>
    <span className="text-[0.85rem] text-muted">10:03</span>
  </div>
  <h4 className="mt-2.5 text-[1.05rem] font-medium leading-[1.3] text-ink-strong">
    Negotiate Nordic Displays quote
  </h4>
  <p className="mt-1 text-[0.875rem] text-muted">
    Vendor offered lower price with later delivery date.
  </p>
</div>

// "Quiet / In Progress" (Low Attention)
<div className="group cursor-pointer rounded-xl border border-transparent bg-background p-5 transition-colors hover:bg-surface">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full bg-muted/60" />
      <span className="text-[0.78rem] text-muted">Monitoring reply</span>
    </div>
    <span className="text-[0.85rem] text-muted">08:45</span>
  </div>
  <h4 className="mt-2.5 text-[1.05rem] text-foreground">
    Confirm catering headcount
  </h4>
</div>
```

### 7.7 Exception Alert Callout ("Changed Condition")

In the center workspace when an obstacle arises:

```tsx
<div className="rounded-xl border border-amber-200/60 bg-panel p-6 dark:border-amber-900/40">
  <div className="flex items-center gap-2.5">
    <span className="size-2 rounded-full bg-amber-500" />
    <span className="text-[0.8rem] font-medium tracking-[0.1em] text-amber-700 uppercase dark:text-amber-400">
      Delivery date changed
    </span>
  </div>
  <h3 className="mt-3 text-[1.2rem] font-light leading-[1.3] text-ink-strong">
    Nordic Displays can meet the budget, but delivery would move 14 days later.
  </h3>
  <p className="mt-2 text-[0.95rem] leading-[1.6] text-foreground">
    This may affect the 15 Oct installation target.
  </p>
  <div className="mt-4 flex items-center justify-between border-t border-rule pt-4 text-[0.85rem] text-muted">
    <span>Status: Waiting for your direction</span>
    <span className="font-medium text-ink-strong">No reply has been sent</span>
  </div>
</div>
```

### 7.8 Evidence Source Card ("What ActAI is using")

Grounded proof supporting the agent’s pause:

```tsx
<div className="rounded-xl border border-rule bg-background p-4 transition-colors hover:border-muted">
  <div className="flex items-center justify-between text-[0.85rem] text-muted">
    <span className="font-medium text-ink-strong">Project Atlas note</span>
    <span>Updated yesterday</span>
  </div>
  <blockquote className="mt-2.5 border-l-2 border-rule pl-3 text-[0.9rem] italic text-foreground">
    “Keep total supplier spend under €8,000.”
  </blockquote>
  <div className="mt-3 flex justify-end">
    <button
      type="button"
      className="cursor-pointer text-[0.85rem] text-muted transition-colors hover:text-ink-strong"
    >
      View source →
    </button>
  </div>
</div>
```

### 7.9 Decision Action Control Button

```tsx
// Primary CTA (Bounded direction)
<button
  type="button"
  className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-ink-strong px-4 py-3.5 text-[0.95rem] font-medium text-background transition-opacity hover:opacity-90 active:scale-[0.99]"
>
  <span>Keep 15 Oct delivery</span>
  <span>→</span>
</button>

// Secondary / Tertiary CTA
<button
  type="button"
  className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-rule bg-background px-4 py-3.5 text-[0.95rem] text-ink-strong transition-colors hover:bg-surface"
>
  <span>Accept 29 Oct delivery</span>
  <span>→</span>
</button>

// Safe Exit / Pause
<button
  type="button"
  className="w-full cursor-pointer text-center text-[0.9rem] text-muted transition-colors hover:text-ink-strong"
>
  Pause task and handle myself
</button>
```

### 7.10 Custom Form Controls (Checkboxes & Radios)

Directly from ActAI production news/filter components:

```tsx
// Custom ActAI Checkbox
<label className="group flex cursor-pointer items-center gap-3.5 text-[1.05rem] text-ink-strong">
  <input type="checkbox" className="sr-only" />
  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-muted group-has-[:checked]:border-ink-strong group-has-[:checked]:bg-ink-strong">
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--background)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </span>
  <span>Only high-certainty sources</span>
</label>

// Custom ActAI Radio
<label className="group flex cursor-pointer items-center gap-3.5 text-[1.05rem] text-ink-strong">
  <input type="radio" name="delivery" className="sr-only" />
  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-muted group-has-[:checked]:border-ink-strong">
    <span className="size-[9px] rounded-full bg-ink-strong opacity-0 group-has-[:checked]:opacity-100" />
  </span>
  <span>Keep original date</span>
</label>
```

---

## 8. Development Implementation Guide for the MVP

### 8.1 Tailwind CSS Configuration Preset (Tailwind v3 & v4 compatible)

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      rail: '1140px', // ActAI custom rail breakpoint
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'ink-strong': 'var(--ink-strong)',
        panel: 'var(--panel)',
        surface: 'var(--surface)',
        chip: 'var(--chip)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'Archivo', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        actai: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        panel: '0.75rem',
      },
    },
  },
};
```

### 8.2 Base CSS Setup (`styles/globals.css`)

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #303035;
  --ink-strong: #16161a;
  --panel: #f2f0ec;
  --chip: #e3dfd9;
  --muted: #94949b;
  --rule: #e6e4e0;
  --surface: #efede9;
  --logo-invert: 0;
  --exit: 0.14s;
  --enter: 0.26s;
  --move: 0.42s;
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  color-scheme: light;
}

:root[data-theme="dark"] {
  --background: #0b0b0c;
  --foreground: #d6d4cf;
  --ink-strong: #ffffff;
  --panel: #1f1f1f;
  --chip: #3a3a3a;
  --muted: #83838a;
  --rule: #26262a;
  --surface: #1b1b1f;
  --logo-invert: 1;
  color-scheme: dark;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-archivo, "Archivo", Arial, sans-serif);
  -webkit-font-smoothing: antialiased;
}

.page-body {
  animation: var(--enter) var(--ease) both fade-in, var(--move) var(--ease) both rise;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rise {
  from { transform: translateY(10px); }
  to { transform: translateY(0); }
}
```

---

## 9. Guardrail Checklist: "Does this look like ActAI?"

Before shipping or demonstrating any screen, verify against this 10-point checklist:

- [ ] **1. Logo**: Uses official `act-ai.svg` with `[filter:invert(var(--logo-invert))]`.
- [ ] **2. Typography**: Headings are `font-light` (`weight: 300`) with tighter letter-spacing (`-0.03em` or `-0.04em`), not generic heavy bold sans.
- [ ] **3. Brand Rail**: Section navigation features `1.0`, `2.0` muted numerical indexes.
- [ ] **4. Warm Neutrality**: Backgrounds are `#ffffff` and `#f2f0ec` (light) or `#0b0b0c` and `#1f1f1f` (dark). No sterile bright cyan or blue backdrops.
- [ ] **5. Hairline Rules**: Containers separated with `1px solid var(--rule)` (`#e6e4e0` / `#26262a`) rather than heavy drop shadows.
- [ ] **6. Status Color Discipline**: Amber is used solely for the vendor delivery date change / approval blocker; green solely for completed events.
- [ ] **7. No AI Stereotypes**: Zero robot icons, sparkle glyphs (`✨`), glowing borders, or conversational chat bubbles.
- [ ] **8. Evidence Grounding**: Every agent claim shows a source pill or citation link.
- [ ] **9. Smooth Motion**: Modals and tabs animate with `var(--ease)` (`cubic-bezier(.22, .61, .36, 1)`).
- [ ] **10. Accessible Dark Mode**: Full support for `[data-theme='dark']` with theme toggle persistent via `localStorage`.
