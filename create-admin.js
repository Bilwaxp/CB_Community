const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const nom = process.argv[4] || 'Admin';
  const prenom = process.argv[5] || 'System';

  if (!email || !password) {
    console.error('ERREUR: Email et mot de passe requis');
    console.log('Usage: node create-admin.js <email> <password> [nom] [prenom]');
    await prisma.$disconnect();
    process.exit(1);
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('ERREUR: Un utilisateur avec cet email existe déjà!');
      await prisma.$disconnect();
      process.exit(1);
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur admin
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nom,
        prenom,
        role: 'ADMIN',
        status: 'APPROVED',
        emailVerified: new Date(),
        plan: 'VIP',
      },
    });

    console.log('SUCCES: Utilisateur admin créé!');
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Status:', user.status);
    console.log('Nom:', user.prenom, user.nom);

    await prisma.$disconnect();
  } catch (error) {
    console.error('ERREUR:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

createAdmin();

