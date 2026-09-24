import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]';

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-[0.85rem] rounded-md gap-2',
      md: 'px-4 py-2.5 text-[0.95rem] rounded-lg gap-2.5',
      lg: 'px-5 py-3.5 text-[0.95rem] rounded-lg gap-3',
    };

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-ink-strong text-background hover:opacity-90 active:bg-ink-strong/95 shadow-sm',
      secondary:
        'border border-rule bg-background text-ink-strong hover:bg-surface active:bg-surface/80',
      ghost:
        'bg-transparent text-foreground hover:bg-surface hover:text-ink-strong',
      link:
        'bg-transparent text-muted hover:text-ink-strong p-0 h-auto underline-offset-4 hover:underline active:scale-100',
      danger:
        'border border-red-300 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variant !== 'link' ? sizeClasses[size] : ''} ${variantClasses[variant]} ${widthClasses} ${className}`}
        {...props}
      >
        {isLoading && (
          <span
            className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
