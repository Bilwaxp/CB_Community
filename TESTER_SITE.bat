@echo off
setlocal enabledelayedexpansion
title CB_Community - Test Rapide
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   TEST RAPIDE DU SITE
echo ========================================
echo.

REM Chercher Node.js dans plusieurs emplacements
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "NODE_PATH=C:\Program Files\nodejs"
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "NODE_PATH=C:\Program Files (x86)\nodejs"
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "NODE_PATH=%LOCALAPPDATA%\Programs\nodejs"
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas trouve dans le PATH!
    echo.
    echo Solutions:
    echo 1. Installez Node.js depuis https://nodejs.org
    echo 2. Ou ajoutez Node.js au PATH systeme
    echo 3. Ou lancez HEBERGER_FINAL.bat qui cherche automatiquement
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js trouve
node --version
echo.

REM Vérifier .env
if not exist ".env" (
    echo Creation du fichier .env...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=cb-community-secret-key-changez-en-production
        echo GOOGLE_CLIENT_ID=
        echo GOOGLE_CLIENT_SECRET=
        echo STRIPE_SECRET_KEY=
        echo STRIPE_PUBLISHABLE_KEY=
        echo STRIPE_WEBHOOK_SECRET=
        echo STRIPE_PRO_PRICE_ID=
        echo STRIPE_VIP_PRICE_ID=
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=cbcommunity7@gmail.com
        echo SMTP_PASSWORD=
        echo SMTP_FROM=cbcommunity7@gmail.com
        echo NODE_ENV=development
    ) > .env
)

REM Vérifier DATABASE_URL
findstr /C:"DATABASE_URL" .env >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Ajout de DATABASE_URL dans .env...
    echo DATABASE_URL=file:./prisma/dev.db >> .env
)

REM Vérifier node_modules
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERREUR lors de l'installation!
        pause
        exit /b 1
    )
)

REM Générer Prisma
echo Generation Prisma...
call npx prisma generate >nul 2>&1

REM Vérifier base de données
if not exist "prisma\dev.db" (
    echo Creation de la base de donnees...
    call npx prisma db push --accept-data-loss >nul 2>&1
)

echo.
echo ========================================
echo   LANCEMENT DU SERVEUR DE TEST
echo ========================================
echo.
echo Le site sera accessible sur: http://localhost:3000
echo.
echo Mode: DEVELOPPEMENT (pour test rapide)
echo.
echo Pour la production, utilisez: HEBERGER_FINAL.bat
echo.
echo Ouverture du navigateur dans 5 secondes...
timeout /t 5 /nobreak >nul
start http://localhost:3000
echo.
echo Serveur en cours de demarrage...
echo (Fermez cette fenetre pour arreter)
echo.

REM Lancer en mode développement (plus rapide pour les tests)
call npm run dev

