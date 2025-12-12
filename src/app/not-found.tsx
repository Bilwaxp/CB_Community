'use client';

import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card variant="glow" className="p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-violet/20 flex items-center justify-center">
          <FileQuestion className="w-8 h-8 text-neon-violet" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
          Page non trouvée
        </h2>
        
        <p className="text-text-secondary mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button
              variant="primary"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full"
            >
              Retour à l'accueil
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="flex-1"
          >
            Retour
          </Button>
        </div>
      </Card>
    </div>
  );
}




