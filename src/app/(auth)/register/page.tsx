'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setFormError(null);
    try {
      // Redirige vers Google avec prompt pour sélection de compte
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false, // On gère la redirection manuellement pour capturer les erreurs
      });
      
      if (result?.error) {
        // Erreur lors de la connexion Google
        if (result.error.includes('client_id') || result.error.includes('Missing') || result.error.includes('OAuth')) {
          setFormError('Google OAuth n\'est pas configuré. Veuillez utiliser le formulaire d\'inscription.');
          toast.error('Google OAuth non configuré');
        } else {
          setFormError('Erreur lors de l\'inscription avec Google: ' + result.error);
          toast.error('Erreur Google OAuth');
        }
        setIsLoading(false);
      } else if (result?.ok) {
        // Succès - redirection manuelle
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Erreur Google Sign Up:', error);
      if (error?.message?.includes('client_id') || error?.message?.includes('Missing') || error?.message?.includes('OAuth')) {
        setFormError('Google OAuth n\'est pas configuré. Veuillez utiliser le formulaire d\'inscription.');
        toast.error('Google OAuth non configuré');
      } else {
        setFormError('Une erreur est survenue lors de l\'inscription avec Google. Veuillez réessayer ou utiliser le formulaire.');
        toast.error('Erreur lors de l\'inscription Google');
      }
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { label: 'Au moins 8 caractères', test: (p: string) => p.length >= 8 },
    { label: 'Une lettre majuscule', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Une lettre minuscule', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Un chiffre', test: (p: string) => /\d/.test(p) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setFormError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    const allRequirementsMet = passwordRequirements.every((req) =>
      req.test(formData.password)
    );
    if (!allRequirementsMet) {
      setFormError('Le mot de passe ne respecte pas les exigences');
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setFormError('Veuillez accepter les conditions d\'utilisation');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || 'Erreur lors de l\'inscription';
        console.error('Erreur inscription:', errorMsg);
        throw new Error(errorMsg);
      }

      // Show success and redirect to verify email page
      setSuccess(true);
      toast.success('Inscription réussie! Vérifiez votre email.');
    } catch (error: any) {
      console.error('Erreur:', error);
      const errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
            Inscription réussie! ✅
          </h1>
          <p className="text-text-secondary mb-6">
            Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.
          </p>
          <div className="space-y-3">
            <Link href="/verify-email">
              <Button variant="primary" size="lg" className="w-full">
                J&apos;ai reçu l&apos;email
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full">
                Retour à la connexion
              </Button>
            </Link>
          </div>
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
            Créer un compte
          </h1>
          <p className="text-text-secondary">
            Rejoignez la communauté CB_Community
          </p>
        </div>

        {/* Error Message */}
        {formError && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{formError}</p>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prénom"
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              leftIcon={<User className="w-5 h-5" />}
              required
            />
            <Input
              label="Nom"
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={<Mail className="w-5 h-5" />}
            required
          />

          <div>
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />
            {/* Password requirements */}
            <div className="mt-2 space-y-1">
              {passwordRequirements.map((req, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-xs ${
                    req.test(formData.password)
                      ? 'text-neon-green'
                      : 'text-text-secondary'
                  }`}
                >
                  <CheckCircle className="w-3 h-3" />
                  {req.label}
                </div>
              ))}
            </div>
          </div>

          <Input
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            leftIcon={<Lock className="w-5 h-5" />}
            error={
              formData.confirmPassword &&
              formData.password !== formData.confirmPassword
                ? 'Les mots de passe ne correspondent pas'
                : undefined
            }
            required
          />

          {/* Terms acceptance */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={(e) =>
                setFormData({ ...formData, acceptTerms: e.target.checked })
              }
              className="mt-1 w-4 h-4 rounded border-border-glow bg-surface-dark text-neon-violet focus:ring-neon-violet"
            />
            <label htmlFor="acceptTerms" className="text-sm text-text-secondary">
              J&apos;accepte les{' '}
              <Link href="/terms" className="text-neon-violet hover:text-neon-cyan">
                conditions d&apos;utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/privacy" className="text-neon-violet hover:text-neon-cyan">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            rightIcon={<UserPlus className="w-5 h-5" />}
            className="w-full"
          >
            S&apos;inscrire
          </Button>
        </form>

        {/* Google OAuth - toujours affiché, erreur gérée si non configuré */}
        <>
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-glow" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-surface-dark text-text-secondary text-sm">
                ou continuer avec
              </span>
            </div>
          </div>

          {/* Social Sign Up */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            S&apos;inscrire avec Google
          </Button>
        </>

        {/* Login Link */}
        <p className="text-center mt-6 text-text-secondary">
          Déjà un compte?{' '}
          <Link
            href="/login"
            className="text-neon-violet hover:text-neon-cyan font-medium transition-colors"
          >
            Se connecter
          </Link>
        </p>
      </Card>
    </motion.div>
  );
}




