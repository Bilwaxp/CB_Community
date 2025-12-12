'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Wallet,
  QrCode,
  Copy,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader,
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PAYMENT_CONFIG } from '@/lib/payment-config';

interface PaymentInfo {
  id: string;
  amount: number;
  currency: string;
  method: string;
  planType: string;
  status: string;
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const method = params.method as string;
  const paymentId = params.paymentId as string;
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const loadPayment = async () => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`);
      if (!response.ok) throw new Error('Erreur');
      const data = await response.json();
      setPayment(data.payment);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-neon-violet" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card variant="glow" className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Paiement non trouvé
          </h2>
          <Link href="/dashboard/billing">
            <Button variant="outline" className="mt-4">
              Retour
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card variant="glow" className="p-8">
          <Link href="/dashboard/billing">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} className="mb-6">
              Retour
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
              Paiement {payment.planType}
            </h1>
            <p className="text-text-secondary">
              Montant: <span className="text-neon-green font-bold text-xl">${payment.amount}</span>
            </p>
          </div>

          {method === 'stripe' && <StripePayment payment={payment} />}
          {method === 'paypal' && <PayPalPayment payment={payment} />}
          {method === 'moncash' && <MoncashPayment payment={payment} />}
          {method === 'natcash' && <NatcashPayment payment={payment} />}
          {method === 'zelle' && <ZellePayment payment={payment} />}
          {method === 'crypto' && <CryptoPayment payment={payment} />}
        </Card>
      </motion.div>
    </div>
  );
}

// Composant Stripe (Cartes)
function StripePayment({ payment }: { payment: PaymentInfo }) {
  const [processing, setProcessing] = useState(false);

  const handleStripePayment = async () => {
    setProcessing(true);
    try {
      const response = await fetch('/api/payments/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: payment.id,
          plan: payment.planType,
          amount: payment.amount,
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error('Erreur lors du paiement');
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="w-16 h-16 text-neon-violet mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-primary mb-2">
          Paiement par carte
        </h2>
        <p className="text-text-secondary">
          Carte de crédit ou de débit
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleStripePayment}
        isLoading={processing}
        leftIcon={<CreditCard className="w-5 h-5" />}
      >
        Payer avec Stripe
      </Button>

      <p className="text-xs text-text-secondary text-center">
        Paiement sécurisé via Stripe. Accepte Visa, Mastercard, American Express.
      </p>
    </div>
  );
}

// Composant PayPal
function PayPalPayment({ payment }: { payment: PaymentInfo }) {
  const [accountInfo, setAccountInfo] = useState({
    email: PAYMENT_CONFIG.PAYPAL.email,
    amount: payment.amount,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié!');
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/payments/${payment.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'PAYPAL',
          paypalOrderId: `PAYPAL_${Date.now()}`,
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      toast.success('Paiement enregistré! Vérification en cours...');
      setTimeout(() => {
        window.location.href = '/dashboard/billing?success=true';
      }, 2000);
    } catch (error) {
      toast.error('Erreur');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Wallet className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-primary mb-2">
          Paiement PayPal
        </h2>
      </div>

      <Card variant="default" className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email PayPal
            </label>
            <div className="flex items-center gap-2 p-3 bg-surface-light rounded-lg">
              <span className="text-text-primary flex-1">{accountInfo.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(accountInfo.email)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Montant à envoyer
            </label>
            <div className="flex items-center gap-2 p-3 bg-surface-light rounded-lg">
              <span className="text-neon-green font-bold text-xl">${accountInfo.amount}</span>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              <strong>Instructions:</strong> Envoyez ${accountInfo.amount} à l'adresse PayPal ci-dessus.
              Après l'envoi, cliquez sur "J'ai payé" et votre compte sera activé après vérification.
            </p>
          </div>
        </div>
      </Card>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleConfirm}
        leftIcon={<CheckCircle className="w-5 h-5" />}
      >
        J'ai effectué le paiement
      </Button>
    </div>
  );
}

// Composant Moncash
function MoncashPayment({ payment }: { payment: PaymentInfo }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleMoncashPayment = async () => {
    if (!phoneNumber) {
      toast.error('Entrez votre numéro Moncash');
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch(`/api/payments/${payment.id}/moncash`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      const data = await response.json();
      
      if (data.qrCode) {
        toast.success('QR Code généré! Scannez-le avec Moncash.');
      } else {
        toast.success('Paiement initié! Suivez les instructions.');
      }
    } catch (error) {
      toast.error('Erreur lors du paiement');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-primary mb-2">
          Paiement Moncash
        </h2>
      </div>

      <Card variant="default" className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Numéro Moncash *
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="509XXXXXXXX"
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
            />
          </div>

          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-400">
              <strong>Montant:</strong> ${payment.amount} HTG
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Vous recevrez un QR Code à scanner avec l'application Moncash.
            </p>
          </div>
        </div>
      </Card>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleMoncashPayment}
        isLoading={processing}
        leftIcon={<QrCode className="w-5 h-5" />}
      >
        Payer avec Moncash
      </Button>
    </div>
  );
}

// Composant Natcash
function NatcashPayment({ payment }: { payment: PaymentInfo }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleNatcashPayment = async () => {
    if (!phoneNumber) {
      toast.error('Entrez votre numéro Natcash');
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch(`/api/payments/${payment.id}/natcash`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      toast.success('Paiement initié! Suivez les instructions.');
    } catch (error) {
      toast.error('Erreur lors du paiement');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-primary mb-2">
          Paiement Natcash
        </h2>
      </div>

      <Card variant="default" className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Numéro Natcash *
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="509XXXXXXXX"
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
            />
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400">
              <strong>Montant:</strong> ${payment.amount} HTG
            </p>
          </div>
        </div>
      </Card>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleNatcashPayment}
        isLoading={processing}
        leftIcon={<QrCode className="w-5 h-5" />}
      >
        Payer avec Natcash
      </Button>
    </div>
  );
}

// Composant Zelle
function ZellePayment({ payment }: { payment: PaymentInfo }) {
  const [accountInfo, setAccountInfo] = useState({
    email: PAYMENT_CONFIG.ZELLE.email,
    name: PAYMENT_CONFIG.ZELLE.name,
    amount: payment.amount,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié!');
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/payments/${payment.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'ZELLE',
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      toast.success('Paiement enregistré! Vérification en cours...');
      setTimeout(() => {
        window.location.href = '/dashboard/billing?success=true';
      }, 2000);
    } catch (error) {
      toast.error('Erreur');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Wallet className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-primary mb-2">
          Paiement Zelle
        </h2>
      </div>

      <Card variant="default" className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Zelle
            </label>
            <div className="flex items-center gap-2 p-3 bg-surface-light rounded-lg">
              <span className="text-text-primary flex-1">{accountInfo.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(accountInfo.email)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom du bénéficiaire
            </label>
            <div className="p-3 bg-surface-light rounded-lg">
              <span className="text-text-primary">{accountInfo.name}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Montant
            </label>
            <div className="p-3 bg-surface-light rounded-lg">
              <span className="text-neon-green font-bold text-xl">${accountInfo.amount}</span>
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-purple-400">
              <strong>Instructions:</strong> Envoyez ${accountInfo.amount} via Zelle à l'adresse ci-dessus.
              Après l'envoi, cliquez sur "J'ai payé".
            </p>
          </div>
        </div>
      </Card>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleConfirm}
        leftIcon={<CheckCircle className="w-5 h-5" />}
      >
        J'ai effectué le paiement
      </Button>
    </div>
  );
}

// Composant Crypto
function CryptoPayment({ payment }: { payment: PaymentInfo }) {
  const [cryptoType, setCryptoType] = useState('USDT');
  const walletAddress = {
    USDT: PAYMENT_CONFIG.CRYPTO.USDT.address,
    BTC: PAYMENT_CONFIG.CRYPTO.BTC.address,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié!');
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/payments/${payment.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: `CRYPTO_${cryptoType}`,
          cryptoTxHash: `TX_${Date.now()}`,
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      toast.success('Paiement enregistré! Vérification en cours...');
      setTimeout(() => {
        window.location.href = '/dashboard/billing?success=true';
      }, 2000);
    } catch (error) {
      toast.error('Erreur');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-primary mb-2">
          Paiement Cryptomonnaie
        </h2>
      </div>

      <Card variant="default" className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Type de cryptomonnaie
            </label>
            <select
              value={cryptoType}
              onChange={(e) => setCryptoType(e.target.value)}
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
            >
              <option value="USDT">USDT (Tether)</option>
              <option value="BTC">Bitcoin (BTC)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Adresse du portefeuille
            </label>
            <div className="flex items-center gap-2 p-3 bg-surface-light rounded-lg">
              <span className="text-text-primary flex-1 font-mono text-sm break-all">
                {walletAddress[cryptoType as keyof typeof walletAddress]}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(walletAddress[cryptoType as keyof typeof walletAddress])}
                title="Copier l'adresse"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {cryptoType === 'USDT' && (
              <p className="text-xs text-text-secondary mt-1">
                ⚠️ Assurez-vous d'envoyer sur le réseau TRC20 uniquement
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Montant
            </label>
            <div className="p-3 bg-surface-light rounded-lg">
              <span className="text-neon-green font-bold text-xl">
                ${payment.amount} USD
              </span>
              <p className="text-sm text-text-secondary mt-1">
                Équivalent en {cryptoType} sera calculé au moment du paiement
              </p>
              {cryptoType === 'USDT' && (
                <p className="text-xs text-text-secondary mt-1">
                  Réseau: {PAYMENT_CONFIG.CRYPTO.USDT.network}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              <strong>Instructions:</strong> Envoyez le montant équivalent en {cryptoType} à l'adresse ci-dessus.
              Après l'envoi, entrez le hash de transaction et cliquez sur "J'ai payé".
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hash de transaction (optionnel)
            </label>
            <input
              type="text"
              placeholder="0x..."
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary font-mono text-sm"
            />
          </div>
        </div>
      </Card>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleConfirm}
        leftIcon={<CheckCircle className="w-5 h-5" />}
      >
        J'ai effectué le paiement
      </Button>
    </div>
  );
}

