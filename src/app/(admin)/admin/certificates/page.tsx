'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Search,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par vraie API
      setCertificates([]);
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
            Certificats
          </h1>
          <p className="text-text-secondary">
            Gérez les certificats délivrés
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={loadCertificates}
          disabled={loading}
        >
          Actualiser
        </Button>
      </motion.div>

      {loading ? (
        <Card variant="glass" className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
        </Card>
      ) : certificates.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <Award className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Aucun certificat délivré
          </h3>
        </Card>
      ) : (
        <Card variant="default" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-glow">
                  <th className="text-left p-4 text-text-secondary font-medium">Utilisateur</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Cours</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Date</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} className="border-b border-border-glow">
                    <td className="p-4">{cert.user?.email}</td>
                    <td className="p-4">{cert.course?.title}</td>
                    <td className="p-4 text-text-secondary text-sm">
                      {new Date(cert.issuedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                        Télécharger
                      </Button>
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

