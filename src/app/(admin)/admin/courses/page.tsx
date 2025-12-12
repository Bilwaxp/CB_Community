'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Clock,
  Users,
  DollarSign,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  slug: string;
  level: string;
  price: number;
  duration: number;
  published: boolean;
  createdAt: string;
  modules: Array<{
    lessons: Array<{ id: string }>;
  }>;
  enrollments: Array<{ id: string }>;
}

const levelConfig = {
  BEGINNER: { label: 'Débutant', variant: 'green' as const },
  INTERMEDIATE: { label: 'Intermédiaire', variant: 'cyan' as const },
  ADVANCED: { label: 'Avancé', variant: 'violet' as const },
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/courses');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des cours');
      }
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des cours');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (courseId: string, published: boolean) => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      });
      if (!response.ok) throw new Error('Erreur');
      toast.success(published ? 'Cours dépublié' : 'Cours publié');
      loadCourses();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours?')) return;
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur');
      toast.success('Cours supprimé');
      loadCourses();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLessons = courses.reduce((sum, c) => 
    sum + c.modules.reduce((mSum, m) => mSum + m.lessons.length, 0), 0
  );
  const totalStudents = courses.reduce((sum, c) => sum + c.enrollments.length, 0);

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
            Gestion des cours
          </h1>
          <p className="text-text-secondary">
            Créez, modifiez et gérez vos formations
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={loadCourses}
            disabled={loading}
          >
            Actualiser
          </Button>
          <Link href="/admin/courses/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Nouveau cours
            </Button>
          </Link>
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
          <BookOpen className="w-8 h-8 text-neon-violet mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">
            {loading ? '...' : courses.length}
          </p>
          <p className="text-sm text-text-secondary">Cours totaux</p>
        </Card>
        <Card variant="glass" className="text-center">
          <Eye className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <p className="text-3xl font-bold text-neon-green mb-1">
            {loading ? '...' : courses.filter((c) => c.published).length}
          </p>
          <p className="text-sm text-text-secondary">Publiés</p>
        </Card>
        <Card variant="glass" className="text-center">
          <BookOpen className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">
            {loading ? '...' : totalLessons}
          </p>
          <p className="text-sm text-text-secondary">Leçons totales</p>
        </Card>
        <Card variant="glass" className="text-center">
          <Users className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">
            {loading ? '...' : totalStudents}
          </p>
          <p className="text-sm text-text-secondary">Étudiants</p>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          type="text"
          placeholder="Rechercher un cours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5" />}
        />
      </motion.div>

      {/* Courses List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredCourses.map((course, index) => {
          const level = levelConfig[course.level as keyof typeof levelConfig];

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card variant="glass" className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Thumbnail */}
                <div className="w-full lg:w-48 h-32 rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 flex items-center justify-center flex-shrink-0 relative">
                  <BookOpen className="w-12 h-12 text-neon-violet/40" />
                  {!course.published && (
                    <Badge variant="yellow" className="absolute top-2 right-2">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Brouillon
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-xl font-bold text-text-primary">
                      {course.title}
                    </h3>
                    <Badge variant={level.variant}>{level.label}</Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(course.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} leçons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrollments.length} étudiants
                    </span>
                    <span className="flex items-center gap-1 text-neon-green">
                      <DollarSign className="w-4 h-4" />
                      ${course.price}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary">
                    Créé le {new Date(course.createdAt).toLocaleDateString('fr-FR')} • Prix: <span className="text-neon-green font-bold">${course.price}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/admin/courses/${course.id}/lessons`}>
                    <Button variant="outline" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                      Leçons
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/${course.id}/edit`}>
                    <Button variant="outline" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                      Modifier
                    </Button>
                  </Link>
                  {course.published ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      leftIcon={<EyeOff className="w-4 h-4" />}
                      onClick={() => handlePublish(course.id, course.published)}
                    >
                      Dépublier
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      size="sm" 
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => handlePublish(course.id, course.published)}
                    >
                      Publier
                    </Button>
                  )}
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Loading state */}
      {loading && (
        <Card variant="glass" className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-neon-violet mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Chargement...
          </h3>
        </Card>
      )}

      {/* Empty state */}
      {!loading && filteredCourses.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <BookOpen className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {courses.length === 0 ? 'Aucun cours créé' : 'Aucun cours trouvé'}
          </h3>
          <p className="text-text-secondary mb-6">
            {courses.length === 0 
              ? 'Créez votre premier cours pour commencer.'
              : 'Aucun cours ne correspond à votre recherche.'}
          </p>
          <Link href="/admin/courses/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Créer un cours
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}













