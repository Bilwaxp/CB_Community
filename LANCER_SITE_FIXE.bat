@echo off
setlocal enabledelayedexpansion
title CB_Community - Lancer le Site (Version Fixe)
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   LANCEMENT DU SITE CB_COMMUNITY
echo ========================================
echo.

REM Chercher Node.js dans les emplacements communs
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

REM Vérifier Node.js
where node >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    if defined NODE_PATH (
        echo [INFO] Node.js trouve dans: !NODE_PATH!
        echo [INFO] Ajout au PATH...
    ) else (
        echo [ERREUR] Node.js n'est pas installe
        echo.
        echo Installez Node.js depuis: https://nodejs.org/
        echo Redemarrez votre ordinateur apres installation.
        pause
        exit /b 1
    )
) else (
    for /f "tokens=*" %%i in ('node --version 2^>nul') do echo [OK] Node.js: %%i
)

echo.
echo ========================================
echo   ETAPE 1: ARRET PROCESSUS
echo ========================================
echo.

echo Arret des processus Node.js existants...
taskkill /F /IM node.exe >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo [OK] Processus arretes
    timeout /t 2 /nobreak >nul
) else (
    echo [OK] Aucun processus a arreter
)

echo.
echo ========================================
echo   ETAPE 2: VERIFICATION FICHIERS
echo ========================================
echo.

if not exist "package.json" (
    echo [ERREUR] package.json manquant!
    echo Vous n'etes pas dans le bon dossier.
    pause
    exit /b 1
) else (
    echo [OK] package.json trouve
)

if not exist ".env" (
    echo [ATTENTION] .env manquant, creation...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
    ) > .env
    echo [OK] .env cree
) else (
    echo [OK] .env existe
)

echo.
echo ========================================
echo   ETAPE 3: INSTALLATION DEPENDANCES
echo ========================================
echo.

if not exist "node_modules" (
    echo [ATTENTION] node_modules manquant
    echo Installation des dependances (cela peut prendre quelques minutes)...
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo.
        echo [ERREUR] Echec de l'installation des dependances
        echo.
        echo Verifiez votre connexion internet et reessayez.
        pause
        exit /b 1
    )
    echo [OK] Dependances installees
) else (
    echo [OK] node_modules existe
)

echo.
echo ========================================
echo   ETAPE 4: BASE DE DONNEES
echo ========================================
echo.

if not exist "prisma" mkdir prisma

if not exist "node_modules\.prisma" (
    echo Generation du client Prisma...
    call npx prisma generate
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de la generation Prisma
        pause
        exit /b 1
    )
    echo [OK] Prisma Client genere
) else (
    echo [OK] Prisma Client existe
)

if not exist "prisma\dev.db" (
    echo Creation de la base de donnees...
    call npx prisma db push --accept-data-loss
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de la creation de la base
        pause
        exit /b 1
    )
    echo [OK] Base de donnees creee
) else (
    echo [OK] Base de donnees existe
)

echo.
echo ========================================
echo   ETAPE 5: COMPILATION
echo ========================================
echo.

if not exist ".next" (
    echo [ATTENTION] Build non trouve
    echo.
    echo Compilation du projet...
    echo (Cela peut prendre 2-5 minutes, veuillez patienter)
    echo.
    call npm run build
    if !ERRORLEVEL! NEQ 0 (
        echo.
        echo [ERREUR] Echec de la compilation
        echo.
        echo Les erreurs sont affichees ci-dessus.
        echo.
        echo Pour plus d'aide:
        echo   - Executez: DIAGNOSTIC_COMPLET.bat
        echo   - Ou: DIAGNOSTIC_ERREUR.bat
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Compilation reussie
) else (
    echo [OK] Build existe
)

echo.
echo ========================================
echo   ETAPE 6: DEMARRAGE SERVEUR
echo ========================================
echo.
echo Le serveur va demarrer maintenant...
echo.
echo IMPORTANT:
echo   - URL: http://localhost:3000
echo   - Ne fermez PAS cette fenetre
echo   - Appuyez sur Ctrl+C pour arreter
echo.
echo Attendez que "Ready" ou "started server" apparaisse
echo avant d'ouvrir le navigateur.
echo.
echo ========================================
echo.

timeout /t 3 /nobreak >nul

REM Démarrer le serveur
echo Demarrage du serveur...
call npm start

if !ERRORLEVEL! NEQ 0 (
    echo.
    echo [ERREUR] Le serveur n'a pas pu demarrer
    echo.
    echo Verifiez les erreurs ci-dessus.
    echo.
    echo Pour plus d'aide:
    echo   - Executez: DIAGNOSTIC_COMPLET.bat
    echo   - Ou: RESOUDRE_CONNEXION.bat
    echo.
    pause
)

