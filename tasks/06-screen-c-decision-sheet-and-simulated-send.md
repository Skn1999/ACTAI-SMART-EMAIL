# Task 06: Screen C — Bounded Decision Sheet, Editable Draft & Simulated Send

## 1. Objective
Implement the decision controls in Screen B, the Decision Sheet overlay (Screen C) explaining the concrete consequences of each action, the inline editable email draft, and the simulated send flow that safely updates task status and the timeline.

## 2. Dependencies
- Task 02: Workflow state machine (`selectDecisionOption`, `approveAndSend`, `pauseTask`)
- Task 04: Delegation Review layout
- Task 05: Source inspector
- [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md) (Sections 7.9, 7.10)
- [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) (Section 6 Screen C, Section 7 State Requirements)

## 3. Implementation Steps
1. **Decision Controls in Right Column (`DecisionControlsPanel`)**:
   - Section overline: `YOUR DECISION (3 OPTIONS)` in `text-[0.78rem] tracking-[0.14em] uppercase text-muted`.
   - Option 1 (Recommended primary action):
     - `Keep 15 Oct delivery` → CTA button in `bg-ink-strong text-background hover:opacity-90`.
     - Subtitle: *"Ask vendor to maintain original schedule within budget."*
   - Option 2:
     - `Accept 29 Oct delivery` → CTA button in `border border-rule bg-background text-ink-strong hover:bg-surface`.
     - Subtitle: *"Accept revised date and notify Maya."*
   - Option 3:
     - `Pause task` → Text button in `text-muted hover:text-ink-strong text-[0.9rem]`.
     - Subtitle: *"Take over manually in your regular inbox."*
2. **Screen C: Decision Sheet Overlay (`DecisionSheet`)**:
   - Triggered when user selects an option (e.g. Option 1: Keep 15 Oct delivery).
   - Renders as a dedicated right-side panel overlay or sheet.
   - **Clear Consequence Disclosure**:
     - Explicit summary: *"ActAI will ask whether €8,000 can be met without moving delivery. No commercial commitment will be made."*
   - **Generated Draft Preview**:
     - Recipient: `Sofia Lindqvist <sofia@nordicdisplays.com>`
     - Subject: `Re: Revised Quote - Exhibition Display Panels`
     - Exact Draft Body from PRD:
       > *"Hi Sofia — thank you for the revised quote. We need to keep delivery on 15 October. Is there a configuration or delivery option that keeps the total at or below €8,000 without moving that date?"*
   - **Inline Editability**:
     - `Edit draft` toggle switches the preview into an accessible `textarea` with live character update.
     - `Done editing` saves the edited draft to workflow state.
   - **Actions & Controls**:
     - `Approve & send`: Primary high-contrast button.
     - `Back`: Returns to option selector without changing state.
3. **Simulated Send Flow**:
   - On clicking `Approve & send`:
     - Button transitions briefly to sending state with `<ThinkingOrb state="composing" size={20} theme="dark" />` or inline feedback.
     - Displays confirmation toast: `"Request sent. ActAI will monitor the reply."`
     - Inserts new timeline event: `10:05 — Sent revision request to Sofia` marked as completed.
     - Transitions task status from `needs_decision` to `monitoring` (with `<ThinkingOrb state="searching" size={20} />` live monitoring indicator).
     - Closes decision sheet and updates center execution record immediately.
4. **Pause and Resume Workflow**:
   - If user clicks `Pause task`:
     - Task status transitions to `paused` ("Paused by you").
     - Timeline indicates agent automation is halted.
     - Prominent `Resume task` button appears allowing safe re-activation.

## 4. Files to Create / Modify
- `src/components/delegation/DecisionControlsPanel.tsx`
- `src/components/delegation/DecisionSheet.tsx`
- `src/components/delegation/DraftEditor.tsx`
- `src/components/ui/Toast.tsx`

## 5. Verification & Test Criteria
- [ ] Clicking `Keep 15 Oct delivery` opens Screen C with the exact consequence explanation and draft.
- [ ] Clicking `Edit draft` allows full in-place editing of the email text.
- [ ] Clicking `Approve & send` triggers the simulated send, displays the toast notification, updates task status to `Monitoring reply`, and reflects the new event on the timeline.
- [ ] Clicking `Pause task` halts the automation and displays the `Resume task` control.
- [ ] Decision sheet traps focus and closes cleanly when `Back` or `Escape` is pressed.
