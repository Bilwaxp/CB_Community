'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

interface Payment {
  id: string;
  userId: string;
  amount: number;
  method: string;
  status: string;
  planType: string;
  createdAt: string;
  user?: {
    email: string;
    nom: string;
    prenom: string;
  };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par vraie API
      const response = await fetch('/api/admin/payments');
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (paymentId: string) => {
    try {
      // TODO: Implémenter l'API
      toast.success('Paiement approuvé!');
      loadPayments();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const handleReject = async (paymentId: string) => {
    try {
      // TODO: Implémenter l'API
      toast.success('Paiement rejeté!');
      loadPayments();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    PENDING: { label: 'En attente', variant: 'yellow' as const },
    COMPLETED: { label: 'Complété', variant: 'green' as const },
    FAILED: { label: 'Échoué', variant: 'red' as const },
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Gestion des paiements
          </h1>
          <p className="text-text-secondary">
            Gérez tous les paiements et abonnements
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={loadPayments}
          disabled={loading}
        >
          Actualiser
        </Button>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            Tous
          </Button>
          <Button
            variant={statusFilter === 'PENDING' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('PENDING')}
          >
            En attente
          </Button>
          <Button
            variant={statusFilter === 'COMPLETED' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('COMPLETED')}
          >
            Complétés
          </Button>
        </div>
      </div>

      {loading ? (
        <Card variant="glass" className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
        </Card>
      ) : (
        <Card variant="default" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-glow">
                  <th className="text-left p-4 text-text-secondary font-medium">Utilisateur</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Montant</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Méthode</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Plan</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Statut</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Date</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-text-secondary">
                      Aucun paiement trouvé
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => {
                    const status = statusConfig[payment.status as keyof typeof statusConfig] || statusConfig.PENDING;
                    return (
                      <tr key={payment.id} className="border-b border-border-glow hover:bg-surface-light/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-text-primary">
                              {payment.user?.prenom} {payment.user?.nom}
                            </p>
                            <p className="text-sm text-text-secondary">{payment.user?.email}</p>
                          </div>
                        </td>
                        <td className="p-4 text-neon-green font-bold">${payment.amount}</td>
                        <td className="p-4">
                          <Badge variant="cyan">{payment.method}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="violet">{payment.planType}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </td>
                        <td className="p-4 text-text-secondary text-sm">
                          {new Date(payment.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="p-4">
                          {payment.status === 'PENDING' && (
                            <div className="flex gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApprove(payment.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleReject(payment.id)}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

