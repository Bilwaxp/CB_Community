'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  Award,
  Video,
  Clock,
  ArrowRight,
  Play,
  Target,
  ChevronRight,
  Bell,
  Calendar,
} from 'lucide-react';
import { Card, Badge, Button, Progress, Avatar } from '@/components/ui';

// Mock data
const stats = [
  { label: 'Cours en cours', value: 3, icon: BookOpen, color: 'violet', href: '/dashboard/courses' },
  { label: 'Signaux actifs', value: 5, icon: TrendingUp, color: 'cyan', href: '/dashboard/signals' },
  { label: 'Certificats', value: 2, icon: Award, color: 'green', href: '/dashboard/certificates' },
  { label: 'Heures de formation', value: 24, icon: Clock, color: 'violet', href: '/dashboard/courses' },
];

const recentCourses = [
  {
    id: '1',
    title: 'Trading Forex pour Débutants',
    progress: 65,
    lastLesson: 'Les Figures Chartistes',
    thumbnail: null,
  },
  {
    id: '2',
    title: 'Analyse Technique Avancée',
    progress: 30,
    lastLesson: 'Indicateurs RSI et MACD',
    thumbnail: null,
  },
];

const recentSignals = [
  {
    id: '1',
    pair: 'BTC/USDT',
    action: 'BUY',
    entry: 67500,
    sl: 66800,
    tp: [68500, 69200],
    status: 'ACTIVE',
    time: '2h ago',
  },
  {
    id: '2',
    pair: 'EUR/USD',
    action: 'SELL',
    entry: 1.0865,
    sl: 1.0920,
    tp: [1.0800, 1.0750],
    status: 'ACTIVE',
    time: '4h ago',
  },
  {
    id: '3',
    pair: 'ETH/USDT',
    action: 'BUY',
    entry: 3480,
    sl: 3400,
    tp: [3600, 3750],
    status: 'WIN',
    time: '1d ago',
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Webinaire: Stratégies de Scalping',
    date: 'Dec 5, 2024',
    time: '14:00 UTC',
    type: 'webinar',
  },
  {
    id: '2',
    title: 'Coaching individuel',
    date: 'Dec 7, 2024',
    time: '10:00 UTC',
    type: 'coaching',
  },
];

const notifications = [
  { id: '1', message: 'Nouveau signal crypto disponible', time: '10min', read: false },
  { id: '2', message: 'Votre certificat est prêt', time: '1h', read: false },
  { id: '3', message: 'Mise à jour du cours Forex', time: '3h', read: true },
];

export default function DashboardPage() {
  // Mock user data
  const user = {
    prenom: 'Wadlex',
    plan: 'VIP',
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Bienvenue, {user.prenom}! 👋
          </h1>
          <p className="text-text-secondary">
            Voici un aperçu de votre progression et des dernières actualités.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="violet" glow>
            Plan {user.plan}
          </Badge>
          <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
            Reprendre le cours
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <Link key={stat.label} href={stat.href}>
            <Card variant="glass" className="group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
                    ${stat.color === 'violet' ? 'bg-neon-violet/20 text-neon-violet' : ''}
                    ${stat.color === 'cyan' ? 'bg-neon-cyan/20 text-neon-cyan' : ''}
                    ${stat.color === 'green' ? 'bg-neon-green/20 text-neon-green' : ''}
                  `}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card variant="default" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Continuer les cours</h2>
              <Link href="/dashboard/courses">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Voir tout
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-light hover:bg-surface-light/80 transition-colors cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-neon-violet/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary group-hover:text-neon-violet transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      Dernière leçon: {course.lastLesson}
                    </p>
                    <Progress value={course.progress} size="sm" showLabel />
                  </div>
                  <Button variant="primary" size="sm" className="flex-shrink-0">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="default" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Bell className="w-5 h-5 text-neon-violet" />
                Notifications
              </h2>
              <Badge variant="violet" size="sm">
                {notifications.filter((n) => !n.read).length} new
              </Badge>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg transition-colors cursor-pointer
                    ${notification.read ? 'bg-transparent hover:bg-surface-light' : 'bg-neon-violet/10 hover:bg-neon-violet/15'}
                  `}
                >
                  <p className={`text-sm ${notification.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Signals & Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="default">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-cyan" />
                Signaux récents
              </h2>
              <Link href="/dashboard/signals">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Voir tout
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentSignals.map((signal) => (
                <div
                  key={signal.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-light"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={signal.action === 'BUY' ? 'green' : 'red'}
                      size="sm"
                    >
                      {signal.action}
                    </Badge>
                    <div>
                      <p className="font-semibold text-text-primary">{signal.pair}</p>
                      <p className="text-xs text-text-secondary">{signal.time}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      signal.status === 'WIN' ? 'green' : signal.status === 'ACTIVE' ? 'cyan' : 'red'
                    }
                    size="sm"
                  >
                    {signal.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="default">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-neon-green" />
                Événements à venir
              </h2>
              <Link href="/dashboard/live">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Voir tout
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-surface-light hover:bg-surface-light/80 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${event.type === 'webinar' ? 'bg-neon-violet/20 text-neon-violet' : 'bg-neon-cyan/20 text-neon-cyan'}
                    `}
                  >
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary">{event.title}</p>
                    <p className="text-sm text-text-secondary">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Rejoindre
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}













