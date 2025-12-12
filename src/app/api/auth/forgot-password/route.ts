import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateToken } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Delete existing tokens
    await db.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: 'PASSWORD_RESET',
      },
    });

    // Generate reset token
    const token = generateToken(32);
    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
        type: 'PASSWORD_RESET',
      },
    });

    // TODO: Send password reset email
    // const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    // await sendPasswordResetEmail(email, resetUrl);

    // Log the action
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_RESET_REQUEST',
        entity: 'user',
        entityId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}













