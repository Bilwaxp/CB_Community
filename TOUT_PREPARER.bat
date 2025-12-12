@echo off
title Preparation Complete pour Hebergement
color 0A
cls

echo.
echo ========================================
echo   PREPARATION COMPLETE POUR HEBERGEMENT
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas installe!
    pause
    exit /b 1
)
echo OK

echo.
echo [2/6] Configuration du fichier .env...
if not exist ".env" (
    echo Creation du fichier .env...
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
        echo NODE_ENV=production
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=cbcommunity7@gmail.com
        echo SMTP_PASSWORD=
        echo SMTP_FROM=cbcommunity7@gmail.com
    ) > .env
    echo Fichier .env cree.
) else (
    echo Fichier .env existe deja.
)

echo.
echo [3/6] Installation des dependances...
if not exist "node_modules" (
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERREUR lors de l'installation!
        pause
        exit /b 1
    )
) else (
    echo Dependances deja installees.
)

echo.
echo [4/6] Generation Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)

echo.
echo [5/6] Creation de la base de donnees...
if not exist "dev.db" (
    call npx prisma db push --accept-data-loss
    if errorlevel 1 (
        echo ERREUR lors de la creation de la base!
        pause
        exit /b 1
    )
) else (
    echo Base de donnees existe deja.
)

echo.
echo [6/6] Nettoyage...
if exist ".next" rmdir /s /q ".next" >nul 2>&1

echo.
echo ========================================
echo   PREPARATION TERMINEE!
echo ========================================
echo.
echo PROCHAINES ETAPES:
echo.
echo 1. Executez TROUVER_IP.bat pour trouver votre IP
echo 2. Modifiez NEXTAUTH_URL dans .env avec votre IP
echo 3. Executez CONFIGURER_FIREWALL.bat (en admin)
echo 4. Executez DEMARRER_SERVEUR.bat pour lancer le site
echo.
echo Voir GUIDE_HEBERGEMENT.md pour plus de details.
echo.
pause




