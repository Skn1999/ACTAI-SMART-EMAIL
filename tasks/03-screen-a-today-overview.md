# Task 03: Screen A — "Today" Agent Overview

## 1. Objective
Build the application shell with ActAI’s fixed left navigation rail and implement Screen A: the **Today** overview screen, establishing a calm, clear view of the agent’s current queue without turning the interface into a chaotic email inbox.

## 2. Dependencies
- Task 01: Project scaffolding & design tokens
- Task 02: Mock domain models & workflow hook
- [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md) (Section 7.2)
- [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) (Section 6, Screen A)

## 3. Implementation Steps
1. **Left Navigation Rail (`AppRail`)**:
   - Fixed rail positioned at `fixed top-7 left-7 z-10 hidden rail:block w-[200px]`.
   - ActAI logo at the top with link to `/` or Home.
   - Navigation links with numbered indexes (`text-[0.78rem] text-muted`):
     - `1.0 Delegation` (navigates to Delegation Review workspace)
     - `2.0 Today` (active or navigates to Today Overview)
     - `3.0 Activity` (audit trail / history)
   - Active state styling: `bg-surface text-ink-strong rounded-lg px-4 py-2.5`.
   - Inactive hover state: `hover:bg-surface transition-colors`.
   - Bottom-left pinned `ThemeToggle` (`fixed bottom-7 left-7`).
   - Bottom-right footer metadata: `ActAI LLC · Delegation Review`.
   - Mobile responsive menu fallback for `< 1140px` (`rail:hidden`).
2. **Screen A Header & Agent Identity**:
   - Greeting: `Good morning, Sumit` in `text-[2rem] sm:text-[2.5rem] font-light leading-[1.16] tracking-[-0.03em]`.
   - Subhead: `2 tasks in progress · 1 needs you` in `text-[1.0625rem] text-muted mt-2`.
   - **ActAI Agent Persona Avatar (`BotAvatar`)**:
     - Embed `BotAvatar` (`type="mech"` or `"clover"`, size 48–64) in the agent status header with subtle idle/working state reflecting active background queue tasks. Gives an instant tactile, living-agent identity aligned with modern AI design.
3. **Primary "Needs Your Decision" Card**:
   - Styled with `bg-panel rounded-xl border border-rule p-6 sm:p-8 hover:border-muted transition-colors`.
   - Amber status pill: `Decision needed · 10:03`.
   - Title: `Negotiate Nordic Displays quote`.
   - Plain English summary: *"Vendor offered lower price with later delivery date. Waiting for your direction before responding."*
   - Clear CTA button: `Review task →` (clicks straight into Screen B).
4. **Quiet Background Tasks Section**:
   - Section overline: `text-[0.78rem] tracking-[0.14em] uppercase text-muted` (`ACTIVE WORKFLOWS (2)`).
   - Minimalist list cards for:
     - `Confirm catering headcount` — status `Monitoring reply`, updated `08:45`.
     - `Collect travel receipts` — status `In progress`, updated `09:30`.
   - Shows outcome, status, next event, and last update (no arbitrary score).

## 4. Files to Create / Modify
- `src/components/layout/AppRail.tsx`
- `src/components/layout/AppLayout.tsx`
- `src/components/screens/TodayScreen.tsx`
- `src/components/tasks/AttentionTaskCard.tsx`
- `src/components/tasks/QuietTaskCard.tsx`

## 5. Verification & Test Criteria
- [ ] Left rail renders cleanly at desktop widths (`>= 1140px`) with the ActAI logo and `1.0`, `2.0` index prefixes.
- [ ] Screen A displays the personalized greeting and task queue count.
- [ ] The "Needs your decision" card is immediately legible, distinct from the quiet tasks, and visually prominent.
- [ ] Quiet tasks display plain status and last update without demanding undue attention.
- [ ] Clicking `Review task →` or the primary card navigates into the Delegation Review screen (Screen B).
- [ ] Resizing below `1140px` triggers the mobile responsive navigation gracefully.
