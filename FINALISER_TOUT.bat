@echo off
setlocal enabledelayedexpansion
title CB_Community - Finalisation Complete
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   FINALISATION COMPLETE DU SITE
echo ========================================
echo.
echo Ce script va verifier et finaliser tout
echo pour que le site fonctionne parfaitement.
echo.
pause

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
    set NODE_PATH=C:\Program Files\nodejs
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
    set NODE_PATH=C:\Program Files (x86)\nodejs
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
    set NODE_PATH=%LOCALAPPDATA%\Programs\nodejs
)

echo.
echo ========================================
echo   ETAPE 1: VERIFICATION PREREQUIS
echo ========================================
echo.

REM Vérifier Node.js
where node >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe ou non trouve dans PATH
    echo.
    echo Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js trouve: !NODE_VERSION!
)

REM Vérifier npm
where npm >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERREUR] npm n'est pas installe
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [OK] npm trouve: !NPM_VERSION!
)

echo.
echo ========================================
echo   ETAPE 2: VERIFICATION FICHIERS
echo ========================================
echo.

if not exist "package.json" (
    echo [ERREUR] package.json non trouve!
    pause
    exit /b 1
) else (
    echo [OK] package.json trouve
)

if not exist "next.config.mjs" (
    echo [ERREUR] next.config.mjs non trouve!
    pause
    exit /b 1
) else (
    echo [OK] next.config.mjs trouve
)

if not exist "prisma\schema.prisma" (
    echo [ERREUR] schema.prisma non trouve!
    pause
    exit /b 1
) else (
    echo [OK] schema.prisma trouve
)

if not exist "tsconfig.json" (
    echo [ERREUR] tsconfig.json non trouve!
    pause
    exit /b 1
) else (
    echo [OK] tsconfig.json trouve
)

echo.
echo ========================================
echo   ETAPE 3: CONFIGURATION .ENV
echo ========================================
echo.

if not exist ".env" (
    echo [ATTENTION] Fichier .env non trouve, creation...
    (
        echo # Database
        echo DATABASE_URL=file:./prisma/dev.db
        echo.
        echo # NextAuth
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
        echo.
        echo # Google OAuth (optionnel)
        echo # GOOGLE_CLIENT_ID=
        echo # GOOGLE_CLIENT_SECRET=
        echo.
        echo # Stripe (optionnel)
        echo # STRIPE_SECRET_KEY=
        echo # NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
        echo.
        echo # SMTP Email (optionnel)
        echo # SMTP_HOST=
        echo # SMTP_PORT=
        echo # SMTP_USER=
        echo # SMTP_PASS=
    ) > .env
    echo [OK] Fichier .env cree
) else (
    echo [OK] Fichier .env existe
)

REM Vérifier DATABASE_URL
findstr /C:"DATABASE_URL=" .env >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ATTENTION] DATABASE_URL manquant, ajout...
    (
        for /f "delims=" %%a in (.env) do echo %%a
        echo DATABASE_URL=file:./prisma/dev.db
    ) > .env.tmp
    move /y .env.tmp .env >nul 2>&1
    echo [OK] DATABASE_URL ajoute
) else (
    echo [OK] DATABASE_URL configure
)

REM Vérifier NEXTAUTH_SECRET
findstr /C:"NEXTAUTH_SECRET=" .env | findstr /V "^#" | findstr /V "^$" | findstr "NEXTAUTH_SECRET=$" >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo [ATTENTION] NEXTAUTH_SECRET vide, generation...
    call GENERER_SECRET.bat
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Impossible de generer NEXTAUTH_SECRET
    )
) else (
    echo [OK] NEXTAUTH_SECRET configure
)

REM Vérifier NEXTAUTH_URL
findstr /C:"NEXTAUTH_URL=" .env >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ATTENTION] NEXTAUTH_URL manquant, ajout...
    (
        for /f "delims=" %%a in (.env) do echo %%a
        echo NEXTAUTH_URL=http://localhost:3000
    ) > .env.tmp
    move /y .env.tmp .env >nul 2>&1
    echo [OK] NEXTAUTH_URL ajoute
) else (
    echo [OK] NEXTAUTH_URL configure
)

echo.
echo ========================================
echo   ETAPE 4: INSTALLATION DEPENDANCES
echo ========================================
echo.

