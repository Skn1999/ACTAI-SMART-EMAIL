# ActAI Prototype Implementation Plan & Task Index

This directory contains the modular, testable tasks for building the **ActAI Delegation Review** MVP prototype based on [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) and [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md).

---

## Task Roadmap

| # | Task | Scope & Key Deliverables | Verification Milestone |
| :--- | :--- | :--- | :--- |
| **01** | [Scaffolding & Design System Foundation](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/01-scaffolding-and-design-system.md) | Vite + React + TS setup, Tailwind with ActAI CSS variables, Archivo font, dark/light theme toggle, `bot-avatars` & `thinking-orbs` setup | Dev server runs, fonts load, theme switches cleanly with persistence |
| **02** | [Domain Models & State Machine](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/02-domain-models-and-state-machine.md) | TypeScript schemas, PRD state machine (`IN_PROGRESS` → `AWAITING_DECISION` → `DRAFT_READY`), mock data for Nordic Displays & quiet tasks | State machine transitions cleanly, mock data adheres to PRD specs |
| **03** | [Screen A: "Today" Overview](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/03-screen-a-today-overview.md) | Left navigation rail (`1.0`, `2.0` indexes), greeting header with `BotAvatar` agent identity, prominent "Needs decision" task card, quiet queue cards | Queue legibility in < 5 seconds, navigation to Screen B works |
| **04** | [Screen B: Delegation Review & Timeline](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/04-screen-b-delegation-review-and-timeline.md) | 3-column desktop layout (`280px` / `flex-1` / `360px`), goal card with constraint chips, exception alert card with `ThinkingOrb`, vertical timeline | Source-grounded timeline renders with clear state boundaries |
| **05** | [Evidence Drawer & Source Inspector](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/05-evidence-drawer-and-source-inspector.md) | "What ActAI is using" cards (Project Atlas note, vendor email reply), slide-out source preview drawer with key evidence quotes | 1-click evidence inspection with full context and `Escape` dismiss |
| **06** | [Screen C: Decision Sheet & Simulated Send](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/06-screen-c-decision-sheet-and-simulated-send.md) | 3 bounded option buttons, consequence explanation sheet, editable email draft, simulated send with toast & timeline update | Complete interactive decision cycle from choice to sent state |
| **07** | [Polish, Accessibility & Evaluator Controls](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/tasks/07-polish-accessibility-and-evaluator-controls.md) | Evaluator scenario toolbar (reset, test errors/loading), WCAG AA contrast, keyboard accessibility, production build | Production-ready, passes all 4 PRD evaluation criteria in < 30s |

---

## Core Scenario Flow Checklist

- [ ] **1. Landing**: User arrives at Screen A (`Today`), immediately spots the Nordic Displays quote needing attention.
- [ ] **2. Inspecting**: User clicks into Screen B (`Delegation Review`), sees the outcome, constraint pills, and the changed delivery date exception.
- [ ] **3. Grounding**: User clicks `View source` on the evidence cards to inspect the Project Atlas note and Nordic Displays email.
- [ ] **4. Deciding**: User clicks `Keep 15 Oct delivery`, reviews the explicit consequence in Screen C (`Decision Sheet`).
- [ ] **5. Editing**: User clicks `Edit draft` to adjust wording if desired.
- [ ] **6. Approving**: User clicks `Approve & send`, receives immediate feedback (`Request sent`), and sees the timeline and status update to `Monitoring reply`.
- [ ] **7. Pausing**: User can pause the task at any time and resume safely.
