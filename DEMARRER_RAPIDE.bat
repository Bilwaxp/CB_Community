@echo off
setlocal
title CB_Community - Demarrage Rapide
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DEMARRAGE RAPIDE (MODE DEVELOPPEMENT)
echo ========================================
echo.
echo Ce mode est plus rapide car il ne compile
echo pas tout le projet, seulement les pages
echo necessaires.
echo.
echo ATTENTION: Mode developpement uniquement!
echo Pour la production, utilisez: DEMARRER_SIMPLE.bat
echo.

REM Chercher Node.js
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
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js non trouve
    pause
    exit /b 1
)

REM Arrêter les processus existants
echo Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Vérifier .env
if not exist ".env" (
    echo Creation du fichier .env...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
    ) > .env
)

REM Vérifier node_modules
if not exist "node_modules" (
    echo [ATTENTION] node_modules manquant
    echo Installation des dependances...
    call npm install
    if errorlevel 1 (
        echo [ERREUR] Echec de l'installation
        pause
        exit /b 1
    )
)

REM Vérifier Prisma
if not exist "node_modules\.prisma" (
    echo Generation Prisma...
    call npx prisma generate >nul 2>&1
)

REM Vérifier base de données
if not exist "prisma\dev.db" (
    echo Creation base de donnees...
    call npx prisma db push --accept-data-loss >nul 2>&1
)

echo.
echo ========================================
echo   DEMARRAGE EN MODE DEVELOPPEMENT
echo ========================================
echo.
echo Le serveur va demarrer en mode developpement.
echo C'est plus rapide mais moins optimise.
echo.
echo URL: http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter.
echo.
echo ========================================
echo.

REM Démarrer en mode développement (plus rapide)
call npm run dev

pause

