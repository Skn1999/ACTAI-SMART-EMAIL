import React from 'react';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWorkflow } from '@/context/WorkflowContext';

export interface OutcomeHeaderProps {
  task?: Task;
  isLoading?: boolean;
  onBack?: () => void;
  className?: string;
}

export const OutcomeHeader: React.FC<OutcomeHeaderProps> = ({
  task: propTask,
  isLoading: propIsLoading,
  onBack,
  className = '',
}) => {
  const workflow = useWorkflow();
  const task = propTask ?? workflow.selectedTask;
  const isLoading = propIsLoading ?? workflow.isLoading;

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`} aria-busy="true">
        <Skeleton className="h-6 w-48 rounded" />
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  const renderStatusBadge = () => {
    switch (task.status) {
      case 'needs_decision':
        return (
          <Badge variant="decision" size="sm" dot>
            Decision needed
          </Badge>
        );
      case 'paused':
        return (
          <Badge variant="paused" size="sm" dot>
            Paused by you
          </Badge>
        );
      case 'monitoring':
        return (
          <Badge variant="muted" size="sm" dot dotColor="bg-green-500">
            Monitoring reply
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="completed" size="sm" dot>
            Completed
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="outline" size="sm" dot dotColor="bg-blue-500">
            In progress
          </Badge>
        );
      default:
        return (
          <Badge variant="muted" size="sm" dot>
            {task.status.replace('_', ' ')}
          </Badge>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Breadcrumb / Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="cursor-pointer text-[0.8rem] text-muted transition-colors hover:text-ink-strong"
              aria-label="Back to overview"
            >
              ← Today
            </button>
          )}
          <span className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-muted">
            TASK ID: {task.id}
          </span>
        </div>
        <div>{renderStatusBadge()}</div>
      </div>

      {/* Main Title */}
      <h1 className="text-[1.8rem] font-light leading-[1.2] tracking-[-0.03em] text-ink-strong sm:text-[2.2rem]">
        {task.title}
      </h1>

      {/* Delegated Goal Card */}
      <div className="rounded-xl border border-rule bg-panel p-5 shadow-sm">
        <span className="text-[0.78rem] font-medium tracking-[0.14em] uppercase text-muted">
          Delegated Objective
        </span>
        <p className="mt-2 text-[1.05rem] font-light leading-[1.6] text-foreground">
          {task.goal}
        </p>

        {/* Constraint Chips */}
        {task.constraints && task.constraints.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Goal constraints">
            {task.constraints.map((constraint) => (
              <span
                key={constraint}
                className="inline-block rounded-full bg-chip px-3.5 py-1 text-[0.85rem] font-normal text-ink-strong"
              >
                {constraint}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutcomeHeader;
