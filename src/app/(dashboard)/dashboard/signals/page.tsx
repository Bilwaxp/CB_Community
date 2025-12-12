'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Bell,
  BarChart3,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// Mock signals data
const signals = [
  {
    id: '1',
    pair: 'BTC/USDT',
    category: 'CRYPTO',
    action: 'BUY',
    entry: 67500,
    stopLoss: 66800,
    takeProfit: [68500, 69200, 70000],
    status: 'ACTIVE',
    analysis: 'Breakout haussier au-dessus de la résistance majeure. Volume en augmentation.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    currentPrice: 67850,
  },
  {
    id: '2',
    pair: 'EUR/USD',
    category: 'FOREX',
    action: 'SELL',
    entry: 1.0865,
    stopLoss: 1.092,
    takeProfit: [1.08, 1.075, 1.07],
    status: 'ACTIVE',
    analysis: 'Double top formé. Divergence RSI baissière confirmée.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    currentPrice: 1.0845,
  },
  {
    id: '3',
    pair: 'ETH/USDT',
    category: 'CRYPTO',
    action: 'BUY',
    entry: 3480,
    stopLoss: 3400,
    takeProfit: [3600, 3750, 3900],
    status: 'WIN',
    analysis: 'Support solide testé. Rebond avec volume.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    closedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    pips: 270,
  },
  {
    id: '4',
    pair: 'GBP/JPY',
    category: 'FOREX',
    action: 'BUY',
    entry: 189.5,
    stopLoss: 188.8,
    takeProfit: [190.5, 191.2],
    status: 'LOSS',
    analysis: 'Canal ascendant. Tendance haussière intacte.',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    closedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    pips: -70,
  },
  {
    id: '5',
    pair: 'SOL/USDT',
    category: 'CRYPTO',
    action: 'BUY',
    entry: 142,
    stopLoss: 138,
    takeProfit: [148, 155, 165],
    status: 'ACTIVE',
    analysis: 'Triangle ascendant. Breakout imminent.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    currentPrice: 144.5,
  },
];

const stats = {
  total: 156,
  winRate: 72,
  avgPips: 85,
  thisMonth: 24,
};

const formatTimeAgo = (date: Date) => {
  const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
  if (hours < 1) return 'Il y a quelques minutes';
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
};

export default function SignalsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'CRYPTO' | 'FOREX'>('all');

  const filteredSignals = signals.filter((signal) => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'active' && signal.status === 'ACTIVE') ||
      (filter === 'closed' && signal.status !== 'ACTIVE');
    const matchesCategory =
      categoryFilter === 'all' || signal.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Signaux Trading
          </h1>
          <p className="text-text-secondary">
            Signaux Forex et Crypto en temps réel par nos experts.
          </p>
        </div>
        <Button variant="outline" leftIcon={<Bell className="w-4 h-4" />}>
          Activer les notifications
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card variant="glass" className="text-center">
          <BarChart3 className="w-8 h-8 text-neon-violet mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{stats.total}</p>
          <p className="text-sm text-text-secondary">Signaux totaux</p>
        </Card>
        <Card variant="glass" className="text-center">
          <Target className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <p className="text-3xl font-bold text-neon-green mb-1">{stats.winRate}%</p>
          <p className="text-sm text-text-secondary">Taux de réussite</p>
        </Card>
        <Card variant="glass" className="text-center">
          <TrendingUp className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">+{stats.avgPips}</p>
          <p className="text-sm text-text-secondary">Pips moyens</p>
        </Card>
        <Card variant="glass" className="text-center">
          <Clock className="w-8 h-8 text-neon-violet mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{stats.thisMonth}</p>
          <p className="text-sm text-text-secondary">Ce mois</p>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tous
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Actifs
          </Button>
          <Button
            variant={filter === 'closed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('closed')}
          >
            Fermés
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={categoryFilter === 'all' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('all')}
          >
            Tous marchés
          </Button>
          <Button
            variant={categoryFilter === 'CRYPTO' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('CRYPTO')}
          >
            Crypto
          </Button>
          <Button
            variant={categoryFilter === 'FOREX' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('FOREX')}
          >
            Forex
          </Button>
        </div>
      </motion.div>

      {/* Signals List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredSignals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <Card variant="glass">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Main info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant={signal.action === 'BUY' ? 'green' : 'red'}
                      className="text-base px-4 py-1.5"
                    >
                      {signal.action === 'BUY' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {signal.action}
                    </Badge>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {signal.pair}
                    </h3>
                    <Badge variant={signal.category === 'CRYPTO' ? 'cyan' : 'violet'}>
                      {signal.category}
                    </Badge>
                    <Badge
                      variant={
                        signal.status === 'ACTIVE'
                          ? 'cyan'
                          : signal.status === 'WIN'
                          ? 'green'
                          : 'red'
                      }
                      glow={signal.status === 'ACTIVE'}
                    >
                      {signal.status === 'ACTIVE' && <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />}
                      {signal.status}
                    </Badge>
                  </div>

                  {/* Analysis */}
                  <p className="text-text-secondary mb-4">{signal.analysis}</p>

                  {/* Time */}
                  <p className="text-sm text-text-secondary">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {formatTimeAgo(signal.createdAt)}
                  </p>
                </div>

                {/* Right: Levels */}
                <div className="lg:w-72 space-y-3">
                  {/* Entry */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-light">
                    <span className="text-text-secondary">Entrée</span>
                    <span className="font-bold text-text-primary">{signal.entry}</span>
                  </div>

                  {/* Stop Loss */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-red-400 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      Stop Loss
                    </span>
                    <span className="font-bold text-red-400">{signal.stopLoss}</span>
                  </div>

                  {/* Take Profits */}
                  {signal.takeProfit.map((tp, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-neon-green/10 border border-neon-green/20"
                    >
                      <span className="text-neon-green flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        TP {i + 1}
                      </span>
                      <span className="font-bold text-neon-green">{tp}</span>
                    </div>
                  ))}

                  {/* Result (for closed signals) */}
                  {signal.status !== 'ACTIVE' && signal.pips !== undefined && (
                    <div
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg mt-4',
                        signal.pips > 0
                          ? 'bg-neon-green/20 border border-neon-green/30'
                          : 'bg-red-500/20 border border-red-500/30'
                      )}
                    >
                      <span className="font-medium text-text-primary flex items-center gap-2">
                        {signal.pips > 0 ? (
                          <CheckCircle className="w-5 h-5 text-neon-green" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        Résultat
                      </span>
                      <span
                        className={cn(
                          'font-bold text-lg',
                          signal.pips > 0 ? 'text-neon-green' : 'text-red-400'
                        )}
                      >
                        {signal.pips > 0 ? '+' : ''}{signal.pips} pips
                      </span>
                    </div>
                  )}

                  {/* Current price (for active signals) */}
                  {signal.status === 'ACTIVE' && signal.currentPrice && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                      <span className="text-neon-cyan">Prix actuel</span>
                      <span className="font-bold text-neon-cyan">{signal.currentPrice}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredSignals.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Aucun signal trouvé
          </h3>
          <p className="text-text-secondary">
            Aucun signal ne correspond à vos critères de filtrage.
          </p>
        </Card>
      )}
    </div>
  );
}













