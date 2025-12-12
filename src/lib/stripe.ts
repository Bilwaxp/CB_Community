import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const PLANS = {
  PRO: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    interval: 'month' as const,
    features: [
      'Accès à tous les cours',
      'Signaux trading en temps réel',
      'Accès au forum communautaire',
      'Support par email',
    ],
  },
  VIP: {
    name: 'VIP',
    price: 299,
    priceId: process.env.STRIPE_VIP_PRICE_ID,
    interval: 'year' as const,
    features: [
      'Tout du plan Pro',
      'Coaching individuel (2 sessions/mois)',
      'Accès aux webinaires exclusifs',
      'Signaux prioritaires',
      'Support prioritaire 24/7',
      'Certificats officiels',
    ],
  },
};

export async function createCheckoutSession({
  userId,
  userEmail,
  planType,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  userEmail: string;
  planType: 'PRO' | 'VIP';
  successUrl: string;
  cancelUrl: string;
}) {
  const plan = PLANS[planType];

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    customer_email: userEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      planType,
    },
    subscription_data: {
      metadata: {
        userId,
        planType,
      },
    },
  });

  return session;
}

export async function createCourseCheckoutSession({
  userId,
  userEmail,
  courseId,
  courseTitle,
  price,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  price: number;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: courseTitle,
            description: `Accès au cours: ${courseTitle}`,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ],
    customer_email: userEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      courseId,
      type: 'course',
    },
  });

  return session;
}

export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

export async function getSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}













