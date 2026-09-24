import React from 'react';
import { EvidenceSource } from '@/types/task';
import { EvidenceCard } from './EvidenceCard';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWorkflow } from '@/context/WorkflowContext';

export interface EvidenceSectionProps {
  evidenceIds?: string[];
  evidenceSources?: Record<string, EvidenceSource>;
  isMissingEvidence?: boolean;
  isLoading?: boolean;
  onOpenSource?: (sourceId: string) => void;
  className?: string;
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({
  evidenceIds: propEvidenceIds,
  evidenceSources: propEvidenceSources,
  isMissingEvidence: propIsMissingEvidence,
  isLoading: propIsLoading,
  onOpenSource: propOnOpenSource,
  className = '',
}) => {
  const workflow = useWorkflow();
  const evidenceIds = propEvidenceIds ?? workflow.selectedTask.evidenceIds;
  const evidenceSources = propEvidenceSources ?? workflow.evidenceSources;
  const isMissingEvidence = propIsMissingEvidence ?? workflow.isMissingEvidence;
  const isLoading = propIsLoading ?? workflow.isLoading;
  const onOpenSource = propOnOpenSource ?? workflow.openEvidenceDrawer;

  return (
    <section className={className} aria-label="Grounded evidence sources">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.14em] uppercase text-muted">
          <span>What ActAI is Using</span>
          <span className="font-mono text-muted">({evidenceIds.length})</span>
        </h3>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-3" aria-busy="true">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      ) : isMissingEvidence ? (
        /* Missing Evidence Warning Fallback (PRD Section 7 & Task 05) */
        <div className="rounded-xl border border-amber-300/80 bg-panel p-4 text-[0.85rem] text-muted dark:border-amber-900/40">
          <div className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-400">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            <span>Source no longer available</span>
          </div>
          <p className="mt-2 text-foreground leading-relaxed">
            The agent will not act until you review the task.
          </p>
        </div>
      ) : (
        /* Grounded Source Cards */
        <div className="space-y-3">
          {evidenceIds.map((sourceId) => {
            const source = evidenceSources[sourceId];
            if (!source) return null;

            return (
              <EvidenceCard
                key={source.id}
                source={source}
                onViewSource={onOpenSource}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default EvidenceSection;
