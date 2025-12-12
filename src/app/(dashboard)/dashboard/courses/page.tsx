'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Play,
  CheckCircle,
  Lock,
  Search,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Card, Badge, Button, Progress, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

// Mock enrolled courses
const enrolledCourses = [
  {
    id: '1',
    title: 'Trading Forex pour Débutants',
    description: 'Les bases du trading Forex, de l\'analyse technique aux stratégies de gestion du risque.',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    duration: 720,
    level: 'BEGINNER',
    thumbnail: null,
    lastLesson: {
      id: 'l1',
      title: 'Les Figures Chartistes',
      module: 'Analyse Technique',
    },
  },
  {
    id: '2',
    title: 'Analyse Technique Avancée',
    description: 'Maîtrisez les indicateurs techniques et les stratégies de trading avancées.',
    progress: 30,
    totalLessons: 36,
    completedLessons: 11,
    duration: 1080,
    level: 'INTERMEDIATE',
    thumbnail: null,
    lastLesson: {
      id: 'l2',
      title: 'Indicateurs RSI et MACD',
      module: 'Indicateurs Techniques',
    },
  },
  {
    id: '3',
    title: 'Investir en Cryptomonnaies',
    description: 'Apprenez à investir intelligemment dans Bitcoin, Ethereum et plus.',
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    duration: 600,
    level: 'BEGINNER',
    thumbnail: null,
    lastLesson: null,
    completed: true,
    certificateAvailable: true,
  },
];

const levelLabels = {
  BEGINNER: { label: 'Débutant', variant: 'green' as const },
  INTERMEDIATE: { label: 'Intermédiaire', variant: 'cyan' as const },
  ADVANCED: { label: 'Avancé', variant: 'violet' as const },
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
};

export default function MyCoursesPage() {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'in-progress' && course.progress < 100) ||
      (filter === 'completed' && course.progress === 100);
    return matchesSearch && matchesFilter;
  });

  const inProgressCount = enrolledCourses.filter((c) => c.progress < 100).length;
  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Mes Cours
        </h1>
        <p className="text-text-secondary">
          Suivez votre progression et continuez votre apprentissage.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card variant="glass" className="text-center">
          <p className="text-4xl font-bold text-neon-violet mb-1">
            {enrolledCourses.length}
          </p>
          <p className="text-text-secondary">Total inscrit</p>
        </Card>
        <Card variant="glass" className="text-center">
          <p className="text-4xl font-bold text-neon-cyan mb-1">{inProgressCount}</p>
          <p className="text-text-secondary">En cours</p>
        </Card>
        <Card variant="glass" className="text-center">
          <p className="text-4xl font-bold text-neon-green mb-1">{completedCount}</p>
          <p className="text-text-secondary">Terminés</p>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tous ({enrolledCourses.length})
          </Button>
          <Button
            variant={filter === 'in-progress' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('in-progress')}
          >
            En cours ({inProgressCount})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Terminés ({completedCount})
          </Button>
        </div>
      </motion.div>

      {/* Course List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <Card variant="glass" className="group">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Thumbnail */}
                <div className="relative w-full lg:w-64 h-40 lg:h-auto rounded-xl bg-gradient-to-br from-neon-violet/30 via-neon-cyan/20 to-neon-green/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <BookOpen className="w-16 h-16 text-neon-violet/40" />
                  {course.progress === 100 && (
                    <div className="absolute inset-0 bg-neon-green/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-neon-green/30 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-neon-green" />
                      </div>
                    </div>
                  )}
                  <Badge
                    variant={levelLabels[course.level as keyof typeof levelLabels].variant}
                    className="absolute top-3 left-3"
                  >
                    {levelLabels[course.level as keyof typeof levelLabels].label}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-neon-violet transition-colors mb-2">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-text-secondary mb-4">{course.description}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(course.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.completedLessons}/{course.totalLessons} leçons
                      </span>
                    </div>

                    {/* Progress */}
                    <Progress
                      value={course.progress}
                      showLabel
                      className="mb-4"
                    />

                    {/* Last lesson */}
                    {course.lastLesson && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-secondary">Continuer:</span>
                        <span className="text-neon-cyan">{course.lastLesson.title}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border-glow">
                    {course.progress === 100 ? (
                      <>
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Revoir le cours
                          </Button>
                        </Link>
                        {course.certificateAvailable && (
                          <Link href="/dashboard/certificates">
                            <Button
                              variant="success"
                              size="sm"
                              leftIcon={<CheckCircle className="w-4 h-4" />}
                            >
                              Voir le certificat
                            </Button>
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link href={`/dashboard/courses/${course.id}/learn`}>
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<Play className="w-4 h-4" />}
                        >
                          Continuer le cours
                        </Button>
                      </Link>
                    )}
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                      >
                        Détails
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredCourses.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <BookOpen className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">Aucun cours trouvé</h3>
          <p className="text-text-secondary mb-6">
            {searchQuery
              ? 'Aucun cours ne correspond à votre recherche.'
              : 'Vous n\'êtes inscrit à aucun cours pour le moment.'}
          </p>
          <Link href="/courses">
            <Button variant="primary">Explorer les cours</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}













