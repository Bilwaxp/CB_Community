@echo off
setlocal enabledelayedexpansion
title CB_Community - Hébergement Final
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CB_COMMUNITY - HEBERGEMENT FINAL
echo ========================================
echo.

REM ============================================
REM ETAPE 1: Vérification des prérequis
REM ============================================
echo [ETAPE 1/7] Verification des pre-requis...
echo.

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas installe!
    echo Telechargez-le sur: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js installe
node --version

REM Vérifier npm
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: npm n'est pas installe!
    pause
    exit /b 1
)
echo [OK] npm installe
npm --version

echo.

REM ============================================
REM ETAPE 2: Arrêt des processus existants
REM ============================================
echo [ETAPE 2/7] Arret des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes
echo.

REM ============================================
REM ETAPE 3: Configuration du fichier .env
REM ============================================
echo [ETAPE 3/7] Configuration du fichier .env...
if not exist ".env" (
    echo Creation du fichier .env...
    (
        echo # Base de donnees SQLite
        echo DATABASE_URL=file:./prisma/dev.db
        echo.
        echo # NextAuth Configuration
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=cb-community-secret-key-changez-en-production
        echo.
        echo # Google OAuth ^(Optionnel^)
        echo GOOGLE_CLIENT_ID=
        echo GOOGLE_CLIENT_SECRET=
        echo.
        echo # Stripe Configuration ^(Optionnel^)
        echo STRIPE_SECRET_KEY=
        echo STRIPE_PUBLISHABLE_KEY=
        echo STRIPE_WEBHOOK_SECRET=
        echo STRIPE_PRO_PRICE_ID=
        echo STRIPE_VIP_PRICE_ID=
        echo.
        echo # Configuration Email SMTP
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=cbcommunity7@gmail.com
        echo SMTP_PASSWORD=
        echo SMTP_FROM=cbcommunity7@gmail.com
        echo.
        echo # Environnement
        echo NODE_ENV=production
    ) > .env
    echo [OK] Fichier .env cree
    echo.
    echo ATTENTION: Configurez les variables dans .env avant de continuer!
    echo Notamment:
    echo   - NEXTAUTH_SECRET: Generez une cle aleatoire
    echo   - SMTP_PASSWORD: Mot de passe d'application Gmail
    echo   - NEXTAUTH_URL: Votre IP ou domaine pour l'hebergement
    echo.
    pause
) else (
    echo [OK] Fichier .env existe deja
)
echo.

REM ============================================
REM ETAPE 4: Installation des dépendances
REM ============================================
echo [ETAPE 4/7] Installation des dependances...
if not exist "node_modules" (
    echo Installation en cours ^(cela peut prendre plusieurs minutes^)...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERREUR lors de l'installation des dependances!
        pause
        exit /b 1
    )
    echo [OK] Dependances installees
) else (
    echo [OK] Dependances deja installees
)
echo.

REM ============================================
REM ETAPE 5: Configuration Prisma et Base de données
REM ============================================
echo [ETAPE 5/7] Configuration Prisma et base de donnees...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)
echo [OK] Client Prisma genere

REM Vérifier si la base de données existe
if not exist "prisma\dev.db" (
    echo Creation de la base de donnees...
    call npx prisma db push --accept-data-loss
    if errorlevel 1 (
        echo ERREUR lors de la creation de la base de donnees!
        pause
        exit /b 1
    )
    echo [OK] Base de donnees creee
) else (
    echo [OK] Base de donnees existe deja
)
echo.

REM ============================================
REM ETAPE 6: Nettoyage et Build de production
REM ============================================
echo [ETAPE 6/7] Nettoyage et build de production...
if exist ".next" (
    echo Suppression de l'ancien build...
    rmdir /s /q ".next" >nul 2>&1
)

echo Build de production en cours ^(cela peut prendre plusieurs minutes^)...
call npm run build
if errorlevel 1 (
    echo ERREUR lors du build!
    echo.
    echo Verifiez les erreurs ci-dessus et corrigez-les.
    pause
    exit /b 1
)
echo [OK] Build de production termine
echo.

REM ============================================
REM ETAPE 7: Trouver l'IP et afficher les informations
REM ============================================
echo [ETAPE 7/7] Preparation du demarrage...
echo.

REM Trouver l'IP locale
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set LOCAL_IP=%%a
    set LOCAL_IP=!LOCAL_IP:~1!
    goto :found_ip
)
:found_ip

echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Le serveur est pret a etre demarre.
echo.
echo Informations importantes:
echo   - Base de donnees: prisma\dev.db
echo   - Port: 3000
echo   - Mode: Production
echo.
if defined LOCAL_IP (
    echo Votre IP locale: %LOCAL_IP%
    echo.
    echo Le site sera accessible sur:
    echo   - Local: http://localhost:3000
    echo   - Reseau: http://%LOCAL_IP%:3000
    echo.
    echo IMPORTANT: Pour l'acces depuis Internet:
    echo   1. Configurez le firewall ^(CONFIGURER_FIREWALL.bat^)
    echo   2. Configurez le port forwarding sur votre routeur
    echo   3. Changez NEXTAUTH_URL dans .env avec votre IP publique
    echo.
) else (
    echo Executez TROUVER_IP.bat pour trouver votre IP
    echo.
)
echo ========================================
echo.
echo Appuyez sur une touche pour demarrer le serveur...
pause >nul

REM ============================================
REM DÉMARRAGE DU SERVEUR
REM ============================================
cls
echo.
echo ========================================
echo   SERVEUR EN COURS D'EXECUTION
echo ========================================
echo.
echo Le site est maintenant accessible!
echo.
if defined LOCAL_IP (
    echo   - Local: http://localhost:3000
    echo   - Reseau: http://%LOCAL_IP%:3000
) else (
    echo   - Local: http://localhost:3000
)
echo.
echo (Fermez cette fenetre pour arreter le serveur)
echo.
echo ========================================
echo.

call npm start

