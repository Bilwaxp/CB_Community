'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </div>
          )}

          <input
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 py-3.5 text-base text-text-primary bg-surface-dark border border-border-glow rounded-lg outline-none transition-all duration-300',
              'placeholder:text-text-secondary/50',
              'focus:border-neon-violet focus:shadow-glow-sm',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-12',
              (rightIcon || isPassword) && 'pr-12',
              error && 'border-red-500 focus:border-red-500 focus:shadow-red-500/20',
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-neon-violet transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {hint && !error && (
          <p className="text-sm text-text-secondary">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };













