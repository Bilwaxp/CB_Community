'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  Globe,
  Mail,
  Bell,
  Shield,
} from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'CB_Community',
    email: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implémenter l'API
      toast.success('Paramètres sauvegardés!');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Paramètres
        </h1>
        <p className="text-text-secondary">
          Configurez les paramètres de la plateforme
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glow" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-neon-violet" />
              <h2 className="text-xl font-bold text-text-primary">Général</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nom du site
                </label>
                <Input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                leftIcon={<Save className="w-4 h-4" />}
                isLoading={loading}
              >
                Sauvegarder
              </Button>
            </form>
          </Card>

          <Card variant="glow" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-neon-cyan" />
              <h2 className="text-xl font-bold text-text-primary">Email</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    SMTP Host
                  </label>
                  <Input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    SMTP Port
                  </label>
                  <Input
                    type="text"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                leftIcon={<Save className="w-4 h-4" />}
                isLoading={loading}
              >
                Sauvegarder
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="glass" className="p-6">
            <h3 className="font-bold text-text-primary mb-4">Sections</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-surface-light text-text-primary">
                <Globe className="w-4 h-4 inline mr-2" />
                Général
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-surface-light text-text-primary">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-surface-light text-text-primary">
                <Shield className="w-4 h-4 inline mr-2" />
                Sécurité
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

