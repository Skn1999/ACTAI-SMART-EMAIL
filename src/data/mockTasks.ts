import { Task, EvidenceSource, DecisionOption } from '@/types/task';

export const mockEvidenceSources: Record<string, EvidenceSource> = {
  'source-atlas-note': {
    id: 'source-atlas-note',
    title: 'Project Atlas budget note',
    authorOrSender: 'You (Project Atlas note)',
    timestamp: 'Updated yesterday',
    snippet: '“Keep total supplier spend under €8,000.”',
    type: 'note',
    metadata: {
      location: 'Notes / Projects / Atlas 2026',
      lastEdited: 'Yesterday, 17:42',
    },
    fullContent: `PROJECT ATLAS — EXHIBITION SPECIFICATION & BUDGET NOTE
Created: 14 September 2026
Author: Alex Morgan

Key Milestones:
• 01 Oct: Marketing assets finalized
• 15 Oct: Exhibition installation target at Stockholm Expo Centre
• 16 Oct: VIP & Press preview walkthrough (Maya attending)

Procurement Guardrails:
• Supplier: Nordic Displays AB (modular display panels)
• Budget constraint: Keep total supplier spend under €8,000.
• Delivery deadline: 15 October installation is fixed.
• Escalation rule: Do not confirm any delivery schedule alterations without direct user sign-off.`,
  },

  'source-nordic-reply': {
    id: 'source-nordic-reply',
    title: 'Nordic Displays reply, 10:03',
    authorOrSender: 'Sofia Lindqvist <s.lindqvist@nordicdisplays.se>',
    timestamp: 'Today, 10:03',
    snippet: '“€7,850 is possible with delivery on 29 Oct.”',
    type: 'email',
    metadata: {
      from: 'Sofia Lindqvist <s.lindqvist@nordicdisplays.se>',
      to: 'Alex Morgan <alex@company.com>',
      date: '24 Sep 2026, 10:03 CET',
      subject: 'Re: Revised quote request - Modular Exhibition Display',
    },
    fullContent: `From: Sofia Lindqvist <s.lindqvist@nordicdisplays.se>
To: Alex Morgan <alex@company.com>
Subject: Re: Revised quote request - Modular Exhibition Display
Date: 24 Sep 2026, 10:03 CET

Hi Alex,

Thank you for reaching back out. We reviewed your target budget with our Stockholm fabrication plant supervisor.

We can meet your target: €7,850 is possible (discounted from our original €8,900 quotation) by batching your anodized aluminum extrusion order with our scheduled late-October production wave.

However, this production slot impacts the timeline. The earliest guaranteed delivery date under this batch pricing moves to 29 October.

Please let us know before 17:00 CET today if you would like us to reserve this slot or if you need us to explore alternative specifications.

Warm regards,

Sofia Lindqvist
Senior Account Director
Nordic Displays AB
Birger Jarlsgatan 42, Stockholm`,
  },
};

export const nordicDecisionOptions: DecisionOption[] = [
  {
    id: 'keep-date',
    title: 'Keep 15 Oct delivery',
    description:
      'Agent will ask whether €8,000 can be met without moving delivery. No commitment is made.',
    consequenceExplanation:
      'Agent will ask whether €8,000 can be met without moving delivery. No commitment is made.',
    ctaLabel: 'Draft request',
    draftResponse:
      'Hi Sofia — thank you for the revised quote. We need to keep delivery on 15 October. Is there a configuration or delivery option that keeps the total at or below €8,000 without moving that date?',
  },
  {
    id: 'accept-date',
    title: 'Accept 29 Oct delivery',
    description:
      'Agent will accept the revised quote and draft a note to Maya about the new date.',
    consequenceExplanation:
      'Agent will accept the revised quote and draft a note to Maya about the new date.',
    ctaLabel: 'Review acceptance',
    draftResponse:
      'Hi Sofia — thank you for confirming the €7,850 quote. We accept this pricing for the 29 October delivery date. Please send through the revised agreement for sign-off.',
  },
  {
    id: 'pause-task',
    title: 'Pause task and handle myself',
    description:
      'Automation pauses. The email thread remains available and no action is taken.',
    consequenceExplanation:
      'Automation pauses. The email thread remains available and no action is taken.',
    ctaLabel: 'Pause task',
    draftResponse: '',
  },
];

