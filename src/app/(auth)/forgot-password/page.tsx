'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setIsSubmitted(true);
      toast.success('Email envoyé!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="glow" className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-neon-green" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Email envoyé!
          </h1>
          <p className="text-text-secondary mb-6">
            Si un compte existe avec l&apos;adresse <strong>{email}</strong>,
            vous recevrez un lien de réinitialisation dans quelques minutes.
          </p>
          <p className="text-sm text-text-secondary mb-6">
            N&apos;oubliez pas de vérifier votre dossier spam.
          </p>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
              className="w-full"
            >
              Retour à la connexion
            </Button>
          </Link>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card variant="glow" className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Mot de passe oublié?
          </h1>
          <p className="text-text-secondary">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-5 h-5" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Envoyer le lien
          </Button>
        </form>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 mt-6 text-text-secondary hover:text-neon-violet transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </Link>
      </Card>
    </motion.div>
  );
}