if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de l'installation des dependances
        pause
        exit /b 1
    )
    echo [OK] Dependances installees
) else (
    echo [OK] node_modules existe
    echo Verification des dependances...
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo [ATTENTION] Probleme avec les dependances
    ) else (
        echo [OK] Dependances a jour
    )
)

echo.
echo ========================================
echo   ETAPE 5: BASE DE DONNEES
echo ========================================
echo.

REM Créer le dossier prisma s'il n'existe pas
if not exist "prisma" mkdir prisma

REM Générer Prisma Client
echo Generation du client Prisma...
call npx prisma generate
if !ERRORLEVEL! NEQ 0 (
    echo [ERREUR] Echec de la generation Prisma
    pause
    exit /b 1
)
echo [OK] Client Prisma genere

REM Pousser le schéma vers la base de données
echo Synchronisation de la base de donnees...
call npx prisma db push --accept-data-loss
if !ERRORLEVEL! NEQ 0 (
    echo [ATTENTION] Probleme avec la synchronisation de la base de donnees
    echo Tentative de reparation...
    if exist "prisma\dev.db" (
        del /f /q "prisma\dev.db" >nul 2>&1
    )
    call npx prisma db push --accept-data-loss
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Impossible de synchroniser la base de donnees
        pause
        exit /b 1
    )
)
echo [OK] Base de donnees synchronisee

REM Vérifier que la base de données existe
if exist "prisma\dev.db" (
    echo [OK] Base de donnees trouvee
) else (
    echo [ATTENTION] Base de donnees non trouvee, creation...
    call npx prisma db push --accept-data-loss
    if exist "prisma\dev.db" (
        echo [OK] Base de donnees creee
    ) else (
        echo [ERREUR] Impossible de creer la base de donnees
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   ETAPE 6: NETTOYAGE
echo ========================================
echo.

REM Arrêter les processus Node.js existants
echo Arret des processus Node.js existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Nettoyer les dossiers de build
if exist ".next" (
    echo Nettoyage du dossier .next...
    rmdir /s /q ".next" >nul 2>&1
    echo [OK] Dossier .next supprime
)

if exist "node_modules\.cache" (
    echo Nettoyage du cache...
    rmdir /s /q "node_modules\.cache" >nul 2>&1
    echo [OK] Cache supprime
)

echo.
echo ========================================
echo   ETAPE 7: COMPILATION
echo ========================================
echo.

echo Compilation du projet...
call npm run build
if !ERRORLEVEL! NEQ 0 (
    echo [ERREUR] Echec de la compilation
    echo.
    echo Vérifiez les erreurs ci-dessus et corrigez-les.
    pause
    exit /b 1
)
echo [OK] Compilation reussie

echo.
echo ========================================
echo   ETAPE 8: VERIFICATION FINALE
echo ========================================
echo.

REM Vérifier que le build a réussi
if exist ".next" (
    echo [OK] Dossier .next cree
) else (
    echo [ERREUR] Dossier .next non trouve apres compilation
    pause
    exit /b 1
)

REM Vérifier les fichiers essentiels
if exist ".next\standalone" (
    echo [OK] Build standalone reussi
) else (
    echo [ATTENTION] Build standalone non trouve (normal si pas en mode standalone)
)

echo.
echo ========================================
echo   FINALISATION TERMINEE!
echo ========================================
echo.
echo [SUCCES] Le site est pret a etre demarre!
echo.
echo ========================================
echo   PROCHAINES ETAPES
echo ========================================
echo.
echo 1. Pour demarrer le serveur:
echo    - Double-cliquez sur: DEMARRER_MAINTENANT.bat
echo    - Ou executez: npm start
echo.
echo 2. Acceder au site:
echo    - Local: http://localhost:3000
echo    - Reseau: http://VOTRE_IP:3000
echo.
echo 3. Configuration optionnelle:
echo    - Google OAuth: GOOGLE_MAINTENANT.bat
echo    - Email SMTP: RESOUDRE_EMAIL.bat
echo    - Creer admin: CREER_ADMIN.bat
echo.
echo 4. Scripts utiles:
echo    - VERIFIER_GOOGLE.bat - Verifier Google OAuth
echo    - DIAGNOSTIC_ERREUR.bat - Diagnostiquer les erreurs
echo    - OUVRIR_BD.bat - Ouvrir Prisma Studio
echo.
echo ========================================
echo.
pause

