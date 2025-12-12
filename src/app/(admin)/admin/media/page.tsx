'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Trash2,
  Download,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Link as LinkIcon,
  Copy,
} from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';
import toast from 'react-hot-toast';

interface MediaFile {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
  category?: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      // TODO: Remplacer par vraie API
      // Pour l'instant, on simule avec des données vides
      setFiles([]);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Sélectionnez au moins un fichier');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur lors de l\'upload');

      const data = await response.json();
      toast.success(`${data.files.length} fichier(s) uploadé(s)!`);
      setShowUploadModal(false);
      setSelectedFiles([]);
      loadFiles();
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier?')) return;

    try {
      const response = await fetch(`/api/admin/media/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur');
      toast.success('Fichier supprimé!');
      loadFiles();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiée!');
  };

  const getFileType = (type: string) => {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type === 'application/pdf') return 'pdf';
    return 'other';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || getFileType(file.type) === typeFilter;
    return matchesSearch && matchesType;
  });

  const fileStats = {
    total: files.length,
    images: files.filter((f) => getFileType(f.type) === 'image').length,
    videos: files.filter((f) => getFileType(f.type) === 'video').length,
    pdfs: files.filter((f) => getFileType(f.type) === 'pdf').length,
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
            Gestion des médias
          </h1>
          <p className="text-text-secondary">
            Uploadez et gérez vos fichiers multimédias (vidéos, images, PDF)
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={loadFiles}
          >
            Actualiser
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowUploadModal(true)}
          >
            Uploader des fichiers
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
          <Upload className="w-8 h-8 text-neon-violet mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{fileStats.total}</p>
          <p className="text-sm text-text-secondary">Total</p>
        </Card>
        <Card variant="glass" className="text-center">
          <ImageIcon className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{fileStats.images}</p>
          <p className="text-sm text-text-secondary">Images</p>
        </Card>
        <Card variant="glass" className="text-center">
          <VideoIcon className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{fileStats.videos}</p>
          <p className="text-sm text-text-secondary">Vidéos</p>
        </Card>
        <Card variant="glass" className="text-center">
          <FileText className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary mb-1">{fileStats.pdfs}</p>
          <p className="text-sm text-text-secondary">PDF</p>
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
            placeholder="Rechercher un fichier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={typeFilter === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter(null)}
          >
            Tous
          </Button>
          <Button
            variant={typeFilter === 'image' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('image')}
          >
            Images
          </Button>
          <Button
            variant={typeFilter === 'video' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('video')}
          >
            Vidéos
          </Button>
          <Button
            variant={typeFilter === 'pdf' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('pdf')}
          >
            PDF
          </Button>
        </div>
      </motion.div>

      {/* Files Grid */}
      {filteredFiles.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <Upload className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Aucun fichier uploadé
          </h3>
          <p className="text-text-secondary mb-6">
            Commencez par uploader vos premiers fichiers multimédias
          </p>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowUploadModal(true)}
          >
            Uploader des fichiers
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => {
            const fileType = getFileType(file.type);
            return (
              <Card key={file.id} variant="glass" className="relative group">
                <div className="aspect-square bg-surface-light rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                  {fileType === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : fileType === 'video' ? (
                    <div className="relative w-full h-full">
                      <video
                        src={file.url}
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <VideoIcon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  ) : (
                    <FileText className="w-12 h-12 text-text-secondary" />
                  )}
                  
                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyUrl(file.url)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-text-primary truncate" title={file.name}>
                    {file.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={fileType === 'image' ? 'cyan' : fileType === 'video' ? 'green' : 'yellow'}>
                      {fileType === 'image' ? 'Image' : fileType === 'video' ? 'Vidéo' : 'PDF'}
                    </Badge>
                    <span className="text-xs text-text-secondary">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onUpload={handleUpload}
          onClose={() => {
            setShowUploadModal(false);
            setSelectedFiles([]);
          }}
          uploading={uploading}
        />
      )}
    </div>
  );
}

// Modal d'upload
function UploadModal({
  selectedFiles,
  onFileSelect,
  onUpload,
  onClose,
  uploading,
}: {
  selectedFiles: File[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onClose: () => void;
  uploading: boolean;
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const fakeEvent = {
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>;
      onFileSelect(fakeEvent);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileType = (type: string) => {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type === 'application/pdf') return 'pdf';
    return 'other';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-dark rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Uploader des fichiers
        </h2>

        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive
              ? 'border-neon-violet bg-neon-violet/10'
              : 'border-border-glow'
          }`}
        >
          <Upload className="w-16 h-16 text-neon-violet mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Glissez-déposez vos fichiers ici
          </h3>
          <p className="text-text-secondary mb-6">
            Ou cliquez pour sélectionner des fichiers
          </p>
          <input
            type="file"
            multiple
            onChange={onFileSelect}
            accept="image/*,video/*,.pdf"
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="relative inline-flex items-center justify-center font-semibold text-sm uppercase tracking-wider transition-all duration-300 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-violet to-purple-600 text-white shadow-neon-violet hover:shadow-glow-lg hover:-translate-y-0.5 group">
              <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              </span>
              <span className="relative flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Sélectionner des fichiers
              </span>
            </span>
          </label>
          <p className="text-xs text-text-secondary mt-4">
            Formats supportés: Images (JPG, PNG, GIF), Vidéos (MP4, WebM), PDF
          </p>
        </div>

        {/* Selected files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="font-bold text-text-primary">
              Fichiers sélectionnés ({selectedFiles.length})
            </h3>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {selectedFiles.map((file, index) => {
                const fileType = getFileType(file.type);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-surface-light rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {fileType === 'image' ? (
                        <ImageIcon className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                      ) : fileType === 'video' ? (
                        <VideoIcon className="w-5 h-5 text-neon-green flex-shrink-0" />
                      ) : (
                        <FileText className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="primary"
            onClick={onUpload}
            isLoading={uploading}
            disabled={selectedFiles.length === 0}
            className="flex-1"
          >
            Uploader {selectedFiles.length > 0 && `(${selectedFiles.length})`}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
