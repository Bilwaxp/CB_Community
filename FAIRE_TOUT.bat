@echo off
title CB_Community - Configuration Complete Automatique
color 0A
cls

echo.
echo ========================================
echo   CONFIGURATION COMPLETE AUTOMATIQUE
echo ========================================
echo.

cd /d "%~dp0"

REM Arreter les processus existants
echo [1/8] Nettoyage des processus...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Nettoyer le build
echo [2/8] Nettoyage du build...
if exist ".next" rmdir /s /q ".next" >nul 2>&1

REM Configuration .env
echo [3/8] Configuration du fichier .env...
(
    echo DATABASE_URL=file:./dev.db
    echo NEXTAUTH_URL=http://localhost:3000
    echo NEXTAUTH_SECRET=cb-community-secret-key-change-in-production-2024
    echo GOOGLE_CLIENT_ID=
    echo GOOGLE_CLIENT_SECRET=
    echo STRIPE_SECRET_KEY=
    echo STRIPE_PUBLISHABLE_KEY=
    echo STRIPE_WEBHOOK_SECRET=
    echo STRIPE_PRO_PRICE_ID=
    echo STRIPE_VIP_PRICE_ID=
    echo NODE_ENV=production
    echo SMTP_HOST=smtp.gmail.com
    echo SMTP_PORT=587
    echo SMTP_USER=cbcommunity7@gmail.com
    echo SMTP_PASSWORD=
    echo SMTP_FROM=cbcommunity7@gmail.com
) > .env
echo Fichier .env configure.

REM Installation dependances
echo [4/8] Installation des dependances...
if not exist "node_modules" (
    call npm install --legacy-peer-deps >nul 2>&1
    if errorlevel 1 (
        echo ERREUR lors de l'installation!
        pause
        exit /b 1
    )
) else (
    echo Dependances deja installees.
)

REM Generation Prisma
echo [5/8] Generation du client Prisma...
call npx prisma generate >nul 2>&1
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)

REM Creation base de donnees
echo [6/8] Creation de la base de donnees...
if not exist "dev.db" (
    call npx prisma db push --accept-data-loss >nul 2>&1
    if errorlevel 1 (
        echo ERREUR lors de la creation de la base!
        pause
        exit /b 1
    )
) else (
    echo Base de donnees existe deja.
)

REM Trouver l'IP
echo [7/8] Recherche de l'adresse IP...
echo.
echo ========================================
echo   VOTRE ADRESSE IP:
echo ========================================
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    set IP=!IP:~1!
    echo   !IP!
    echo.
    echo   Modifiez NEXTAUTH_URL dans .env avec cette IP
    echo   Exemple: NEXTAUTH_URL=http://!IP!:3000
    echo.
)
echo ========================================
echo.

REM Configuration firewall (tentative)
echo [8/8] Configuration du firewall...
echo.
echo ATTENTION: Configuration du firewall necessite les droits administrateur.
echo.
echo Pour ouvrir le port 3000 manuellement:
echo 1. Clic droit sur CONFIGURER_FIREWALL.bat
echo 2. Executer en tant qu'administrateur
echo.
echo OU executez cette commande en admin:
echo netsh advfirewall firewall add rule name="CB_Community HTTP" dir=in action=allow protocol=TCP localport=3000
echo.

REM Demander si on veut lancer le serveur
echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Voulez-vous lancer le serveur maintenant? (O/N)
set /p LANCER="> "

if /i "%LANCER%"=="O" (
    echo.
    echo Lancement du serveur de production...
    echo.
    call npm run build
    if errorlevel 1 (
        echo ERREUR lors du build!
        pause
        exit /b 1
    )
    echo.
    echo Serveur en cours de demarrage...
    echo Le site sera accessible sur http://localhost:3000
    echo.
    call npm start
) else (
    echo.
    echo Pour lancer le serveur plus tard, executez: DEMARRER_SERVEUR.bat
    echo.
    pause
)




