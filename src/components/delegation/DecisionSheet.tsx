import React, { useState, useEffect, useRef } from 'react';
import { Send, X, ArrowLeft, AlertCircle, RotateCcw, Pause } from 'lucide-react';
import { ThinkingOrb } from 'thinking-orbs';
import { useWorkflow } from '@/context/WorkflowContext';
import { DraftEditor } from './DraftEditor';
import { Button } from '@/components/ui/Button';

export interface DecisionSheetProps {
  className?: string;
}

export const DecisionSheet: React.FC<DecisionSheetProps> = ({ className = '' }) => {
  const {
    isDecisionSheetOpen,
    closeDecisionSheet,
    selectedDecisionOption,
    approveAndSend,
    pauseTask,
    isSendFailed,
    setIsSendFailed,
  } = useWorkflow();

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Reset local error when sheet opens or option changes
  useEffect(() => {
    if (isDecisionSheetOpen) {
      setSendError(null);
      setIsSending(false);
    }
  }, [isDecisionSheetOpen, selectedDecisionOption]);

  // Lock body scroll and set up keyboard focus trap & Escape key
  useEffect(() => {
    if (!isDecisionSheetOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the primary button on open
    const timeout = setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDecisionSheet();
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout);
    };
  }, [isDecisionSheetOpen, closeDecisionSheet]);

  if (!isDecisionSheetOpen) return null;

  // Consequence disclosure text
  const consequenceText =
    selectedDecisionOption?.id === 'accept-date'
      ? 'Agent will accept the revised quote of €7,850 and draft a note to Maya about the new 29 Oct delivery date. No binding commercial contract will be confirmed without your sign-off.'
      : 'ActAI will ask whether €8,000 can be met without moving delivery. No commercial commitment will be made.';

  const handleSend = async () => {
    setSendError(null);
    setIsSending(true);

    // Realistic simulated sending duration (700ms)
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (isSendFailed) {
      setIsSending(false);
      setSendError('Draft was not sent. Nothing changed in your inbox.');
      approveAndSend(); // triggers the error toast as per state machine
      return;
    }

    setIsSending(false);
    approveAndSend();
  };

  const handleRetrySend = () => {
    // If evaluator had simulated send failure, user can toggle it off or retry
    setIsSendFailed(false);
    setSendError(null);
    handleSend();
  };

  const handlePauseFromError = () => {
    pauseTask();
    closeDecisionSheet();
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="decision-sheet-title"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
        onClick={closeDecisionSheet}
        aria-hidden="true"
      />

      {/* Docked Right-Side Drawer (Screen C) */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-xl border-l border-rule bg-panel shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out animate-rise"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-rule px-6 py-5 bg-background">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                  SCREEN C · DECISION SHEET
                </span>
                <span className="h-3 w-px bg-rule" />
                <span className="text-[0.75rem] font-medium text-amber-700 dark:text-amber-400">
                  Bounded Direction
                </span>
              </div>
              <h2
                id="decision-sheet-title"
                className="mt-1 text-[1.35rem] font-light tracking-[-0.02em] leading-snug text-ink-strong"
              >
                {selectedDecisionOption?.title || 'Review & Send Decision'}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeDecisionSheet}
              aria-label="Dismiss decision sheet"
              className="rounded-lg p-2 text-muted hover:bg-surface hover:text-ink-strong transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Explicit Consequence Disclosure Card */}
            <div className="rounded-xl border border-rule bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[0.75rem] font-mono uppercase tracking-[0.14em] text-muted font-medium">
                  EXPLICIT ACTION CONSEQUENCE
                </span>
                <span className="text-[0.72rem] rounded-full bg-chip px-2 py-0.5 text-foreground font-mono">
                  Safe Boundary
                </span>
              </div>
              <p className="mt-1 text-[0.98rem] leading-[1.6] text-ink-strong font-normal">
                {consequenceText}
              </p>
              <div className="mt-3.5 flex items-center justify-between border-t border-rule pt-3 text-[0.8rem] text-muted">
                <span>Current status in inbox:</span>
                <span className="font-medium text-ink-strong">
                  Waiting for your direction — no reply sent
                </span>
              </div>
            </div>

            {/* Error Banner when simulated send fails */}
            {sendError && (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-xl border border-red-300 bg-red-50/70 p-4 text-[0.875rem] text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200 transition-all animate-rise"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <span className="font-medium">Action Failed:</span>
                    <p className="mt-0.5 text-[0.85rem]">{sendError}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleRetrySend}
                        className="inline-flex items-center gap-1.5 rounded-md bg-ink-strong px-3 py-1.5 text-[0.8rem] font-medium text-background hover:opacity-90 cursor-pointer"
                      >
                        <RotateCcw className="size-3" />
                        <span>Try again</span>
                      </button>
                      <button
                        type="button"
                        onClick={handlePauseFromError}
                        className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-background px-3 py-1.5 text-[0.8rem] font-medium text-foreground hover:bg-surface cursor-pointer"
                      >
                        <Pause className="size-3" />
                        <span>Pause task</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Embed Draft Editor */}
            <div>
              <div className="pb-2.5">
                <span className="text-[0.75rem] font-mono uppercase tracking-[0.14em] text-muted font-medium">
                  GENERATED EMAIL DRAFT
                </span>
              </div>
              <DraftEditor
                recipient="Sofia Lindqvist <sofia@nordicdisplays.com>"
                subject="Re: Revised Quote - Exhibition Display Panels"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t border-rule bg-background p-6 space-y-3">
            <Button
              ref={firstFocusableRef}
              variant="primary"
              fullWidth
              size="lg"
              disabled={isSending}
              onClick={handleSend}
              className="gap-2 font-medium"
            >
              {isSending ? (
                <>
                  <ThinkingOrb state="composing" size={20} />
                  <span>Sending request...</span>
                </>
              ) : (
                <>
                  <Send className="size-4 shrink-0" aria-hidden="true" />
                  <span>Approve & send</span>
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              fullWidth
              size="md"
              disabled={isSending}
              onClick={closeDecisionSheet}
              className="gap-2"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSheet;
