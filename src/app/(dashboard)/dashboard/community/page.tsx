'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Users,
  ThumbsUp,
  Eye,
  Clock,
  Plus,
  Search,
  Pin,
  TrendingUp,
  BookOpen,
  HelpCircle,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Card, Badge, Button, Input, Avatar } from '@/components/ui';

// Mock forum data
const categories = [
  {
    id: '1',
    name: 'Général',
    slug: 'general',
    description: 'Discussions générales sur le trading',
    icon: MessageSquare,
    threads: 234,
    posts: 1567,
    color: 'violet',
  },
  {
    id: '2',
    name: 'Forex',
    slug: 'forex',
    description: 'Trading sur le marché des devises',
    icon: TrendingUp,
    threads: 189,
    posts: 1234,
    color: 'cyan',
  },
  {
    id: '3',
    name: 'Cryptomonnaies',
    slug: 'crypto',
    description: 'Bitcoin, Ethereum et altcoins',
    icon: Star,
    threads: 312,
    posts: 2456,
    color: 'green',
  },
  {
    id: '4',
    name: 'Formations',
    slug: 'formations',
    description: 'Questions sur les cours et leçons',
    icon: BookOpen,
    threads: 89,
    posts: 567,
    color: 'violet',
  },
  {
    id: '5',
    name: 'Support',
    slug: 'support',
    description: 'Aide et assistance technique',
    icon: HelpCircle,
    threads: 45,
    posts: 234,
    color: 'cyan',
  },
];

const recentThreads = [
  {
    id: '1',
    title: 'Analyse BTC/USDT - Breakout imminent?',
    category: 'Cryptomonnaies',
    author: { nom: 'Martin', prenom: 'Jean', photo: null },
    replies: 23,
    views: 456,
    lastActivity: '10 min',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Stratégie de scalping sur EUR/USD',
    category: 'Forex',
    author: { nom: 'Dupont', prenom: 'Marie', photo: null },
    replies: 15,
    views: 234,
    lastActivity: '1h',
    isPinned: false,
  },
  {
    id: '3',
    title: 'Question sur le cours Analyse Technique',
    category: 'Formations',
    author: { nom: 'Bernard', prenom: 'Sophie', photo: null },
    replies: 8,
    views: 123,
    lastActivity: '2h',
    isPinned: false,
  },
  {
    id: '4',
    title: 'Vos objectifs pour 2025?',
    category: 'Général',
    author: { nom: 'Petit', prenom: 'Lucas', photo: null },
    replies: 45,
    views: 678,
    lastActivity: '3h',
    isPinned: true,
  },
];

const topMembers = [
  { nom: 'Pluviose', prenom: 'Wadlex', posts: 1234, role: 'Admin' },
  { nom: 'Martin', prenom: 'Jean', posts: 567, role: 'VIP' },
  { nom: 'Dupont', prenom: 'Marie', posts: 456, role: 'Pro' },
  { nom: 'Bernard', prenom: 'Sophie', posts: 345, role: 'VIP' },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');

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
            Communauté
          </h1>
          <p className="text-text-secondary">
            Échangez avec d&apos;autres traders et partagez vos expériences
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Nouvelle discussion
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          type="text"
          placeholder="Rechercher dans le forum..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5" />}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-text-primary mb-4">Catégories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link key={category.id} href={`/dashboard/community/${category.slug}`}>
                    <Card variant="glass" className="group cursor-pointer h-full">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                            ${category.color === 'violet' ? 'bg-neon-violet/20 text-neon-violet' : ''}
                            ${category.color === 'cyan' ? 'bg-neon-cyan/20 text-neon-cyan' : ''}
                            ${category.color === 'green' ? 'bg-neon-green/20 text-neon-green' : ''}
                          `}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary group-hover:text-neon-violet transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-text-secondary mb-2">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-text-secondary">
                            <span>{category.threads} discussions</span>
                            <span>{category.posts} posts</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-neon-violet transition-colors" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Threads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-text-primary mb-4">Discussions récentes</h2>
            <Card variant="default">
              <div className="divide-y divide-border-glow">
                {recentThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/dashboard/community/thread/${thread.id}`}
                    className="flex items-center gap-4 p-4 hover:bg-surface-light/50 transition-colors"
                  >
                    <Avatar
                      nom={thread.author.nom}
                      prenom={thread.author.prenom}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {thread.isPinned && (
                          <Pin className="w-4 h-4 text-neon-violet flex-shrink-0" />
                        )}
                        <h3 className="font-medium text-text-primary truncate">
                          {thread.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        <Badge variant="default" size="sm">{thread.category}</Badge>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {thread.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {thread.views}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {thread.lastActivity}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="glass">
              <h2 className="text-lg font-bold text-text-primary mb-4">Statistiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-surface-light">
                  <p className="text-2xl font-bold text-neon-violet">5,234</p>
                  <p className="text-xs text-text-secondary">Membres</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface-light">
                  <p className="text-2xl font-bold text-neon-cyan">869</p>
                  <p className="text-xs text-text-secondary">Discussions</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface-light">
                  <p className="text-2xl font-bold text-neon-green">6,058</p>
                  <p className="text-xs text-text-secondary">Messages</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface-light">
                  <p className="text-2xl font-bold text-text-primary">124</p>
                  <p className="text-xs text-text-secondary">En ligne</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Top Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="glass">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-violet" />
                Top contributeurs
              </h2>
              <div className="space-y-3">
                {topMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-light transition-colors"
                  >
                    <span className="w-6 text-center font-bold text-text-secondary">
                      #{index + 1}
                    </span>
                    <Avatar nom={member.nom} prenom={member.prenom} size="sm" />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary text-sm">
                        {member.prenom} {member.nom}
                      </p>
                      <p className="text-xs text-text-secondary">{member.posts} posts</p>
                    </div>
                    <Badge
                      variant={
                        member.role === 'Admin'
                          ? 'violet'
                          : member.role === 'VIP'
                          ? 'violet'
                          : 'cyan'
                      }
                      size="sm"
                    >
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="glass">
              <h2 className="text-lg font-bold text-text-primary mb-4">Règles du forum</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Restez respectueux envers tous les membres</li>
                <li>• Pas de spam ou publicité non autorisée</li>
                <li>• Pas de conseils financiers personnalisés</li>
                <li>• Utilisez la bonne catégorie</li>
                <li>• Recherchez avant de poster</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}













