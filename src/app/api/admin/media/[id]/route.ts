import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const upload = await db.upload.findUnique({
      where: { id: params.id },
    });

    if (!upload) {
      return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
    }

    // Supprimer le fichier du système de fichiers
    try {
      const filePath = join(process.cwd(), 'public', upload.url);
      await unlink(filePath);
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error);
      // Continuer même si le fichier n'existe pas
    }

    // Supprimer de la base de données
    await db.upload.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

