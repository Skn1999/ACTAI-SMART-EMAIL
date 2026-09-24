# Task 07: Polish, Accessibility & Evaluator Scenario Controls

## 1. Objective
Ensure the prototype satisfies all PRD non-functional requirements, WCAG accessibility standards (contrast, keyboard focus, screen reader announcements), error states, and introduces an interactive Evaluator Control Bar that allows hiring managers/reviewers to test the full lifecycle, edge cases, and theme variations with 1 click.

## 2. Dependencies
- Tasks 01 through 06 (Complete core user flow)
- [ACTAI_DESIGN_SYSTEM_TOKENS.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_DESIGN_SYSTEM_TOKENS.md) (Checklist Section 9)
- [ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md](file:///Users/SumitKumar/Desktop/AI%20projects/ActAI%20MVP/ACTAI_EMAIL_OVERSIGHT_PROTOTYPE_PRD.md) (Sections 7.3, 8.3, 10)

## 3. Implementation Steps
1. **Evaluator Control Bar (`EvaluatorBar`)**:
   - Discreet floating bar or top toolbar designed specifically for job application reviewers:
     - `Reset Scenario`: Resets state back to the moment the decision is needed.
     - `Simulate Loading`: Toggles skeleton loading state across task cards and center timeline (*"Reviewing latest update..."*).
     - `Simulate Missing Evidence`: Tests the graceful error handling (*"Source no longer available..."*).
     - `Simulate Send Failure`: Tests network/action failure (*"Draft was not sent. Nothing changed in your inbox."* with *Try again* and *Pause task*).
     - `Theme`: Fast toggle between Light and Dark modes.
2. **Accessibility (a11y) Verification**:
   - Contrast check: Text vs background >= 4.5:1 for normal text and >= 3:1 for large text.
   - Status indicators: Color is never the sole indicator of state (e.g. amber dot always paired with text label `"Decision needed"`).
   - Keyboard Navigation:
     - Visible focus indicator (`focus-visible:ring-2 focus-visible:ring-ink-strong`).
     - Logical tab order throughout the three columns.
     - Modal sheets trap focus and dismiss via `Escape`.
   - Screen Reader Annotations:
     - `aria-current="page"` on active navigation.
     - `aria-live="polite"` on status updates and toasts.
     - Descriptive `aria-label`s on icon buttons.
3. **Responsive Polish**:
   - Flawless display on `1440px` desktop workstations.
   - Elegant scaling down to `1024px` without horizontal clipping.
   - Mobile fallback navigation below `1140px` (`rail:hidden`).
4. **Self-Audit against PRD Success Criteria (PRD Section 10)**:
   Verify a reviewer can answer the 4 questions in under 30 seconds:
   - 1. *What did I ask ActAI to achieve?* → Visible immediately in the Goal card.
   - 2. *What changed and why does it matter?* → Highlighted in the Exception card.
   - 3. *What evidence supports the agent's current state?* → Displayed in the Source cards with 1-click preview.
   - 4. *Has the agent already committed to anything?* → Confirmed explicitly by "Waiting for your direction — no reply has been sent."

## 4. Files to Create / Modify
- `src/components/evaluator/EvaluatorBar.tsx`
- `src/components/ui/Toast.tsx`
- `src/components/ui/Skeleton.tsx`
- `src/App.tsx`

## 5. Verification & Test Criteria
- [ ] Reset button restores the prototype to the fresh decision-needed state.
- [ ] Loading simulation activates the pulsing skeleton without layout shifting.
- [ ] Error simulations display concise, non-generic, recoverable error messages.
- [ ] Entire primary user flow can be completed using only the keyboard (`Tab`, `Enter`, `Escape`).
- [ ] Contrast ratios meet WCAG AA standards in both Light and Dark themes.
- [ ] Production build (`npm run build`) generates clean bundle with no type or lint errors.
