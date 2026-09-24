import React, { useRef, useEffect } from 'react';
import { Edit3, Check, RotateCcw, ShieldCheck, Mail } from 'lucide-react';
import { useWorkflow } from '@/context/WorkflowContext';

export interface DraftEditorProps {
  recipient?: string;
  subject?: string;
  className?: string;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({
  recipient = 'Sofia Lindqvist <sofia@nordicdisplays.com>',
  subject = 'Re: Revised Quote - Exhibition Display Panels',
  className = '',
}) => {
  const {
    draftContent,
    updateDraft,
    isEditingDraft,
    setIsEditingDraft,
    selectedDecisionOption,
  } = useWorkflow();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus textarea when entering edit mode
  useEffect(() => {
    if (isEditingDraft && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end of text
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [isEditingDraft]);

  const defaultDraftText =
    selectedDecisionOption?.draftResponse ||
    'Hi Sofia — thank you for the revised quote. We need to keep delivery on 15 October. Is there a configuration or delivery option that keeps the total at or below €8,000 without moving that date?';

  const isModified = draftContent.trim() !== defaultDraftText.trim();
  const charCount = draftContent.length;

  const handleResetToDefault = () => {
    updateDraft(defaultDraftText);
  };

  return (
    <div className={`rounded-xl border border-rule bg-background shadow-sm ${className}`}>
      {/* Email Metadata Header */}
      <div className="border-b border-rule p-4 space-y-2.5 bg-surface/40 rounded-t-xl">
        <div className="flex items-center gap-2 text-[0.8rem]">
          <span className="w-16 font-mono text-muted uppercase tracking-wider text-[0.72rem]">
            To:
          </span>
          <div className="flex items-center gap-1.5 font-medium text-ink-strong truncate">
            <Mail className="size-3.5 text-muted shrink-0" aria-hidden="true" />
            <span className="truncate">{recipient}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[0.8rem]">
          <span className="w-16 font-mono text-muted uppercase tracking-wider text-[0.72rem]">
            Subject:
          </span>
          <span className="font-normal text-foreground truncate">{subject}</span>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5 bg-background">
        <div className="flex items-center gap-2">
          <span className="text-[0.72rem] font-mono uppercase tracking-[0.14em] text-muted">
            {isEditingDraft ? 'IN-PLACE EDITOR' : 'COMPOSED DRAFT'}
          </span>
          <span className="h-3 w-px bg-rule" />
          <span
            className={`text-[0.72rem] px-2 py-0.5 rounded-full font-medium ${
              isModified
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                : 'bg-chip text-muted'
            }`}
          >
            {isModified ? 'Edited by you' : 'ActAI generated'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isModified && (
            <button
              type="button"
              onClick={handleResetToDefault}
              title="Reset to original generated draft"
              className="flex items-center gap-1 text-[0.78rem] text-muted hover:text-ink-strong px-2 py-1 rounded transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsEditingDraft(!isEditingDraft)}
            aria-pressed={isEditingDraft}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.8rem] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong ${
              isEditingDraft
                ? 'bg-ink-strong text-background hover:opacity-90'
                : 'border border-rule bg-background text-ink-strong hover:bg-surface'
            }`}
          >
            {isEditingDraft ? (
              <>
                <Check className="size-3.5" aria-hidden="true" />
                <span>Done editing</span>
              </>
            ) : (
              <>
                <Edit3 className="size-3.5" aria-hidden="true" />
                <span>Edit draft</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Draft Content Container */}
      <div className="p-4">
        {isEditingDraft ? (
          <div>
            <label htmlFor="actai-draft-body" className="sr-only">
              Edit email draft body
            </label>
            <textarea
              id="actai-draft-body"
              ref={textareaRef}
              rows={6}
              value={draftContent}
              onChange={(e) => updateDraft(e.target.value)}
              className="w-full resize-y rounded-lg border border-ink-strong/40 bg-background p-3.5 text-[0.95rem] leading-[1.65] text-ink-strong font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
              placeholder="Type your message..."
            />
            <p className="mt-1.5 text-[0.75rem] text-muted">
              Press <kbd className="font-mono bg-chip px-1 rounded">Done editing</kbd> above to confirm changes.
            </p>
          </div>
        ) : (
          <div
            tabIndex={0}
            role="region"
            aria-label="Email draft preview"
            className="rounded-lg border border-rule/70 bg-surface/30 p-4 text-[0.95rem] leading-[1.7] text-foreground font-light select-text min-h-[110px] whitespace-pre-wrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
          >
            {draftContent || defaultDraftText}
          </div>
        )}

        {/* Character Count & Environment Safeguard */}
        <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-rule pt-3 text-[0.75rem] text-muted">
          <div className="flex items-center gap-1.5 text-muted">
            <ShieldCheck className="size-3.5 text-green-600 dark:text-green-400 shrink-0" aria-hidden="true" />
            <span>Simulated email send. No message is dispatched outside this environment.</span>
          </div>

          <div
            aria-live="polite"
            className="font-mono text-[0.72rem] text-muted self-end sm:self-auto shrink-0"
          >
            {charCount} characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
