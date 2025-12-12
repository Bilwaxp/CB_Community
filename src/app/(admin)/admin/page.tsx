'use client';

import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  Clock,
  UserPlus,
  CreditCard,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import Link from 'next/link';

// Mock admin stats
const stats = [
  {
    label: 'Utilisateurs totaux',
    value: '5,234',
    change: '+12%',
    isUp: true,
    icon: Users,
    color: 'violet',
    href: '/admin/users',
  },
  {
    label: 'Revenus ce mois',
    value: '$24,580',
    change: '+18%',
    isUp: true,
    icon: DollarSign,
    color: 'green',
    href: '/admin/payments',
  },
  {
    label: 'Cours actifs',
    value: '24',
    change: '+2',
    isUp: true,
    icon: BookOpen,
    color: 'cyan',
    href: '/admin/courses',
  },
  {
    label: 'Signaux ce mois',
    value: '156',
    change: '+8%',
    isUp: true,
    icon: TrendingUp,
    color: 'violet',
    href: '/admin/signals',
  },
];

const pendingApprovals = [
  { id: '1', name: 'Jean-Pierre Dupont', email: 'jp.dupont@email.com', date: '2 hours ago' },
  { id: '2', name: 'Marie Claire', email: 'marie.c@email.com', date: '4 hours ago' },
  { id: '3', name: 'Robert Martin', email: 'r.martin@email.com', date: '1 day ago' },
];

const recentPayments = [
  { id: '1', user: 'Alice B.', plan: 'VIP', amount: 299, date: '10 min ago' },
  { id: '2', user: 'Marc D.', plan: 'Pro', amount: 29, date: '45 min ago' },
  { id: '3', user: 'Sophie L.', plan: 'Course', amount: 99, date: '2 hours ago' },
  { id: '4', user: 'Paul R.', plan: 'Pro', amount: 29, date: '3 hours ago' },
];

const recentActivity = [
  { id: '1', action: 'Nouveau cours publié', details: 'DeFi Masterclass', time: '1h ago' },
  { id: '2', action: 'Signal créé', details: 'BTC/USDT - BUY', time: '2h ago' },
  { id: '3', action: 'Utilisateur approuvé', details: 'marc@email.com', time: '3h ago' },
  { id: '4', action: 'Webinaire programmé', details: 'Dec 10 - Scalping', time: '5h ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Dashboard Admin
        </h1>
        <p className="text-text-secondary">
          Vue d&apos;ensemble de la plateforme CB_Community
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <Link key={stat.label} href={stat.href}>
            <Card variant="glass" className="group cursor-pointer relative overflow-hidden">
              {/* Background glow */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20
                  ${stat.color === 'violet' ? 'bg-neon-violet' : ''}
                  ${stat.color === 'green' ? 'bg-neon-green' : ''}
                  ${stat.color === 'cyan' ? 'bg-neon-cyan' : ''}
                `}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${stat.color === 'violet' ? 'bg-neon-violet/20 text-neon-violet' : ''}
                      ${stat.color === 'green' ? 'bg-neon-green/20 text-neon-green' : ''}
                      ${stat.color === 'cyan' ? 'bg-neon-cyan/20 text-neon-cyan' : ''}
                    `}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium
                      ${stat.isUp ? 'text-neon-green' : 'text-red-400'}
                    `}
                  >
                    {stat.isUp ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>

                <p className="text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-neon-violet" />
                En attente d&apos;approbation
              </h2>
              <Badge variant="violet" glow>
                {pendingApprovals.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-light"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">{user.name}</p>
                      <p className="text-xs text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/users?approve=${user.id}`}>
                      <Button variant="success" size="sm">
                        Approuver
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/admin/users?status=pending">
              <Button variant="ghost" className="w-full mt-4">
                Voir tous
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="default">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neon-green" />
                Paiements récents
              </h2>
            </div>

            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-light"
                >
                  <div>
                    <p className="font-medium text-text-primary text-sm">{payment.user}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={payment.plan === 'VIP' ? 'violet' : payment.plan === 'Pro' ? 'cyan' : 'default'}
                        size="sm"
                      >
                        {payment.plan}
                      </Badge>
                      <span className="text-xs text-text-secondary">{payment.date}</span>
                    </div>
                  </div>
                  <span className="font-bold text-neon-green">${payment.amount}</span>
                </div>
              ))}
            </div>

            <Link href="/admin/payments">
              <Button variant="ghost" className="w-full mt-4">
                Voir tous
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="default">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Activity className="w-5 h-5 text-neon-cyan" />
                Activité récente
              </h2>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-text-primary text-sm">{activity.action}</p>
                    <p className="text-xs text-text-secondary">
                      {activity.details} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/admin/logs">
              <Button variant="ghost" className="w-full mt-4">
                Voir les logs
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/courses/new">
              <Button variant="primary" leftIcon={<BookOpen className="w-4 h-4" />}>
                Nouveau cours
              </Button>
            </Link>
            <Link href="/admin/signals/new">
              <Button variant="secondary" leftIcon={<TrendingUp className="w-4 h-4" />}>
                Nouveau signal
              </Button>
            </Link>
            <Link href="/admin/video/new">
              <Button variant="outline" leftIcon={<Clock className="w-4 h-4" />}>
                Programmer webinaire
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" leftIcon={<Users className="w-4 h-4" />}>
                Gérer utilisateurs
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}













