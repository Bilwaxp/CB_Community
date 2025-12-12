'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Basic',
    price: 0,
    interval: 'gratuit',
    description: 'Pour découvrir la plateforme',
    features: [
      'Accès aux cours gratuits',
      'Forum communautaire (lecture seule)',
      'Signaux limités (1/semaine)',
      'Support par email',
    ],
    cta: 'Commencer gratuitement',
    popular: false,
    icon: Zap,
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Pro',
    price: 29,
    interval: 'mois',
    description: 'Pour les traders actifs',
    features: [
      'Accès à tous les cours',
      'Signaux trading illimités',
      'Accès complet au forum',
      'Replays des webinaires',
      'Support prioritaire',
      'Analyses de marché quotidiennes',
    ],
    cta: 'Devenir Pro',
    popular: true,
    icon: Star,
    gradient: 'from-neon-cyan to-blue-600',
  },
  {
    name: 'VIP',
    price: 299,
    interval: 'an',
    description: 'L\'expérience ultime',
    features: [
      'Tout du plan Pro inclus',
      'Coaching individuel (2h/mois)',
      'Webinaires exclusifs en direct',
      'Signaux prioritaires',
      'Support 24/7 WhatsApp',
      'Certificats officiels',
      'Accès anticipé aux nouveautés',
      'Groupe Telegram privé',
    ],
    cta: 'Devenir VIP',
    popular: false,
    icon: Crown,
    gradient: 'from-neon-violet to-purple-600',
  },
];

const faqs = [
  {
    q: 'Puis-je changer de plan à tout moment?',
    a: 'Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment. Les changements prennent effet immédiatement.',
  },
  {
    q: 'Quels moyens de paiement acceptez-vous?',
    a: 'Nous acceptons Visa, Mastercard, PayPal, MonCash, NatCash et les cryptomonnaies (USDT, BTC).',
  },
  {
    q: 'Y a-t-il une garantie de remboursement?',
    a: 'Oui, nous offrons une garantie de remboursement de 30 jours. Si vous n\'êtes pas satisfait, contactez-nous pour un remboursement complet.',
  },
  {
    q: 'Les cours sont-ils accessibles à vie?',
    a: 'Les cours achetés individuellement sont accessibles à vie. Les cours inclus dans l\'abonnement nécessitent un abonnement actif.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="violet" className="mb-4">
            Tarifs
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary mb-4">
            Choisissez votre <span className="gradient-text">plan</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Des plans adaptés à chaque niveau. Commencez gratuitement et évoluez
            selon vos besoins.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={cn(
                  'relative',
                  plan.popular && 'lg:-mt-4 lg:mb-4'
                )}
              >
                <Card
                  variant={plan.popular ? 'glow' : 'glass'}
                  className={cn(
                    'h-full flex flex-col relative overflow-hidden',
                    plan.popular && 'border-neon-cyan shadow-neon-cyan'
                  )}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <Badge
                        variant="cyan"
                        glow
                        className="rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <div
                      className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                        plan.gradient
                      )}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-text-secondary">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl font-display font-bold text-text-primary">
                      ${plan.price}
                    </span>
                    <span className="text-text-secondary text-lg">
                      /{plan.interval}
                    </span>
                    {plan.name === 'VIP' && (
                      <p className="text-sm text-neon-green mt-2">
                        Économisez $49 vs mensuel
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={plan.price === 0 ? '/register' : '/register'}>
                    <Button
                      variant={plan.popular ? 'secondary' : plan.name === 'VIP' ? 'primary' : 'outline'}
                      size="lg"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} variant="glass">
                <h3 className="font-semibold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-text-secondary">{faq.a}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <Card variant="glow" className="text-center py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-violet/10 via-neon-cyan/10 to-neon-green/10" />
            <div className="relative">
              <Crown className="w-16 h-16 text-neon-violet mx-auto mb-6" />
              <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
                Prêt à transformer votre trading?
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto mb-8">
                Rejoignez des milliers de traders qui ont choisi CB_Community
                pour atteindre leurs objectifs financiers.
              </p>
              <Link href="/register">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Commencer maintenant
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}













