import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  variant?: 'modal' | 'drawer';
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  variant = 'modal',
  children,
  className = '',
  showCloseButton = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer layout */}
      {variant === 'drawer' ? (
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            ref={containerRef}
            className={`w-screen max-w-md border-l border-rule bg-panel shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out animate-rise ${className}`}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between border-b border-rule px-6 py-5">
                <div className="pr-4">
                  {typeof title === 'string' ? (
                    <h3 className="text-[1.15rem] font-medium leading-tight text-ink-strong">
                      {title}
                    </h3>
                  ) : (
                    title
                  )}
                  {subtitle && (
                    <p className="mt-1 text-[0.875rem] text-muted">{subtitle}</p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close panel"
                    className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </div>
        </div>
      ) : (
        /* Center modal layout */
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            ref={containerRef}
            className={`w-full max-w-lg rounded-xl border border-rule bg-panel p-6 shadow-2xl transition-all animate-rise ${className}`}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between border-b border-rule pb-4 mb-4">
                <div className="pr-4">
                  {typeof title === 'string' ? (
                    <h3 className="text-[1.2rem] font-medium leading-tight text-ink-strong">
                      {title}
                    </h3>
                  ) : (
                    title
                  )}
                  {subtitle && (
                    <p className="mt-1 text-[0.875rem] text-muted">{subtitle}</p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content body */}
            <div>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
