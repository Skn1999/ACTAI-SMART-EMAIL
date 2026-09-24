import { useEffect, useState, useCallback } from 'react';
import { Theme } from '@/types/theme';

const STORAGE_KEY = 'actai-theme';
const THEME_CHANGE_EVENT = 'actai-theme-change';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  // 1. Check DOM attribute set by index.html script
  const domTheme = document.documentElement.getAttribute('data-theme') as Theme | null;
  if (domTheme === 'light' || domTheme === 'dark') {
    return domTheme;
  }

  // 2. Check localStorage
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  // 3. Fallback to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Sync state when custom theme change event fires (e.g. across multiple components)
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setThemeState(e.detail);
    };

    window.addEventListener(THEME_CHANGE_EVENT as any, handleThemeChange as EventListener);

    // Also listen for system changes if no manual preference stored
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const next = e.matches ? 'dark' : 'light';
        applyTheme(next);
        setThemeState(next);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT as any, handleThemeChange as EventListener);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
    setThemeState(newTheme);
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }));
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  };
}
