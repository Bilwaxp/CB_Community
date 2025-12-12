'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Lock,
  Shield,
  Twitter,
  Instagram,
  Send,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, Badge, Button, Input, Avatar } from '@/components/ui';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  // Mock user data
  const [formData, setFormData] = useState({
    prenom: 'Wadlex',
    nom: 'Pluviose',
    email: 'wadlex@cbcommunity.com',
    phone: '+509 1234 5678',
    pseudo: 'wadlex_trader',
    bio: 'Trader professionnel depuis 2015. Passionné par les cryptomonnaies et le forex.',
    twitter: '@wadlex_trader',
    instagram: '@wadlex_trader',
    telegram: '@wadlex_trader',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Profil mis à jour!');
    setIsLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Mot de passe modifié!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Mon Profil
        </h1>
        <p className="text-text-secondary">
          Gérez vos informations personnelles et paramètres de sécurité
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glow" className="text-center">
            <div className="relative inline-block mb-6">
              <Avatar nom={formData.nom} prenom={formData.prenom} size="xl" />
              <button className="absolute bottom-0 right-0 p-2 bg-neon-violet rounded-full text-white hover:bg-neon-violet/80 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-text-primary mb-1">
              {formData.prenom} {formData.nom}
            </h2>
            <p className="text-text-secondary mb-4">@{formData.pseudo}</p>

            <Badge variant="violet" glow className="mb-4">
              Plan VIP
            </Badge>

            <p className="text-sm text-text-secondary">{formData.bio}</p>

            <div className="flex justify-center gap-4 mt-6">
              {formData.twitter && (
                <a href="#" className="p-2 text-text-secondary hover:text-neon-cyan transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {formData.instagram && (
                <a href="#" className="p-2 text-text-secondary hover:text-neon-violet transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {formData.telegram && (
                <a href="#" className="p-2 text-text-secondary hover:text-neon-cyan transition-colors">
                  <Send className="w-5 h-5" />
                </a>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Info */}
          <Card variant="default">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-neon-violet" />
              Informations personnelles
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Prénom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                />
                <Input
                  label="Nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail className="w-5 h-5" />}
              />

              <Input
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                leftIcon={<Phone className="w-5 h-5" />}
              />

              <Input
                label="Pseudo"
                value={formData.pseudo}
                onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                hint="Ce pseudo sera visible dans la communauté"
              />

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary focus:border-neon-violet focus:outline-none resize-none"
                  placeholder="Parlez-nous de vous..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  leftIcon={<Twitter className="w-5 h-5" />}
                />
                <Input
                  label="Instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  leftIcon={<Instagram className="w-5 h-5" />}
                />
                <Input
                  label="Telegram"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  leftIcon={<Send className="w-5 h-5" />}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Enregistrer les modifications
              </Button>
            </form>
          </Card>

          {/* Password Change */}
          <Card variant="default">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-neon-cyan" />
              Changer le mot de passe
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Mot de passe actuel"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
              />
              <Input
                label="Nouveau mot de passe"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
              />
              <Input
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
              />

              <Button
                type="submit"
                variant="outline"
                isLoading={isLoading}
                leftIcon={<Lock className="w-4 h-4" />}
              >
                Changer le mot de passe
              </Button>
            </form>
          </Card>

          {/* Two-Factor Authentication */}
          <Card variant="default">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    Authentification à deux facteurs (2FA)
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant={twoFaEnabled ? 'green' : 'default'}>
                  {twoFaEnabled ? 'Activé' : 'Désactivé'}
                </Badge>
                <Button
                  variant={twoFaEnabled ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => setTwoFaEnabled(!twoFaEnabled)}
                >
                  {twoFaEnabled ? 'Désactiver' : 'Activer'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}













