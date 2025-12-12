@echo off
title CB_Community - Lancement Complet
color 0A
cls

cd /d "%~dp0"

REM Arreter les processus
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 >nul

REM Nettoyer
if exist ".next" rmdir /s /q ".next" >nul 2>&1

REM Configurer .env
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

REM Installer dependances
if not exist "node_modules" (
    call npm install --legacy-peer-deps >nul 2>&1
)

REM Generer Prisma
call npx prisma generate >nul 2>&1

REM Creer DB
if not exist "dev.db" (
    call npx prisma db push --accept-data-loss >nul 2>&1
)

REM Lancer le serveur
echo.
echo ========================================
echo   LANCEMENT DU SERVEUR...
echo ========================================
echo.
echo Le site sera disponible sur: http://localhost:3000
echo.
timeout /t 2 >nul
start http://localhost:3000

npm run dev




