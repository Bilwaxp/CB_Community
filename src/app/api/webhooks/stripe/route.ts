import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planType, courseId, type } = session.metadata || {};

        if (!userId) break;

        // Handle subscription
        if (session.mode === 'subscription' && planType) {
          const planExpiresAt = new Date();
          if (planType === 'PRO') {
            planExpiresAt.setMonth(planExpiresAt.getMonth() + 1);
          } else if (planType === 'VIP') {
            planExpiresAt.setFullYear(planExpiresAt.getFullYear() + 1);
          }

          await db.user.update({
            where: { id: userId },
            data: {
              plan: planType as 'PRO' | 'VIP',
              planExpiresAt,
            },
          });

          // Create payment record
          await db.payment.create({
            data: {
              userId,
              amount: session.amount_total ? session.amount_total / 100 : 0,
              currency: session.currency || 'usd',
              method: 'STRIPE',
              status: 'COMPLETED',
              type: 'SUBSCRIPTION',
              planType: planType as 'PRO' | 'VIP',
              stripeSessionId: session.id,
              stripePaymentIntent: session.payment_intent as string,
            },
          });

          // Send notification
          await db.notification.create({
            data: {
              userId,
              title: 'Abonnement activé!',
              message: `Votre abonnement ${planType} a été activé avec succès.`,
              type: 'PAYMENT',
            },
          });
        }

        // Handle course purchase
        if (session.mode === 'payment' && courseId) {
          // Create enrollment
          await db.enrollment.create({
            data: {
              userId,
              courseId,
              progress: 0,
            },
          });

          // Create payment record
          await db.payment.create({
            data: {
              userId,
              amount: session.amount_total ? session.amount_total / 100 : 0,
              currency: session.currency || 'usd',
              method: 'STRIPE',
              status: 'COMPLETED',
              type: 'COURSE',
              courseId,
              stripeSessionId: session.id,
              stripePaymentIntent: session.payment_intent as string,
            },
          });

          // Send notification
          await db.notification.create({
            data: {
              userId,
              title: 'Achat confirmé!',
              message: 'Votre cours a été ajouté à votre compte.',
              type: 'PAYMENT',
            },
          });
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        if (userId && subscription.status === 'active') {
          const planType = subscription.metadata.planType as 'PRO' | 'VIP';
          const planExpiresAt = new Date(subscription.current_period_end * 1000);

          await db.user.update({
            where: { id: userId },
            data: {
              plan: planType,
              planExpiresAt,
            },
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        if (userId) {
          await db.user.update({
            where: { id: userId },
            data: {
              plan: 'BASIC',
              planExpiresAt: null,
            },
          });

          await db.notification.create({
            data: {
              userId,
              title: 'Abonnement annulé',
              message: 'Votre abonnement a été annulé. Vous avez maintenant un plan Basic.',
              type: 'PAYMENT',
            },
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const userId = invoice.subscription_details?.metadata?.userId;

        if (userId) {
          await db.notification.create({
            data: {
              userId,
              title: 'Échec de paiement',
              message: 'Le renouvellement de votre abonnement a échoué. Veuillez mettre à jour vos informations de paiement.',
              type: 'PAYMENT',
            },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}













