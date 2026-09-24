import React from 'react';

export type BadgeVariant = 'chip' | 'decision' | 'completed' | 'muted' | 'paused' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  dotColor?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'chip',
  size = 'md',
  dot = false,
  dotColor,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-[0.75rem]',
    md: 'px-3.5 py-1 text-[0.85rem]',
  };

  const variantClasses: Record<BadgeVariant, string> = {
    chip: 'bg-chip text-ink-strong font-normal',
    decision: 'border border-amber-300/80 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-400 font-medium tracking-[0.05em]',
    completed: 'border border-green-300/80 bg-green-50 text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-400 font-medium',
    muted: 'border border-rule bg-surface text-muted font-normal',
    paused: 'border border-rule bg-panel text-muted font-normal',
    outline: 'border border-rule bg-transparent text-foreground font-normal',
  };

  const defaultDotColor: Record<BadgeVariant, string> = {
    chip: 'bg-ink-strong',
    decision: 'bg-amber-500',
    completed: 'bg-green-600',
    muted: 'bg-muted/70',
    paused: 'bg-muted/50',
    outline: 'bg-foreground',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none leading-none transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`size-1.5 shrink-0 rounded-full ${dotColor || defaultDotColor[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
