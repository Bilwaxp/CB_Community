'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Download,
  ExternalLink,
  Calendar,
  Clock,
  BookOpen,
  QrCode,
  Share2,
  CheckCircle,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

// Mock certificates data
const certificates = [
  {
    id: 'CERT-2024-001',
    courseTitle: 'Investir en Cryptomonnaies',
    courseDuration: '10h',
    modules: 5,
    issuedAt: '2024-10-15',
    pdfUrl: '/certificates/cert-001.pdf',
    status: 'ISSUED',
  },
  {
    id: 'CERT-2024-002',
    courseTitle: 'Trading Forex pour Débutants',
    courseDuration: '12h',
    modules: 6,
    issuedAt: '2024-08-20',
    pdfUrl: '/certificates/cert-002.pdf',
    status: 'ISSUED',
  },
];

const inProgressCourses = [
  {
    id: '1',
    title: 'Analyse Technique Avancée',
    progress: 65,
    modulesCompleted: 4,
    totalModules: 8,
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Mes Certificats
        </h1>
        <p className="text-text-secondary">
          Téléchargez et partagez vos certificats de réussite
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card variant="glass" className="text-center">
          <Award className="w-10 h-10 text-neon-violet mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary mb-1">{certificates.length}</p>
          <p className="text-sm text-text-secondary">Certificats obtenus</p>
        </Card>
        <Card variant="glass" className="text-center">
          <Clock className="w-10 h-10 text-neon-cyan mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary mb-1">22h</p>
          <p className="text-sm text-text-secondary">Heures de formation</p>
        </Card>
        <Card variant="glass" className="text-center">
          <BookOpen className="w-10 h-10 text-neon-green mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary mb-1">11</p>
          <p className="text-sm text-text-secondary">Modules complétés</p>
        </Card>
      </motion.div>

      {/* Certificates Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-text-primary mb-4">Vos certificats</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card variant="glow" className="relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-violet/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-green/10 rounded-full blur-2xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center shadow-neon-violet">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <Badge variant="green" className="mb-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Certifié
                        </Badge>
                        <p className="text-xs text-text-secondary font-mono">{cert.id}</p>
                      </div>
                    </div>
                    <QrCode className="w-10 h-10 text-text-secondary" />
                  </div>

                  {/* Course Info */}
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {cert.courseTitle}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg bg-surface-light">
                      <Clock className="w-5 h-5 text-neon-cyan mx-auto mb-1" />
                      <p className="text-sm font-bold text-text-primary">{cert.courseDuration}</p>
                      <p className="text-xs text-text-secondary">Durée</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-surface-light">
                      <BookOpen className="w-5 h-5 text-neon-violet mx-auto mb-1" />
                      <p className="text-sm font-bold text-text-primary">{cert.modules}</p>
                      <p className="text-xs text-text-secondary">Modules</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-surface-light">
                      <Calendar className="w-5 h-5 text-neon-green mx-auto mb-1" />
                      <p className="text-sm font-bold text-text-primary">
                        {new Date(cert.issuedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </p>
                      <p className="text-xs text-text-secondary">Obtenu</p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="border-t border-border-glow pt-4 mb-4">
                    <p className="text-sm text-text-secondary">Délivré par</p>
                    <p className="font-display font-bold text-neon-violet">Wadlex Pluviose</p>
                    <p className="text-xs text-text-secondary">Fondateur & CEO, CB_Community</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="primary" leftIcon={<Download className="w-4 h-4" />} className="flex-1">
                      Télécharger PDF
                    </Button>
                    <Button variant="outline" leftIcon={<Share2 className="w-4 h-4" />}>
                      Partager
                    </Button>
                    <Button variant="outline" leftIcon={<ExternalLink className="w-4 h-4" />}>
                      Vérifier
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* In Progress */}
      {inProgressCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">En cours d&apos;obtention</h2>
          <div className="space-y-4">
            {inProgressCourses.map((course) => (
              <Card key={course.id} variant="glass">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-surface-light flex items-center justify-center">
                    <BookOpen className="w-7 h-7 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-1">{course.title}</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {course.modulesCompleted}/{course.totalModules} modules complétés
                    </p>
                    <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-violet to-neon-cyan rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-neon-cyan">{course.progress}%</p>
                    <p className="text-xs text-text-secondary">Progression</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certificate Verification Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="glass">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-2">Vérification des certificats</h3>
              <p className="text-text-secondary text-sm mb-3">
                Chaque certificat possède un identifiant unique et un QR code permettant de vérifier
                son authenticité. Les employeurs et partenaires peuvent vérifier la validité de vos
                certificats sur notre plateforme.
              </p>
              <Button variant="outline" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
                En savoir plus
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}













