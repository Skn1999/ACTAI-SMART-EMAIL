import { Task, EvidenceSource, DecisionOption } from './task';

export type ScreenId = 'today' | 'delegation' | 'activity';

export interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
  visible: boolean;
}

export interface WorkflowState {
  activeScreen: ScreenId;
  tasks: Task[];
  selectedTaskId: string;
  selectedTask: Task;
  selectedDecisionOption: DecisionOption | null;
  draftContent: string;
  isEditingDraft: boolean;
  evidenceSources: Record<string, EvidenceSource>;
  activeEvidenceSource: EvidenceSource | null;
  isEvidenceDrawerOpen: boolean;
  isDecisionSheetOpen: boolean;
  toast: ToastState | null;

  // Evaluator simulation / testing flags
  isLoading: boolean;
  isMissingEvidence: boolean;
  isSendFailed: boolean;
}

export interface WorkflowActions {
  setActiveScreen: (screen: ScreenId) => void;
  selectTask: (taskId: string) => void;
  selectDecisionOption: (optionId: string) => void;
  updateDraft: (content: string) => void;
  setIsEditingDraft: (editing: boolean) => void;
  approveAndSend: () => Promise<void> | void;
  pauseTask: (taskId?: string) => void;
  resumeTask: (taskId?: string) => void;
  resetToInitialState: () => void;
  openEvidenceDrawer: (sourceId: string) => void;
  closeEvidenceDrawer: () => void;
  openDecisionSheet: (optionId?: string) => void;
  closeDecisionSheet: () => void;
  dismissToast: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  setIsLoading: (loading: boolean) => void;
  setIsMissingEvidence: (missing: boolean) => void;
  setIsSendFailed: (failed: boolean) => void;
}

export type WorkflowContextValue = WorkflowState & WorkflowActions;
