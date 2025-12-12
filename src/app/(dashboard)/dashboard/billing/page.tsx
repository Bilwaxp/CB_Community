'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Check,
  Star,
  Zap,
  Crown,
  Download,
  Clock,
  ArrowRight,
  Shield,
  Wallet,
  QrCode,
  X,
} from 'lucide-react';
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
      'Signaux limités',
    ],
    current: false,
    popular: false,
    icon: Zap,
    color: 'default' as const,
  },
  {
    name: 'Pro',
    price: 29,
    interval: 'mois',
    description: 'Pour les traders actifs',
    features: [
      'Accès à tous les cours',
      'Signaux trading en temps réel',
      'Accès au forum communautaire',
      'Support par email',
      'Replays des webinaires',
    ],
    current: false,
    popular: true,
    icon: Star,
    color: 'cyan' as const,
  },
  {
    name: 'VIP',
    price: 299,
    interval: 'an',
    description: 'L\'expérience complète',
    features: [
      'Tout du plan Pro',
      'Coaching individuel (2 sessions/mois)',
      'Webinaires exclusifs en direct',
      'Signaux prioritaires',
      'Support prioritaire 24/7',
      'Certificats officiels',
      'Accès anticipé aux nouveaux cours',
    ],
    current: true,
    popular: false,
    icon: Crown,
    color: 'violet' as const,
  },
];

const invoices = [
  { id: '1', date: '2024-11-01', amount: 299, status: 'Payé', plan: 'VIP' },
  { id: '2', date: '2023-11-01', amount: 299, status: 'Payé', plan: 'VIP' },
  { id: '3', date: '2023-06-15', amount: 99, status: 'Payé', plan: 'Cours' },
];

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const currentPlan = 'VIP';
  const nextBillingDate = '1 Nov 2025';

  const [showPaymentMethods, setShowPaymentMethods] = useState<string | null>(null);

  const handleUpgrade = async (planType: 'PRO' | 'VIP') => {
    setShowPaymentMethods(planType);
  };

  const handlePaymentMethod = async (planType: string, method: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan: planType,
          method: method,
        }),
      });
      const data = await response.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    } finally {
      setIsLoading(false);
      setShowPaymentMethods(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Abonnement & Paiements
        </h1>
        <p className="text-text-secondary">
          Gérez votre abonnement et consultez votre historique de paiements
        </p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="glow" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-violet/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Badge variant="violet" glow className="mb-4">
                <Crown className="w-3 h-3 mr-1" />
                Plan actuel
              </Badge>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Vous êtes abonné <span className="text-neon-violet">{currentPlan}</span>
              </h2>
              <p className="text-text-secondary">
                Prochain renouvellement: <span className="text-text-primary">{nextBillingDate}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                Annuler l&apos;abonnement
              </Button>
              <Button variant="outline">
                Changer de carte
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-text-primary mb-6">Plans disponibles</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  variant={plan.current ? 'glow' : 'glass'}
                  className={cn(
                    'relative h-full flex flex-col',
                    plan.popular && 'border-neon-cyan'
                  )}
                >
                  {plan.popular && (
                    <Badge variant="cyan" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Populaire
                    </Badge>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        plan.color === 'violet' && 'bg-neon-violet/20 text-neon-violet',
                        plan.color === 'cyan' && 'bg-neon-cyan/20 text-neon-cyan',
                        plan.color === 'default' && 'bg-surface-light text-text-secondary'
                      )}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                      <p className="text-sm text-text-secondary">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-display font-bold text-text-primary">
                      ${plan.price}
                    </span>
                    <span className="text-text-secondary">/{plan.interval}</span>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.current ? (
                    <Button variant="outline" disabled className="w-full">
                      Plan actuel
                    </Button>
                  ) : plan.price > 0 ? (
                    <>
                      {showPaymentMethods === plan.name ? (
                        <PaymentMethodSelector
                          planName={plan.name}
                          planPrice={plan.price}
                          onSelect={(method) => handlePaymentMethod(plan.name, method)}
                          onCancel={() => setShowPaymentMethods(null)}
                        />
                      ) : (
                        <Button
                          variant={plan.popular ? 'secondary' : 'primary'}
                          className="w-full"
                          onClick={() => handleUpgrade(plan.name as 'PRO' | 'VIP')}
                          isLoading={isLoading}
                        >
                          Choisir ce plan
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button variant="ghost" disabled className="w-full">
                      Plan gratuit
                    </Button>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="default">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-neon-violet" />
              Méthode de paiement
            </h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-light">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
                VISA
              </div>
              <div>
                <p className="font-medium text-text-primary">•••• •••• •••• 4242</p>
                <p className="text-sm text-text-secondary">Expire 12/2025</p>
              </div>
            </div>
            <Badge variant="green">Par défaut</Badge>
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm">
              Modifier
            </Button>
            <Button variant="outline" size="sm">
              Ajouter une carte
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Invoice History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="default">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-neon-cyan" />
              Historique des factures
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-glow">
                  <th className="text-left p-4 text-text-secondary font-medium">Date</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Description</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Montant</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Statut</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border-glow hover:bg-surface-light/50">
                    <td className="p-4 text-text-primary">{invoice.date}</td>
                    <td className="p-4 text-text-primary">Abonnement {invoice.plan}</td>
                    <td className="p-4 text-neon-green font-bold">${invoice.amount}</td>
                    <td className="p-4">
                      <Badge variant="green">{invoice.status}</Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="glass" className="flex items-center gap-4">
          <Shield className="w-10 h-10 text-neon-green flex-shrink-0" />
          <div>
            <h3 className="font-bold text-text-primary mb-1">Paiements sécurisés</h3>
            <p className="text-sm text-text-secondary">
              Tous les paiements sont traités de manière sécurisée via Stripe.
              Vos informations de carte ne sont jamais stockées sur nos serveurs.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// Composant pour sélectionner la méthode de paiement
function PaymentMethodSelector({
  planName,
  planPrice,
  onSelect,
  onCancel,
}: {
  planName: string;
  planPrice: number;
  onSelect: (method: string) => void;
  onCancel: () => void;
}) {
  const paymentMethods = [
    { id: 'STRIPE', name: 'Carte de crédit/débit', icon: CreditCard, color: 'text-blue-500' },
    { id: 'PAYPAL', name: 'PayPal', icon: Wallet, color: 'text-blue-400' },
    { id: 'MONCASH', name: 'Moncash', icon: QrCode, color: 'text-green-500' },
    { id: 'NATCASH', name: 'Natcash', icon: QrCode, color: 'text-blue-500' },
    { id: 'ZELLE', name: 'Zelle', icon: Wallet, color: 'text-purple-500' },
    { id: 'CRYPTO', name: 'Cryptomonnaie (USDT/BTC)', icon: QrCode, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-3 mt-4 p-4 bg-surface-light rounded-lg border border-border-glow">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-text-primary">Choisir une méthode de paiement</h4>
        <button
          onClick={onCancel}
          className="text-text-secondary hover:text-text-primary"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className="flex flex-col items-center gap-2 p-3 bg-surface-dark hover:bg-surface-light rounded-lg border border-border-glow transition-colors"
            >
              <Icon className={`w-6 h-6 ${method.color}`} />
              <span className="text-xs text-text-primary text-center">{method.name}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-text-secondary text-center mt-2">
        Montant: <span className="text-neon-green font-bold">${planPrice}</span>
      </p>
    </div>
  );
}













