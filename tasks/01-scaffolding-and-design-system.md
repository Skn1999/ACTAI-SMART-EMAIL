# Task 01: Project Scaffolding & Design System Foundation

## 1. Objective
Initialize the React + TypeScript + Vite project, configure Tailwind CSS with ActAI's exact design tokens (colors, typography, radii, transitions, breakpoints), set up theme persistence (Light/Dark mode), and build the foundational UI primitive components.

## 2. Dependencies
- Node.js & npm (already verified)
- [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md)
- Official SVGs in [`assets/`](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/assets)
- Libraries.dev skill packages: `thinking-orbs` (v0.3.2), `bot-avatars` (v0.1.1)

## 3. Implementation Steps
1. **Initialize Vite + React + TypeScript App**:
   - Create project structure inside the repository root.
   - Install dependencies: React 18/19, Lucide icons, `thinking-orbs`, `bot-avatars`.
   - Configure `tsconfig.json` with strict type checking and clean path aliases (`@/*`).
2. **Install & Configure Tailwind CSS**:
   - Set up `@import "tailwindcss";` or `tailwind.config.js` with ActAI tokens:
     - Color CSS variables: `--background`, `--foreground`, `--ink-strong`, `--panel`, `--chip`, `--muted`, `--rule`, `--surface`, `--logo-invert`.
     - Custom breakpoint: `rail: 1140px`.
     - Font family: `Archivo`, fallback `Arial, Helvetica, sans-serif`, and system mono.
     - Easing curve: `cubic-bezier(.22, .61, .36, 1)`.
     - Radii: `rounded-[5px]`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`.
3. **Configure Google Font (`Archivo`)**:
   - Embed Archivo weights 100–900 in `index.html`.
4. **Theme Management**:
   - Implement `useTheme` hook with `localStorage` persistence and fallback to system preference.
   - Toggle `data-theme="dark"` or `"light"` on `document.documentElement`.
5. **Foundational Components**:
   - `Logo`: ActAI SVG wordmark with dynamic dark-mode filter `[filter:invert(var(--logo-invert))]`.
   - `ThemeToggle`: Rotating half-circle SVG button with `.theme-toggle` and `.theme-icon` transition.
   - `Badge` / `Chip`: Pill component with `rounded-full bg-chip text-ink-strong`.
   - `Button`: Primary (`bg-ink-strong text-background`), Secondary (`border border-rule bg-background text-ink-strong`), and Ghost/Link variants.
   - `Skeleton`: Pulsing loader with `bg-surface` and `1.6s var(--ease) infinite` pulse animation.

## 4. Files to Create / Modify
- `package.json`, `vite.config.ts`, `tsconfig.json`
- `index.html` (font link, title, favicon, initial theme script)
- `src/index.css` (custom properties, keyframes, utilities)
- `src/types/theme.ts`
- `src/hooks/useTheme.ts`
- `src/components/ui/Logo.tsx`
- `src/components/ui/ThemeToggle.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Skeleton.tsx`
- `src/App.tsx` (foundational showcase)

## 5. Verification & Test Criteria
- [ ] `npm run dev` starts without errors or warnings.
- [ ] `Archivo` font loads and renders for all headings and body text.
- [ ] Theme toggle switches seamlessly between Light (`#ffffff` / `#16161a`) and Dark (`#0b0b0c` / `#ffffff`) modes without layout shifts.
- [ ] Page reload preserves the active theme selection from `localStorage`.
- [ ] ActAI logo properly inverts to white in dark mode.
- [ ] Foundational UI elements (buttons, chips, skeletons) match the exact styles from `ACTAI_DESIGN_SYSTEM_TOKENS.md`.
