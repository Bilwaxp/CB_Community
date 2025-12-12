@echo off
title Configuration de la base de donnees
color 0A

echo.
echo ========================================
echo   CONFIGURATION DE LA BASE DE DONNEES
echo ========================================
echo.

cd /d "%~dp0"

echo Configuration de SQLite pour le developpement...
echo.

REM Créer le fichier .env avec SQLite si nécessaire
if not exist ".env" (
    echo Creation du fichier .env avec SQLite...
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
    echo Fichier .env cree avec SQLite.
) else (
    echo Mise a jour du fichier .env...
    findstr /C:"DATABASE_URL" .env >nul
    if errorlevel 1 (
        echo DATABASE_URL=file:./dev.db >> .env
        echo DATABASE_URL ajoute au fichier .env
    ) else (
        echo DATABASE_URL existe deja dans .env
        echo.
        echo ATTENTION: Si vous utilisez PostgreSQL, modifiez manuellement DATABASE_URL dans .env
        echo Pour SQLite (developpement), utilisez: DATABASE_URL=file:./dev.db
    )
)

echo.
echo [1/2] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)

echo.
echo [2/2] Creation de la base de donnees SQLite...
call npx prisma db push
if errorlevel 1 (
    echo ERREUR lors de la creation de la base de donnees!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BASE DE DONNEES CONFIGUREE!
echo ========================================
echo.
echo La base de donnees SQLite a ete creee dans: dev.db
echo Vous pouvez maintenant lancer le site avec INSTALL_ET_LANCER.bat
echo.
pause





