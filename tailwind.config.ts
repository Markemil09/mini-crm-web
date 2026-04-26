import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base:    'var(--color-surface-base)',
          subtle:  'var(--color-surface-subtle)',
          strong:  'var(--color-surface-strong)',
          inverse: 'var(--color-surface-inverse)',
        },
        text: {
          base:       'var(--color-text-base)',
          subtle:     'var(--color-text-subtle)',
          muted:      'var(--color-text-muted)',
          inverse:    'var(--color-text-inverse)',
          'on-accent': 'var(--color-text-on-accent)',
        },
        accent: {
          base:   'var(--color-accent-base)',
          subtle: 'var(--color-accent-subtle)',
          strong: 'var(--color-accent-strong)',
          muted:  'var(--color-accent-muted)',
        },
        border: {
          base:   'var(--color-border-base)',
          strong: 'var(--color-border-strong)',
          accent: 'var(--color-border-accent)',
        },
        status: {
          success:      'var(--color-status-success)',
          'success-bg': 'var(--color-status-success-bg)',
          warning:      'var(--color-status-warning)',
          'warning-bg': 'var(--color-status-warning-bg)',
          error:        'var(--color-status-error)',
          'error-bg':   'var(--color-status-error-bg)',
          info:         'var(--color-status-info)',
          'info-bg':    'var(--color-status-info-bg)',
        },
      },
      boxShadow: {
        focus: 'var(--focus-ring)',
      },
    },
  },
  plugins: [],
};

export default config;
