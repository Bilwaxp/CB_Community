'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '0',
    level: 'BEGINNER',
    minPlan: 'BASIC',
    isPremium: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création');
      }

      const data = await response.json();
      toast.success('Cours créé avec succès!');
      router.push(`/admin/courses/${data.course.id}/lessons`);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création du cours');
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
        <Link href="/admin/courses">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Créer un nouveau cours
          </h1>
          <p className="text-text-secondary">
            Remplissez les informations pour créer un cours
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="glow" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Titre du cours *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Trading Forex pour Débutants"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez le contenu du cours..."
                className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-violet"
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Image de couverture (URL)
                </label>
                <Input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Prix (USD)
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Niveau
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary focus:outline-none focus:border-neon-violet"
                >
                  <option value="BEGINNER">Débutant</option>
                  <option value="INTERMEDIATE">Intermédiaire</option>
                  <option value="ADVANCED">Avancé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Plan minimum requis
                </label>
                <select
                  value={formData.minPlan}
                  onChange={(e) => setFormData({ ...formData, minPlan: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary focus:outline-none focus:border-neon-violet"
                >
                  <option value="BASIC">BASIC</option>
                  <option value="PRO">PRO</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                className="w-4 h-4 rounded border-border-glow bg-surface-dark text-neon-violet focus:ring-neon-violet"
              />
              <label htmlFor="isPremium" className="text-sm text-text-primary">
                Cours premium (réservé aux abonnés)
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={<Save className="w-4 h-4" />}
                isLoading={loading}
              >
                Créer le cours
              </Button>
              <Link href="/admin/courses">
                <Button type="button" variant="outline" size="lg">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

