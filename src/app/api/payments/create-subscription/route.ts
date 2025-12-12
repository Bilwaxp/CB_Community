import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { plan, method, amount, currency = 'USD' } = body;

    if (!plan || !method) {
      return NextResponse.json(
        { error: 'Plan et méthode de paiement requis' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Prix des plans
    const planPrices: Record<string, number> = {
      BASIC: 0,
      PRO: 29,
      VIP: 99,
    };

    const finalAmount = amount || planPrices[plan] || 0;

    // Créer un enregistrement de paiement
    const payment = await db.payment.create({
      data: {
        userId: user.id,
        amount: finalAmount,
        currency,
        method: method.toUpperCase(),
        type: 'SUBSCRIPTION',
        planType: plan,
        status: 'PENDING',
      },
    });

    // Selon la méthode de paiement, rediriger vers le bon processeur
    switch (method.toUpperCase()) {
      case 'STRIPE':
      case 'CARD':
      case 'CREDIT_CARD':
      case 'DEBIT_CARD':
        // Utiliser Stripe pour les cartes
        return NextResponse.json({
          paymentId: payment.id,
          method: 'STRIPE',
          redirectUrl: `/payment/stripe/${payment.id}`,
        });

      case 'PAYPAL':
        return NextResponse.json({
          paymentId: payment.id,
          method: 'PAYPAL',
          redirectUrl: `/payment/paypal/${payment.id}`,
        });

      case 'MONCASH':
        return NextResponse.json({
          paymentId: payment.id,
          method: 'MONCASH',
          redirectUrl: `/payment/moncash/${payment.id}`,
        });

      case 'NATCASH':
        return NextResponse.json({
          paymentId: payment.id,
          method: 'NATCASH',
          redirectUrl: `/payment/natcash/${payment.id}`,
        });

      case 'ZELLE':
        return NextResponse.json({
          paymentId: payment.id,
          method: 'ZELLE',
          redirectUrl: `/payment/zelle/${payment.id}`,
        });

      case 'CRYPTO':
      case 'CRYPTO_USDT':
      case 'CRYPTO_BTC':
        return NextResponse.json({
          paymentId: payment.id,
          method: 'CRYPTO',
          redirectUrl: `/payment/crypto/${payment.id}`,
        });

      default:
        return NextResponse.json(
          { error: 'Méthode de paiement non supportée' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

