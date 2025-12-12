import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { paymentId, plan, amount } = body;

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const checkoutSession = await createCheckoutSession({
      userId: session.user.id,
      userEmail: user.email,
      planType: plan as 'PRO' | 'VIP',
      successUrl: `${baseUrl}/dashboard/billing?success=true`,
      cancelUrl: `${baseUrl}/dashboard/billing?canceled=true`,
    });

    // Mettre à jour le paiement avec l'ID de session Stripe
    if (paymentId) {
      await db.payment.update({
        where: { id: paymentId },
        data: {
          stripeSessionId: checkoutSession.id,
        },
      });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

