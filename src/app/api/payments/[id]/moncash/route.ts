import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// POST - Initier un paiement Moncash
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

    // Ici, vous intégreriez avec l'API Moncash réelle
    // Pour l'instant, on simule la génération d'un QR Code
    
    const transactionId = `MONCASH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const updatedPayment = await db.payment.update({
      where: { id: params.id },
      data: {
        moncashTransactionId: transactionId,
        status: 'PENDING',
      },
    });

    // Générer un QR Code (vous pouvez utiliser une bibliothèque comme qrcode)
    // Pour l'instant, on retourne les informations de paiement

    return NextResponse.json({
      payment: updatedPayment,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`moncash:${phoneNumber}?amount=${payment.amount}`)}`,
      transactionId,
      instructions: `Envoyez ${payment.amount} HTG au numéro Moncash: ${phoneNumber}`,
    });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

