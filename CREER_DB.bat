@echo off
title Creation de la base de donnees
color 0A
cls

echo.
echo ========================================
echo   CREATION DE LA BASE DE DONNEES SQLITE
echo ========================================
echo.

cd /d "%~dp0"

echo Verification du fichier .env...
if not exist ".env" (
    echo Creation du fichier .env...
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
    ) > .env
)

echo.
echo [1/2] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    echo.
    pause
    exit /b 1
)
echo Client Prisma genere avec succes!

echo.
echo [2/2] Creation des tables dans la base de donnees...
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo ERREUR lors de la creation de la base de donnees!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BASE DE DONNEES CREE AVEC SUCCES!
echo ========================================
echo.
echo La base de donnees SQLite a ete creee: dev.db
echo Toutes les tables ont ete creees.
echo.
echo Vous pouvez maintenant lancer le site avec INSTALL_ET_LANCER.bat
echo.
pause





