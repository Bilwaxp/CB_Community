@echo off
setlocal enabledelayedexpansion
title CB_Community - Lancer le Site
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   LANCEMENT DU SITE CB_COMMUNITY
echo ========================================
echo.
echo Ce script va:
echo   1. Verifier la configuration
echo   2. Compiler le projet (si necessaire)
echo   3. Demarrer le serveur
echo.
pause

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

REM Vérifier Node.js
where node >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe
    echo.
    echo Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ETAPE 1: ARRET PROCESSUS
echo ========================================
echo.

echo Arret des processus Node.js existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes

echo.
echo ========================================
echo   ETAPE 2: VERIFICATION CONFIGURATION
echo ========================================
echo.

if not exist ".env" (
    echo [ATTENTION] Fichier .env manquant, creation...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
    ) > .env
    echo [OK] Fichier .env cree
) else (
    echo [OK] Fichier .env existe
)

if not exist "node_modules" (
    echo [ERREUR] node_modules manquant
    echo Installation des dependances...
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de l'installation
        pause
        exit /b 1
    )
    echo [OK] Dependances installees
) else (
    echo [OK] node_modules existe
)

if not exist "prisma\dev.db" (
    echo [ATTENTION] Base de donnees non trouvee
    echo Creation de la base de donnees...
    if exist "node_modules\.prisma" (
        call npx prisma db push --accept-data-loss >nul 2>&1
    ) else (
        call npx prisma generate >nul 2>&1
        call npx prisma db push --accept-data-loss >nul 2>&1
    )
    echo [OK] Base de donnees creee
) else (
    echo [OK] Base de donnees existe
)

echo.
echo ========================================
echo   ETAPE 3: COMPILATION
echo ========================================
echo.

if not exist ".next" (
    echo [ATTENTION] Build non trouve
    echo.
    echo Compilation du projet...
    echo (Cela peut prendre 2-5 minutes)
    echo.
    call npm run build
    if !ERRORLEVEL! NEQ 0 (
        echo.
        echo [ERREUR] Echec de la compilation
        echo.
        echo Pour plus d'aide:
        echo   - Executez: DIAGNOSTIC_ERREUR.bat
        echo   - Ou: RESOUDRE_CONNEXION.bat
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
echo   ETAPE 4: DEMARRAGE SERVEUR
echo ========================================
echo.
echo Le serveur va demarrer maintenant...
echo.
echo IMPORTANT:
echo   - URL: http://localhost:3000
echo   - Ne fermez PAS cette fenetre
echo   - Appuyez sur Ctrl+C pour arreter
echo.
echo Attendez que "Ready" apparaisse dans la console
echo avant d'ouvrir le navigateur.
echo.
echo ========================================
echo.

timeout /t 3 /nobreak >nul

REM Démarrer le serveur
call npm start
