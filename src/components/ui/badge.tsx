'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full border transition-all duration-300',
  {
    variants: {
      variant: {
        violet:
          'bg-neon-violet/20 text-neon-violet border-neon-violet/30',
        cyan:
          'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
        green:
          'bg-neon-green/20 text-neon-green border-neon-green/30',
        red:
          'bg-red-500/20 text-red-400 border-red-500/30',
        yellow:
          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        default:
          'bg-surface-light text-text-secondary border-border-glow',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  glow?: boolean;
}

function Badge({ className, variant, size, icon, glow, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        glow && variant === 'violet' && 'shadow-glow-sm',
        glow && variant === 'cyan' && 'shadow-neon-cyan',
        glow && variant === 'green' && 'shadow-neon-green',
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };













