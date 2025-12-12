@echo off
title Reparation et Lancement
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   REPARATION ET LANCEMENT
echo ========================================
echo.

REM Arreter les processus
echo [1/6] Arret des processus...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

REM Nettoyer
echo [2/6] Nettoyage...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

REM Verifier .env
echo [3/6] Verification .env...
if not exist ".env" (
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

REM Reinstaller dependances
echo [4/6] Reinstallation des dependances...
call npm install --legacy-peer-deps

REM Generer Prisma
echo [5/6] Generation Prisma...
call npx prisma generate

REM Creer DB
echo [6/6] Verification base de donnees...
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
echo Ouverture du navigateur dans 3 secondes...
timeout /t 3 >nul
start http://localhost:3000

echo.
echo Serveur en cours de demarrage...
echo (Ne fermez pas cette fenetre)
echo.

npm run dev




