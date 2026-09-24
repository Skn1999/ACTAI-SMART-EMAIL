import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  visible: boolean;
  onDismiss: () => void;
  durationMs?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  visible,
  onDismiss,
  durationMs = 4000,
}) => {
  useEffect(() => {
    if (!visible || durationMs <= 0) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [visible, durationMs, onDismiss]);

  if (!visible) return null;

  const icons = {
    success: <CheckCircle2 className="size-4 shrink-0 text-green-600 dark:text-green-400" />,
    info: <Info className="size-4 shrink-0 text-muted" />,
    error: <AlertCircle className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-xl border border-rule bg-panel px-4 py-3.5 shadow-lg transition-all animate-rise"
    >
      {icons[type]}
      <span className="text-[0.9rem] font-normal leading-snug text-ink-strong">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="ml-auto -mr-1 cursor-pointer rounded-md p-1 text-muted transition-colors hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
};

export default Toast;
