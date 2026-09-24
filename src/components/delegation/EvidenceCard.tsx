import React from 'react';
import { EvidenceSource } from '@/types/task';
import { ArrowRight, FileText, Mail } from 'lucide-react';

export interface EvidenceCardProps {
  source: EvidenceSource;
  onViewSource: (sourceId: string) => void;
  className?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  source,
  onViewSource,
  className = '',
}) => {
  const isEmail = source.type === 'email';
  const actionLabel = isEmail ? 'View email →' : 'View note →';

  return (
    <div
      className={`rounded-xl border border-rule bg-background p-4 transition-colors hover:border-muted ${className}`}
    >
      {/* Title & Timestamp */}
      <div className="flex items-center justify-between gap-2 text-[0.85rem] text-muted">
        <div className="flex items-center gap-1.5 min-w-0">
          {isEmail ? (
            <Mail className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
          ) : (
            <FileText className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
          )}
          <span className="font-medium text-ink-strong truncate max-w-[200px]">
            {source.title}
          </span>
        </div>
        <span className="shrink-0 font-mono text-[0.78rem] text-muted">
          {source.timestamp}
        </span>
      </div>

      {/* Author / Origin */}
      <p className="mt-1 text-[0.78rem] text-muted truncate">
        {source.authorOrSender}
      </p>

      {/* Blockquote Citation */}
      <blockquote className="mt-2.5 border-l-2 border-rule pl-3 text-[0.875rem] italic leading-relaxed text-foreground">
        {source.snippet}
      </blockquote>

      {/* Action CTA */}
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => onViewSource(source.id)}
          className="group flex cursor-pointer items-center gap-1 text-[0.825rem] font-medium text-muted transition-colors hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong rounded"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default EvidenceCard;
