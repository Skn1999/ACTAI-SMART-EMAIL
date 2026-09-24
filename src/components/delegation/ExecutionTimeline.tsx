import React from 'react';
import { TimelineStep, TaskStatus } from '@/types/task';
import { ThinkingOrb } from 'thinking-orbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWorkflow } from '@/context/WorkflowContext';

export interface ExecutionTimelineProps {
  steps?: TimelineStep[];
  taskStatus?: TaskStatus;
  onOpenSource?: (sourceId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({
  steps: propSteps,
  taskStatus: propTaskStatus,
  onOpenSource: propOnOpenSource,
  isLoading: propIsLoading,
  className = '',
}) => {
  const workflow = useWorkflow();
  const steps = propSteps ?? workflow.selectedTask.timeline;
  const taskStatus = propTaskStatus ?? workflow.selectedTask.status;
  const onOpenSource = propOnOpenSource ?? workflow.openEvidenceDrawer;
  const isLoading = propIsLoading ?? workflow.isLoading;

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`} aria-busy="true">
        <Skeleton className="h-5 w-40 rounded" />
        <div className="ml-3 border-l border-rule pl-6 space-y-6">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  const isMonitoring = taskStatus === 'monitoring';

  return (
    <div className={className}>
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-[0.78rem] font-medium tracking-[0.14em] uppercase text-muted">
          Execution Record & Timeline
        </h2>
        <span className="font-mono text-[0.8rem] text-muted">
          {steps.length} {steps.length === 1 ? 'event' : 'events'} logged
        </span>
      </div>

      {/* Chronological Timeline with connecting hairline rule */}
      <div className="relative ml-3 border-l border-rule pl-6 space-y-6" role="list">
        {steps.map((step, idx) => {
          const isDone = step.status === 'completed';
          const isActionable = step.status === 'needs_decision';
          const isPending = step.status === 'pending';
          const isLastStep = idx === steps.length - 1;
          const showMonitoringOrb = isMonitoring && (isLastStep || isPending);

          return (
            <div key={step.id} className="relative group" role="listitem">
              {/* Dot indicator aligned with hairline rule */}
              <span
                className={`absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background transition-colors ${
                  isDone
                    ? 'bg-green-600'
                    : isActionable
                    ? 'bg-amber-500 animate-pulse ring-4 ring-amber-500/20'
                    : 'bg-muted/40'
                }`}
                aria-hidden="true"
              />

              {/* Time & Evidence Source Link */}
              <div className="flex items-baseline justify-between text-[0.85rem]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.8rem] text-muted">{step.time}</span>
                  {isActionable && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.2 text-[0.72rem] font-medium text-amber-700 dark:text-amber-400">
                      Needs your decision
                    </span>
                  )}
                  {showMonitoringOrb && (
                    <span className="inline-flex items-center gap-1.5 text-[0.75rem] text-muted">
                      <ThinkingOrb state="searching" size={20} />
                      <span className="font-mono text-[0.72rem] uppercase tracking-wider text-green-700 dark:text-green-400">
                        Live monitoring
                      </span>
                    </span>
                  )}
                </div>

                {step.sourceId && (
                  <button
                    type="button"
                    onClick={() => onOpenSource(step.sourceId!)}
                    className="cursor-pointer text-[0.8rem] text-muted underline-offset-4 transition-colors hover:text-ink-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong rounded"
                  >
                    View source
                  </button>
                )}
              </div>

              {/* Step Label */}
              <h3
                className={`mt-1 text-[0.95rem] leading-snug ${
                  isActionable
                    ? 'font-medium text-ink-strong'
                    : isDone
                    ? 'font-normal text-foreground'
                    : 'font-normal text-muted'
                }`}
              >
                {step.label}
              </h3>

              {/* Step Detail */}
              {step.detail && (
                <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
                  {step.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionTimeline;
