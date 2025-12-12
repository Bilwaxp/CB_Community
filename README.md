# CB_Community

Plateforme d'apprentissage et de trading communautaire avec gestion complète des cours, utilisateurs, paiements et signaux.

## 🚀 Fonctionnalités

- ✅ Authentification (Email/Password + Google OAuth)
- ✅ Dashboard utilisateur complet
- ✅ Panel admin complet
- ✅ Gestion des cours (création, édition, leçons, upload)
- ✅ Upload de médias (vidéos, images, PDF)
- ✅ Gestion des utilisateurs (approuver, bannir, supprimer)
- ✅ Gestion des plans (Basic, Pro, VIP)
- ✅ Paiements multiples (Stripe, PayPal, Moncash, Natcash, Zelle, Crypto)
- ✅ Signaux de trading
- ✅ Webinaires vidéo
- ✅ Forum de discussion
- ✅ Certificats
- ✅ Logs d'activité
- ✅ Paramètres du site

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- SQLite (inclus avec Prisma)

## 🔧 Installation

1. Clonez le dépôt:
```bash
git clone https://github.com/VOTRE_USERNAME/CB_Community.git
cd CB_Community
```

2. Installez les dépendances:
```bash
npm install
```

3. Configurez les variables d'environnement:
```bash
cp .env.example .env
# Éditez .env et configurez vos variables
```

4. Initialisez la base de données:
```bash
npx prisma generate
npx prisma db push
```

5. Lancez le serveur de développement:
```bash
npm run dev
```

## 🏗️ Build de production

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
CB_ONE/
├── src/
│   ├── app/              # Pages Next.js
│   │   ├── (admin)/      # Pages admin
│   │   ├── (auth)/       # Pages authentification
│   │   ├── (dashboard)/  # Dashboard utilisateur
│   │   └── api/          # API routes
│   ├── components/       # Composants React
│   └── lib/              # Utilitaires
├── prisma/               # Schéma Prisma
└── public/               # Fichiers statiques
```

## 🔐 Variables d'environnement

Créez un fichier `.env` avec:

```env
# Base de données
DATABASE_URL=file:./prisma/dev.db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-cle-secrete

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe (optionnel)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# SMTP (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
```

## 🚀 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm start` - Serveur de production
- `npm run db:generate` - Générer Prisma Client
- `npm run db:push` - Pousser le schéma vers la DB
- `npm run db:studio` - Ouvrir Prisma Studio

## 📝 Scripts Windows

- `HEBERGER_SITE.bat` - Héberger le site
- `LANCER_FINAL.bat` - Démarrage rapide
- `HEBERGER_SUR_GITHUB.bat` - Préparer pour GitHub
- `REGENERER_PRISMA.bat` - Régénérer Prisma Client

## 🌐 Hébergement

### Local/Réseau
Exécutez `HEBERGER_SITE.bat` pour héberger sur votre réseau local.

### Production
Pour héberger en production, utilisez:
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **VPS/Serveur cloud**

## 📄 Licence

Propriétaire - CB_Community © 2024

## 👥 Support

Pour toute question ou problème, consultez les guides dans le projet.
