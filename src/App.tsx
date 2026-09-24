import { useState } from 'react';
import { WorkflowProvider, useWorkflow } from '@/context/WorkflowContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { TodayScreen } from '@/components/screens/TodayScreen';
import { DelegationReviewScreen } from '@/components/screens/DelegationReviewScreen';
import { ActivityScreen } from '@/components/screens/ActivityScreen';
import { DecisionSheet } from '@/components/delegation/DecisionSheet';
import { EvaluatorBar } from '@/components/evaluator/EvaluatorBar';
import { Toast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ThinkingOrb } from 'thinking-orbs';
import { BotAvatar } from 'bot-avatars';

function AppContent() {
  const {
    activeScreen,
    selectedTask,
    toast,
    dismissToast,
  } = useWorkflow();

  const [activeTab, setActiveTab] = useState<'workspace' | 'primitives'>('workspace');

  return (
    <AppLayout>
      {/* Top Secondary Navigation Header */}
      <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-rule bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4 text-[0.875rem]">
          <nav className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('workspace')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 font-medium transition-colors ${
                activeTab === 'workspace'
                  ? 'bg-surface text-ink-strong'
                  : 'text-muted hover:text-ink-strong'
              }`}
            >
              Prototype Workspace
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('primitives')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 font-medium transition-colors ${
                activeTab === 'primitives'
                  ? 'bg-surface text-ink-strong'
                  : 'text-muted hover:text-ink-strong'
              }`}
            >
              Design Tokens & Primitives
            </button>
          </nav>
        </div>

        {/* Live Autonomous Status Pill */}
        <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-rule bg-panel px-3 py-1 text-[0.8rem] text-muted">
          <ThinkingOrb
            state={
              selectedTask.status === 'in_progress'
                ? 'working'
                : selectedTask.status === 'monitoring'
                ? 'searching'
                : 'breathing'
            }
            size={20}
          />
          <span className="font-medium text-ink-strong">
            {selectedTask.status === 'needs_decision'
              ? 'Direction needed'
              : selectedTask.status === 'monitoring'
              ? 'Monitoring reply'
              : selectedTask.status === 'paused'
              ? 'Automation paused'
              : 'Agent active'}
          </span>
          <span className="text-muted/60">·</span>
          <span className="font-mono text-[0.75rem] text-muted">{selectedTask.id}</span>
        </div>
      </header>

      {/* Main Screen Router */}
      <main className="pb-24">
        {activeTab === 'workspace' ? (
          <>
            {activeScreen === 'today' && <TodayScreen />}
            {activeScreen === 'delegation' && <DelegationReviewScreen />}
            {activeScreen === 'activity' && <ActivityScreen />}
          </>
        ) : (
          /* Primitives Showcase Tab (Task 01 Design System Verification) */
          <div className="mx-auto max-w-5xl p-6 sm:p-10 space-y-12">
            <div>
              <span className="text-[0.78rem] tracking-[0.14em] text-muted uppercase font-mono">
                Design System Guardrails
              </span>
              <h1 className="mt-2 text-3xl font-light text-ink-strong">
                ActAI Design Tokens & Primitives
              </h1>
              <p className="mt-2 text-foreground max-w-2xl text-[1.05rem]">
                Authoritative demonstration of editorial typography, tone surfaces, hairline rules,
                and bounded micro-interactions extracted directly from actai.company.
              </p>
            </div>

            {/* 1. Color Tokens */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-ink-strong">1. Semantic Color Tokens</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-rule bg-background p-4">
                  <div className="h-12 w-full rounded-lg bg-background border border-rule mb-2" />
                  <span className="text-xs font-mono text-muted">--background</span>
                  <div className="text-xs text-foreground mt-0.5">#ffffff / #0b0b0c</div>
                </div>
                <div className="rounded-xl border border-rule bg-panel p-4">
                  <div className="h-12 w-full rounded-lg bg-panel border border-rule mb-2" />
                  <span className="text-xs font-mono text-muted">--panel</span>
                  <div className="text-xs text-foreground mt-0.5">#f2f0ec / #1f1f1f</div>
                </div>
                <div className="rounded-xl border border-rule bg-surface p-4">
                  <div className="h-12 w-full rounded-lg bg-surface border border-rule mb-2" />
                  <span className="text-xs font-mono text-muted">--surface</span>
                  <div className="text-xs text-foreground mt-0.5">#efede9 / #1b1b1f</div>
                </div>
                <div className="rounded-xl border border-rule bg-chip p-4">
                  <div className="h-12 w-full rounded-lg bg-chip border border-rule mb-2" />
                  <span className="text-xs font-mono text-muted">--chip</span>
                  <div className="text-xs text-foreground mt-0.5">#e3dfd9 / #3a3a3a</div>
                </div>
              </div>
            </section>

            {/* 2. Badges & Chips */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-ink-strong">2. Badges & Constraints</h2>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="chip">Budget ≤ €8,000</Badge>
                <Badge variant="chip">Do not confirm delivery changes</Badge>
                <Badge variant="chip">Due Friday</Badge>
                <Badge variant="decision" dot>
                  Decision needed · 10:03
                </Badge>
                <Badge variant="completed" dot>
                  Sent at 10:05
                </Badge>
                <Badge variant="muted" dot>
                  Monitoring reply
                </Badge>
                <Badge variant="paused" dot>
                  Paused by you
                </Badge>
              </div>
            </section>

            {/* 3. Buttons */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-ink-strong">3. Buttons & Actions</h2>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Approve & send</Button>
                <Button variant="secondary">Review acceptance</Button>
                <Button variant="ghost">Edit draft</Button>
                <Button variant="link">View source →</Button>
                <Button variant="danger">Cancel task</Button>
                <Button variant="primary" isLoading>
                  Sending
                </Button>
              </div>
            </section>

            {/* 4. Skeletons */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-ink-strong">4. Skeleton Loading State</h2>
              <div className="rounded-xl border border-rule bg-panel p-6 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </section>

            {/* 5. Living Agent Avatars */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-ink-strong">5. Libraries.dev Living Avatars</h2>
              <div className="flex flex-wrap gap-8 items-center rounded-xl border border-rule bg-panel p-6">
                <div className="flex flex-col items-center gap-2">
                  <BotAvatar type="clover" state="default" size={64} />
                  <span className="text-xs text-muted">Clover (Idle)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <BotAvatar type="mech" state="working" size={64} />
                  <span className="text-xs text-muted">Mech (Working)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ThinkingOrb state="weaving" size={64} />
                  <span className="text-xs text-muted">Weaving (Planning)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ThinkingOrb state="searching" size={64} />
                  <span className="text-xs text-muted">Searching (Monitoring)</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Screen C Decision Sheet Drawer */}
      <DecisionSheet />

      {/* Floating Evaluator Scenario Controls Bar */}
      <EvaluatorBar />

      {/* Toast Notification Container */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onDismiss={dismissToast}
        />
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <WorkflowProvider initialTaskId="nordic-displays">
      <AppContent />
    </WorkflowProvider>
  );
}
