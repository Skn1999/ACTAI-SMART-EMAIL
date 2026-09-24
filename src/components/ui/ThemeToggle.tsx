import React from 'react';
import { useTheme } from '@/hooks/useTheme';

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = true,
  className = '',
  ...props
}) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch between light and dark theme (currently ${theme} mode)`}
      className={`theme-toggle flex cursor-pointer items-center gap-2.5 rounded-full border border-rule bg-background py-2 pr-3.5 pl-4 text-foreground transition-colors hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      {...props}
    >
      {showLabel && <span className="text-[0.875rem] font-normal">Mode</span>}
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
        className="theme-icon shrink-0 transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] [html[data-theme='dark']_&]:rotate-180"
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
