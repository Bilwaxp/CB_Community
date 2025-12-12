'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Crown,
  Zap,
  Star,
  Edit,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  plan: string;
  planExpiresAt: string | null;
  status: string;
  createdAt: string;
}

export default function AdminPlansPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [stats, setStats] = useState({ BASIC: 0, PRO: 0, VIP: 0 });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/plans');
      if (!response.ok) throw new Error('Erreur');
      const data = await response.json();
      setUsers(data.users || []);
      setStats(data.stats || { BASIC: 0, PRO: 0, VIP: 0 });
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (userId: string, newPlan: string) => {
    try {
      const response = await fetch('/api/admin/plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          plan: newPlan,
        }),
      });
      if (!response.ok) throw new Error('Erreur');
      toast.success('Plan mis à jour!');
      loadUsers();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = !planFilter || user.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const planConfig = {
    BASIC: { label: 'Basic', icon: Users, color: 'text-text-secondary' },
    PRO: { label: 'Pro', icon: Zap, color: 'text-neon-cyan' },
    VIP: { label: 'VIP', icon: Crown, color: 'text-neon-violet' },
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
            Gestion des plans
          </h1>
          <p className="text-text-secondary">
            Gérez les plans d'abonnement des utilisateurs
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={loadUsers}
          disabled={loading}
        >
          Actualiser
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card
          variant="glass"
          className="text-center cursor-pointer hover:border-neon-cyan/50"
          onClick={() => setPlanFilter(planFilter === 'BASIC' ? null : 'BASIC')}
        >
          <Users className="w-8 h-8 text-text-secondary mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{stats.BASIC}</p>
          <p className="text-sm text-text-secondary">Plan Basic</p>
        </Card>
        <Card
          variant="glass"
          className="text-center cursor-pointer hover:border-neon-cyan/50"
          onClick={() => setPlanFilter(planFilter === 'PRO' ? null : 'PRO')}
        >
          <Zap className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <p className="text-3xl font-bold text-neon-cyan mb-1">{stats.PRO}</p>
          <p className="text-sm text-text-secondary">Plan Pro</p>
        </Card>
        <Card
          variant="glass"
          className="text-center cursor-pointer hover:border-neon-violet/50"
          onClick={() => setPlanFilter(planFilter === 'VIP' ? null : 'VIP')}
        >
          <Crown className="w-8 h-8 text-neon-violet mx-auto mb-2" />
          <p className="text-3xl font-bold text-neon-violet mb-1">{stats.VIP}</p>
          <p className="text-sm text-text-secondary">Plan VIP</p>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={planFilter === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPlanFilter(null)}
          >
            Tous
          </Button>
          <Button
            variant={planFilter === 'BASIC' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPlanFilter('BASIC')}
          >
            Basic
          </Button>
          <Button
            variant={planFilter === 'PRO' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPlanFilter('PRO')}
          >
            Pro
          </Button>
          <Button
            variant={planFilter === 'VIP' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPlanFilter('VIP')}
          >
            VIP
          </Button>
        </div>
      </motion.div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="default" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-glow">
                  <th className="text-left p-4 text-text-secondary font-medium">Utilisateur</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Plan actuel</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Expiration</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Statut</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const plan = planConfig[user.plan as keyof typeof planConfig];
                  const PlanIcon = plan.icon;

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-border-glow hover:bg-surface-light/50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-text-primary">
                            {user.prenom} {user.nom}
                          </p>
                          <p className="text-sm text-text-secondary">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.plan === 'VIP' ? 'violet' : user.plan === 'PRO' ? 'cyan' : 'default'}>
                          <PlanIcon className="w-3 h-3 mr-1" />
                          {plan.label}
                        </Badge>
                      </td>
                      <td className="p-4 text-text-secondary text-sm">
                        {user.planExpiresAt
                          ? new Date(user.planExpiresAt).toLocaleDateString('fr-FR')
                          : 'Illimité'}
                      </td>
                      <td className="p-4">
                        <Badge variant={user.status === 'APPROVED' ? 'green' : 'yellow'}>
                          {user.status === 'APPROVED' ? 'Approuvé' : 'En attente'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <select
                            value={user.plan}
                            onChange={(e) => updatePlan(user.id, e.target.value)}
                            className="px-3 py-1 bg-surface-dark border border-border-glow rounded text-text-primary text-sm"
                          >
                            <option value="BASIC">Basic</option>
                            <option value="PRO">Pro</option>
                            <option value="VIP">VIP</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Chargement...
              </h3>
            </div>
          )}

          {!loading && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-text-secondary">
                {users.length === 0
                  ? 'Aucun utilisateur avec un plan.'
                  : 'Aucun utilisateur ne correspond à vos critères.'}
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

