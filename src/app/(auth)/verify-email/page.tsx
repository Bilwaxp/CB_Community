'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [isVerifying, setIsVerifying] = useState(false);

  const errorMessages: Record<string, string> = {
    token_missing: 'Le lien de vérification est invalide. Il manque le token.',
    invalid_token: 'Le lien de vérification est invalide ou a expiré. Veuillez demander un nouveau lien.',
    user_not_found: 'Utilisateur introuvable. Veuillez vous réinscrire.',
    server_error: 'Une erreur est survenue. Veuillez réessayer plus tard.',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <Card variant="glow" className="p-8 max-w-md w-full text-center">
        {error ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Erreur de vérification
            </h1>
            <p className="text-text-secondary mb-6">
              {errorMessages[error] || 'Une erreur est survenue lors de la vérification.'}
            </p>
            <div className="space-y-3">
              <Link href="/register">
                <Button variant="primary" className="w-full">
                  Créer un nouveau compte
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-neon-green" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Vérifiez votre email
            </h1>
            <p className="text-text-secondary mb-6">
              Un email de vérification a été envoyé à votre adresse email.
              Cliquez sur le lien dans l&apos;email pour activer votre compte.
            </p>
            <div className="bg-surface-light rounded-lg p-4 mb-6">
              <p className="text-sm text-text-secondary">
                <strong>Note:</strong> Le lien de vérification est valide pendant 24 heures.
                Si vous ne recevez pas l&apos;email, vérifiez votre dossier spam.
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/login">
                <Button variant="primary" className="w-full">
                  Retour à la connexion
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Retour à l&apos;accueil
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
}








