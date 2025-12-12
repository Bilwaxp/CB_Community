import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// POST - Confirmer un paiement
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
    const { method, paypalOrderId, moncashTransactionId, natcashTransactionId, cryptoTxHash } = body;

    const payment = await db.payment.findUnique({
      where: { id: params.id },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Paiement non trouvé' }, { status: 404 });
    }

    if (payment.userId !== session.user.id) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    // Mettre à jour le paiement
    const updateData: any = {
      status: 'PENDING', // En attente de vérification manuelle
    };

    if (paypalOrderId) updateData.paypalOrderId = paypalOrderId;
    if (moncashTransactionId) updateData.moncashTransactionId = moncashTransactionId;
    if (natcashTransactionId) updateData.natcashTransactionId = natcashTransactionId;
    if (cryptoTxHash) updateData.cryptoTxHash = cryptoTxHash;

    const updatedPayment = await db.payment.update({
      where: { id: params.id },
      data: updateData,
    });

    // Note: Pour les paiements manuels, l'admin devra vérifier et approuver
    // Le plan sera activé une fois le paiement confirmé par l'admin

    return NextResponse.json({
      payment: updatedPayment,
      message: 'Paiement enregistré. Vérification en cours...',
    });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

