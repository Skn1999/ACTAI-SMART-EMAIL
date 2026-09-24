# Task 04: Screen B — Delegation Review Workspace & Execution Record

## 1. Objective
Implement the main prototype screen (Screen B: Delegation Review) featuring the three-column desktop workspace (`280px` task queue, `flex-1` outcome & central execution record, `360px` right panel) with the grounded chronological timeline and prominent exception card.

## 2. Dependencies
- Task 01: Design tokens & typography
- Task 02: Workflow state & mock data
- Task 03: App layout & navigation
- [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md) (Sections 4.3, 7.6, 7.7)
- [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) (Section 6, Screen B)

## 3. Implementation Steps
1. **Three-Column Grid Layout**:
   - Container: desktop layout fitting within standard `1440px` workspace frame, responsive down to `1024px`.
   - **Column 1 (Left, 280px)**: Compact task selector list.
   - **Column 2 (Center, flex-1, max-w-[680px])**: Outcome, exception card, vertical execution timeline.
   - **Column 3 (Right, 360px)**: Evidence sources and bounded decision controls.
2. **Column 1: Task Queue List (`TaskListColumn`)**:
   - Header with section overline: `TASKS (3)` in `text-[0.78rem] tracking-[0.14em] uppercase text-muted`.
   - Task items showing title, status dot, and current state:
     - Selected item: `Negotiate Nordic Displays quote` with amber dot and active background (`bg-surface`).
     - Inactive items: `Confirm catering headcount` and `Collect travel receipts`.
   - Accessible keyboard selection and focus rings.
3. **Column 2: Delegated Outcome Header & Constraint Chips**:
   - Breadcrumb/back control to `Today`.
   - Task Title: `Negotiate Nordic Displays quote` in `text-[1.8rem] sm:text-[2.2rem] font-light leading-[1.2] tracking-[-0.03em]`.
   - Delegated Goal Card:
     - Outcome: *"Secure a revised quote under €8,000 and schedule review with Maya before Friday."*
     - Constraint Chips row:
       - `Budget ≤ €8,000`
       - `Do not confirm delivery changes without me`
       - `Due Friday`
       - Styled as `rounded-full bg-chip px-3.5 py-1 text-[0.85rem] text-ink-strong`.
4. **Column 2: Prominent Exception Card ("Changed Condition")**:
   - Renders at the top of the execution record when status is `needs_decision`.
   - Amber status badge: `Delivery date changed`.
   - Plain statement: *"Nordic Displays can meet the budget, but delivery would move 14 days later."*
   - Impact statement: *"This may affect the 15 Oct installation target."*
   - Safe assurance line: *"Waiting for your direction — no reply has been sent."*
   - Live AI status indicator: When evaluating or awaiting response, integrate `<ThinkingOrb state="weaving" size={20} theme={theme} />` next to the status badge, giving a tactile real-time heartbeat.
5. **Column 2: Vertical Execution Record / Timeline**:
   - Chronological vertical timeline with connecting hairline rules (`border-l border-rule`).
   - Events rendered with concise evidence links rather than raw chain-of-thought:
     - `09:12` — *Read current quote* (completed green check/dot)
     - `09:14` — *Found budget constraint in your project note* (completed)
     - `09:16` — *Drafted request for revised quote* (completed)
     - `10:03` — *Vendor offered lower price with later delivery* (amber active dot, "Needs your decision")
     - `Next` — *Draft and send your chosen response* (rendered with subtle pending orb / indicator)
   - Dynamic update when user acts (e.g. `10:05 — Sent revision request to Sofia`). When active/monitoring, shows `<ThinkingOrb state="searching" size={20} />` for live background surveillance.

## 4. Files to Create / Modify
- `src/components/screens/DelegationReviewScreen.tsx`
- `src/components/delegation/TaskListColumn.tsx`
- `src/components/delegation/OutcomeHeader.tsx`
- `src/components/delegation/ExceptionCard.tsx`
- `src/components/delegation/ExecutionTimeline.tsx`

## 5. Verification & Test Criteria
- [ ] Three columns render with correct proportions (`280px` / `flex-1` / `360px`).
- [ ] Goal card and constraint pills match ActAI styling (`rounded-full bg-chip`).
- [ ] Exception card clearly communicates what changed, why it matters, and that no reply was sent.
- [ ] Vertical timeline clearly distinguishes completed past events from the current blocker and pending future step.
- [ ] No fake AI reasoning or chat bubbles appear anywhere in the view.
