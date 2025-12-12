import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// POST - Initier un paiement Natcash
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { phoneNumber } = body;

    const payment = await db.payment.findUnique({
      where: { id: params.id },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Paiement non trouvé' }, { status: 404 });
    }

    if (payment.userId !== session.user.id) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    const transactionId = `NATCASH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Mise à jour avec objet dynamique pour éviter les erreurs TypeScript
    const updateData: any = {
      status: 'PENDING',
      natcashTransactionId: transactionId,
    };

    const updatedPayment = await db.payment.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      payment: updatedPayment,
      transactionId,
      instructions: `Envoyez ${payment.amount} HTG au numéro Natcash: ${phoneNumber}`,
    });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

