import React from 'react';
import { Task } from '@/types/task';
import { ThinkingOrb } from 'thinking-orbs';
import { useWorkflow } from '@/context/WorkflowContext';

export interface ExceptionCardProps {
  task?: Task;
  onResume?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const ExceptionCard: React.FC<ExceptionCardProps> = ({
  task: propTask,
  onResume: propOnResume,
  isLoading: propIsLoading,
  className = '',
}) => {
  const workflow = useWorkflow();
  const task = propTask ?? workflow.selectedTask;
  const onResume = propOnResume ?? workflow.resumeTask;
  const isLoading = propIsLoading ?? workflow.isLoading;

  // PRD empty/loading state handling
  if (isLoading) {
    return (
      <div
        className={`rounded-xl border border-rule bg-panel p-6 shadow-sm ${className}`}
        aria-busy="true"
      >
        <div className="flex items-center gap-3">
          <ThinkingOrb state="weaving" size={20} />
          <span className="text-[0.85rem] text-muted">Reviewing latest update…</span>
        </div>
      </div>
    );
  }

  const exception = task.exception;
  if (!exception) {
    return null;
  }

  const isPaused = task.status === 'paused';

  return (
    <section
      aria-label="Task exception alert"
      className={`rounded-xl border border-amber-300/80 bg-panel p-6 shadow-sm dark:border-amber-900/40 ${className}`}
    >
      {/* Header with live AI state */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
          <span className="text-[0.8rem] font-medium tracking-[0.1em] text-amber-700 uppercase dark:text-amber-400">
            {exception.title}
          </span>
          <div className="ml-1 inline-flex items-center" title="Agent actively evaluating state">
            <ThinkingOrb state="weaving" size={20} />
          </div>
        </div>
        {task.updatedAt && (
          <span className="font-mono text-[0.8rem] text-muted">{task.updatedAt}</span>
        )}
      </div>

      {/* Plain Statement */}
      <h3 className="mt-3 text-[1.2rem] font-light leading-[1.3] text-ink-strong sm:text-[1.25rem]">
        {exception.summary}
      </h3>

      {/* Impact Statement */}
      <p className="mt-2 text-[0.95rem] leading-[1.6] text-foreground">
        {exception.impact}
      </p>

      {/* Safe Assurance Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-4 text-[0.85rem] text-muted">
        <span>Status: {exception.state}</span>

        {isPaused ? (
          <button
            type="button"
            onClick={() => onResume(task.id)}
            className="cursor-pointer font-medium text-ink-strong underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong rounded"
          >
            Resume task →
          </button>
        ) : (
          <span className="font-medium text-ink-strong">
            Waiting for your direction — no reply has been sent.
          </span>
        )}
      </div>
    </section>
  );
};

export default ExceptionCard;
