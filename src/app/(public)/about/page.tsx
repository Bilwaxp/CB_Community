'use client';

import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { Card, Badge } from '@/components/ui';

const values = [
  {
    icon: Shield,
    title: 'Intégrité',
    description: 'Nous croyons en la transparence et l\'honnêteté dans toutes nos interactions.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque cours, signal et session de coaching.',
  },
  {
    icon: Users,
    title: 'Communauté',
    description: 'Nous construisons une communauté solidaire où chacun peut progresser.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Nous utilisons les dernières technologies pour offrir la meilleure expérience.',
  },
];

const milestones = [
  { year: '2020', title: 'Fondation', description: 'Création de CB_Community par Wadlex Pluviose' },
  { year: '2021', title: 'Premier cours', description: 'Lancement de notre première formation complète' },
  { year: '2022', title: '1000 membres', description: 'Atteinte du cap des 1000 membres actifs' },
  { year: '2023', title: 'Signaux Live', description: 'Introduction des signaux de trading en temps réel' },
  { year: '2024', title: 'Coaching Pro', description: 'Lancement des sessions de coaching en visioconférence' },
];

const whyUs = [
  'Formateurs experts avec plus de 10 ans d\'expérience',
  'Signaux de trading avec un taux de réussite de 92%',
  'Support disponible 24/7',
  'Communauté active de plus de 5000 membres',
  'Cours mis à jour régulièrement',
  'Garantie de remboursement 30 jours',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <Badge variant="violet" className="mb-4">
            À propos
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary mb-6">
            Notre <span className="gradient-text">Mission</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            CB_Community est née de la passion pour le trading et la volonté de démocratiser
            l&apos;accès à une éducation financière de qualité.
          </p>
        </motion.div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glow" className="h-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-neon-violet/20 flex items-center justify-center">
                <Target className="w-8 h-8 text-neon-violet" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Mission</h3>
              <p className="text-text-secondary">
                Fournir une éducation trading de classe mondiale accessible à tous,
                permettant à chacun de prendre le contrôle de son avenir financier.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glow" className="h-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-neon-cyan/20 flex items-center justify-center">
                <Eye className="w-8 h-8 text-neon-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Vision</h3>
              <p className="text-text-secondary">
                Devenir la référence mondiale en matière de formation trading,
                en créant la plus grande communauté de traders prospères.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="glow" className="h-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-neon-green/20 flex items-center justify-center">
                <Heart className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Valeurs</h3>
              <p className="text-text-secondary">
                Intégrité, excellence, innovation et communauté sont les piliers
                qui guident chacune de nos actions.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <Badge variant="cyan" className="mb-4">
              Nos Valeurs
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
              Ce en quoi nous croyons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card variant="glass" className="h-full">
                  <value.icon className="w-10 h-10 text-neon-violet mb-4" />
                  <h4 className="text-xl font-bold text-text-primary mb-2">{value.title}</h4>
                  <p className="text-text-secondary">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <Badge variant="green" className="mb-4">
              Notre Histoire
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
              Le parcours CB_Community
            </h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-violet via-neon-cyan to-neon-green hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 hidden lg:block" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-surface-dark border-2 border-neon-violet flex items-center justify-center font-display font-bold text-neon-violet">
                    {milestone.year}
                  </div>
                  <Card variant="glass" className="flex-1">
                    <h4 className="text-xl font-bold text-text-primary mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-text-secondary">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="glow" className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="violet" className="mb-4">
                  Pourquoi nous?
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-6">
                  Pourquoi CB_Community est différent
                </h2>
                <p className="text-text-secondary mb-6">
                  Nous ne sommes pas qu&apos;une simple plateforme de cours. Nous sommes
                  une communauté dédiée à votre réussite dans le trading et
                  l&apos;investissement en cryptomonnaies.
                </p>
                <ul className="space-y-4">
                  {whyUs.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-neon-violet/20 via-neon-cyan/10 to-neon-green/20 flex items-center justify-center border border-border-glow">
                  <div className="text-center">
                    <TrendingUp className="w-24 h-24 text-neon-violet mx-auto mb-4" />
                    <p className="text-2xl font-display font-bold text-text-primary">
                      Wadlex Pluviose
                    </p>
                    <p className="text-text-secondary">Fondateur & CEO</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-violet/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-cyan/20 rounded-full blur-2xl" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}













