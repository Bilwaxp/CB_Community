'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewVideoSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    minPlan: 'PRO',
    maxParticipants: '100',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implémenter l'API
      toast.success('Webinaire programmé!');
      router.push('/admin/video');
    } catch (error: any) {
      toast.error(error.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/admin/video">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Programmer un webinaire
          </h1>
        </div>
      </motion.div>

      <Card variant="glow" className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titre *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date et heure *
              </label>
              <Input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Plan minimum requis
              </label>
              <select
                value={formData.minPlan}
                onChange={(e) => setFormData({ ...formData, minPlan: e.target.value })}
                className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary"
              >
                <option value="BASIC">BASIC</option>
                <option value="PRO">PRO</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              leftIcon={<Save className="w-4 h-4" />}
              isLoading={loading}
            >
              Programmer
            </Button>
            <Link href="/admin/video">
              <Button type="button" variant="outline" size="lg">
                Annuler
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

