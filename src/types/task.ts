export type TaskStatus =
  | 'in_progress'
  | 'needs_decision'
  | 'draft_ready'
  | 'monitoring'
  | 'paused'
  | 'completed';

export type StepStatus = 'completed' | 'needs_decision' | 'pending';

export interface TimelineStep {
  id: string;
  time: string;
  label: string;
  detail?: string;
  status: StepStatus;
  sourceId?: string;
}

export type EvidenceSourceType = 'note' | 'email';

export interface EvidenceSource {
  id: string;
  title: string;
  authorOrSender: string;
  timestamp: string;
  snippet: string;
  fullContent: string;
  type: EvidenceSourceType;
  metadata?: Record<string, string>;
}

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  consequenceExplanation: string;
  ctaLabel: string;
  draftResponse?: string;
}

export interface TaskException {
  title: string;
  summary: string;
  impact: string;
  state: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  goal: string;
  constraints: string[];
  exception?: TaskException;
  timeline: TimelineStep[];
  evidenceIds: string[];
  decisionOptions?: DecisionOption[];
  selectedDecisionId?: string;
  draftContent?: string;
  updatedAt?: string;
  nextAction?: string;
}
