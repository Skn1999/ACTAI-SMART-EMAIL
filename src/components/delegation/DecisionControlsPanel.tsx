import React from 'react';
import { ArrowRight, Pause, Play, CheckCircle2, Clock } from 'lucide-react';
import { useWorkflow } from '@/context/WorkflowContext';

export interface DecisionControlsPanelProps {
  className?: string;
}

export const DecisionControlsPanel: React.FC<DecisionControlsPanelProps> = ({
  className = '',
}) => {
  const {
    selectedTask,
    selectDecisionOption,
    pauseTask,
    resumeTask,
  } = useWorkflow();

  const isPaused = selectedTask.status === 'paused';
  const isMonitoring = selectedTask.status === 'monitoring';
  const isNeedsDecision = selectedTask.status === 'needs_decision' || selectedTask.status === 'draft_ready';

  return (
    <section
      aria-labelledby="decision-controls-title"
      className={`border-t border-rule pt-6 ${className}`}
    >
      <div className="pb-3.5">
        <h3
          id="decision-controls-title"
          className="text-[0.78rem] tracking-[0.14em] uppercase text-muted font-medium"
        >
          YOUR DECISION (3 OPTIONS)
        </h3>
        <p className="mt-1 text-[0.825rem] text-muted leading-relaxed">
          {isNeedsDecision &&
            'Choose how the agent should proceed. No external action is taken until you approve.'}
          {isMonitoring &&
            'Response sent to Sofia Lindqvist. ActAI is actively monitoring for her reply.'}
          {isPaused &&
            'Automation paused by you. The email thread remains untouched in your inbox.'}
        </p>
      </div>

      {/* When Task is Paused: Prominent Resume Banner */}
      {isPaused && (
        <div className="mb-4 rounded-xl border border-rule bg-surface p-4 transition-all animate-rise">
          <div className="flex items-center gap-2 text-[0.85rem] font-medium text-foreground">
            <Pause className="size-4 text-muted" aria-hidden="true" />
            <span>Task automation is currently paused</span>
          </div>
          <p className="mt-1.5 text-[0.8rem] text-muted leading-relaxed">
            The agent will not take any external actions or draft replies until you resume.
          </p>
          <button
            type="button"
            onClick={() => resumeTask()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-ink-strong px-4 py-2.5 text-[0.875rem] font-medium text-background transition-opacity hover:opacity-90 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
          >
            <Play className="size-3.5 fill-current" aria-hidden="true" />
            <span>Resume task</span>
          </button>
        </div>
      )}

      {/* When Task is Monitoring: Sent Confirmation State */}
      {isMonitoring && (
        <div className="mb-4 rounded-xl border border-green-300/80 bg-green-50/50 p-4 dark:border-green-900/40 dark:bg-green-950/20 transition-all animate-rise">
          <div className="flex items-center gap-2 text-[0.85rem] font-medium text-green-800 dark:text-green-300">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            <span>Sent at 10:05 · Monitoring reply</span>
          </div>
          <p className="mt-1.5 text-[0.8rem] text-foreground/80 leading-relaxed">
            Response was dispatched to Sofia Lindqvist. ActAI will notify you immediately when a response arrives.
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-green-200/60 pt-2.5 text-[0.75rem] font-mono text-muted dark:border-green-900/30">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              <span>Next check: 10:30 CET</span>
            </span>
            <button
              type="button"
              onClick={() => pauseTask()}
              className="text-muted hover:text-ink-strong underline-offset-2 hover:underline cursor-pointer"
            >
              Pause monitoring
            </button>
          </div>
        </div>
      )}

      {/* Standard Decision Options (Always accessible or active when decision needed) */}
      <div className="space-y-3" role="group" aria-label="Decision action options">
        {/* Option 1: Primary Recommended Action */}
        <button
          type="button"
          onClick={() => selectDecisionOption('keep-date')}
          aria-label="Keep 15 Oct delivery: Ask vendor to maintain original schedule within budget."
          className="group relative flex w-full cursor-pointer flex-col rounded-xl bg-ink-strong p-4 text-left text-background transition-all hover:opacity-95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] font-medium tracking-[0.14em] uppercase text-background/70 font-mono">
                OPTION 1 · RECOMMENDED
              </span>
            </div>
            <ArrowRight
              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1.5 text-[0.95rem] font-medium leading-snug">
            Keep 15 Oct delivery
          </div>
          <p className="mt-1 text-[0.8rem] leading-relaxed text-background/80">
            Ask vendor to maintain original schedule within budget.
          </p>
        </button>

        {/* Option 2: Secondary Direction */}
        <button
          type="button"
          onClick={() => selectDecisionOption('accept-date')}
          aria-label="Accept 29 Oct delivery: Accept revised date and notify Maya."
          className="group relative flex w-full cursor-pointer flex-col rounded-xl border border-rule bg-background p-4 text-left text-ink-strong transition-all hover:bg-surface active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-medium tracking-[0.14em] uppercase text-muted font-mono">
              OPTION 2
            </span>
            <ArrowRight
              className="size-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink-strong"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1.5 text-[0.95rem] font-medium leading-snug">
            Accept 29 Oct delivery
          </div>
          <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
            Accept revised date and notify Maya.
          </p>
        </button>

        {/* Option 3: Pause Task (Safe Hand-off) */}
        <div className="pt-1.5">
          <button
            type="button"
            onClick={() => pauseTask()}
            aria-label="Pause task: Take over manually in your regular inbox."
            className="group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-[0.9rem] text-muted transition-colors hover:bg-surface hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
          >
            <div className="flex items-center gap-2.5">
              <Pause className="size-3.5 shrink-0 text-muted group-hover:text-ink-strong" aria-hidden="true" />
              <div>
                <span className="font-medium text-foreground group-hover:text-ink-strong">
                  Pause task
                </span>
                <span className="block text-[0.78rem] text-muted">
                  Take over manually in your regular inbox.
                </span>
              </div>
            </div>
            <span className="text-[0.75rem] font-mono text-muted">Halt</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DecisionControlsPanel;
