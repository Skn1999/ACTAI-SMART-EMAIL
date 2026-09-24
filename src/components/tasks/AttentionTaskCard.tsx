import React from 'react';
import { Task } from '@/types/task';
import { useWorkflow } from '@/hooks/useWorkflow';
import { ArrowRight } from 'lucide-react';

export interface AttentionTaskCardProps {
  task?: Task;
  className?: string;
  onReview?: () => void;
}

export const AttentionTaskCard: React.FC<AttentionTaskCardProps> = ({
  task,
  className = '',
  onReview,
}) => {
  const { tasks, selectTask, setActiveScreen } = useWorkflow();

  // Resolve target task: passed prop, or first needs_decision task, or fallback to first task
  const targetTask =
    task ||
    tasks.find((t) => t.status === 'needs_decision') ||
    tasks.find((t) => t.id === 'nordic-displays') ||
    tasks[0];

  const handleReview = () => {
    if (targetTask) {
      selectTask(targetTask.id);
    }
    setActiveScreen('delegation');
    if (onReview) {
      onReview();
    }
  };

  const plainSummary =
    targetTask?.exception?.summary ||
    'Vendor offered lower price with later delivery date. Waiting for your direction before responding.';

  const objective =
    targetTask?.goal ||
    'Secure a revised quote under €8,000 and schedule review with Maya before Friday.';

  const constraints = targetTask?.constraints && targetTask.constraints.length > 0
    ? targetTask.constraints
    : ['Budget ≤ €8,000', 'Do not confirm delivery changes without me', 'Due Friday'];

  const updatedTime = targetTask?.updatedAt || '10:03';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleReview}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleReview();
        }
      }}
      className={`group cursor-pointer rounded-xl border border-rule bg-panel p-6 sm:p-8 hover:border-muted transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${className}`}
    >
      {/* Top Header Row: Amber Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-500/10 px-3.5 py-1 text-[0.8rem] font-medium tracking-[0.05em] text-amber-700 dark:border-amber-900/40 dark:text-amber-400">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Decision needed · {updatedTime}</span>
        </div>
        <span className="text-[0.78rem] text-muted font-mono tracking-[0.08em] uppercase">
          Requires direction
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-[1.25rem] font-medium leading-[1.3] text-ink-strong group-hover:text-ink-strong transition-colors">
        {targetTask?.title || 'Negotiate Nordic Displays quote'}
      </h3>

      {/* Plain Summary */}
      <p className="mt-2.5 text-[1.05rem] leading-[1.65] font-light text-foreground">
        {plainSummary}
      </p>

      {/* Objective Container */}
      <div className="mt-6 rounded-lg border border-rule/80 bg-background/50 p-4 sm:p-5">
        <span className="text-[0.78rem] font-medium tracking-[0.14em] text-muted uppercase">
          Delegated Objective
        </span>
        <p className="mt-1 text-[0.95rem] leading-[1.6] text-foreground">
          {objective}
        </p>

        {/* Constraints Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {constraints.map((constraint) => (
            <span
              key={constraint}
              className="inline-block rounded-full bg-chip px-3.5 py-1 text-[0.85rem] font-normal text-ink-strong"
            >
              {constraint}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-rule/60">
        <div className="text-[0.85rem] text-muted">
          <span>Status: </span>
          <span className="font-medium text-ink-strong">
            {targetTask?.exception?.state || 'Waiting for your direction — no reply has been sent.'}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleReview();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink-strong px-5 py-2.5 text-[0.95rem] font-medium text-background transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer self-start sm:self-auto"
        >
          <span>Review task</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default AttentionTaskCard;
