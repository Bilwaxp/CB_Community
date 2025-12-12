import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET - Récupérer tous les cours
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

    const courses = await db.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        enrollments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau cours
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
    const { title, description, thumbnail, price, level, minPlan, isPremium } = body;

    // Générer un slug à partir du titre
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const course = await db.course.create({
      data: {
        title,
        slug,
        description,
        thumbnail,
        price: price || 0,
        level: level || 'BEGINNER',
        minPlan: minPlan || 'BASIC',
        isPremium: isPremium !== undefined ? isPremium : true,
        published: false, // Par défaut non publié
      },
    });

    return NextResponse.json({ course });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

