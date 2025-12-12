'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-semibold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neon-violet/50 focus:ring-offset-2 focus:ring-offset-background',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-neon-violet to-purple-600 text-white shadow-neon-violet hover:shadow-glow-lg hover:-translate-y-0.5',
        secondary:
          'bg-gradient-to-r from-neon-cyan to-cyan-600 text-white shadow-neon-cyan hover:shadow-glow-lg hover:-translate-y-0.5',
        success:
          'bg-gradient-to-r from-neon-green to-emerald-600 text-background shadow-neon-green hover:shadow-glow-lg hover:-translate-y-0.5',
        outline:
          'bg-transparent border-2 border-neon-violet text-neon-violet hover:bg-neon-violet/10 hover:shadow-glow-sm',
        ghost:
          'bg-transparent text-text-primary hover:bg-surface-light hover:text-neon-violet',
        danger:
          'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg hover:-translate-y-0.5',
      },
      size: {
        sm: 'px-4 py-2 text-xs rounded-md',
        md: 'px-6 py-3 rounded-lg',
        lg: 'px-8 py-4 text-base rounded-lg',
        xl: 'px-10 py-5 text-lg rounded-xl',
        icon: 'p-2 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), 'group')}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shine effect */}
        <span className="absolute inset-0 overflow-hidden rounded-inherit">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
        </span>

        {/* Content */}
        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            leftIcon
          )}
          {children}
          {!isLoading && rightIcon}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };








