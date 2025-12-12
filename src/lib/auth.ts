import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { db } from './db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/verify-email',
  },
  providers: [
    // Google OAuth - seulement si GOOGLE_CLIENT_ID est configuré et non vide
    ...(process.env.GOOGLE_CLIENT_ID && 
        process.env.GOOGLE_CLIENT_SECRET && 
        process.env.GOOGLE_CLIENT_ID.trim() !== '' &&
        process.env.GOOGLE_CLIENT_SECRET.trim() !== ''
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: 'select_account', // Force la sélection de compte - montre tous les comptes Google
                access_type: 'offline',
                response_type: 'code',
              },
            },
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error('Email ou mot de passe incorrect');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Email ou mot de passe incorrect');
        }

        // Vérification email temporairement désactivée pour développement
        // if (!user.emailVerified) {
        //   throw new Error('Veuillez vérifier votre email avant de vous connecter. Consultez votre boîte mail.');
        // }

        if (user.status === 'PENDING') {
          throw new Error('Votre compte est en attente d\'approbation');
        }

        if (user.status === 'BANNED') {
          throw new Error('Votre compte a été suspendu');
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: `${user.prenom} ${user.nom}`,
          image: user.photo,
          role: user.role as 'USER' | 'ADMIN',
          plan: user.plan,
          status: user.status,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
        token.plan = (user as any).plan;
        token.status = (user as any).status;
      }

      // Handle update trigger
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).plan = token.plan;
        (session.user as any).status = token.status;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Create new user from Google - account activated immediately
          const nameParts = user.name?.split(' ') || ['', ''];
          await db.user.create({
            data: {
              email: user.email!,
              nom: nameParts.slice(1).join(' ') || 'User',
              prenom: nameParts[0] || 'Google',
              photo: user.image,
              emailVerified: new Date(),
              status: 'APPROVED', // Account activated immediately
              plan: 'BASIC',
            },
          });
        } else {
          // Update existing user if needed
          await db.user.update({
            where: { email: user.email! },
            data: {
              emailVerified: new Date(),
              status: 'APPROVED',
              photo: user.image,
            },
          });
        }
      }
      return true;
    },
  },
  events: {
    async signIn({ user }) {
      // Log sign in
      await db.auditLog.create({
        data: {
          userId: user.id,
          action: 'SIGN_IN',
          entity: 'user',
          entityId: user.id,
        },
      });
    },
  },
});

// Helper to check if user is admin
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === 'ADMIN';
}

// Helper to check user plan access
export async function hasAccess(userId: string, requiredPlan: 'BASIC' | 'PRO' | 'VIP'): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });

  if (!user) return false;

  const planHierarchy: Record<string, number> = { BASIC: 0, PRO: 1, VIP: 2 };
  const userPlanLevel = planHierarchy[user.plan] ?? 0;
  const requiredPlanLevel = planHierarchy[requiredPlan] ?? 0;
  const hasValidPlan = userPlanLevel >= requiredPlanLevel;

  // Check if plan is expired
  if (user.plan !== 'BASIC' && user.planExpiresAt && user.planExpiresAt < new Date()) {
    return false;
  }

  return hasValidPlan;
}




