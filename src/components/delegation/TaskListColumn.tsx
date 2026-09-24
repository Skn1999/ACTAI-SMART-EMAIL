import React from 'react';
import { Task } from '@/types/task';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWorkflow } from '@/context/WorkflowContext';

export interface TaskListColumnProps {
  tasks?: Task[];
  selectedTaskId?: string;
  onSelectTask?: (taskId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const TaskListColumn: React.FC<TaskListColumnProps> = ({
  tasks: propTasks,
  selectedTaskId: propSelectedTaskId,
  onSelectTask: propOnSelectTask,
  isLoading: propIsLoading,
  className = '',
}) => {
  const workflow = useWorkflow();
  const tasks = propTasks ?? workflow.tasks;
  const selectedTaskId = propSelectedTaskId ?? workflow.selectedTaskId;
  const onSelectTask = propOnSelectTask ?? workflow.selectTask;
  const isLoading = propIsLoading ?? workflow.isLoading;

  const getStatusDot = (status: Task['status']) => {
    switch (status) {
      case 'needs_decision':
        return <span className="size-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />;
      case 'monitoring':
        return <span className="size-2 rounded-full bg-green-500" aria-hidden="true" />;
      case 'in_progress':
        return <span className="size-2 rounded-full bg-blue-500" aria-hidden="true" />;
      case 'paused':
        return <span className="size-2 rounded-full bg-muted/60" aria-hidden="true" />;
      case 'completed':
        return <span className="size-2 rounded-full bg-green-600" aria-hidden="true" />;
      default:
        return <span className="size-2 rounded-full bg-muted/50" aria-hidden="true" />;
    }
  };

  const getStatusLabelClass = (status: Task['status']) => {
    switch (status) {
      case 'needs_decision':
        return 'text-amber-700 dark:text-amber-400 font-medium';
      case 'monitoring':
        return 'text-green-700 dark:text-green-400 font-medium';
      case 'in_progress':
        return 'text-blue-700 dark:text-blue-400 font-medium';
      case 'paused':
        return 'text-muted font-normal';
      case 'completed':
        return 'text-green-700 dark:text-green-400 font-medium';
      default:
        return 'text-muted font-normal';
    }
  };

  return (
    <aside
      className={`w-full shrink-0 border-b border-rule bg-background p-6 lg:w-[280px] lg:border-b-0 lg:border-r ${className}`}
      aria-label="Tasks queue"
    >
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-[0.78rem] font-medium tracking-[0.14em] uppercase text-muted">
          Tasks ({tasks.length})
        </h2>
      </div>

      <div className="space-y-3" role="list">
        {isLoading ? (
          <div className="space-y-3" aria-busy="true" aria-label="Loading tasks">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ) : (
          tasks.map((task) => {
            const isSelected = task.id === selectedTaskId;
            const statusFormatted = task.status.replace('_', ' ');

            return (
              <div
                key={task.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => onSelectTask(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectTask(task.id);
                  }
                }}
                className={`group cursor-pointer rounded-xl border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isSelected
                    ? 'border-ink-strong bg-panel shadow-sm'
                    : 'border-rule bg-background hover:border-muted hover:bg-surface'
                }`}
              >
                <div className="flex items-center justify-between text-[0.8rem]">
                  <div className="flex items-center gap-2">
                    {getStatusDot(task.status)}
                    <span
                      className={`text-[0.75rem] tracking-[0.05em] uppercase ${getStatusLabelClass(
                        task.status
                      )}`}
                    >
                      {statusFormatted}
                    </span>
                  </div>
                  {task.updatedAt && (
                    <span className="font-mono text-[0.8rem] text-muted">{task.updatedAt}</span>
                  )}
                </div>

                <h3 className="mt-2 text-[0.95rem] font-medium leading-snug text-ink-strong">
                  {task.title}
                </h3>

                <p className="mt-1 text-[0.85rem] text-muted line-clamp-2 leading-relaxed">
                  {task.nextAction || task.goal}
                </p>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default TaskListColumn;
