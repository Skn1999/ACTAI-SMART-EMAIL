import { useState, useMemo } from 'react';
import { useWorkflow } from '@/hooks/useWorkflow';
import { BotAvatar } from 'bot-avatars';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail,
  SlidersHorizontal,
  LayoutList,
  Layers,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SourceInspectorDrawer } from '@/components/delegation/SourceInspectorDrawer';

type ViewMode = 'grouped' | 'feed';
type StatusFilter = 'all' | 'needs_decision' | 'completed' | 'pending';

export const ActivityScreen: React.FC = () => {
  const {
    tasks,
    selectTask,
    setActiveScreen,
    isEvidenceDrawerOpen,
    closeEvidenceDrawer,
    openEvidenceDrawer,
    activeEvidenceSource,
  } = useWorkflow();

  const [selectedAgentId, setSelectedAgentId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Compute total event counts across all tasks
  const totalEventsCount = useMemo(() => {
    return tasks.reduce((sum, task) => sum + task.timeline.length, 0);
  }, [tasks]);

  // Filter tasks based on selected agent filter
  const displayedTasks = useMemo(() => {
    if (selectedAgentId === 'all') return tasks;
    return tasks.filter((t) => t.id === selectedAgentId);
  }, [tasks, selectedAgentId]);

  // Aggregate all events with full agent and task context for the feed mode
  const allActivitiesWithContext = useMemo(() => {
    return tasks
      .flatMap((task) =>
        task.timeline.map((step) => ({
          ...step,
          taskId: task.id,
          taskTitle: task.title,
          taskStatus: task.status,
          agent: task.agent || {
            name: 'Autonomous Agent',
            role: 'Agentic Workflow',
            avatarType: 'clover' as const,
            threadTitle: task.title,
            category: 'general' as const,
          },
        }))
      )
      .filter((activity) => {
        if (selectedAgentId !== 'all' && activity.taskId !== selectedAgentId) {
          return false;
        }
        if (statusFilter !== 'all' && activity.status !== statusFilter) {
          return false;
        }
        return true;
      });
  }, [tasks, selectedAgentId, statusFilter]);

  const handleNavigateToTask = (taskId: string) => {
    selectTask(taskId);
    setActiveScreen('delegation');
  };

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-8 space-y-8 page-body">
      {/* 1. Header Section */}
      <header className="pb-6 border-b border-rule">
        <div className="flex items-center gap-2 text-[0.78rem] tracking-[0.14em] text-muted uppercase font-mono mb-2">
          <span>3.0 Activity Log</span>
          <span className="h-3 w-px bg-rule" aria-hidden="true" />
          <span>Multi-Agent Audit Trail</span>
        </div>
        <h1 className="text-[2rem] sm:text-[2.5rem] font-light leading-[1.16] tracking-[-0.03em] text-ink-strong">
          Audit Trail & Agent Activity
        </h1>
        <p className="text-[1.05rem] text-muted mt-2 font-light">
          Verifiable execution history organized by autonomous AI task agent and email thread.
        </p>
      </header>

      {/* 2. Workspace: Sticky Left Agent Sidebar + Scrollable Activity Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Agent Sidebar (Sticky on Desktop) */}
        <aside
          className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-7 lg:self-start lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto space-y-4"
          aria-label="AI Task Agents and Activity Filters"
        >
          {/* Card 1: Agent Roster */}
          <div className="rounded-xl border border-rule bg-panel/40 p-3.5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rule/60">
              <span className="text-[0.75rem] font-mono uppercase tracking-[0.1em] text-muted">
                AI Agents ({tasks.length})
              </span>
              <span className="text-[0.75rem] font-mono text-muted">
                {totalEventsCount} events
              </span>
            </div>

            <div className="space-y-1.5" role="tablist" aria-label="Filter by AI Agent">
              {/* "All Agents" Button */}
              <button
                type="button"
                role="tab"
                aria-selected={selectedAgentId === 'all'}
                onClick={() => setSelectedAgentId('all')}
                className={`w-full flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-left text-[0.85rem] transition-all cursor-pointer ${
                  selectedAgentId === 'all'
                    ? 'bg-ink-strong text-background font-medium shadow-xs'
                    : 'bg-background border border-rule text-foreground hover:bg-surface hover:text-ink-strong'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-md ${
                      selectedAgentId === 'all'
                        ? 'bg-background/20 text-background'
                        : 'bg-surface text-ink-strong'
                    }`}
                  >
                    <Layers className="size-3.5" aria-hidden="true" />
                  </div>
                  <span className="truncate">All Agents</span>
                </div>
                <span
                  className={`font-mono text-[0.75rem] rounded-full px-2 py-0.5 ${
                    selectedAgentId === 'all'
                      ? 'bg-background/20 text-background'
                      : 'bg-chip text-ink-strong'
                  }`}
                >
                  {totalEventsCount}
                </span>
              </button>

              {/* Individual Agents */}
              {tasks.map((task) => {
                const isSelected = selectedAgentId === task.id;
                const agentName = task.agent?.name || task.title;
                const hasActionNeeded = task.status === 'needs_decision';
                const stepCount = task.timeline.length;

                return (
                  <button
                    key={task.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedAgentId(task.id)}
                    className={`w-full flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-left text-[0.85rem] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-ink-strong text-background font-medium shadow-xs'
                        : 'bg-background border border-rule text-foreground hover:bg-surface hover:text-ink-strong'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="shrink-0">
                        <BotAvatar
                          type={task.agent?.avatarType || 'clover'}
                          size={24}
                          state={task.status === 'in_progress' ? 'working' : 'default'}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-medium">{agentName}</span>
                          {hasActionNeeded && (
                            <span
                              className="size-2 rounded-full bg-amber-500 animate-pulse shrink-0"
                              title="Decision needed"
                            />
                          )}
                        </div>
                        <div
                          className={`text-[0.72rem] truncate ${
                            isSelected ? 'text-background/80' : 'text-muted'
                          }`}
                        >
                          {task.agent?.role || 'Agentic Task'}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-[0.75rem] rounded-full px-2 py-0.5 shrink-0 ${
                        isSelected
                          ? 'bg-background/20 text-background'
                          : 'bg-chip text-ink-strong'
                      }`}
                    >
                      {stepCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: View Mode & Status Filter */}
          <div className="rounded-xl border border-rule bg-panel/40 p-3.5 space-y-3 text-[0.8rem]">
            {/* View Mode */}
            <div>
              <span className="block text-[0.72rem] font-mono uppercase tracking-wider text-muted mb-2">
                Display Mode
              </span>
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-rule bg-background p-1 text-[0.8rem]">
                <button
                  type="button"
                  onClick={() => setViewMode('grouped')}
                  aria-pressed={viewMode === 'grouped'}
                  className={`flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-medium transition-colors cursor-pointer ${
                    viewMode === 'grouped'
                      ? 'bg-surface text-ink-strong shadow-2xs'
                      : 'text-muted hover:text-ink-strong'
                  }`}
                >
                  <Layers className="size-3.5" aria-hidden="true" />
                  <span>Grouped</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('feed')}
                  aria-pressed={viewMode === 'feed'}
                  className={`flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-medium transition-colors cursor-pointer ${
                    viewMode === 'feed'
                      ? 'bg-surface text-ink-strong shadow-2xs'
                      : 'text-muted hover:text-ink-strong'
                  }`}
                >
                  <LayoutList className="size-3.5" aria-hidden="true" />
                  <span>Timeline</span>
                </button>
              </div>
            </div>

            {/* Status Filter */}
            <div className="border-t border-rule/60 pt-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-[0.72rem] font-mono uppercase tracking-wider text-muted">
                  <SlidersHorizontal className="size-3" aria-hidden="true" />
                  <span>Status Filter</span>
                </span>
                {statusFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className="text-[0.7rem] text-muted hover:text-ink-strong underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {(['all', 'needs_decision', 'completed', 'pending'] as StatusFilter[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-md px-2 py-1 text-[0.75rem] capitalize transition-colors cursor-pointer ${
                      statusFilter === status
                        ? 'bg-ink-strong text-background font-medium'
                        : 'bg-background border border-rule text-foreground hover:bg-surface hover:text-ink-strong'
                    }`}
                  >
                    {status === 'all'
                      ? 'All'
                      : status === 'needs_decision'
                      ? 'Decision'
                      : status}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-rule/60 pt-2 text-[0.75rem] font-mono text-muted text-center">
              Showing {viewMode === 'grouped' ? `${displayedTasks.length} agent groups` : `${allActivitiesWithContext.length} events`}
            </div>
          </div>
        </aside>

        {/* Right Column: Scrollable Activity Area */}
        <main className="flex-1 min-w-0 space-y-6" aria-label="Activity Area">
          {/* Active Filter Indicator (if specific agent selected) */}
          {selectedAgentId !== 'all' && (
            <div className="flex items-center justify-between rounded-xl border border-rule bg-panel/30 px-4 py-3 text-[0.85rem]">
              <div className="flex items-center gap-2 text-muted">
                <span>Showing activity for:</span>
                <span className="font-medium text-ink-strong">
                  {tasks.find((t) => t.id === selectedAgentId)?.agent?.name || selectedAgentId}
                </span>
                <span className="text-[0.75rem] font-mono">
                  ({displayedTasks.reduce((sum, t) => sum + t.timeline.length, 0)} events)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAgentId('all')}
                className="text-[0.8rem] font-medium text-ink-strong underline-offset-4 hover:underline cursor-pointer"
              >
                View all agents
              </button>
            </div>
          )}

          {viewMode === 'grouped' ? (
            /* MODE A: GROUPED BY AGENT CARDS */
            <div className="space-y-8">
              {displayedTasks.map((task) => {
                const agent = task.agent || {
                  name: 'Autonomous Agent',
                  role: 'Agentic Workflow',
                  avatarType: 'clover' as const,
                  threadTitle: task.title,
                  threadRecipient: 'Company Inbox',
                  category: 'general' as const,
                };

                const isNeedsDecision = task.status === 'needs_decision';
                const isMonitoring = task.status === 'monitoring';
                const isPaused = task.status === 'paused';
                const isInProgress = task.status === 'in_progress';

                // Filter timeline steps if status filter is active
                const filteredSteps = task.timeline.filter((step) => {
                  if (statusFilter === 'all') return true;
                  return step.status === statusFilter;
                });

                if (filteredSteps.length === 0 && statusFilter !== 'all') {
                  return null;
                }

                return (
                  <section
                    key={task.id}
                    aria-label={`Activities for ${agent.name}`}
                    className="rounded-2xl border border-rule bg-panel/30 overflow-hidden shadow-xs transition-all hover:border-muted"
                  >
                    {/* Agent Identity & Thread Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rule bg-panel/70 p-5 sm:p-6">
                      <div className="flex items-start sm:items-center gap-4">
                        {/* Bot Avatar */}
                        <div className="shrink-0 rounded-xl border border-rule bg-background p-1.5 shadow-xs">
                          <BotAvatar
                            type={agent.avatarType}
                            size={52}
                            state={isInProgress || isMonitoring ? 'working' : 'default'}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-[1.15rem] font-medium text-ink-strong">
                              {agent.name}
                            </h2>
                            <Badge variant="chip" size="sm">
                              {agent.role}
                            </Badge>
                          </div>

                          {/* Associated Email Thread */}
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.825rem] text-muted">
                            <span className="flex items-center gap-1 font-mono text-[0.78rem] text-ink-strong">
                              <Mail className="size-3.5 text-muted" aria-hidden="true" />
                              <span>Thread:</span>
                            </span>
                            <span className="font-normal text-foreground truncate max-w-sm sm:max-w-md">
                              {agent.threadTitle}
                            </span>
                            {agent.threadRecipient && (
                              <span className="hidden md:inline text-muted text-[0.78rem]">
                                ({agent.threadRecipient})
                              </span>
                            )}
                          </div>

                          {/* Task Delegated Goal */}
                          <p className="mt-1 text-[0.825rem] text-muted line-clamp-1 italic">
                            “{task.goal}”
                          </p>
                        </div>
                      </div>

                      {/* Right Header Status & Navigation Action */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t border-rule sm:border-t-0">
                        <div>
                          {isNeedsDecision ? (
                            <Badge variant="decision" size="sm" dot>
                              Decision needed · {task.updatedAt}
                            </Badge>
                          ) : isMonitoring ? (
                            <Badge variant="completed" size="sm" dot>
                              Monitoring reply · {task.updatedAt}
                            </Badge>
                          ) : isPaused ? (
                            <Badge variant="paused" size="sm" dot>
                              Paused by you
                            </Badge>
                          ) : (
                            <Badge variant="muted" size="sm" dot>
                              In progress · {task.updatedAt}
                            </Badge>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleNavigateToTask(task.id)}
                          className="group inline-flex items-center gap-1 text-[0.825rem] font-medium text-ink-strong hover:underline underline-offset-4 cursor-pointer"
                        >
                          <span>Open in Review</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Agent's Chronological Activities List */}
                    <div className="p-5 sm:p-7">
                      <div className="relative border-l border-rule pl-6 ml-3 space-y-6">
                        {filteredSteps.map((step) => {
                          const isStepCompleted = step.status === 'completed';
                          const isStepNeedsDecision = step.status === 'needs_decision';

                          return (
                            <div key={step.id} className="relative group">
                              {/* Dot indicator aligned to timeline */}
                              <span
                                className={`absolute -left-[31px] top-1 size-3 rounded-full border-2 border-background transition-colors ${
                                  isStepCompleted
                                    ? 'bg-green-600'
                                    : isStepNeedsDecision
                                    ? 'bg-amber-500 animate-pulse ring-4 ring-amber-500/20'
                                    : 'bg-muted/40'
                                }`}
                                aria-hidden="true"
                              />

                              <div className="flex flex-wrap items-baseline justify-between gap-2 text-[0.85rem]">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-muted text-[0.78rem]">{step.time}</span>
                                  <span
                                    className={`text-[0.72rem] font-medium uppercase tracking-wider ${
                                      isStepCompleted
                                        ? 'text-green-700 dark:text-green-400'
                                        : isStepNeedsDecision
                                        ? 'text-amber-700 dark:text-amber-400'
                                        : 'text-muted'
                                    }`}
                                  >
                                    {isStepCompleted ? 'Executed' : isStepNeedsDecision ? 'Action Required' : 'Scheduled'}
                                  </span>
                                </div>

                                {/* Evidence Citation Link */}
                                {step.sourceId && (
                                  <button
                                    type="button"
                                    onClick={() => openEvidenceDrawer(step.sourceId!)}
                                    className="inline-flex items-center gap-1 text-[0.78rem] text-muted hover:text-ink-strong underline-offset-4 hover:underline cursor-pointer"
                                  >
                                    <FileText className="size-3" aria-hidden="true" />
                                    <span>Inspect Evidence</span>
                                  </button>
                                )}
                              </div>

                              <h3
                                className={`mt-1 text-[0.975rem] leading-snug ${
                                  isStepNeedsDecision
                                    ? 'font-medium text-ink-strong'
                                    : 'font-normal text-foreground'
                                }`}
                              >
                                {step.label}
                              </h3>

                              {step.detail && (
                                <p className="mt-1 text-[0.85rem] text-muted leading-relaxed">
                                  {step.detail}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* MODE B: UNIFIED CHRONOLOGICAL FEED WITH AGENT IDENTITY TAGS */
            <div className="space-y-4">
              {allActivitiesWithContext.length === 0 ? (
                <div className="rounded-xl border border-rule bg-panel/40 p-8 text-center text-muted">
                  No activities found matching the active filter.
                </div>
              ) : (
                allActivitiesWithContext.map((activity, idx) => {
                  const isCompleted = activity.status === 'completed';
                  const isNeedsDecision = activity.status === 'needs_decision';

                  return (
                    <div
                      key={`${activity.taskId}-${activity.id}-${idx}`}
                      className="flex items-start gap-4 rounded-xl border border-rule bg-panel/30 p-5 transition-all hover:bg-panel/70 hover:border-muted"
                    >
                      {/* Agent Avatar Icon */}
                      <div className="shrink-0 mt-0.5 rounded-lg border border-rule bg-background p-1">
                        <BotAvatar
                          type={activity.agent.avatarType}
                          size={32}
                          state={activity.taskStatus === 'in_progress' ? 'working' : 'default'}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[0.8rem]">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink-strong">{activity.agent.name}</span>
                            <span className="text-muted/60">·</span>
                            <span className="text-muted truncate max-w-[200px]">{activity.agent.threadTitle}</span>
                          </div>
                          <span className="font-mono text-muted text-[0.75rem]">{activity.time}</span>
                        </div>

                        <h3 className="mt-1.5 text-[0.975rem] font-medium text-ink-strong">
                          {activity.label}
                        </h3>

                        {activity.detail && (
                          <p className="mt-1 text-[0.85rem] text-muted leading-relaxed">
                            {activity.detail}
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-rule/60 text-[0.78rem]">
                          <div className="flex items-center gap-2">
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1 text-green-700 dark:text-green-400 font-medium">
                                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                                <span>Completed</span>
                              </span>
                            )}
                            {isNeedsDecision && (
                              <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
                                <AlertCircle className="size-3.5 animate-pulse" aria-hidden="true" />
                                <span>Direction required</span>
                              </span>
                            )}
                            {!isCompleted && !isNeedsDecision && (
                              <span className="inline-flex items-center gap-1 text-muted">
                                <Clock className="size-3.5" aria-hidden="true" />
                                <span>Pending</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            {activity.sourceId && (
                              <button
                                type="button"
                                onClick={() => openEvidenceDrawer(activity.sourceId!)}
                                className="text-muted hover:text-ink-strong underline-offset-4 hover:underline cursor-pointer"
                              >
                                Inspect Evidence
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleNavigateToTask(activity.taskId)}
                              className="font-medium text-ink-strong hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Open Task</span>
                              <ArrowRight className="size-3" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </main>
      </div>

      {/* 3. Evidence Inspector Drawer */}
      <SourceInspectorDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={closeEvidenceDrawer}
        source={activeEvidenceSource}
      />
    </div>
  );
};

export default ActivityScreen;
