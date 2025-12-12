@echo off
title CB_Community - Serveur
color 0A
cd /d "%~dp0"

echo.
echo ========================================
echo   DEMARRAGE DU SERVEUR CB_COMMUNITY
echo ========================================
echo.

REM Arreter les anciens processus
echo [1/5] Arret des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Nettoyer
echo [2/5] Nettoyage...
if exist ".next" (
    echo Suppression du build...
    rmdir /s /q ".next"
)

REM Verifier .env
echo [3/5] Verification du fichier .env...
if not exist ".env" (
    echo Creation du fichier .env...
    (
        echo DATABASE_URL=file:./dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=cb-community-secret-key-2024
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

REM Verifier node_modules
echo [4/5] Verification des dependances...
if not exist "node_modules" (
    echo Installation des dependances (cela peut prendre du temps)...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERREUR lors de l'installation!
        pause
        exit /b 1
    )
)

REM Generer Prisma et creer DB
echo [5/5] Configuration de la base de donnees...
call npx prisma generate
if not exist "dev.db" (
    call npx prisma db push --accept-data-loss
)

echo.
echo ========================================
echo   LANCEMENT DU SERVEUR...
echo ========================================
echo.
echo Le site sera disponible sur: http://localhost:3000
echo.
echo Ouverture du navigateur dans 5 secondes...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo Serveur en cours de demarrage...
echo (Ne fermez pas cette fenetre)
echo.

npm run dev

if errorlevel 1 (
    echo.
    echo ERREUR: Le serveur n'a pas pu demarrer!
    echo Verifiez les messages d'erreur ci-dessus.
    echo.
    pause
)
