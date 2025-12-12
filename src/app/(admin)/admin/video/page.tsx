'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Users,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminVideoPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par vraie API
      setSessions([]);
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
            Appels vidéo & Webinaires
          </h1>
          <p className="text-text-secondary">
            Gérez les sessions vidéo et webinaires
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={loadSessions}
            disabled={loading}
          >
            Actualiser
          </Button>
          <Link href="/admin/video/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Programmer un webinaire
            </Button>
          </Link>
        </div>
      </motion.div>

      {loading ? (
        <Card variant="glass" className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
        </Card>
      ) : sessions.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <Video className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Aucune session programmée
          </h3>
          <Link href="/admin/video/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} className="mt-4">
              Programmer un webinaire
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <Card key={session.id} variant="glass">
              <h3 className="text-lg font-bold text-text-primary mb-2">{session.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="w-4 h-4" />
                  {new Date(session.scheduledAt).toLocaleString('fr-FR')}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="w-4 h-4" />
                  {session.participants?.length || 0} participants
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

