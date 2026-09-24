import React, { useState } from 'react';
import {
  RotateCcw,
  Sliders,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Loader2,
  FileQuestion,
  LayoutGrid,
  CheckCircle,
} from 'lucide-react';
import { useWorkflow } from '@/context/WorkflowContext';
import { useTheme } from '@/hooks/useTheme';

export interface EvaluatorBarProps {
  className?: string;
}

export const EvaluatorBar: React.FC<EvaluatorBarProps> = ({ className = '' }) => {
  const {
    activeScreen,
    setActiveScreen,
    isLoading,
    setIsLoading,
    isMissingEvidence,
    setIsMissingEvidence,
    isSendFailed,
    setIsSendFailed,
    resetToInitialState,
  } = useWorkflow();

  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Reviewer and Evaluator Scenario Controls"
      className={`fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ease-out ${
        isCollapsed ? 'translate-y-1' : ''
      } ${className}`}
    >
      <div className="flex max-w-[95vw] flex-wrap items-center gap-2.5 rounded-2xl border border-rule bg-panel/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md text-[0.825rem]">
        {/* Header Badge & Expand/Collapse */}
        <div className="flex items-center gap-2 pr-1">
          <div className="flex items-center gap-1.5 rounded-md bg-chip px-2 py-1 text-[0.72rem] font-mono font-medium text-muted uppercase tracking-wider">
            <Sliders className="size-3 text-ink-strong" aria-hidden="true" />
            <span className="hidden sm:inline">Evaluator Controls</span>
            <span className="sm:hidden">QA</span>
          </div>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand evaluator controls' : 'Collapse evaluator controls'}
            title={isCollapsed ? 'Expand evaluator controls' : 'Collapse evaluator controls'}
            className="rounded p-1 text-muted hover:bg-surface hover:text-ink-strong transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>
        </div>

        {!isCollapsed && (
          <>
            <span className="hidden h-5 w-px bg-rule md:block" aria-hidden="true" />

            {/* View Switcher: Screen A (Today) vs Screen B (Delegation) */}
            <div
              role="group"
              aria-label="Prototype Screen Switcher"
              className="flex items-center rounded-lg border border-rule bg-background p-0.5"
            >
              <button
                type="button"
                onClick={() => setActiveScreen('today')}
                aria-pressed={activeScreen === 'today'}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[0.8rem] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
                  activeScreen === 'today'
                    ? 'bg-ink-strong text-background'
                    : 'text-muted hover:text-ink-strong'
                }`}
                title="Screen A: Calm overview of today's agent queue"
              >
                <LayoutGrid className="size-3" aria-hidden="true" />
                <span>Today (Screen A)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveScreen('delegation')}
                aria-pressed={activeScreen === 'delegation'}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[0.8rem] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
                  activeScreen === 'delegation'
                    ? 'bg-ink-strong text-background'
                    : 'text-muted hover:text-ink-strong'
                }`}
                title="Screen B: Three-column bounded oversight workspace"
              >
                <CheckCircle className="size-3" aria-hidden="true" />
                <span>Delegation (Screen B)</span>
              </button>
            </div>

            <span className="hidden h-5 w-px bg-rule lg:block" aria-hidden="true" />

            {/* Simulation Toggles */}
            <div
              role="group"
              aria-label="Simulation Scenarios"
              className="flex items-center gap-1.5 flex-wrap"
            >
              {/* Simulate Loading */}
              <button
                type="button"
                onClick={() => setIsLoading(!isLoading)}
                aria-pressed={isLoading}
                title="Simulate background agent sync with pulsing skeletons"
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.78rem] font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
                  isLoading
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-300'
                    : 'border-rule bg-background text-muted hover:text-ink-strong'
                }`}
              >
                <Loader2 className={`size-3 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>Loading</span>
              </button>

              {/* Simulate Missing Evidence */}
              <button
                type="button"
                onClick={() => setIsMissingEvidence(!isMissingEvidence)}
                aria-pressed={isMissingEvidence}
                title="Simulate deleted or unavailable evidence source (tests graceful halt)"
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.78rem] font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
                  isMissingEvidence
                    ? 'border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-400 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'border-rule bg-background text-muted hover:text-ink-strong'
                }`}
              >
                <FileQuestion className="size-3" aria-hidden="true" />
                <span>Missing Evidence</span>
              </button>

              {/* Simulate Send Failure */}
              <button
                type="button"
                onClick={() => setIsSendFailed(!isSendFailed)}
                aria-pressed={isSendFailed}
                title="Simulate email dispatch error (tests recoverable error toast & retry option)"
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.78rem] font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
                  isSendFailed
                    ? 'border-red-500 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-950/40 dark:text-red-300'
                    : 'border-rule bg-background text-muted hover:text-ink-strong'
                }`}
              >
                <AlertTriangle className="size-3" aria-hidden="true" />
                <span>Send Failure</span>
              </button>
            </div>

            <span className="hidden h-5 w-px bg-rule sm:block" aria-hidden="true" />

            {/* Quick Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Toggle theme (currently ${theme})`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="flex items-center gap-1.5 rounded-lg border border-rule bg-background px-2.5 py-1 text-[0.78rem] font-medium text-foreground hover:bg-surface hover:text-ink-strong transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
            >
              {theme === 'dark' ? (
                <Sun className="size-3.5 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="size-3.5 text-foreground" aria-hidden="true" />
              )}
              <span className="capitalize hidden sm:inline">{theme}</span>
            </button>

            {/* Reset Scenario Button */}
            <button
              type="button"
              onClick={resetToInitialState}
              title="Reset entire prototype to the initial decision-needed moment"
              className="flex items-center gap-1.5 rounded-lg bg-ink-strong px-3 py-1 text-[0.78rem] font-medium text-background hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
            >
              <RotateCcw className="size-3 shrink-0" aria-hidden="true" />
              <span>Reset Scenario</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default EvaluatorBar;
