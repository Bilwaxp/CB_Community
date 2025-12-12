import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// POST - Créer une nouvelle leçon
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

    const body = await request.json();
    const {
      moduleId,
      title,
      description,
      type,
      order,
      duration,
      videoUrl,
      videoHlsUrl,
      pdfUrl,
      imageUrl,
      audioUrl,
      content,
      subtitlesUrl,
      isFree,
      published,
    } = body;

    const lesson = await db.lesson.create({
      data: {
        moduleId,
        title,
        description,
        type: type || 'VIDEO',
        order: order || 0,
        duration: duration || 0,
        videoUrl,
        videoHlsUrl,
        pdfUrl,
        imageUrl,
        audioUrl,
        content,
        subtitlesUrl,
        isFree: isFree !== undefined ? isFree : false,
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json({ lesson });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

