import { cn } from '@/lib/utils';

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  id: string;
  error?: string;
};

export function Input({ label, id, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-base">
        {label}
        {props.required && <span className="ml-1 text-status-error" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        {...props}
        className={cn(
          'rounded-md border px-3 py-2 text-sm text-text-base bg-surface-base',
          'placeholder:text-text-muted',
          'focus-visible:outline-none focus-visible:shadow-focus',
          'transition-colors duration-150',
          error ? 'border-status-error' : 'border-border-base focus:border-border-accent',
          className,
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-status-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
