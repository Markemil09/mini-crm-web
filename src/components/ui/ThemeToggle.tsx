import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="
        rounded-full p-2
        bg-surface-subtle text-text-base
        border border-border-base
        hover:bg-surface-strong hover:border-border-strong
        transition-colors duration-200
        focus-visible:outline-none focus-visible:shadow-focus
      "
    >
      {theme === 'dark' ? '☀︎' : '☽'}
    </button>
  );
}
