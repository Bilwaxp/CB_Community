import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/verify-email?error=token_missing', request.nextUrl.origin)
      );
    }

    // Find verification token
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
        type: 'EMAIL_VERIFICATION',
        expires: {
          gt: new Date(), // Token not expired
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL('/verify-email?error=invalid_token', request.nextUrl.origin)
      );
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL('/verify-email?error=user_not_found', request.nextUrl.origin)
      );
    }

    // Update user - verify email and approve account
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        status: 'APPROVED', // Approve account after email verification
      },
    });

    // Delete used token (optional)
    try {
      await db.verificationToken.delete({
        where: { id: verificationToken.id },
      });
    } catch (deleteError) {
      console.error('Erreur suppression token:', deleteError);
    }

    // Log the action (optional)
    try {
      await db.auditLog.create({
        data: {
          userId: user.id,
          action: 'EMAIL_VERIFIED',
          entity: 'user',
          entityId: user.id,
        },
      });
    } catch (logError) {
      console.error('Erreur création log:', logError);
    }

    // Redirect to login with success message
    return NextResponse.redirect(
      new URL('/login?verified=true', request.nextUrl.origin)
    );
  } catch (error: any) {
    console.error('Email verification error:', error);
    const errorCode = error.code || 'server_error';
    return NextResponse.redirect(
      new URL(`/verify-email?error=${errorCode}`, request.nextUrl.origin)
    );
  }
}



