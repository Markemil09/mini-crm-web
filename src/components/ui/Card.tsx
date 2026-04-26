import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border-base bg-surface-subtle p-6 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
