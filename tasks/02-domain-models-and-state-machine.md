# Task 02: Domain Models & State Machine Layer

## 1. Objective
Establish the strongly-typed domain data models and deterministic workflow state machine for the proactive email agent scenario described in the PRD.

## 2. Dependencies
- Task 01: TypeScript scaffolding
- [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) (Sections 4, 6, 7, 9)

## 3. Implementation Steps
1. **Define TypeScript Types & Interfaces**:
   - `TaskStatus`: `'in_progress' | 'needs_decision' | 'draft_ready' | 'monitoring' | 'paused' | 'completed'`
   - `TimelineStep`: `id`, `time`, `label`, `detail`, `status` (`'completed' | 'needs_decision' | 'pending'`), `sourceId?`
   - `EvidenceSource`: `id`, `title`, `authorOrSender`, `timestamp`, `snippet`, `fullContent`, `type` (`'note' | 'email'`)
   - `DecisionOption`: `id`, `title`, `description`, `consequenceExplanation`, `ctaLabel`, `draftResponse`
   - `Task`: `id`, `title`, `status`, `goal`, `constraints`, `exception`, `timeline`, `evidenceIds`, `selectedDecisionId?`, `draftContent?`
2. **Implement Mock Data**:
   - Primary Nordic Displays Task:
     - Goal: *"Secure a revised quote under €8,000 and schedule review with Maya before Friday."*
     - Constraints: `["Budget ≤ €8,000", "Do not confirm delivery changes without me", "Due Friday"]`
     - Exception: Title *"Delivery date changed"*, Summary *"Nordic Displays can meet the budget, but delivery would move 14 days later."*, Impact *"This may affect the 15 Oct installation target."*, State *"Waiting for your direction — no reply has been sent."*
     - Timeline:
       1. `09:12` — Read current quote (completed)
       2. `09:14` — Found budget constraint in your project note (completed)
       3. `09:16` — Drafted request for revised quote (completed)
       4. `10:03` — Vendor offered lower price with later delivery (needs_decision)
       5. `Next` — Draft and send your chosen response (pending)
     - 2 Evidence Sources:
       1. `Project Atlas budget note` ("Keep total supplier spend under €8,000.")
       2. `Nordic Displays reply, 10:03` ("€7,850 is possible with delivery on 29 Oct.")
     - 3 Bounded Decision Options:
       1. `Keep 15 Oct delivery` (CTA: `Draft request`)
       2. `Accept 29 Oct delivery` (CTA: `Review acceptance`)
       3. `Pause task and handle myself` (CTA: `Pause task`)
   - 2 Low-attention Tasks (PRD Section 9):
     - `Confirm catering headcount` (status: `monitoring`, next: *"Awaiting headcount from design team"*)
     - `Collect travel receipts` (status: `in_progress`, next: *"Scanning expense inbox"*)
3. **Build Workflow State Machine (`useDelegationWorkflow`)**:
   - State transition functions:
     - `selectTask(taskId: string)`
     - `selectDecisionOption(optionId: string)` → sets state to `DRAFT_READY`
     - `updateDraft(content: string)`
     - `approveAndSend()` → appends completed timeline event, moves task to `monitoring`, triggers toast
     - `pauseTask()` → transitions task to `paused`
     - `resumeTask()` → transitions task back to `needs_decision` or `in_progress`
     - `resetToInitialState()` → resets all tasks and events to initial state for demo testing

## 4. Files to Create / Modify
- `src/types/task.ts`
- `src/types/workflow.ts`
- `src/data/mockTasks.ts`
- `src/context/WorkflowContext.tsx`
- `src/hooks/useWorkflow.ts`

## 5. Verification & Test Criteria
- [ ] TypeScript compiles cleanly with zero type errors.
- [ ] Initial state correctly loads the Nordic task with status `needs_decision`.
- [ ] Invoking `selectDecisionOption('keep-date')` populates the default editable draft text.
- [ ] Invoking `approveAndSend()` transitions status to `monitoring` and updates the timeline with a `10:05` sent event.
- [ ] Invoking `pauseTask()` sets status to `paused` with clear visual indicator.
- [ ] Invoking `resetToInitialState()` returns all state cleanly to the original PRD snapshot.
