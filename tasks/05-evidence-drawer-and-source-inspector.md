# Task 05: Evidence Drawer ("What ActAI is Using") & Source Inspector

## 1. Objective
Implement the source-grounded evidence cards in the right-hand panel of Screen B and the lightweight slide-out / modal source inspector drawer allowing the user to verify the exact email or note behind the agent's actions without leaving the workspace.

## 2. Dependencies
- Task 01: Design tokens & modal styles
- Task 02: Evidence data models
- Task 04: Delegation Review layout
- [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md) (Section 7.8)
- [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) (Section 6, Evidence; Section 7, Interactions)

## 3. Implementation Steps
1. **Evidence Cards in Right Column (`EvidenceSection`)**:
   - Section header: `text-[0.78rem] tracking-[0.14em] uppercase text-muted` (`WHAT ACTAI IS USING (2)`).
   - Card 1: `Project Atlas budget note`
     - Author/Context: *Personal note · Updated yesterday*
     - Blockquote: *“Keep total supplier spend under €8,000.”*
     - Action link: `View note →`
   - Card 2: `Nordic Displays reply, 10:03`
     - Sender: *Sofia Lindqvist <sofia@nordicdisplays.com>*
     - Blockquote: *“€7,850 is possible with delivery on 29 Oct.”*
     - Action link: `View email →`
2. **Slide-Out Source Inspector Drawer (`SourceInspectorDrawer`)**:
   - Slides smoothly from the right or renders as an accessible modal overlay with backdrop.
   - Header with source title, sender/author metadata, exact timestamp, and `Close (Esc)` button.
   - Grounded preview area:
     - For email: realistic email headers (`From`, `To`, `Date`, `Subject`), message body with the key quote subtly highlighted in `bg-chip/50` or bold text.
     - For note: markdown preview of the Project Atlas note with highlighted budget constraint.
   - Keyboard accessibility:
     - Traps focus while open.
     - Closes on `Escape` key press or backdrop click.
3. **Empty / Unavailable Source Handling (PRD Section 7)**:
   - Evaluator toggle or error state simulation:
   - When evidence is flagged as missing/deleted, display:
     *"Source no longer available. The agent will not act until you review the task."*

## 4. Files to Create / Modify
- `src/components/delegation/EvidenceSection.tsx`
- `src/components/delegation/EvidenceCard.tsx`
- `src/components/delegation/SourceInspectorDrawer.tsx`
- `src/components/ui/Modal.tsx`

## 5. Verification & Test Criteria
- [ ] Evidence section renders the 2 sources with exact citations and dates.
- [ ] Clicking `View note →` opens the drawer with the Project Atlas note content.
- [ ] Clicking `View email →` opens the drawer with Sofia's email and thread context.
- [ ] Drawer smoothly animates in and out with `var(--ease)` (`cubic-bezier(.22, .61, .36, 1)`).
- [ ] Pressing `Escape` or clicking the backdrop closes the inspector immediately.
- [ ] Simulating missing evidence triggers the safe fallback notice specified in the PRD.
