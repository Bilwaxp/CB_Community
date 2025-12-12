@echo off
title CB_Community - Lancement Automatique
color 0A
cls

echo.
echo ========================================
echo   CB_COMMUNITY - LANCEMENT AUTOMATIQUE
echo ========================================
echo.

cd /d "%~dp0"

REM Tuer les processus Node.js existants
echo [ETAPE 1/5] Nettoyage des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Vérifier Node.js
echo [ETAPE 2/5] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=%PATH%;C:\Program Files\nodejs"
    ) else (
        echo.
        echo ERREUR: Node.js n'est pas installe!
        echo Telechargez-le sur: https://nodejs.org
        echo.
        pause
        exit /b 1
    )
)
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js ne fonctionne pas correctement!
    pause
    exit /b 1
)
echo Node.js OK

REM Vérifier npm
echo [ETAPE 3/5] Verification de npm...
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Program Files\nodejs\npm.cmd" (
        set "PATH=%PATH%;C:\Program Files\nodejs"
    )
)
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: npm ne fonctionne pas correctement!
    pause
    exit /b 1
)
echo npm OK

REM Installer les dépendances si nécessaire
echo [ETAPE 4/5] Installation des dependances...
if not exist "node_modules" (
    echo Installation en cours (cela peut prendre 2-5 minutes)...
    call npm install --silent
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERREUR lors de l'installation!
        echo Reessayez avec: npm install
        echo.
        pause
        exit /b 1
    )
    echo Dependances installees avec succes!
) else (
    echo Dependances deja installees.
)

REM Générer Prisma Client
echo [ETAPE 5/5] Generation du client Prisma...
call npx prisma generate --silent >nul 2>&1

REM Créer .env si nécessaire
if not exist ".env" (
    echo Creation du fichier .env...
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

REM Lancer le serveur
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERREUR: Le serveur n'a pas pu demarrer!
    echo.
    pause
)








