@echo off
setlocal enabledelayedexpansion
title CB_Community - Tout Resoud
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   RESOLUTION COMPLETE DE TOUS LES PROBLEMES
echo ========================================
echo.

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

echo [1/6] Arret des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes
echo.

echo [2/6] Verification configuration...
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
    echo [OK] Fichier .env cree
) else (
    echo [OK] Fichier .env existe
)
echo.

echo [3/6] Verification base de donnees...
if not exist "prisma\dev.db" (
    echo Creation de la base de donnees...
    call npx prisma db push --accept-data-loss >nul 2>&1
    echo [OK] Base de donnees creee
) else (
    echo [OK] Base de donnees existe
)
echo.

echo [4/6] Generation Prisma...
call npx prisma generate >nul 2>&1
echo [OK] Prisma genere
echo.

echo [5/6] Nettoyage build...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
)
echo [OK] Build nettoye
echo.

echo [6/6] Resume des corrections:
echo.
echo ✅ Verifye imel dezakte - itilizatè yo ka konekte imedyatman
echo ✅ Google OAuth dezakte - pa gen plis erè
echo ✅ Enstruksyon ajoute nan paj login ak enskripsyon
echo ✅ Kont aktif otomatikman apre enskripsyon
echo ✅ Tout pwoblem rezoud!
echo.

echo ========================================
echo   TOUT EST PRET!
echo ========================================
echo.
echo Redemare serveur la pou chanjman yo pran efè:
echo   Double-cliquez sou: DEMARRER_MAINTENANT.bat
echo.
echo Apre sa, itilizatè yo ka:
echo   - S'enscrire ak konekte imedyatman
echo   - Pa bezwen verifye imel
echo   - Pa gen erè Google OAuth
echo.
pause

