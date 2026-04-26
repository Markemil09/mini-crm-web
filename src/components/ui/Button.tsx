import { cn } from '@/lib/utils';

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        variant === 'primary' && 'bg-accent-base text-text-on-accent hover:bg-accent-strong',
        variant === 'secondary' &&
          'bg-surface-strong text-text-base border border-border-base hover:bg-surface-subtle',
        variant === 'ghost' && 'text-text-subtle hover:text-text-base hover:bg-surface-strong',
        variant === 'danger' && 'bg-status-error-bg text-status-error hover:opacity-80',
      )}
    >
      {label}
    </button>
  );
}
