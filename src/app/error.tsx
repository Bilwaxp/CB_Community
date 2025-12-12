'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card variant="glow" className="p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        
        <h1 className="text-2xl font-display font-bold text-text-primary mb-4">
          Une erreur est survenue
        </h1>
        
        <p className="text-text-secondary mb-6">
          {error.message || 'Une erreur inattendue s\'est produite. Veuillez réessayer.'}
        </p>

        {error.digest && (
          <p className="text-xs text-text-secondary mb-6">
            Code d'erreur: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={reset}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="flex-1"
          >
            Réessayer
          </Button>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full"
            >
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}




