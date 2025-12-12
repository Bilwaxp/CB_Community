'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BookOpen,
  Users,
  Video,
  Shield,
  BarChart3,
  Zap,
  Award,
  ArrowRight,
  Play,
  ChevronRight,
  Star,
  Clock,
  Target,
  Trophy,
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Mock market data
const marketData = [
  { symbol: 'BTC/USDT', price: 67432.50, change: 2.34, isUp: true },
  { symbol: 'ETH/USDT', price: 3521.80, change: 1.87, isUp: true },
  { symbol: 'EUR/USD', price: 1.0865, change: -0.12, isUp: false },
  { symbol: 'XRP/USDT', price: 0.5234, change: 5.21, isUp: true },
  { symbol: 'SOL/USDT', price: 142.65, change: 3.45, isUp: true },
  { symbol: 'GBP/USD', price: 1.2734, change: -0.08, isUp: false },
];

// Features
const features = [
  {
    icon: BookOpen,
    title: 'Formations Premium',
    description:
      'Accédez à des cours vidéo HD de haute qualité, créés par des experts du trading.',
    color: 'violet',
  },
  {
    icon: TrendingUp,
    title: 'Signaux Exclusifs',
    description:
      'Recevez des signaux de trading Forex et Crypto en temps réel avec analyses.',
    color: 'cyan',
  },
  {
    icon: Users,
    title: 'Communauté Active',
    description:
      'Rejoignez une communauté de traders passionnés et partagez vos expériences.',
    color: 'green',
  },
  {
    icon: Video,
    title: 'Coaching Live',
    description:
      'Participez à des sessions de coaching en direct et webinaires exclusifs.',
    color: 'violet',
  },
];

// Testimonials
const testimonials = [
  {
    name: 'Jean-Marc P.',
    role: 'Trader Forex',
    avatar: null,
    content:
      'CB_Community a transformé ma façon de trader. Les formations sont claires et les signaux très précis. Je recommande à 100%!',
    rating: 5,
  },
  {
    name: 'Marie L.',
    role: 'Investisseur Crypto',
    avatar: null,
    content:
      'Grâce aux cours de CB_Community, j\'ai pu comprendre le marché des cryptomonnaies et réaliser mes premiers profits.',
    rating: 5,
  },
  {
    name: 'Pierre D.',
    role: 'Débutant',
    avatar: null,
    content:
      'L\'accompagnement est exceptionnel. Le coaching personnalisé m\'a permis de progresser rapidement.',
    rating: 5,
  },
];

// Stats
const stats = [
  { value: '5,000+', label: 'Membres actifs', icon: Users },
  { value: '50+', label: 'Cours disponibles', icon: BookOpen },
  { value: '1,200+', label: 'Signaux envoyés', icon: TrendingUp },
  { value: '92%', label: 'Taux de réussite', icon: Target },
];

export default function HomePage() {
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMarketIndex((prev) => (prev + 1) % marketData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <Badge variant="violet" glow className="mb-6">
              <Zap className="w-3 h-3 mr-1" />
              Plateforme #1 en Trading & Crypto
            </Badge>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-text-primary">Maîtrisez le</span>
              <br />
              <span className="gradient-text">Trading & Crypto</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Formations premium, signaux exclusifs, coaching personnalisé et une
              communauté de traders passionnés. Rejoignez CB_Community aujourd&apos;hui.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Rejoindre la communauté
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Play className="w-5 h-5" />}
                >
                  Voir les cours
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Market Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex items-center justify-center gap-6 flex-wrap"
          >
            {marketData.slice(0, 4).map((market, index) => (
              <div
                key={market.symbol}
                className="glass-card px-6 py-4 flex items-center gap-4"
              >
                <div>
                  <p className="text-sm text-text-secondary">{market.symbol}</p>
                  <p className="text-lg font-bold text-text-primary">
                    ${market.price.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    market.isUp ? 'text-neon-green' : 'text-red-400'
                  }`}
                >
                  {market.isUp ? '+' : ''}
                  {market.change}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="cyan" className="mb-4">
              Nos Avantages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              Pourquoi choisir CB_Community?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Découvrez les fonctionnalités qui font de notre plateforme la référence
              en matière de formation trading.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card variant="glass" className="h-full group">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110
                      ${
                        feature.color === 'violet'
                          ? 'bg-neon-violet/20 text-neon-violet'
                          : feature.color === 'cyan'
                          ? 'bg-neon-cyan/20 text-neon-cyan'
                          : 'bg-neon-green/20 text-neon-green'
                      }
                    `}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-20 px-4 bg-surface-dark border-y border-border-glow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-violet/10 text-neon-violet mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== COURSES PREVIEW ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between mb-12"
          >
            <div>
              <Badge variant="green" className="mb-4">
                Formations
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
                Nos cours populaires
              </h2>
            </div>
            <Link href="/courses">
              <Button variant="ghost" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Voir tous les cours
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Trading Forex pour Débutants',
                level: 'Débutant',
                duration: '12h',
                lessons: 24,
                price: 99,
                image: '/courses/forex-beginner.jpg',
              },
              {
                title: 'Analyse Technique Avancée',
                level: 'Intermédiaire',
                duration: '18h',
                lessons: 36,
                price: 149,
                image: '/courses/technical-analysis.jpg',
              },
              {
                title: 'Investir en Cryptomonnaies',
                level: 'Débutant',
                duration: '10h',
                lessons: 20,
                price: 79,
                image: '/courses/crypto.jpg',
              },
            ].map((course, index) => (
              <motion.div key={course.title} variants={fadeInUp}>
                <Card variant="glass" className="overflow-hidden group">
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 -mx-6 -mt-6 mb-6 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-neon-violet/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent" />
                    <Badge
                      variant={course.level === 'Débutant' ? 'green' : 'cyan'}
                      className="absolute top-4 left-4"
                    >
                      {course.level}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-neon-violet transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} leçons
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-glow">
                    <span className="text-2xl font-bold text-neon-green">
                      ${course.price}
                    </span>
                    <Button variant="primary" size="sm">
                      Voir le cours
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="violet" className="mb-4">
              Témoignages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              Ce que disent nos membres
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Découvrez les avis de notre communauté de traders.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} variants={fadeInUp}>
                <Card variant="glass" className="h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-text-secondary mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glow" className="text-center py-12 px-6 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-violet/10 via-neon-cyan/10 to-neon-green/10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-violet to-transparent" />

              <div className="relative z-10">
                <Trophy className="w-16 h-16 text-neon-violet mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
                  Prêt à commencer votre voyage?
                </h2>
                <p className="text-text-secondary max-w-xl mx-auto mb-8">
                  Rejoignez des milliers de traders qui ont transformé leur vie grâce
                  à CB_Community. Commencez dès aujourd&apos;hui!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      Créer un compte gratuit
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="lg">
                      Voir les tarifs
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}













