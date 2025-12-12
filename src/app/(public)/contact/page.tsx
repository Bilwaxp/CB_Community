'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Send,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import { Button, Card, Badge, Input } from '@/components/ui';
import toast from 'react-hot-toast';

const faqs = [
  {
    question: 'Comment accéder aux cours après l\'achat?',
    answer: 'Après votre achat, vous recevrez un email de confirmation avec vos identifiants. Connectez-vous à votre espace membre pour accéder immédiatement à tous vos cours.',
  },
  {
    question: 'Quels sont les moyens de paiement acceptés?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard) via Stripe, PayPal, MonCash, NatCash et les cryptomonnaies (USDT, BTC).',
  },
  {
    question: 'Puis-je obtenir un remboursement?',
    answer: 'Oui, nous offrons une garantie de remboursement de 30 jours. Si vous n\'êtes pas satisfait, contactez notre support pour un remboursement complet.',
  },
  {
    question: 'Comment fonctionnent les signaux de trading?',
    answer: 'Les abonnés Pro et VIP reçoivent des signaux de trading en temps réel via notre plateforme et par notification. Chaque signal inclut le point d\'entrée, stop loss et take profit.',
  },
  {
    question: 'Les cours sont-ils accessibles à vie?',
    answer: 'Oui, une fois que vous achetez un cours, vous y avez accès à vie. Vous bénéficiez également de toutes les mises à jour futures.',
  },
  {
    question: 'Comment fonctionne le coaching personnalisé?',
    answer: 'Le coaching est disponible pour les membres VIP. Vous pouvez réserver des sessions de 1h en visioconférence avec nos experts pour un accompagnement sur mesure.',
  },
];

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@cbcommunity.com',
    description: 'Réponse sous 24h',
  },
  {
    icon: MessageSquare,
    title: 'Telegram',
    value: '@CBCommunity',
    description: 'Chat en direct',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: '24/7',
    description: 'Support disponible',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message envoyé! Nous vous répondrons sous 24h.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            <Mail className="w-3 h-3 mr-1" />
            Contact
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary mb-4">
            Contactez-<span className="gradient-text">nous</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Une question? Besoin d&apos;aide? Notre équipe est là pour vous répondre.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card key={info.title} variant="glass" className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-violet/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-neon-violet" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{info.title}</h3>
                  <p className="text-neon-cyan font-medium">{info.value}</p>
                  <p className="text-sm text-text-secondary">{info.description}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="glow" className="p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Nom complet"
                    name="name"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Sujet
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-surface-dark border border-border-glow rounded-lg text-text-primary focus:border-neon-violet focus:outline-none transition-all"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="courses">À propos des cours</option>
                    <option value="payment">Paiement & facturation</option>
                    <option value="technical">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Votre message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-surface-dark border border-border-glow rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-neon-violet focus:outline-none transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <Badge variant="cyan" className="mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              Questions fréquentes
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card
                  variant="glass"
                  hoverEffect={false}
                  className="cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary pr-4">
                      {faq.question}
                    </h3>
                    <button className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center text-text-secondary hover:text-neon-violet transition-colors">
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border-glow"
                    >
                      <p className="text-text-secondary">{faq.answer}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}













