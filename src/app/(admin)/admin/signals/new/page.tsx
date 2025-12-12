'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewSignalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    pair: '',
    action: 'BUY',
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    analysis: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implémenter l'API
      toast.success('Signal créé avec succès!');
      router.push('/admin/signals');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création');
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
        <Link href="/admin/signals">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Créer un nouveau signal
          </h1>
        </div>
      </motion.div>

      <Card variant="glow" className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Titre *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Signal BTC/USDT"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Paire *
              </label>
              <Input
                type="text"
                value={formData.pair}
                onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                placeholder="Ex: BTC/USDT"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Action *
              </label>
              <select
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Prix d'entrée *
              </label>
              <Input
                type="number"
                value={formData.entryPrice}
                onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Stop Loss *
              </label>
              <Input
                type="number"
                value={formData.stopLoss}
                onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Take Profit
            </label>
            <Input
              type="text"
              value={formData.takeProfit}
              onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
              placeholder="Ex: 1.5, 2.0, 3.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Analyse
            </label>
            <textarea
              value={formData.analysis}
              onChange={(e) => setFormData({ ...formData, analysis: e.target.value })}
              className="w-full px-4 py-3 bg-surface-dark border border-border-glow rounded-lg text-text-primary"
              rows={6}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              leftIcon={<Save className="w-4 h-4" />}
              isLoading={loading}
            >
              Créer le signal
            </Button>
            <Link href="/admin/signals">
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

