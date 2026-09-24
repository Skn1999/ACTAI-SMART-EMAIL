import React from 'react';
import { useWorkflow } from '@/hooks/useWorkflow';
import { ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const ActivityScreen: React.FC = () => {
  const { tasks, selectTask, setActiveScreen } = useWorkflow();

  // Aggregate all timeline steps across all tasks with metadata
  const allActivities = tasks.flatMap((task) =>
    task.timeline.map((step) => ({
      ...step,
      taskId: task.id,
      taskTitle: task.title,
    }))
  );

  return (
    <div className="mx-auto max-w-4xl py-6 px-4 sm:px-8 space-y-8 page-body">
      <header className="pb-6 border-b border-rule">
        <div className="text-[0.78rem] tracking-[0.14em] text-muted uppercase font-mono mb-2">
          3.0 Activity Log
        </div>
        <h1 className="text-[2rem] sm:text-[2.5rem] font-light leading-[1.16] tracking-[-0.03em] text-ink-strong">
          Audit Trail & Activity
        </h1>
        <p className="text-[1.0625rem] text-muted mt-2">
          Verifiable execution history of autonomous actions taken across all workflows.
        </p>
      </header>

      <div className="space-y-4">
        {allActivities.map((activity, idx) => {
          const isNeedsDecision = activity.status === 'needs_decision';
          const isCompleted = activity.status === 'completed';

          return (
            <div
              key={`${activity.taskId}-${activity.id}-${idx}`}
              className="flex items-start gap-4 rounded-xl border border-rule bg-panel/50 p-5 transition-all hover:bg-panel hover:border-muted"
            >
              <div className="mt-1 shrink-0">
                {isCompleted && <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />}
                {isNeedsDecision && <AlertCircle className="size-4 text-amber-600 dark:text-amber-400 animate-pulse" />}
                {!isCompleted && !isNeedsDecision && <Clock className="size-4 text-muted" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[0.75rem] font-mono text-muted">{activity.time}</span>
                  <button
                    type="button"
                    onClick={() => {
                      selectTask(activity.taskId);
                      setActiveScreen('delegation');
                    }}
                    className="inline-flex items-center gap-1 text-[0.78rem] text-muted hover:text-ink-strong transition-colors cursor-pointer"
                  >
                    <span>{activity.taskTitle}</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>

                <h4 className="mt-1 text-[1rem] font-medium text-ink-strong">
                  {activity.label}
                </h4>

                {activity.detail && (
                  <p className="mt-1 text-[0.875rem] text-muted leading-relaxed">
                    {activity.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityScreen;
