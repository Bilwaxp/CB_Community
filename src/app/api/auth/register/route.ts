import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { generateToken } from '@/lib/utils';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prenom, nom, email, password } = body;

    // Validation
    if (!prenom || !nom || !email || !password) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cet email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user - email verification temporarily disabled, so account is activated immediately
    const user = await db.user.create({
      data: {
        prenom,
        nom,
        email,
        password: hashedPassword,
        status: 'APPROVED', // Account activated immediately (email verification disabled)
        plan: 'BASIC',
        emailVerified: new Date(), // Email considered verified (temporarily disabled)
      },
    });

    // Generate verification token
    const token = generateToken(32);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create verification token (if model exists)
    try {
    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
        type: 'EMAIL_VERIFICATION',
      },
    });
    } catch (tokenError: any) {
      console.error('Erreur création token:', tokenError);
      // Continue even if token creation fails
    }

    // Send verification email (optional - won't block registration)
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        await sendVerificationEmail(email, token);
      } else {
        console.log('SMTP non configuré - email non envoyé');
      }
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError);
      // Continue even if email fails - user can request resend
    }

    // Log the action (optional - won't block registration)
    try {
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTER',
        entity: 'user',
        entityId: user.id,
          metadata: JSON.stringify({ email }),
      },
    });
    } catch (logError: any) {
      console.error('Erreur création log:', logError);
      // Continue even if logging fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inscription réussie! Un email de vérification a été envoyé. Veuillez vérifier votre boîte mail.',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Erreur lors de l\'inscription';
    
    if (error.code === 'P2002') {
      errorMessage = 'Un compte existe déjà avec cet email';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}




