import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET - Récupérer un paiement
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const payment = await db.payment.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Paiement non trouvé' }, { status: 404 });
    }

    // Vérifier que l'utilisateur peut voir ce paiement
    if (payment.userId !== session.user.id) {
      const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
      });

      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
      }
    }

    return NextResponse.json({ payment });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

