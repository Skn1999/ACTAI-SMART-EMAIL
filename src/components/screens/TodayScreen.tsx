import React from 'react';
import { ArrowRight, Clock, CheckCircle2, Pause } from 'lucide-react';
import { BotAvatar } from 'bot-avatars';
import { useWorkflow } from '@/context/WorkflowContext';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export interface TodayScreenProps {
  className?: string;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({ className = '' }) => {
  const { tasks, selectTask, setActiveScreen, isLoading } = useWorkflow();

  const attentionTask =
    tasks.find((t) => t.status === 'needs_decision') ||
    tasks.find((t) => t.id === 'nordic-displays') ||
    tasks[0];

  const quietTasks = tasks.filter((t) => t.id !== attentionTask?.id);

  const handleOpenTask = (taskId: string) => {
    selectTask(taskId);
    setActiveScreen('delegation');
  };

  return (
    <div className={`mx-auto max-w-4xl p-6 sm:p-10 space-y-10 ${className}`}>
      {/* Header with Greeting & Agent Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-rule pb-8">
        <div>
          <div className="flex items-center gap-2 text-[0.78rem] tracking-[0.14em] uppercase font-mono text-muted">
            <span>SCREEN A · AGENT OVERVIEW</span>
            <span className="h-3 w-px bg-rule" />
            <span>24 SEP 2026</span>
          </div>
          <h1 className="mt-2 text-[2.2rem] sm:text-[2.75rem] font-light leading-[1.12] tracking-[-0.03em] text-ink-strong">
            Good morning, Alex
          </h1>
          <p className="mt-2 text-[1.05rem] text-muted font-light">
            2 tasks in progress · <span className="text-amber-700 dark:text-amber-400 font-medium">1 needs you</span>
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-rule bg-panel p-4 self-start sm:self-auto shadow-sm">
          <BotAvatar
            type="clover"
            state={attentionTask?.status === 'needs_decision' ? 'default' : 'working'}
          />
          <div>
            <div className="text-[0.75rem] font-mono uppercase tracking-[0.1em] text-muted">
              Agent Identity
            </div>
            <div className="text-[0.95rem] font-medium text-ink-strong">ActAI Assistant</div>
            <div className="text-[0.78rem] text-muted">Stockholm Procurement</div>
          </div>
        </div>
      </div>

      {/* Primary "Needs Your Decision" Card */}
      <section aria-labelledby="decision-card-title">
        <div className="pb-3 flex items-center justify-between">
          <h2
            id="decision-card-title"
            className="text-[0.78rem] tracking-[0.14em] uppercase text-muted font-medium"
          >
            ACTION REQUIRED (1 TASK)
          </h2>
          <span className="text-[0.8rem] font-mono text-muted">10:03 CET</span>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-rule bg-panel p-8 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div
            onClick={() => handleOpenTask(attentionTask.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenTask(attentionTask.id)}
            className="group cursor-pointer rounded-2xl border border-amber-300/80 bg-panel p-6 sm:p-8 shadow-sm transition-all hover:border-amber-400 hover:shadow-md dark:border-amber-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-amber-500 animate-pulse" />
                <Badge variant="decision" size="sm">
                  {attentionTask.status === 'paused' ? 'Paused by you' : 'Decision needed · 10:03'}
                </Badge>
              </div>
              <span className="font-mono text-[0.8rem] text-muted">
                Task ID: {attentionTask.id}
              </span>
            </div>

            <h3 className="mt-4 text-[1.45rem] font-light leading-[1.3] text-ink-strong tracking-[-0.01em]">
              {attentionTask.title}
            </h3>

            <p className="mt-2 text-[1rem] leading-[1.6] text-foreground">
              {attentionTask.exception?.summary ||
                'Vendor offered lower price with later delivery date. Waiting for your direction before responding.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {attentionTask.constraints.map((c) => (
                <Badge key={c} variant="chip" size="sm">
                  {c}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
              <span className="text-[0.85rem] text-muted">
                Waiting for your direction — no reply has been sent.
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-ink-strong group-hover:translate-x-1 transition-transform">
                <span>Review task</span>
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Quiet Background Tasks Section */}
      <section aria-labelledby="quiet-tasks-title" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="quiet-tasks-title"
            className="text-[0.78rem] tracking-[0.14em] uppercase text-muted font-medium"
          >
            ACTIVE WORKFLOWS ({quietTasks.length})
          </h2>
          <span className="text-[0.8rem] font-mono text-muted">Autonomous queue</span>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ) : (
          <div className="space-y-3">
            {quietTasks.map((t) => {
              const isMonitoring = t.status === 'monitoring';
              const isPaused = t.status === 'paused';

              return (
                <div
                  key={t.id}
                  onClick={() => handleOpenTask(t.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenTask(t.id)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-rule bg-background p-4 sm:p-5 transition-all hover:border-muted hover:bg-surface cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isMonitoring ? (
                        <CheckCircle2 className="size-3.5 text-green-600 dark:text-green-400" />
                      ) : isPaused ? (
                        <Pause className="size-3.5 text-muted" />
                      ) : (
                        <Clock className="size-3.5 text-blue-500" />
                      )}
                      <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-muted font-mono">
                        {t.status.replace('_', ' ')}
                      </span>
                      <span className="text-[0.75rem] text-muted font-mono">· {t.updatedAt}</span>
                    </div>

                    <h4 className="text-[1.05rem] font-medium text-ink-strong">{t.title}</h4>
                    <p className="text-[0.85rem] text-muted line-clamp-1">{t.goal}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[0.85rem] font-medium text-muted group-hover:text-ink-strong shrink-0">
                    <span>Inspect</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default TodayScreen;
