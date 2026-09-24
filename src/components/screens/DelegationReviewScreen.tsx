import React from 'react';
import { useWorkflow } from '@/context/WorkflowContext';
import { TaskListColumn } from '@/components/delegation/TaskListColumn';
import { OutcomeHeader } from '@/components/delegation/OutcomeHeader';
import { ExceptionCard } from '@/components/delegation/ExceptionCard';
import { ExecutionTimeline } from '@/components/delegation/ExecutionTimeline';
import { EvidenceSection } from '@/components/delegation/EvidenceSection';
import { SourceInspectorDrawer } from '@/components/delegation/SourceInspectorDrawer';
import { ArrowRight, Pause, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface DelegationReviewScreenProps {
  className?: string;
  onNavigateToToday?: () => void;
}

export const DelegationReviewScreen: React.FC<DelegationReviewScreenProps> = ({
  className = '',
  onNavigateToToday,
}) => {
  const {
    tasks,
    selectedTaskId,
    selectedTask,
    selectTask,
    selectDecisionOption,
    pauseTask,
    resumeTask,
    evidenceSources,
    activeEvidenceSource,
    isEvidenceDrawerOpen,
    openEvidenceDrawer,
    closeEvidenceDrawer,
    isLoading,
    isMissingEvidence,
    setActiveScreen,
  } = useWorkflow();

  const handleBackToToday = () => {
    if (onNavigateToToday) {
      onNavigateToToday();
    } else {
      setActiveScreen('today');
    }
  };

  const isNeedsDecision = selectedTask.status === 'needs_decision';
  const isPaused = selectedTask.status === 'paused';
  const isMonitoring = selectedTask.status === 'monitoring';

  return (
    <div
      className={`flex flex-1 flex-col min-w-0 lg:flex-row ${className}`}
    >
      {/* Column 1: Task List (Left, 280px) */}
      <TaskListColumn
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        onSelectTask={selectTask}
        isLoading={isLoading}
      />

      {/* Main Workspace Frame (Columns 2 & 3) */}
      <div className="flex flex-1 flex-col min-w-0 lg:flex-row">
        {/* Column 2: Center Execution Record (flex-1, max-w-[680px]) */}
        <main
          className="flex-1 min-w-0 p-6 sm:p-8 max-w-[680px] border-b border-rule lg:border-b-0 lg:border-r space-y-8"
          aria-label="Execution Record and Timeline"
        >
          {/* Outcome Header & Delegated Goal Card */}
          <OutcomeHeader
            task={selectedTask}
            isLoading={isLoading}
            onBack={handleBackToToday}
          />

          {/* Prominent Exception Card ("Changed Condition") */}
          <ExceptionCard
            task={selectedTask}
            onResume={() => resumeTask(selectedTask.id)}
            isLoading={isLoading}
          />

          {/* Chronological Vertical Execution Timeline */}
          <ExecutionTimeline
            steps={selectedTask.timeline}
            taskStatus={selectedTask.status}
            onOpenSource={openEvidenceDrawer}
            isLoading={isLoading}
          />
        </main>

        {/* Column 3: Evidence & Decision Controls (Right, 360px) */}
        <aside
          className="w-full shrink-0 bg-background p-6 sm:p-8 lg:w-[360px] space-y-8"
          aria-label="Evidence sources and decision controls"
        >
          {/* Evidence Section ("What ActAI is using") */}
          <EvidenceSection
            evidenceIds={selectedTask.evidenceIds}
            evidenceSources={evidenceSources}
            isMissingEvidence={isMissingEvidence}
            isLoading={isLoading}
            onOpenSource={openEvidenceDrawer}
          />

          {/* Decision Section ("Your Decision") */}
          <div className="border-t border-rule pt-6">
            <div className="pb-3">
              <h3 className="text-[0.78rem] font-medium tracking-[0.14em] uppercase text-muted">
                Your Decision
              </h3>
              <p className="mt-1 text-[0.825rem] text-muted leading-relaxed">
                Choose how the agent should proceed. No action is taken until you approve.
              </p>
            </div>

            {/* When task is in monitoring status */}
            {isMonitoring && (
              <div className="mt-3 rounded-xl border border-green-300/80 bg-panel p-4 text-[0.85rem] dark:border-green-900/40">
                <div className="flex items-center gap-2 font-medium text-green-700 dark:text-green-400">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>Reply sent at 10:05</span>
                </div>
                <p className="mt-1 text-muted text-[0.8rem]">
                  ActAI is actively monitoring Sofia Lindqvist’s response. You will be notified when a reply arrives.
                </p>
                <div className="mt-3 pt-3 border-t border-rule">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => pauseTask(selectedTask.id)}
                    leftIcon={<Pause className="size-3.5" />}
                  >
                    Pause task
                  </Button>
                </div>
              </div>
            )}

            {/* When task is paused */}
            {isPaused && (
              <div className="mt-3 rounded-xl border border-rule bg-panel p-4 text-[0.85rem] text-muted space-y-3">
                <div className="flex items-center gap-2 font-medium text-ink-strong">
                  <Pause className="size-4" />
                  <span>Task is paused</span>
                </div>
                <p className="text-[0.8rem]">
                  Automation is halted. No messages or external commitments will be dispatched.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => resumeTask(selectedTask.id)}
                  leftIcon={<Play className="size-3.5" />}
                >
                  Resume task
                </Button>
              </div>
            )}

            {/* When decision options are available */}
            {isNeedsDecision && selectedTask.decisionOptions && (
              <div className="mt-3 space-y-3" role="group" aria-label="Decision choices">
                {selectedTask.decisionOptions.map((opt, idx) => {
                  const isPrimary = idx === 0;
                  const isPause = opt.id === 'pause-task';

                  if (isPause) {
                    return (
                      <div key={opt.id} className="pt-2">
                        <button
                          type="button"
                          onClick={() => pauseTask(selectedTask.id)}
                          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-center text-[0.875rem] text-muted transition-colors hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
                        >
                          <Pause className="size-3.5" aria-hidden="true" />
                          <span>{opt.title}</span>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectDecisionOption(opt.id)}
                      className={`group flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3.5 text-left text-[0.95rem] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
                        isPrimary
                          ? 'bg-ink-strong font-medium text-background hover:opacity-90 active:scale-[0.99]'
                          : 'border border-rule bg-background text-ink-strong hover:bg-surface active:scale-[0.99]'
                      }`}
                    >
                      <div className="pr-3">
                        <div className="font-medium">{opt.title}</div>
                        <div
                          className={`mt-0.5 line-clamp-1 text-[0.78rem] ${
                            isPrimary ? 'text-background/80' : 'text-muted'
                          }`}
                        >
                          {opt.description}
                        </div>
                      </div>
                      <ArrowRight
                        className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Source Inspector Drawer */}
      <SourceInspectorDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={closeEvidenceDrawer}
        source={activeEvidenceSource}
      />
    </div>
  );
};

export default DelegationReviewScreen;
