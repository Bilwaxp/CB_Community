@echo off
title CB_Community - Demarrage Complet
color 0A
cls

echo.
echo ========================================
echo   CB_COMMUNITY - DEMARRAGE COMPLET
echo ========================================
echo.

cd /d "%~dp0"

REM Tuer tous les processus Node.js existants pour liberer les ports
echo Nettoyage des processus Node.js existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Configuration .env
if not exist ".env" (
    echo Configuration du fichier .env...
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
)

REM Installation dependances
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install --legacy-peer-deps
)

REM Generation Prisma
echo Generation du client Prisma...
call npx prisma generate >nul 2>&1

REM Creation base de donnees
if not exist "dev.db" (
    echo Creation de la base de donnees...
    call npx prisma db push --accept-data-loss >nul 2>&1
)

REM Nettoyer le build corrompu
echo Nettoyage du build...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
)

REM Lancer le serveur
echo.
echo ========================================
echo   LANCEMENT DU SERVEUR...
echo ========================================
echo.
echo Le site sera disponible sur: http://localhost:3000
echo.
echo Ouverture du navigateur dans 3 secondes...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo Serveur en cours d'execution...
echo (Fermez cette fenetre pour arreter le serveur)
echo.

call npm run dev

pause

