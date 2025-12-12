@echo off
setlocal
title CB_Community - Demarrage Simple
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DEMARRAGE DU SERVEUR
echo ========================================
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

REM Tester Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js non trouve
    echo.
    echo Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js trouve
echo.

REM Arrêter les processus existants
echo Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

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
    call npx prisma generate
)

REM Vérifier base de données
if not exist "prisma\dev.db" (
    echo Creation base de donnees...
    call npx prisma db push --accept-data-loss
)

REM Vérifier build
if not exist ".next" (
    echo.
    echo Compilation du projet...
    echo (Cela peut prendre quelques minutes)
    echo.
    call npm run build
    if errorlevel 1 (
        echo.
        echo [ERREUR] Echec de la compilation
        echo Verifiez les erreurs ci-dessus.
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   DEMARRAGE DU SERVEUR
echo ========================================
echo.
echo Le serveur va demarrer sur:
echo   http://localhost:3000
echo.
echo Ne fermez PAS cette fenetre!
echo Appuyez sur Ctrl+C pour arreter.
echo.
echo ========================================
echo.

REM Démarrer le serveur
REM Vérifier si on est en mode standalone
if exist ".next\standalone\server.js" (
    echo [INFO] Mode standalone detecte
    echo Demarrage avec node .next/standalone/server.js
    echo.
    node .next/standalone/server.js
) else (
    echo [INFO] Mode normal
    echo Demarrage avec npm start
    echo.
    call npm start
)

pause

