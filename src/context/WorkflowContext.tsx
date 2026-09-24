import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Task, DecisionOption } from '@/types/task';
import { ScreenId, ToastState, WorkflowContextValue } from '@/types/workflow';
import { initialTasks, mockEvidenceSources, nordicDecisionOptions } from '@/data/mockTasks';

const WorkflowContext = createContext<WorkflowContextValue | undefined>(undefined);

export interface WorkflowProviderProps {
  children: React.ReactNode;
  initialTaskId?: string;
  initialScreen?: ScreenId;
}

export const WorkflowProvider: React.FC<WorkflowProviderProps> = ({
  children,
  initialTaskId = 'nordic-displays',
  initialScreen = 'today',
}) => {
  // Navigation & selection
  const [activeScreen, setActiveScreen] = useState<ScreenId>(initialScreen);
  const [tasks, setTasks] = useState<Task[]>(() => JSON.parse(JSON.stringify(initialTasks)));
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTaskId);

  // Decision & Draft states
  const [selectedDecisionOption, setSelectedDecisionOption] = useState<DecisionOption | null>(null);
  const [draftContent, setDraftContent] = useState<string>('');
  const [isEditingDraft, setIsEditingDraft] = useState<boolean>(false);

  // Drawers & Sheets
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState<boolean>(false);
  const [isDecisionSheetOpen, setIsDecisionSheetOpen] = useState<boolean>(false);

  // Toast feedback
  const [toast, setToast] = useState<ToastState | null>(null);

  // Evaluator simulation flags
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMissingEvidence, setIsMissingEvidence] = useState<boolean>(false);
  const [isSendFailed, setIsSendFailed] = useState<boolean>(false);

  // Selected task resolution
  const selectedTask = useMemo(() => {
    return tasks.find((t) => t.id === selectedTaskId) || tasks[0];
  }, [tasks, selectedTaskId]);

  // Active evidence source
  const activeEvidenceSource = useMemo(() => {
    if (!activeSourceId) return null;
    return mockEvidenceSources[activeSourceId] || null;
  }, [activeSourceId]);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
  }, []);

  const dismissToast = useCallback(() => {
    setToast((prev) => (prev ? { ...prev, visible: false } : null));
  }, []);

  // Select task
  const selectTask = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
    // Reset decision state on task switch
    setSelectedDecisionOption(null);
    setDraftContent('');
    setIsEditingDraft(false);
    setIsDecisionSheetOpen(false);
  }, []);

  // Select decision option
  const selectDecisionOption = useCallback((optionId: string) => {
    const option = nordicDecisionOptions.find((o) => o.id === optionId) || null;
    setSelectedDecisionOption(option);

    if (option) {
      if (option.id === 'pause-task') {
        // Direct pause trigger
        pauseTask(selectedTaskId);
        return;
      }

      setDraftContent(option.draftResponse || '');
      setIsDecisionSheetOpen(true);
      setIsEditingDraft(false);

      // Transition task status to draft_ready
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          if (t.id === selectedTaskId) {
            return {
              ...t,
              status: 'draft_ready',
              selectedDecisionId: option.id,
              draftContent: option.draftResponse || '',
            };
          }
          return t;
        })
      );
    }
  }, [selectedTaskId]);

  // Update draft content
  const updateDraft = useCallback((content: string) => {
    setDraftContent(content);
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === selectedTaskId) {
          return {
            ...t,
            draftContent: content,
          };
        }
        return t;
      })
    );
  }, [selectedTaskId]);

  // Approve and send simulated email
  const approveAndSend = useCallback(() => {
    if (isSendFailed) {
      showToast('Draft was not sent. Nothing changed in your inbox.', 'error');
      return;
    }

    // Append completed sent step, transition to monitoring
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === selectedTaskId) {
          const updatedTimeline = [
            ...t.timeline.slice(0, 4),
            {
              id: `step-sent-${Date.now()}`,
              time: '10:05',
              label: 'Sent response to Nordic Displays',
              detail: draftContent || 'Requested delivery date confirmation under €8,000.',
              status: 'completed' as const,
            },
            {
              id: `step-monitor-${Date.now()}`,
              time: 'Next',
              label: 'Awaiting vendor reply',
              detail: 'ActAI is actively monitoring Sofia Lindqvist’s response.',
              status: 'pending' as const,
            },
          ];

          return {
            ...t,
            status: 'monitoring' as const,
            nextAction: 'Monitoring reply from Sofia Lindqvist',
            exception: t.exception
              ? {
                  ...t.exception,
                  state: 'Reply sent at 10:05. Monitoring for vendor confirmation.',
                }
              : undefined,
            timeline: updatedTimeline,
          };
        }
        return t;
      })
    );

    setIsDecisionSheetOpen(false);
    showToast('Request sent. ActAI will monitor the reply.', 'success');
  }, [isSendFailed, selectedTaskId, draftContent, showToast]);

  // Pause task
  const pauseTask = useCallback((taskId?: string) => {
    const targetId = taskId || selectedTaskId;
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === targetId) {
          return {
            ...t,
            status: 'paused' as const,
            nextAction: 'Paused by you — automation stopped',
            exception: t.exception
              ? {
                  ...t.exception,
                  state: 'Automation paused by user. No action will be taken.',
                }
              : undefined,
          };
        }
        return t;
      })
    );
    setIsDecisionSheetOpen(false);
    showToast('Task paused. Automation halted.', 'info');
  }, [selectedTaskId, showToast]);

  // Resume task
  const resumeTask = useCallback((taskId?: string) => {
    const targetId = taskId || selectedTaskId;
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === targetId) {
          return {
            ...t,
            status: 'needs_decision' as const,
            nextAction: 'Waiting for your direction — no reply has been sent.',
            exception: t.exception
              ? {
                  ...t.exception,
                  state: 'Waiting for your direction — no reply has been sent.',
                }
              : undefined,
          };
        }
        return t;
      })
    );
    showToast('Task resumed.', 'info');
  }, [selectedTaskId, showToast]);

  // Reset to original PRD snapshot
  const resetToInitialState = useCallback(() => {
    setTasks(JSON.parse(JSON.stringify(initialTasks)));
    setSelectedTaskId('nordic-displays');
    setSelectedDecisionOption(null);
    setDraftContent('');
    setIsEditingDraft(false);
    setIsEvidenceDrawerOpen(false);
    setIsDecisionSheetOpen(false);
    setActiveSourceId(null);
    setIsLoading(false);
    setIsMissingEvidence(false);
    setIsSendFailed(false);
    showToast('Reset to initial state.', 'info');
  }, [showToast]);

  // Evidence drawer controls
  const openEvidenceDrawer = useCallback((sourceId: string) => {
    setActiveSourceId(sourceId);
    setIsEvidenceDrawerOpen(true);
  }, []);

  const closeEvidenceDrawer = useCallback(() => {
    setIsEvidenceDrawerOpen(false);
    setActiveSourceId(null);
  }, []);

  // Decision sheet controls
  const openDecisionSheet = useCallback((optionId?: string) => {
    if (optionId) {
      selectDecisionOption(optionId);
    } else {
      setIsDecisionSheetOpen(true);
    }
  }, [selectDecisionOption]);

  const closeDecisionSheet = useCallback(() => {
    setIsDecisionSheetOpen(false);
  }, []);

  const value: WorkflowContextValue = {
    activeScreen,
    tasks,
    selectedTaskId,
    selectedTask,
    selectedDecisionOption,
    draftContent,
    isEditingDraft,
    evidenceSources: mockEvidenceSources,
    activeEvidenceSource,
    isEvidenceDrawerOpen,
    isDecisionSheetOpen,
    toast,
    isLoading,
    isMissingEvidence,
    isSendFailed,

    setActiveScreen,
    selectTask,
    selectDecisionOption,
    updateDraft,
    setIsEditingDraft,
    approveAndSend,
    pauseTask,
    resumeTask,
    resetToInitialState,
    openEvidenceDrawer,
    closeEvidenceDrawer,
    openDecisionSheet,
    closeDecisionSheet,
    dismissToast,
    showToast,
    setIsLoading,
    setIsMissingEvidence,
    setIsSendFailed,
  };

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

export const useWorkflow = (): WorkflowContextValue => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

export default WorkflowContext;
