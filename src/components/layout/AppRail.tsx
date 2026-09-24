import React, { useState } from 'react';
import { useWorkflow } from '@/hooks/useWorkflow';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Sliders, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export interface AppRailProps {
  className?: string;
}

export const AppRail: React.FC<AppRailProps> = ({ className = '' }) => {
  const {
    activeScreen,
    setActiveScreen,
    tasks,
    isLoading,
    setIsLoading,
    isMissingEvidence,
    setIsMissingEvidence,
    isSendFailed,
    setIsSendFailed,
    resetToInitialState,
  } = useWorkflow();

  const [isSimOpen, setIsSimOpen] = useState(false);

  // Compute number of tasks requiring decision
  const pendingCount = tasks.filter((t) => t.status === 'needs_decision').length;

  return (
    <>
      {/* 1. Desktop Fixed Left Rail (docked >= 1140px / rail breakpoint) */}
      <aside
        className={`fixed top-7 left-7 z-20 w-[200px] hidden rail:flex flex-col justify-between h-[calc(100vh-3.5rem)] overflow-y-auto pr-1 ${className}`}
        aria-label="Application Rail"
      >
        {/* Top: Logo & Indexed Navigation */}
        <div className="flex flex-col">
          {/* ActAI Logo */}
          <div className="px-1 mb-8">
            <button
              type="button"
              onClick={() => setActiveScreen('today')}
              className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong rounded-md transition-opacity hover:opacity-80"
              aria-label="ActAI Home"
            >
              <Logo variant="wordmark" size="md" />
            </button>
          </div>

          {/* Numbered Index Navigation Items */}
          <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
            {/* 1.0 Delegation */}
            <button
              type="button"
              onClick={() => setActiveScreen('delegation')}
              className={`flex items-baseline gap-3 w-full text-left text-[0.95rem] transition-colors cursor-pointer rounded-lg px-4 py-2.5 ${
                activeScreen === 'delegation'
                  ? 'bg-surface text-ink-strong font-medium'
                  : 'text-foreground hover:bg-surface hover:text-ink-strong'
              }`}
            >
              <span className="text-[0.78rem] text-muted font-mono">1.0</span>
              <span>Delegation</span>
              {pendingCount > 0 && (
                <span className="ml-auto flex items-center justify-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.75rem] font-medium text-amber-700 dark:text-amber-400">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* 2.0 Today */}
            <button
              type="button"
              onClick={() => setActiveScreen('today')}
              className={`flex items-baseline gap-3 w-full text-left text-[0.95rem] transition-colors cursor-pointer rounded-lg px-4 py-2.5 ${
                activeScreen === 'today'
                  ? 'bg-surface text-ink-strong font-medium'
                  : 'text-foreground hover:bg-surface hover:text-ink-strong'
              }`}
            >
              <span className="text-[0.78rem] text-muted font-mono">2.0</span>
              <span>Today</span>
            </button>

            {/* 3.0 Activity */}
            <button
              type="button"
              onClick={() => setActiveScreen('activity')}
              className={`flex items-baseline gap-3 w-full text-left text-[0.95rem] transition-colors cursor-pointer rounded-lg px-4 py-2.5 ${
                activeScreen === 'activity'
                  ? 'bg-surface text-ink-strong font-medium'
                  : 'text-foreground hover:bg-surface hover:text-ink-strong'
              }`}
            >
              <span className="text-[0.78rem] text-muted font-mono">3.0</span>
              <span>Activity</span>
            </button>
          </nav>

          {/* Compact Simulation Flags Drawer (Desktop) */}
          <div className="mt-8 rounded-xl border border-rule bg-panel/70 p-3 text-[0.8rem]">
            <button
              type="button"
              onClick={() => setIsSimOpen(!isSimOpen)}
              className="flex w-full items-center justify-between text-[0.75rem] font-medium tracking-[0.1em] text-muted uppercase hover:text-ink-strong cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="size-3" />
                <span>Simulation Flags</span>
              </span>
              {isSimOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </button>

            {isSimOpen && (
              <div className="mt-3 space-y-2 border-t border-rule pt-2.5 text-[0.8rem]">
                <label className="flex items-center gap-2 cursor-pointer text-foreground hover:text-ink-strong">
                  <input
                    type="checkbox"
                    checked={isLoading}
                    onChange={(e) => setIsLoading(e.target.checked)}
                    className="rounded-[5px] accent-ink-strong"
                  />
                  <span>Loading Skeletons</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-foreground hover:text-ink-strong">
                  <input
                    type="checkbox"
                    checked={isMissingEvidence}
                    onChange={(e) => setIsMissingEvidence(e.target.checked)}
                    className="rounded-[5px] accent-ink-strong"
                  />
                  <span>Missing Evidence</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-foreground hover:text-ink-strong">
                  <input
                    type="checkbox"
                    checked={isSendFailed}
                    onChange={(e) => setIsSendFailed(e.target.checked)}
                    className="rounded-[5px] accent-ink-strong"
                  />
                  <span>Send Failure</span>
                </label>

                <button
                  type="button"
                  onClick={resetToInitialState}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded border border-rule bg-background py-1 text-[0.75rem] text-muted hover:text-ink-strong hover:bg-surface transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset State</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pinned: ThemeToggle & Subtle Metadata */}
        <div className="flex flex-col gap-3 px-1 pt-6">
          <ThemeToggle />
          <p className="text-[0.75rem] text-muted font-light leading-normal select-none">
            ActAI · Delegation Review
          </p>
        </div>
      </aside>

      {/* 2. Responsive Top Header Bar for Smaller Viewports (< 1140px / rail:hidden) */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-rule bg-background/90 px-4 sm:px-6 backdrop-blur-md rail:hidden">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setActiveScreen('today')}
            className="cursor-pointer focus-visible:outline-none"
            aria-label="ActAI Home"
          >
            <Logo variant="wordmark" size="sm" />
          </button>

          <nav className="flex items-center gap-1 sm:gap-1.5 text-[0.875rem]">
            {/* 1.0 Delegation */}
            <button
              type="button"
              onClick={() => setActiveScreen('delegation')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.825rem] sm:text-[0.875rem] transition-colors cursor-pointer ${
                activeScreen === 'delegation'
                  ? 'bg-surface font-medium text-ink-strong'
                  : 'text-muted hover:text-ink-strong'
              }`}
            >
              <span className="font-mono text-[0.75rem] text-muted">1.0</span>
              <span>Delegation</span>
              {pendingCount > 0 && (
                <span className="rounded-full bg-amber-500/10 px-1.5 py-0.2 text-[0.7rem] font-medium text-amber-700 dark:text-amber-400">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* 2.0 Today */}
            <button
              type="button"
              onClick={() => setActiveScreen('today')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.825rem] sm:text-[0.875rem] transition-colors cursor-pointer ${
                activeScreen === 'today'
                  ? 'bg-surface font-medium text-ink-strong'
                  : 'text-muted hover:text-ink-strong'
              }`}
            >
              <span className="font-mono text-[0.75rem] text-muted">2.0</span>
              <span>Today</span>
            </button>

            {/* 3.0 Activity */}
            <button
              type="button"
              onClick={() => setActiveScreen('activity')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.825rem] sm:text-[0.875rem] transition-colors cursor-pointer ${
                activeScreen === 'activity'
                  ? 'bg-surface font-medium text-ink-strong'
                  : 'text-muted hover:text-ink-strong'
              }`}
            >
              <span className="font-mono text-[0.75rem] text-muted">3.0</span>
              <span>Activity</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle showLabel={false} />
        </div>
      </header>
    </>
  );
};

export default AppRail;
