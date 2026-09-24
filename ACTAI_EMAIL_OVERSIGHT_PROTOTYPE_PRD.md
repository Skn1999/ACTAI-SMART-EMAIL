# ActAI Prototype PRD — Delegation Review for Proactive Email

## 1. Prototype thesis

**Build a high-fidelity desktop prototype of a proactive email agent that makes a multi-step delegated task legible, controllable, and recoverable.**

The point is not to make another AI composer. The point is to show what happens *after* a user delegates real work: the agent has a plan, draws on persistent context, encounters a change, and needs a human decision without forcing them to reconstruct the whole thread.

### One-sentence concept

**ActAI Delegation Review** is a workspace where a user can inspect, steer, approve, pause, or recover an AI-managed email workflow through a compact, evidence-backed execution record.

## 2. Why this is a credible wedge

### Market scan

| Product | Publicly described capability | What it leaves open for this prototype |
| --- | --- | --- |
| [Gmail with Gemini](https://workspace.google.com/products/gmail/ai/) | Summarises threads, drafts and refines emails, searches inbox content, and provides contextual reply suggestions. | The user primarily invokes or reviews individual assistance; the interface does not centre a durable, inspectable record of an autonomous task plan. |
| [Outlook with Copilot](https://support.microsoft.com/en-us/outlook/copilot-pages/summarize-an-email-thread-with-copilot-in-outlook) | Summarises email threads, with citations back to the underlying messages. | Good source traceability for summaries, but the interaction is thread-level rather than supervision of a multi-step delegated workflow. |
| [Superhuman Mail](https://superhuman.com/email) | Uses AI for writing, summaries, search, auto-drafts, reminders, and inbox prioritisation. | Optimises throughput; the prototype can focus on whether a user understands and can safely direct the automation itself. |
| [Shortwave + Tasklet](https://www.shortwave.com/docs/guides/ai-assistant/) | Provides an AI assistant and describes background automation that can draft replies, add context, create todos, and connect to external apps. | Background action raises the same unsolved UX question: when should the user trust, approve, adjust, or stop a workflow? |

### Product inference — clearly labelled

ActAI’s public first application is email, while its hiring material describes reliable long-running workflows, persistent context, and real-world task completion. The competitive opening is **not** basic inbox AI. It is a visible control model for proactive work: the user should be able to see the agent’s intent, evidence, next action, uncertainty, and recovery path. This is an inference from the companies’ public feature descriptions, not a claim that competitors lack every version of these controls.

## 3. Problem

When an AI agent acts over hours or days, users cannot safely evaluate it from a single generated draft. They need answers to five questions without rereading every source:

1. What outcome is the agent pursuing?
2. What has it done and what will it do next?
3. What information is it relying on?
4. What is uncertain or blocked?
5. What can I change, approve, or undo?

### Design hypothesis

If ActAI exposes a concise, source-grounded execution record at the moment a decision is needed, users will be able to safely delegate a multi-step email task without losing situational awareness.

### Evidence and assumptions

| Type | Statement |
| --- | --- |
| Known | ActAI publicly says its first application addresses email and describes reliable, persistent, long-running workflows. |
| Known | Major competitors already provide summaries, drafting, search, inbox organisation, and forms of automation. |
| Assumption | Users will delegate a real email goal if they can understand and correct the agent’s actions quickly. |
| Assumption | A compact “why this action” view will be more useful than exposing raw model reasoning. |
| Unknown | Which actions users will permit automatically; this must be tested. |

## 4. Prototype goal and boundaries

### Goal

Demonstrate a superior interaction model for a proactive agent recovering from a changed condition in an email-based task.

### Primary user

A busy knowledge worker coordinating a vendor decision by email. They want the task completed, but do not want the agent to make a commercial commitment or invent facts.

### Prototype scenario

The user delegates: **“Get a revised quote from Nordic Displays and arrange a 30-minute review with Maya before Friday. Keep the total below €8,000.”**

The agent has already:

- Read the vendor thread and the previous quote.
- Identified a €7,600 budget cap from a user note.
- Drafted a request for a revised quote.
- Found a tentative meeting slot with Maya.

Then the vendor replies: **“We can meet the budget only if delivery moves from 15 October to 29 October.”**

The agent must stop before accepting the change. The user reviews the evidence, chooses a direction, and sees the plan update.

### Out of scope

- Real email, calendar, authentication, integrations, LLM calls, or sending messages.
- A general inbox, chat assistant, email writing tool, or settings system.
- Claims about model accuracy, data privacy, or production reliability.

## 5. Core experience

### Product principles

1. **Outcome before activity.** Lead with the user’s goal, not a stream of agent events.
2. **Evidence, not chain-of-thought.** Show concise facts and source links supporting an action; never expose hidden reasoning.
3. **Bounded autonomy.** Make the action category and approval boundary explicit.
4. **Exception-first attention.** Normal progress stays quiet; changed conditions and high-impact decisions surface clearly.
5. **Recovery is first-class.** A blocker must explain its consequence and offer meaningful next moves.

### Primary flow

1. User lands on **Today** and sees one task needing attention.
2. User opens **Negotiate Nordic Displays quote**.
3. They understand the delegated outcome, current progress, and the change that requires a decision.
4. They inspect the two evidence sources behind the budget and delivery change.
5. They choose one of three bounded options:
   - Ask the vendor to keep the original delivery date.
   - Accept 29 October and notify Maya.
   - Pause and handle it myself.
6. Choosing an option updates the timeline and shows the exact next email draft before it would be sent.
7. The user may edit the draft or return to the task overview.

## 6. Information architecture

### Screen A — Today / agent overview

Purpose: explain where attention is needed without turning the product into an inbox.

Elements:

- Header: `Good morning, Sumit` and `2 tasks in progress · 1 needs you`.
- “Needs your decision” card for the Nordic Displays task.
- Compact cards for two uneventful tasks, visually quiet.
- Each card shows: outcome, status, next event, and last update—not a priority score with no explanation.

### Screen B — Delegation Review (main prototype screen)

Three-column desktop layout.

**Left: task list (280 px)**

- Task title, status dot, and one-line current state.
- Selected: `Negotiate Nordic Displays quote` / `Decision needed`.

**Centre: outcome and execution record (flex)**

- Goal card: `Secure a revised quote under €8,000 and schedule review with Maya before Friday.`
- Constraints chips: `Budget ≤ €8,000`, `Do not confirm delivery changes without me`, `Due Friday`.
- Prominent exception card:
  - Label: `Delivery date changed`
  - Plain statement: `Nordic Displays can meet the budget, but delivery would move 14 days later.`
  - Impact: `This may affect the 15 Oct installation target.`
  - Status: `Waiting for your direction — no reply has been sent.`
- Vertical timeline:
  - `09:12` — Read current quote — completed
  - `09:14` — Found budget constraint in your project note — completed
  - `09:16` — Drafted request for revised quote — completed
  - `10:03` — Vendor offered lower price with later delivery — needs decision
  - `Next` — Draft and send your chosen response — pending approval

**Right: evidence and controls (360 px)**

- “What ActAI is using” list of two source cards:
  - `Project Atlas budget note` → `“Keep total supplier spend under €8,000.”`
  - `Nordic Displays reply, 10:03` → `“€7,850 is possible with delivery on 29 Oct.”`
- `View source` opens a lightweight email/note preview drawer.
- “Your decision” controls (see below).

### Screen C — Decision sheet

Open as a right-side overlay when a decision option is selected. It must show the consequence before confirmation.

| Option | Result shown in sheet | Primary CTA |
| --- | --- | --- |
| Keep 15 Oct delivery | Agent will ask whether €8,000 can be met without moving delivery. No commitment is made. | `Draft request` |
| Accept 29 Oct delivery | Agent will accept the revised quote and draft a note to Maya about the new date. | `Review acceptance` |
| Pause task | Automation pauses. The email thread remains available and no action is taken. | `Pause task` |

After selecting the first option, show the draft state:

> Hi Sofia — thank you for the revised quote. We need to keep delivery on 15 October. Is there a configuration or delivery option that keeps the total at or below €8,000 without moving that date?

Controls: `Edit draft`, `Approve & send`, `Back`. The send action is simulated; after it, show a toast: `Request sent. ActAI will monitor the reply.`

## 7. Interaction and state requirements

### State machine

```text
IN_PROGRESS
  → AWAITING_DECISION (vendor changes delivery condition)
  → DRAFT_READY (user selects a direction)
  → IN_PROGRESS (user approves simulated send)

AWAITING_DECISION
  → PAUSED (user pauses)
  → IN_PROGRESS (user dismisses decision after simulated send)
```

### Required interactions

- Clicking a task card opens Delegation Review.
- Clicking `View source` opens the correct evidence preview.
- Clicking a decision option opens the corresponding decision sheet.
- Clicking `Draft request` renders the relevant editable draft.
- Clicking `Edit draft` makes the draft text editable.
- Clicking `Approve & send` moves the timeline event to completed, changes task status to `Monitoring reply`, and shows a confirmation toast.
- Clicking `Pause task` changes status to `Paused by you`; an obvious `Resume task` control appears.
- Every interactive element must be keyboard reachable and have a visible focus state.

### Empty and error handling

- Loading: skeleton task cards and “Reviewing latest update…” in the exception area.
- Evidence unavailable: show `Source no longer available. The agent will not act until you review the task.`
- Action failed: show `Draft was not sent. Nothing changed in your inbox.` followed by `Try again` and `Pause task`.
- Do not use vague error language such as “Something went wrong.”

## 8. Content and visual direction

### Tone

Calm, direct, human. Avoid anthropomorphic claims such as “I understand” or fake certainty such as “Everything is handled.” Use: `I found`, `Based on`, `Waiting for your direction`, and `No action has been taken.`

### Visual system

- Desktop frame: 1440 × 1024; responsive down to 1024 px.
- Base: warm off-white or very light neutral background; white cards; dark charcoal text.
- Accent: restrained electric blue for active controls; amber only for a decision required; green only for completed actions.
- Typeface: Inter, Geist, or system sans serif.
- Avoid an inbox clone. Use a task-oriented workspace with strong hierarchy and ample whitespace.
- Use icons sparingly: status, source, calendar, pause. Never use decorative AI sparkles.

### Accessibility

- Minimum 4.5:1 contrast for text; do not convey state by colour alone.
- All status labels contain text.
- Decision sheet traps focus and closes with Escape.
- Buttons use explicit labels: `Approve & send`, not `Continue`.

## 9. Prototype data (hard-code)

```ts
const task = {
  id: 'nordic-quote',
  title: 'Negotiate Nordic Displays quote',
  status: 'needs_decision',
  goal: 'Secure a revised quote under €8,000 and schedule review with Maya before Friday.',
  constraints: ['Budget ≤ €8,000', 'Do not confirm delivery changes without me', 'Due Friday'],
  exception: {
    title: 'Delivery date changed',
    summary: 'Nordic Displays can meet the budget, but delivery would move 14 days later.',
    impact: 'This may affect the 15 Oct installation target.',
    state: 'Waiting for your direction — no reply has been sent.'
  }
};
```

Add two low-attention tasks: `Confirm catering headcount` (monitoring reply) and `Collect travel receipts` (in progress). They establish that the product manages a queue of work, but should not compete with the main scenario.

## 10. Success criteria

The prototype succeeds if a reviewer can answer the following in under 30 seconds, without reading an entire email thread:

1. What did I ask ActAI to achieve?
2. What changed and why does it matter?
3. What evidence supports the agent’s current state?
4. Has the agent already committed to anything?
5. What will happen if I choose each option?

### Usability-test prompts

- “You need the original delivery date. What would you do?”
- “Before choosing, tell me what information ActAI used.”
- “Has ActAI accepted the vendor’s condition already?”
- “Pause the task. What do you expect will happen next?”

### Signals to record in a future test

- Time to accurately explain the situation.
- Decision chosen and whether the participant understands its consequence.
- Evidence-preview usage.
- Misinterpretation of approval boundaries.
- Trust rating after the recovery event, plus why.

## 11. Build brief for an AI coding agent

Build a polished, clickable front-end prototype using React, TypeScript, and Tailwind CSS. Use local state only; no network calls, backend, authentication, external images, or production integrations. The default route must open the **Today** view, with the Nordic Displays task selected or reachable in one click. Implement the state transitions and interactions in Section 7. Use the exact scenario copy in this PRD. Keep components small and semantic, with keyboard-accessible buttons and an accessible dialog for the decision sheet. Deliver a responsive desktop-first interface. Do not add generic chatbot UI, prompt input, fake analytics, marketing sections, or features outside the defined scenario.

## 12. Decision readiness

**Recommendation: build this as a portfolio prototype, not a product proposal.** It directly demonstrates the HCI judgment ActAI is hiring for: trust, transparency, correction, and recovery in proactive AI. It does not prove that users prefer this model or that ActAI lacks it. A short usability test with five target users would be the next evidence-gathering step after the prototype exists.
