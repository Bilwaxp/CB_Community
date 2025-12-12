'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#07051A', color: '#FFFFFF' }}>
          <div className="max-w-md w-full text-center p-8 rounded-2xl border border-purple-500/30 bg-[#0D0B24]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">
              Erreur critique
            </h1>
            
            <p className="text-gray-400 mb-6">
              Une erreur critique s'est produite. Veuillez rafraîchir la page.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={reset}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>
              <Link href="/">
                <button className="px-6 py-3 border border-purple-500/30 text-white rounded-lg font-semibold hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2 w-full">
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}




