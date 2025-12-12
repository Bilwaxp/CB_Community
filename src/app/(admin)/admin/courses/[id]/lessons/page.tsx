'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Video,
  FileText,
  Image as ImageIcon,
  Music,
  Edit,
  Trash2,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: string;
  order: number;
  duration: number;
  videoUrl?: string;
  pdfUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  isFree: boolean;
  published: boolean;
}

export default function CourseLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses`);
      if (!response.ok) throw new Error('Erreur');
      const data = await response.json();
      const foundCourse = data.courses.find((c: any) => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        setModules(foundCourse.modules || []);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleAddLesson = async (moduleId: string, lessonData: any) => {
    try {
      const response = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          ...lessonData,
        }),
      });

      if (!response.ok) throw new Error('Erreur');
      toast.success('Leçon ajoutée!');
      loadCourse();
      setShowAddLesson(false);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-violet mx-auto mb-4"></div>
          <p className="text-text-secondary">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Cours non trouvé</p>
        <Link href="/admin/courses">
          <Button variant="outline" className="mt-4">Retour</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/admin/courses">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Retour
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-text-primary">
            {course.title}
          </h1>
          <p className="text-text-secondary">
            Gérez les modules et leçons de ce cours
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={loadCourse}
        >
          Actualiser
        </Button>
      </motion.div>

      {modules.length === 0 ? (
        <Card variant="glow" className="p-8 text-center">
          <p className="text-text-secondary mb-4">
            Aucun module créé. Créez d'abord un module pour ajouter des leçons.
          </p>
          <Button 
            variant="primary" 
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={async () => {
              try {
                const response = await fetch('/api/admin/modules', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    courseId: courseId,
                    title: 'Module 1',
                    order: 0,
                  }),
                });
                if (!response.ok) throw new Error('Erreur');
                toast.success('Module créé!');
                loadCourse();
              } catch (error) {
                toast.error('Erreur lors de la création');
              }
            }}
          >
            Créer un module
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {modules.map((module) => (
            <Card key={module.id} variant="glow" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">{module.title}</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit className="w-4 h-4" />}
                    onClick={async () => {
                      const newTitle = prompt('Nouveau titre du module:', module.title);
                      if (newTitle && newTitle !== module.title) {
                        try {
                          const response = await fetch(`/api/admin/modules/${module.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ title: newTitle }),
                          });
                          if (!response.ok) throw new Error('Erreur');
                          toast.success('Module modifié!');
                          loadCourse();
                        } catch (error) {
                          toast.error('Erreur');
                        }
                      }
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={() => {
                      setSelectedModule(module.id);
                      setShowAddLesson(true);
                    }}
                  >
                    Ajouter une leçon
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={async () => {
                      if (!confirm('Supprimer ce module et toutes ses leçons?')) return;
                      try {
                        const response = await fetch(`/api/admin/modules/${module.id}`, {
                          method: 'DELETE',
                        });
                        if (!response.ok) throw new Error('Erreur');
                        toast.success('Module supprimé!');
                        loadCourse();
                      } catch (error) {
                        toast.error('Erreur');
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {module.lessons.length === 0 ? (
                  <p className="text-text-secondary text-sm">Aucune leçon dans ce module</p>
                ) : (
                  module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 bg-surface-light rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {lesson.type === 'VIDEO' && <Video className="w-5 h-5 text-neon-violet" />}
                        {lesson.type === 'PDF' && <FileText className="w-5 h-5 text-neon-cyan" />}
                        {lesson.type === 'IMAGE' && <ImageIcon className="w-5 h-5 text-neon-green" />}
                        {lesson.type === 'AUDIO' && <Music className="w-5 h-5 text-yellow-400" />}
                        <div>
                          <p className="font-medium text-text-primary">{lesson.title}</p>
                          <p className="text-sm text-text-secondary">
                            {lesson.duration} min • {lesson.isFree ? 'Gratuit' : 'Payant'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          leftIcon={<Edit className="w-4 h-4" />}
                          onClick={() => {
                            setSelectedModule(module.id);
                            setShowAddLesson(true);
                            // TODO: Pré-remplir le formulaire avec les données de la leçon
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={async () => {
                            if (!confirm('Supprimer cette leçon?')) return;
                            try {
                              const response = await fetch(`/api/admin/lessons/${lesson.id}`, {
                                method: 'DELETE',
                              });
                              if (!response.ok) throw new Error('Erreur');
                              toast.success('Leçon supprimée!');
                              loadCourse();
                            } catch (error) {
                              toast.error('Erreur');
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {showAddLesson && selectedModule && (
        <AddLessonModal
          moduleId={selectedModule}
          onClose={() => {
            setShowAddLesson(false);
            setSelectedModule(null);
          }}
          onAdd={handleAddLesson}
        />
      )}
    </div>
  );
}

function AddLessonModal({
  moduleId,
  onClose,
  onAdd,
}: {
  moduleId: string;
  onClose: () => void;
  onAdd: (moduleId: string, data: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'VIDEO',
    duration: '0',
    videoUrl: '',
    pdfUrl: '',
    imageUrl: '',
    audioUrl: '',
    content: '',
    isFree: false,
    published: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lessonData: any = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      duration: parseInt(formData.duration),
      isFree: formData.isFree,
      published: formData.published,
    };

    if (formData.type === 'VIDEO') lessonData.videoUrl = formData.videoUrl;
    if (formData.type === 'PDF') lessonData.pdfUrl = formData.pdfUrl;
    if (formData.type === 'IMAGE') lessonData.imageUrl = formData.imageUrl;
    if (formData.type === 'AUDIO') lessonData.audioUrl = formData.audioUrl;
    if (formData.type === 'TEXT') lessonData.content = formData.content;

    onAdd(moduleId, lessonData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-dark rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Ajouter une leçon
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Type de contenu *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
            >
              <option value="VIDEO">Vidéo</option>
              <option value="PDF">PDF / Document</option>
              <option value="IMAGE">Image / Photo</option>
              <option value="AUDIO">Audio</option>
              <option value="TEXT">Texte / HTML</option>
            </select>
          </div>

          {formData.type === 'VIDEO' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL de la vidéo *
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..."
                className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
                required
              />
            </div>
          )}

          {formData.type === 'PDF' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL du PDF *
              </label>
              <input
                type="url"
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                placeholder="https://example.com/document.pdf"
                className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
                required
              />
            </div>
          )}

          {formData.type === 'IMAGE' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL de l'image *
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
                required
              />
            </div>
          )}

          {formData.type === 'AUDIO' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL de l'audio *
              </label>
              <input
                type="url"
                value={formData.audioUrl}
                onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                placeholder="https://example.com/audio.mp3"
                className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
                required
              />
            </div>
          )}

          {formData.type === 'TEXT' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contenu *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
                rows={6}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Durée (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 bg-surface-light border border-border-glow rounded-lg text-text-primary"
              min="0"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isFree"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
              className="w-4 h-4 rounded border-border-glow bg-surface-light text-neon-violet"
            />
            <label htmlFor="isFree" className="text-sm text-text-primary">
              Leçon gratuite (accessible à tous)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Ajouter la leçon
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

