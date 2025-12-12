import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Créer le dossier s'il n'existe pas
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomStr}.${extension}`;
      const filePath = join(uploadDir, fileName);

      // Écrire le fichier
      await writeFile(filePath, buffer);

      // Déterminer le type de fichier
      let fileType = 'OTHER';
      if (file.type.startsWith('image/')) fileType = 'IMAGE';
      else if (file.type.startsWith('video/')) fileType = 'VIDEO';
      else if (file.type === 'application/pdf') fileType = 'PDF';
      else if (file.type.startsWith('audio/')) fileType = 'AUDIO';

      // Enregistrer dans la base de données
      const upload = await db.upload.create({
        data: {
          filename: fileName,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          url: `/uploads/${fileName}`,
          type: fileType,
          isPublic: true,
          uploadedBy: session.user.id,
        },
      });

      uploadedFiles.push({
        id: upload.id,
        name: file.name,
        type: file.type,
        url: `/uploads/${fileName}`,
        size: file.size,
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `${uploadedFiles.length} fichier(s) uploadé(s) avec succès`,
    });
  } catch (error: any) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'upload' },
      { status: 500 }
    );
  }
}

