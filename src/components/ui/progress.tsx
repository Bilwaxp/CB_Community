'use client';

import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'violet' | 'cyan' | 'green' | 'gradient';
  showLabel?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'gradient',
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-text-secondary">Progression</span>
          <span className="text-sm font-medium text-neon-cyan">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-surface-dark rounded-full overflow-hidden',
          size === 'sm' && 'h-1.5',
          size === 'md' && 'h-2.5',
          size === 'lg' && 'h-4'
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variant === 'violet' && 'bg-neon-violet',
            variant === 'cyan' && 'bg-neon-cyan',
            variant === 'green' && 'bg-neon-green',
            variant === 'gradient' &&
              'bg-gradient-to-r from-neon-violet via-neon-cyan to-neon-green'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}













