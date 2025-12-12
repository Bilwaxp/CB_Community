'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  PlayCircle,
  Lock,
  Crown,
  Mic,
  Camera,
  ScreenShare,
  MessageSquare,
  Download,
  ExternalLink,
} from 'lucide-react';
import { Card, Badge, Button, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';

// Mock video sessions data
const upcomingWebinars = [
  {
    id: '1',
    title: 'Stratégies de Scalping Avancées',
    description: 'Apprenez les techniques de scalping utilisées par les professionnels pour maximiser vos gains.',
    host: { nom: 'Pluviose', prenom: 'Wadlex', photo: null },
    date: '2024-12-05',
    time: '14:00 UTC',
    duration: 90,
    participants: 45,
    maxParticipants: 100,
    minPlan: 'PRO',
    type: 'WEBINAR',
  },
  {
    id: '2',
    title: 'Analyse de Marché Hebdomadaire',
    description: 'Review des positions de la semaine et préparation pour la semaine à venir.',
    host: { nom: 'Pluviose', prenom: 'Wadlex', photo: null },
    date: '2024-12-08',
    time: '10:00 UTC',
    duration: 60,
    participants: 78,
    maxParticipants: 100,
    minPlan: 'VIP',
    type: 'WEBINAR',
  },
];

const recordings = [
  {
    id: '1',
    title: 'Introduction au Trading Algorithmique',
    date: '2024-11-28',
    duration: 85,
    views: 234,
    minPlan: 'PRO',
  },
  {
    id: '2',
    title: 'Gestion du Risque Avancée',
    date: '2024-11-20',
    duration: 72,
    views: 189,
    minPlan: 'VIP',
  },
  {
    id: '3',
    title: 'Psychologie du Trader',
    date: '2024-11-15',
    duration: 68,
    views: 312,
    minPlan: 'PRO',
  },
];

const coachingSessions = [
  {
    id: '1',
    date: '2024-12-10',
    time: '15:00 UTC',
    duration: 60,
    status: 'SCHEDULED',
  },
  {
    id: '2',
    date: '2024-12-17',
    time: '15:00 UTC',
    duration: 60,
    status: 'AVAILABLE',
  },
];

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h${mins}`;
};

export default function LivePage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recordings' | 'coaching'>('upcoming');
  const userPlan = 'VIP';

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Appels Vidéo & Webinaires
        </h1>
        <p className="text-text-secondary">
          Participez à des sessions de coaching et webinaires exclusifs
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="glow" className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-neon-violet/20 flex items-center justify-center">
              <Video className="w-7 h-7 text-neon-violet" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Prochain live dans</h2>
              <p className="text-2xl font-display font-bold text-neon-cyan">2j 14h 32min</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Calendar className="w-4 h-4" />}>
              Voir le calendrier
            </Button>
            {userPlan === 'VIP' && (
              <Button variant="primary" leftIcon={<Video className="w-4 h-4" />}>
                Réserver un coaching
              </Button>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2"
      >
        {[
          { id: 'upcoming', label: 'À venir', icon: Calendar },
          { id: 'recordings', label: 'Replays', icon: PlayCircle },
          { id: 'coaching', label: 'Coaching', icon: Users },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'outline'}
            leftIcon={<tab.icon className="w-4 h-4" />}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </Button>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Upcoming Webinars */}
        {activeTab === 'upcoming' && (
          <>
            {upcomingWebinars.map((webinar, index) => (
              <Card key={webinar.id} variant="glass">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="relative w-full lg:w-64 h-40 rounded-xl bg-gradient-to-br from-neon-violet/30 via-neon-cyan/20 to-neon-green/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-16 h-16 text-neon-violet/40" />
                    <Badge
                      variant={webinar.minPlan === 'VIP' ? 'violet' : 'cyan'}
                      className="absolute top-3 left-3"
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      {webinar.minPlan}
                    </Badge>
                    {webinar.type === 'WEBINAR' && (
                      <Badge variant="green" className="absolute top-3 right-3">
                        Live
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {webinar.title}
                    </h3>
                    <p className="text-text-secondary mb-4">{webinar.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {webinar.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {webinar.time} ({formatDuration(webinar.duration)})
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {webinar.participants}/{webinar.maxParticipants} inscrits
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar
                        nom={webinar.host.nom}
                        prenom={webinar.host.prenom}
                        size="sm"
                      />
                      <span className="text-sm text-text-secondary">
                        Présenté par{' '}
                        <span className="text-text-primary font-medium">
                          {webinar.host.prenom} {webinar.host.nom}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-center">
                    <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
                      S&apos;inscrire
                    </Button>
                    <Button variant="outline" leftIcon={<ExternalLink className="w-4 h-4" />}>
                      Ajouter au calendrier
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {/* Recordings */}
        {activeTab === 'recordings' && (
          <>
            {recordings.map((recording, index) => (
              <Card key={recording.id} variant="glass">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-8 h-8 text-neon-violet/60" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-text-primary">{recording.title}</h3>
                      <Badge
                        variant={recording.minPlan === 'VIP' ? 'violet' : 'cyan'}
                        size="sm"
                      >
                        {recording.minPlan}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {recording.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(recording.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recording.views} vues
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
                      Regarder
                    </Button>
                    <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                      Télécharger
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {/* Coaching */}
        {activeTab === 'coaching' && (
          <>
            {userPlan !== 'VIP' ? (
              <Card variant="glow" className="text-center py-12">
                <Lock className="w-16 h-16 text-neon-violet mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Coaching VIP uniquement
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  Le coaching individuel est réservé aux membres VIP. Passez au plan VIP
                  pour bénéficier de 2 sessions de coaching par mois.
                </p>
                <Button variant="primary" leftIcon={<Crown className="w-4 h-4" />}>
                  Devenir VIP
                </Button>
              </Card>
            ) : (
              <>
                <Card variant="glass">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Vos sessions de coaching
                      </h3>
                      <p className="text-sm text-text-secondary">
                        2 sessions disponibles ce mois
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {coachingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-surface-light"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                            <Video className="w-5 h-5 text-neon-cyan" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              Session de coaching individuel
                            </p>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <Calendar className="w-4 h-4" />
                              {session.date} à {session.time}
                            </div>
                          </div>
                        </div>

                        {session.status === 'SCHEDULED' ? (
                          <Badge variant="green">Confirmé</Badge>
                        ) : (
                          <Button variant="primary" size="sm">
                            Réserver
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* How it works */}
                <Card variant="glass">
                  <h3 className="text-lg font-bold text-text-primary mb-4">
                    Comment fonctionne le coaching?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Calendar, text: 'Réservez un créneau' },
                      { icon: Video, text: 'Rejoignez la session' },
                      { icon: MessageSquare, text: 'Posez vos questions' },
                      { icon: Download, text: 'Recevez le replay' },
                    ].map((step, i) => (
                      <div key={i} className="text-center p-4 rounded-lg bg-surface-light">
                        <step.icon className="w-8 h-8 text-neon-violet mx-auto mb-2" />
                        <p className="text-sm text-text-secondary">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </>
        )}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="glass">
          <h3 className="text-lg font-bold text-text-primary mb-4">
            Fonctionnalités des sessions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Video, label: 'Vidéo HD' },
              { icon: Mic, label: 'Audio clair' },
              { icon: ScreenShare, label: 'Partage d\'écran' },
              { icon: MessageSquare, label: 'Chat en direct' },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface-light"
              >
                <feature.icon className="w-5 h-5 text-neon-cyan" />
                <span className="text-sm text-text-secondary">{feature.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}













