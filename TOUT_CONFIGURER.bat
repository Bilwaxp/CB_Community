@echo off
title Configuration Complete CB_Community
color 0A
cls

echo.
echo ========================================
echo   CONFIGURATION COMPLETE AUTOMATIQUE
echo ========================================
echo.

cd /d "%~dp0"

echo [ETAPE 1/5] Configuration du fichier .env...
(
    echo DATABASE_URL=file:./dev.db
    echo NEXTAUTH_URL=http://localhost:3000
    echo NEXTAUTH_SECRET=changez-cette-cle-secrete-en-production
    echo GOOGLE_CLIENT_ID=
    echo GOOGLE_CLIENT_SECRET=
    echo STRIPE_SECRET_KEY=
    echo STRIPE_PUBLISHABLE_KEY=
    echo STRIPE_WEBHOOK_SECRET=
    echo STRIPE_PRO_PRICE_ID=
    echo STRIPE_VIP_PRICE_ID=
    echo NODE_ENV=development
    echo SMTP_HOST=smtp.gmail.com
    echo SMTP_PORT=587
    echo SMTP_USER=cbcommunity7@gmail.com
    echo SMTP_PASSWORD=
    echo SMTP_FROM=cbcommunity7@gmail.com
) > .env
echo Fichier .env configure avec cbcommunity7@gmail.com

echo.
echo [ETAPE 2/5] Installation des dependances...
if not exist "node_modules" (
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERREUR lors de l'installation!
        pause
        exit /b 1
    )
    echo Dependances installees!
) else (
    echo Dependances deja installees.
)

echo.
echo [ETAPE 3/5] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)
echo Client Prisma genere!

echo.
echo [ETAPE 4/5] Creation de la base de donnees SQLite...
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo ERREUR lors de la creation de la base de donnees!
    pause
    exit /b 1
)
echo Base de donnees creee!

echo.
echo [ETAPE 5/5] Verification...
if exist "dev.db" (
    echo Base de donnees SQLite: OK
) else (
    echo ATTENTION: Base de donnees non trouvee
)

echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Email configure: cbcommunity7@gmail.com
echo.
echo IMPORTANT: Pour activer l'envoi d'emails, vous devez:
echo 1. Creer un mot de passe d'application Gmail
echo 2. L'ajouter dans le fichier .env (SMTP_PASSWORD=)
echo.
echo Voir CONFIGURER_EMAIL.md pour les instructions
echo.
echo Le site est pret a etre lance!
echo.
pause




