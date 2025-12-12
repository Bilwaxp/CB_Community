'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Ban,
  Mail,
  Shield,
  Clock,
  ChevronDown,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Input, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  status: string;
  plan: string;
  createdAt: string;
  lastLoginAt: string | null;
  photo: string | null;
}

const statusConfig = {
  PENDING: { label: 'En attente', variant: 'yellow' as const, icon: Clock },
  APPROVED: { label: 'Approuvé', variant: 'green' as const, icon: CheckCircle },
  BANNED: { label: 'Banni', variant: 'red' as const, icon: Ban },
};

const planConfig = {
  BASIC: { label: 'Basic', variant: 'default' as const },
  PRO: { label: 'Pro', variant: 'cyan' as const },
  VIP: { label: 'VIP', variant: 'violet' as const },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs');
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = users.filter((u) => u.status === 'PENDING').length;
  const approvedCount = users.filter((u) => u.status === 'APPROVED').length;
  const bannedCount = users.filter((u) => u.status === 'BANNED').length;

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Gestion des utilisateurs
          </h1>
          <p className="text-text-secondary">
            Gérez les comptes utilisateurs de la plateforme
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Exporter
          </Button>
          <Button 
            variant="outline" 
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={loadUsers}
            disabled={loading}
          >
            Actualiser
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <Card variant="glass" className="text-center">
          <Users className="w-8 h-8 text-neon-violet mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{users.length}</p>
          <p className="text-sm text-text-secondary">Total</p>
        </Card>
        <Card variant="glass" className="text-center cursor-pointer hover:border-yellow-500/50" onClick={() => setStatusFilter('PENDING')}>
          <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-yellow-400 mb-1">{pendingCount}</p>
          <p className="text-sm text-text-secondary">En attente</p>
        </Card>
        <Card variant="glass" className="text-center cursor-pointer hover:border-neon-green/50" onClick={() => setStatusFilter('APPROVED')}>
          <CheckCircle className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <p className="text-3xl font-bold text-neon-green mb-1">{approvedCount}</p>
          <p className="text-sm text-text-secondary">Approuvés</p>
        </Card>
        <Card variant="glass" className="text-center cursor-pointer hover:border-red-500/50" onClick={() => setStatusFilter('BANNED')}>
          <Ban className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-red-400 mb-1">{bannedCount}</p>
          <p className="text-sm text-text-secondary">Bannis</p>
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
            variant={statusFilter === 'APPROVED' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('APPROVED')}
          >
            Approuvés
          </Button>
          <Button
            variant={statusFilter === 'BANNED' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('BANNED')}
          >
            Bannis
          </Button>
        </div>
      </motion.div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 bg-neon-violet/10 rounded-xl border border-neon-violet/30"
        >
          <span className="text-text-primary font-medium">
            {selectedUsers.length} sélectionné(s)
          </span>
          <div className="flex gap-2">
            <Button variant="success" size="sm">
              Approuver
            </Button>
            <Button variant="danger" size="sm">
              Bannir
            </Button>
            <Button variant="outline" size="sm">
              Envoyer email
            </Button>
          </div>
        </motion.div>
      )}

      {/* Users Table */}
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
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-border-glow bg-surface-dark text-neon-violet focus:ring-neon-violet"
                    />
                  </th>
                  <th className="text-left p-4 text-text-secondary font-medium">Utilisateur</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Statut</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Plan</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Inscrit le</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Dernière connexion</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const status = statusConfig[user.status as keyof typeof statusConfig];
                  const plan = planConfig[user.plan as keyof typeof planConfig];
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-border-glow hover:bg-surface-light/50 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleSelectUser(user.id)}
                          className="w-4 h-4 rounded border-border-glow bg-surface-dark text-neon-violet focus:ring-neon-violet"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar nom={user.nom} prenom={user.prenom} size="sm" />
                          <div>
                            <p className="font-medium text-text-primary">
                              {user.prenom} {user.nom}
                            </p>
                            <p className="text-sm text-text-secondary">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={status.variant}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={plan.variant}>{plan.label}</Badge>
                      </td>
                      <td className="p-4 text-text-secondary text-sm">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-4 text-text-secondary text-sm">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('fr-FR') : 'Jamais'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {user.status === 'PENDING' && (
                            <>
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`/api/admin/users/${user.id}/approve`, {
                                      method: 'POST',
                                    });
                                    if (!response.ok) throw new Error('Erreur');
                                    toast.success('Utilisateur approuvé');
                                    loadUsers();
                                  } catch (error) {
                                    toast.error('Erreur lors de l\'approbation');
                                  }
                                }}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={async () => {
                                  if (!confirm('Rejeter cet utilisateur?')) return;
                                  try {
                                    const response = await fetch(`/api/admin/users/${user.id}`, {
                                      method: 'DELETE',
                                    });
                                    if (!response.ok) throw new Error('Erreur');
                                    toast.success('Utilisateur rejeté');
                                    loadUsers();
                                  } catch (error) {
                                    toast.error('Erreur lors du rejet');
                                  }
                                }}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {user.status === 'APPROVED' && (
                            <Button variant="outline" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          )}
                          {user.status === 'BANNED' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={async () => {
                                try {
                                  const response = await fetch(`/api/admin/users/${user.id}/ban`, {
                                    method: 'POST',
                                  });
                                  if (!response.ok) throw new Error('Erreur');
                                  toast.success('Utilisateur débanni');
                                  loadUsers();
                                } catch (error) {
                                  toast.error('Erreur');
                                }
                              }}
                            >
                              Débannir
                            </Button>
                          )}
                          {user.status === 'APPROVED' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={async () => {
                                if (!confirm('Bannir cet utilisateur?')) return;
                                try {
                                  const response = await fetch(`/api/admin/users/${user.id}/ban`, {
                                    method: 'POST',
                                  });
                                  if (!response.ok) throw new Error('Erreur');
                                  toast.success('Utilisateur banni');
                                  loadUsers();
                                } catch (error) {
                                  toast.error('Erreur');
                                }
                              }}
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Chargement...
              </h3>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-text-secondary">
                {users.length === 0 
                  ? 'Aucun utilisateur inscrit pour le moment.'
                  : 'Aucun utilisateur ne correspond à vos critères de recherche.'}
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}













