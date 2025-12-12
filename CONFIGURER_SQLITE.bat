@echo off
title Configuration SQLite
color 0A

echo.
echo ========================================
echo   CONFIGURATION SQLITE POUR DEVELOPPEMENT
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Mise a jour du fichier .env...
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
    echo SMTP_HOST=
    echo SMTP_PORT=587
    echo SMTP_USER=
    echo SMTP_PASSWORD=
    echo SMTP_FROM=
) > .env
echo Fichier .env configure avec SQLite.

echo.
echo [2/3] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation!
    pause
    exit /b 1
)

echo.
echo [3/3] Creation de la base de donnees SQLite...
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo ERREUR lors de la creation de la base de donnees!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo La base de donnees SQLite a ete creee: dev.db
echo Vous pouvez maintenant lancer le site avec INSTALL_ET_LANCER.bat
echo.
pause





