import React from 'react';
import { Task } from '@/types/task';
import { useWorkflow } from '@/hooks/useWorkflow';
import { ArrowRight } from 'lucide-react';

export interface QuietTaskCardProps {
  task: Task;
  className?: string;
  onSelect?: () => void;
}

export const QuietTaskCard: React.FC<QuietTaskCardProps> = ({
  task,
  className = '',
  onSelect,
}) => {
  const { selectTask, setActiveScreen } = useWorkflow();

  const handleSelect = () => {
    selectTask(task.id);
    setActiveScreen('delegation');
    if (onSelect) {
      onSelect();
    }
  };

  const isMonitoring = task.status === 'monitoring';
  const isInProgress = task.status === 'in_progress';
  const isPaused = task.status === 'paused';

  const statusLabel = isMonitoring
    ? 'Monitoring reply'
    : isInProgress
    ? 'In progress'
    : isPaused
    ? 'Paused'
    : task.status.replace('_', ' ');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
      className={`group cursor-pointer rounded-xl border border-rule bg-panel/60 p-5 sm:p-6 transition-all hover:bg-panel hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          {isMonitoring && <span className="size-2 rounded-full bg-green-500" />}
          {isInProgress && <span className="size-2 rounded-full bg-blue-500" />}
          {isPaused && <span className="size-2 rounded-full bg-muted/60" />}
          {!isMonitoring && !isInProgress && !isPaused && (
            <span className="size-2 rounded-full bg-muted/50" />
          )}

          <span
            className={`text-[0.78rem] font-medium tracking-[0.05em] uppercase ${
              isMonitoring
                ? 'text-green-700 dark:text-green-400'
                : isInProgress
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-muted'
            }`}
          >
            {statusLabel}
          </span>
        </div>

        {/* Updated Time */}
        <span className="text-[0.825rem] text-muted font-mono">{task.updatedAt}</span>
      </div>

      {/* Title & Next Action */}
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-[1.125rem] font-medium leading-[1.3] text-ink-strong group-hover:text-ink-strong transition-colors">
            {task.title}
          </h4>
          <p className="mt-1.5 text-[0.875rem] text-muted line-clamp-1 leading-relaxed">
            {task.nextAction || task.goal}
          </p>
        </div>

        <div className="shrink-0 pt-1 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink-strong">
          <ArrowRight className="size-4" />
        </div>
      </div>
    </div>
  );
};

export default QuietTaskCard;
