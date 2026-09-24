import React from 'react';
import { AppRail } from './AppRail';

export interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-ink-strong selection:text-background">
      {/* AppRail handles fixed left rail on >= 1140px and top header on < 1140px */}
      <AppRail />

      {/* Main Content Area offset by 256px on desktop (28px left margin + 200px width + 28px gap) */}
      <div className={`min-h-screen rail:pl-[256px] transition-all ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
