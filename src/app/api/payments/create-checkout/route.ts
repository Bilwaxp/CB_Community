import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { createCheckoutSession, createCourseCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { type, planType, courseId } = body;

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    if (type === 'subscription' && planType) {
      const checkoutSession = await createCheckoutSession({
        userId: session.user.id,
        userEmail: user.email,
        planType,
        successUrl: `${baseUrl}/dashboard/billing?success=true`,
        cancelUrl: `${baseUrl}/dashboard/billing?canceled=true`,
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    if (type === 'course' && courseId) {
      const course = await db.course.findUnique({
        where: { id: courseId },
        select: { id: true, title: true, price: true },
      });

      if (!course) {
        return NextResponse.json({ error: 'Cours non trouvé' }, { status: 404 });
      }

      const checkoutSession = await createCourseCheckoutSession({
        userId: session.user.id,
        userEmail: user.email,
        courseId: course.id,
        courseTitle: course.title,
        price: course.price,
        successUrl: `${baseUrl}/dashboard/courses/${courseId}?success=true`,
        cancelUrl: `${baseUrl}/courses/${courseId}?canceled=true`,
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    return NextResponse.json({ error: 'Type de paiement invalide' }, { status: 400 });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
}













