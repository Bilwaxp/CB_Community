import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET - Récupérer les utilisateurs par plan
export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const plan = searchParams.get('plan');

    const where = plan ? { plan } : {};

    const users = await db.user.findMany({
      where,
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        plan: true,
        planExpiresAt: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Statistiques par plan
    const stats = {
      BASIC: await db.user.count({ where: { plan: 'BASIC' } }),
      PRO: await db.user.count({ where: { plan: 'PRO' } }),
      VIP: await db.user.count({ where: { plan: 'VIP' } }),
    };

    return NextResponse.json({ users, stats });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour le plan d'un utilisateur
export async function PUT(request: Request) {
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
    const { userId, plan, planExpiresAt } = body;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        plan,
        planExpiresAt: planExpiresAt ? new Date(planExpiresAt) : null,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

