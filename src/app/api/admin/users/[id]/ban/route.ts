import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// POST - Bannir/Débannir un utilisateur
export async function POST(
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

    const targetUser = await db.user.findUnique({
      where: { id: params.id },
      select: { status: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const newStatus = targetUser.status === 'BANNED' ? 'APPROVED' : 'BANNED';

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        status: newStatus,
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

