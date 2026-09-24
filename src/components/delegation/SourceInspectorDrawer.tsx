import React, { useEffect, useRef } from 'react';
import { EvidenceSource } from '@/types/task';
import { X, Mail, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface SourceInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  source: EvidenceSource | null;
  className?: string;
}

export const SourceInspectorDrawer: React.FC<SourceInspectorDrawerProps> = ({
  isOpen,
  onClose,
  source,
  className = '',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus lock and initial focus
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus the close button or first interactive element
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !source) return null;

  const isEmail = source.type === 'email';

  // Highlight key evidence quote within content
  const renderHighlightedContent = () => {
    const rawContent = source.fullContent;
    // Extract key quote phrases to highlight
    const highlightPhrases = [
      'Keep total supplier spend under €8,000.',
      '€7,850 is possible',
      'earliest guaranteed delivery date under this batch pricing moves to 29 October',
      'Do not confirm any delivery schedule alterations without direct user sign-off',
    ];

    // Find if any phrase exists in text
    let segments: { text: string; highlight: boolean }[] = [{ text: rawContent, highlight: false }];

    for (const phrase of highlightPhrases) {
      const nextSegments: { text: string; highlight: boolean }[] = [];
      for (const seg of segments) {
        if (seg.highlight) {
          nextSegments.push(seg);
          continue;
        }

        const idx = seg.text.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx !== -1) {
          const before = seg.text.slice(0, idx);
          const match = seg.text.slice(idx, idx + phrase.length);
          const after = seg.text.slice(idx + phrase.length);
          if (before) nextSegments.push({ text: before, highlight: false });
          nextSegments.push({ text: match, highlight: true });
          if (after) nextSegments.push({ text: after, highlight: false });
        } else {
          nextSegments.push(seg);
        }
      }
      segments = nextSegments;
    }

    return (
      <pre className="whitespace-pre-wrap font-mono text-[0.85rem] leading-[1.7] text-foreground font-light">
        {segments.map((seg, i) =>
          seg.highlight ? (
            <mark
              key={i}
              className="rounded bg-amber-200/80 px-1 py-0.5 font-medium text-ink-strong dark:bg-amber-900/60 not-italic"
              title="Key Grounded Evidence"
            >
              {seg.text}
            </mark>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </pre>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          className={`flex w-screen max-w-xl flex-col border-l border-rule bg-panel shadow-2xl animate-rise ${className}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-rule px-6 py-5">
            <div className="pr-4">
              <div className="flex items-center gap-2 text-[0.8rem] text-muted">
                {isEmail ? (
                  <Mail className="size-4 text-muted" aria-hidden="true" />
                ) : (
                  <FileText className="size-4 text-muted" aria-hidden="true" />
                )}
                <span className="font-mono uppercase tracking-[0.14em]">
                  {isEmail ? 'EMAIL RECORD' : 'INTERNAL NOTE'}
                </span>
                <span className="text-muted">•</span>
                <span className="font-mono text-muted">{source.timestamp}</span>
              </div>

              <h2
                id="source-drawer-title"
                className="mt-1 text-[1.25rem] font-medium leading-tight text-ink-strong"
              >
                {source.title}
              </h2>
              <p className="mt-0.5 text-[0.85rem] text-muted truncate max-w-md">
                {source.authorOrSender}
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close source inspector (Esc)"
              className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
            >
              <span className="sr-only">Close</span>
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            {/* Grounded Citation Callout */}
            <div className="rounded-xl border border-amber-300/80 bg-background p-4 shadow-sm dark:border-amber-900/40">
              <span className="text-[0.75rem] font-medium tracking-[0.14em] uppercase text-amber-700 dark:text-amber-400">
                Grounded Extraction
              </span>
              <blockquote className="mt-1.5 border-l-2 border-amber-500 pl-3 text-[0.95rem] italic text-foreground">
                {source.snippet}
              </blockquote>
            </div>

            {/* Structured Metadata Box */}
            {source.metadata && (
              <div className="rounded-xl border border-rule bg-background p-4 space-y-2">
                <span className="text-[0.75rem] font-medium tracking-[0.14em] uppercase text-muted">
                  Message Metadata
                </span>
                <div className="grid grid-cols-1 gap-1 text-[0.825rem] font-mono border-t border-rule pt-2">
                  {Object.entries(source.metadata).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2 py-0.5">
                      <span className="uppercase text-muted shrink-0">{key}:</span>
                      <span className="truncate text-foreground text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Realistic Document View with Key Evidence Highlighted */}
            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-[0.78rem] font-medium tracking-[0.14em] uppercase text-muted">
                  Full Document Record
                </span>
                <span className="text-[0.75rem] text-muted flex items-center gap-1 font-mono">
                  <ExternalLink className="size-3" />
                  Verified source
                </span>
              </div>

              <div className="rounded-xl border border-rule bg-background p-5 shadow-sm">
                {renderHighlightedContent()}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-rule bg-panel px-6 py-4 flex items-center justify-between">
            <span className="text-[0.8rem] text-muted">Press Esc to dismiss</span>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceInspectorDrawer;
