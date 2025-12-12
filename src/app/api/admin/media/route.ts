import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
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

    const uploads = await db.upload.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const files = uploads.map((upload) => ({
      id: upload.id,
      name: upload.originalName,
      type: upload.mimeType,
      url: upload.url,
      size: upload.size,
      uploadedAt: upload.createdAt.toISOString(),
      category: upload.type,
    }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

