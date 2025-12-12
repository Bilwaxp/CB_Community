@echo off
title CB_Community - Installation et Lancement
color 0A
cls

echo.
echo ========================================
echo   INSTALLATION ET LANCEMENT AUTOMATIQUE
echo ========================================
echo.

cd /d "%~dp0"

REM Nettoyer les processus Node.js existants
echo [1/4] Nettoyage des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Installer les dépendances
echo [2/4] Installation des dependances (avec --legacy-peer-deps)...
echo Cela peut prendre 2-5 minutes...
echo.
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo ERREUR lors de l'installation!
    echo.
    pause
    exit /b 1
)
echo.
echo Dependances installees avec succes!

REM Générer Prisma
echo [3/4] Generation du client Prisma...
call npx prisma generate >nul 2>&1

REM Créer .env si nécessaire
if not exist ".env" (
    echo [4/4] Creation du fichier .env...
    (
        echo DATABASE_URL=postgresql://user:password@localhost:5432/cb_community
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
) else (
    echo [4/4] Fichier .env existe deja.
)

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

if errorlevel 1 (
    echo.
    echo ERREUR: Le serveur n'a pas pu demarrer!
    echo.
    pause
)








