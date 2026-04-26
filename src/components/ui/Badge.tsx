import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-status-success-bg text-status-success',
  warning: 'bg-status-warning-bg text-status-warning',
  error:   'bg-status-error-bg   text-status-error',
  info:    'bg-status-info-bg    text-status-info',
};

type BadgeProps = {
  label: string;
  variant: BadgeVariant;
};

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
      )}
    >
      {label}
    </span>
  );
}