export const initialTasks: Task[] = [
  {
    id: 'nordic-displays',
    title: 'Negotiate Nordic Displays quote',
    status: 'needs_decision',
    goal: 'Secure a revised quote under €8,000 and schedule review with Maya before Friday.',
    constraints: [
      'Budget ≤ €8,000',
      'Do not confirm delivery changes without me',
      'Due Friday',
    ],
    exception: {
      title: 'Delivery date changed',
      summary:
        'Nordic Displays can meet the budget, but delivery would move 14 days later.',
      impact: 'This may affect the 15 Oct installation target.',
      state: 'Waiting for your direction — no reply has been sent.',
    },
    timeline: [
      {
        id: 'step-1',
        time: '09:12',
        label: 'Read current quote',
        detail: 'Initial vendor quote received at €8,900 for 15 Oct delivery.',
        status: 'completed',
      },
      {
        id: 'step-2',
        time: '09:14',
        label: 'Found budget constraint in your project note',
        detail: 'Extracted maximum budget threshold of €8,000.',
        status: 'completed',
        sourceId: 'source-atlas-note',
      },
      {
        id: 'step-3',
        time: '09:16',
        label: 'Drafted request for revised quote',
        detail: 'Requested discount down to budget ceiling of €8,000.',
        status: 'completed',
      },
      {
        id: 'step-4',
        time: '10:03',
        label: 'Vendor offered lower price with later delivery',
        detail:
          'Sofia Lindqvist offered €7,850 with delivery shifted to 29 Oct.',
        status: 'needs_decision',
        sourceId: 'source-nordic-reply',
      },
      {
        id: 'step-5',
        time: 'Next',
        label: 'Draft and send your chosen response',
        detail: 'Awaiting your direction before taking any external action.',
        status: 'pending',
      },
    ],
    evidenceIds: ['source-atlas-note', 'source-nordic-reply'],
    decisionOptions: nordicDecisionOptions,
    updatedAt: '10:03',
    nextAction: 'Waiting for your direction — no reply has been sent.',
  },
  {
    id: 'confirm-catering',
    title: 'Confirm catering headcount',
    status: 'monitoring',
    goal: 'Finalize dietary requirements and headcounts for Friday team offsite.',
    constraints: [
      'Notify venue by Thursday 14:00',
      'Include vegan and gluten-free counts',
    ],
    timeline: [
      {
        id: 'cat-1',
        time: '08:30',
        label: 'Sent headcount poll to team',
        detail: 'Requested final RSVPs and dietary preferences.',
        status: 'completed',
      },
      {
        id: 'cat-2',
        time: '08:45',
        label: 'Monitoring replies',
        detail: '18 of 22 responses logged.',
        status: 'completed',
      },
      {
        id: 'cat-3',
        time: 'Next',
        label: 'Awaiting headcount from design team',
        detail: 'Reminder scheduled for Thursday morning.',
        status: 'pending',
      },
    ],
    evidenceIds: [],
    updatedAt: '08:45',
    nextAction: 'Awaiting headcount from design team',
  },
  {
    id: 'collect-receipts',
    title: 'Collect travel receipts',
    status: 'in_progress',
    goal: 'Aggregate flight and hotel receipts for September client trip.',
    constraints: [
      'Match against corporate card statement',
      'Flag missing receipts > €50',
    ],
    timeline: [
      {
        id: 'rec-1',
        time: '07:15',
        label: 'Parsed airline booking confirmation',
        detail: 'Lufthansa flight invoice logged (€420).',
        status: 'completed',
      },
      {
        id: 'rec-2',
        time: '08:00',
        label: 'Scanning expense inbox',
        detail: 'Matching hotel folio and taxi receipts.',
        status: 'completed',
      },
      {
        id: 'rec-3',
        time: 'Next',
        label: 'Reconcile with corporate card statement',
        detail: 'Automatic sync runs at 12:00.',
        status: 'pending',
      },
    ],
    evidenceIds: [],
    updatedAt: '08:00',
    nextAction: 'Scanning expense inbox',
  },
];
