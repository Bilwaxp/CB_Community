'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  ChevronDown,
  Play,
  Lock,
} from 'lucide-react';
import { Button, Card, Badge, Input } from '@/components/ui';

// Mock courses data
const courses = [
  {
    id: '1',
    title: 'Trading Forex pour Débutants',
    slug: 'trading-forex-debutants',
    description: 'Apprenez les bases du trading Forex, de l\'analyse technique aux stratégies de gestion du risque.',
    level: 'BEGINNER',
    duration: 720, // minutes
    lessons: 24,
    students: 1250,
    rating: 4.8,
    reviews: 89,
    price: 99,
    thumbnail: null,
    featured: true,
    instructor: 'Wadlex Pluviose',
  },
  {
    id: '2',
    title: 'Analyse Technique Avancée',
    slug: 'analyse-technique-avancee',
    description: 'Maîtrisez les indicateurs techniques, les figures chartistes et les stratégies de trading avancées.',
    level: 'INTERMEDIATE',
    duration: 1080,
    lessons: 36,
    students: 890,
    rating: 4.9,
    reviews: 67,
    price: 149,
    thumbnail: null,
    featured: true,
    instructor: 'Wadlex Pluviose',
  },
  {
    id: '3',
    title: 'Investir en Cryptomonnaies',
    slug: 'investir-cryptomonnaies',
    description: 'Découvrez l\'univers des cryptomonnaies et apprenez à investir intelligemment dans Bitcoin, Ethereum et plus.',
    level: 'BEGINNER',
    duration: 600,
    lessons: 20,
    students: 2100,
    rating: 4.7,
    reviews: 156,
    price: 79,
    thumbnail: null,
    featured: false,
    instructor: 'Wadlex Pluviose',
  },
  {
    id: '4',
    title: 'Psychologie du Trading',
    slug: 'psychologie-trading',
    description: 'Développez le mindset d\'un trader professionnel et apprenez à gérer vos émotions.',
    level: 'INTERMEDIATE',
    duration: 480,
    lessons: 16,
    students: 650,
    rating: 4.9,
    reviews: 45,
    price: 89,
    thumbnail: null,
    featured: false,
    instructor: 'Wadlex Pluviose',
  },
  {
    id: '5',
    title: 'Stratégies de Scalping',
    slug: 'strategies-scalping',
    description: 'Apprenez les techniques de scalping pour profiter des petits mouvements de marché.',
    level: 'ADVANCED',
    duration: 960,
    lessons: 32,
    students: 420,
    rating: 4.8,
    reviews: 38,
    price: 199,
    thumbnail: null,
    featured: true,
    instructor: 'Wadlex Pluviose',
  },
  {
    id: '6',
    title: 'DeFi & Yield Farming',
    slug: 'defi-yield-farming',
    description: 'Explorez la finance décentralisée et maximisez vos rendements avec le yield farming.',
    level: 'ADVANCED',
    duration: 720,
    lessons: 24,
    students: 380,
    rating: 4.6,
    reviews: 28,
    price: 179,
    thumbnail: null,
    featured: false,
    instructor: 'Wadlex Pluviose',
  },
];

const levelLabels = {
  BEGINNER: { label: 'Débutant', variant: 'green' as const },
  INTERMEDIATE: { label: 'Intermédiaire', variant: 'cyan' as const },
  ADVANCED: { label: 'Avancé', variant: 'violet' as const },
};

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="violet" className="mb-4">
            <BookOpen className="w-3 h-3 mr-1" />
            Formations
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary mb-4">
            Nos <span className="gradient-text">Cours</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Découvrez notre catalogue de formations premium en trading et cryptomonnaies,
            conçues par des experts du marché.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>

          {/* Level Filter */}
          <div className="flex gap-2">
            <Button
              variant={selectedLevel === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedLevel(null)}
            >
              Tous
            </Button>
            {Object.entries(levelLabels).map(([level, { label }]) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel(level)}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-surface-dark border border-border-glow rounded-lg text-text-primary focus:border-neon-violet focus:outline-none"
          >
            <option value="popular">Plus populaire</option>
            <option value="rating">Mieux noté</option>
            <option value="price-low">Prix croissant</option>
            <option value="price-high">Prix décroissant</option>
            <option value="newest">Plus récent</option>
          </select>
        </motion.div>

        {/* Results count */}
        <p className="text-text-secondary mb-6">
          {sortedCourses.length} cours trouvé{sortedCourses.length > 1 ? 's' : ''}
        </p>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Link href={`/courses/${course.slug}`}>
                <Card variant="glass" className="h-full group cursor-pointer overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 bg-gradient-to-br from-neon-violet/30 via-neon-cyan/20 to-neon-green/10 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-neon-violet/40 group-hover:scale-110 transition-transform" />
                    
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-neon-violet flex items-center justify-center shadow-neon-violet">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    {/* Level Badge */}
                    <Badge
                      variant={levelLabels[course.level as keyof typeof levelLabels].variant}
                      className="absolute top-4 left-4"
                    >
                      {levelLabels[course.level as keyof typeof levelLabels].label}
                    </Badge>

                    {/* Featured Badge */}
                    {course.featured && (
                      <Badge variant="yellow" className="absolute top-4 right-4">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-neon-violet transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(course.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} leçons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-text-secondary'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {course.rating} ({course.reviews} avis)
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-glow">
                    <span className="text-2xl font-bold text-neon-green">
                      ${course.price}
                    </span>
                    <Button variant="primary" size="sm">
                      Voir le cours
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Aucun cours trouvé
            </h3>
            <p className="text-text-secondary mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel(null);
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}













