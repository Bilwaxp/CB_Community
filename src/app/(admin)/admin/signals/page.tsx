'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Signal {
  id: string;
  title: string;
  pair: string;
  action: string;
  entryPrice: number;
  stopLoss: number;
  status: string;
  createdAt: string;
}

export default function AdminSignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSignals();
  }, []);

  const loadSignals = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par vraie API
      setSignals([]);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const filteredSignals = signals.filter((signal) =>
    signal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    signal.pair.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Gestion des signaux
          </h1>
          <p className="text-text-secondary">
            Créez et gérez les signaux de trading
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={loadSignals}
            disabled={loading}
          >
            Actualiser
          </Button>
          <Link href="/admin/signals/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Nouveau signal
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          type="text"
          placeholder="Rechercher un signal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5" />}
        />
      </motion.div>

      {loading ? (
        <Card variant="glass" className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Chargement...
          </h3>
        </Card>
      ) : filteredSignals.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Aucun signal trouvé
          </h3>
          <p className="text-text-secondary mb-6">
            Créez votre premier signal pour commencer.
          </p>
          <Link href="/admin/signals/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Créer un signal
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignals.map((signal) => (
            <Card key={signal.id} variant="glass">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{signal.pair}</h3>
                  <p className="text-sm text-text-secondary">{signal.title}</p>
                </div>
                <Badge variant={signal.action === 'BUY' ? 'green' : 'red'}>
                  {signal.action}
                </Badge>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Prix d'entrée:</span>
                  <span className="text-text-primary font-bold">${signal.entryPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Stop Loss:</span>
                  <span className="text-text-primary font-bold">${signal.stopLoss}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

