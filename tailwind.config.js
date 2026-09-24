/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      rail: '1140px', // ActAI custom rail breakpoint
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'ink-strong': 'var(--ink-strong)',
        panel: 'var(--panel)',
        surface: 'var(--surface)',
        chip: 'var(--chip)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
      },
      fontFamily: {
        sans: ['Archivo', 'Arial', 'Helvetica', 'sans-serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      transitionTimingFunction: {
        actai: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        panel: '0.75rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rise: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--enter) var(--ease) both',
        rise: 'rise var(--move) var(--ease) both',
        pulse: 'pulse 1.6s var(--ease) infinite',
      },
    },
  },
  plugins: [],
};
