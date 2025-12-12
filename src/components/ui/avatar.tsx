'use client';

import Image from 'next/image';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  nom?: string;
  prenom?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showOnline?: boolean;
  isOnline?: boolean;
}

export function Avatar({
  src,
  alt = 'Avatar',
  nom = '',
  prenom = '',
  size = 'md',
  className,
  showOnline = false,
  isOnline = false,
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const initials = getInitials(nom, prenom);

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative rounded-full overflow-hidden bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center font-bold text-white border-2 border-neon-violet/30',
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <span>{initials || '?'}</span>
        )}
      </div>
      
      {showOnline && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
            isOnline ? 'bg-neon-green' : 'bg-text-secondary'
          )}
        />
      )}
    </div>
  );
}













