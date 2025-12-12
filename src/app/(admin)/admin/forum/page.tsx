'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Pin,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

export default function AdminForumPage() {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par vraie API
      setThreads([]);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
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
            Gestion du forum
          </h1>
          <p className="text-text-secondary">
            Gérez les discussions et modérez le contenu
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={loadThreads}
          disabled={loading}
        >
          Actualiser
        </Button>
      </motion.div>

      {loading ? (
        <Card variant="glass" className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
        </Card>
      ) : threads.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Aucun thread trouvé
          </h3>
        </Card>
      ) : (
        <Card variant="default" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-glow">
                  <th className="text-left p-4 text-text-secondary font-medium">Titre</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Auteur</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Réponses</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Statut</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {threads.map((thread) => (
                  <tr key={thread.id} className="border-b border-border-glow">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {thread.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                        <span className="font-medium text-text-primary">{thread.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary">{thread.author?.email}</td>
                    <td className="p-4 text-text-secondary">{thread.posts?.length || 0}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {thread.isLocked && <Badge variant="red">Verrouillé</Badge>}
                        {thread.isPinned && <Badge variant="yellow">Épinglé</Badge>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="danger" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

