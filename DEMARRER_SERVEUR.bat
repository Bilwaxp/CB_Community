@echo off
setlocal enabledelayedexpansion
title CB_Community - Demarrage Serveur
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DEMARRAGE DU SERVEUR
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

REM Vérifier Node.js
where node >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe
    echo.
    echo Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

REM Arrêter les processus existants
echo Arret des processus Node.js existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Vérifier que .env existe
if not exist ".env" (
    echo [ATTENTION] Fichier .env non trouve
    echo Creation d'un fichier .env de base...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
    ) > .env
    echo [OK] Fichier .env cree
    echo.
    echo IMPORTANT: Configurez NEXTAUTH_SECRET
    echo Executez: GENERER_SECRET.bat
    echo.
)

REM Vérifier que la base de données existe
if not exist "prisma\dev.db" (
    echo [ATTENTION] Base de donnees non trouvee
    echo Creation de la base de donnees...
    if exist "node_modules\.prisma" (
        call npx prisma db push --accept-data-loss >nul 2>&1
    ) else (
        call npx prisma generate >nul 2>&1
        call npx prisma db push --accept-data-loss >nul 2>&1
    )
)

REM Vérifier que le build existe
if not exist ".next" (
    echo [ATTENTION] Build non trouve
    echo Compilation du projet (cela peut prendre quelques minutes)...
    call npm run build
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de la compilation
        echo.
        echo Pour plus d'aide, executez: RESOUDRE_CONNEXION.bat
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   SERVEUR EN DEMARRAGE
echo ========================================
echo.
echo Le serveur va demarrer sur:
echo   http://localhost:3000
echo.
echo IMPORTANT:
echo   - Ne fermez PAS cette fenetre
echo   - Appuyez sur Ctrl+C pour arreter
echo   - Attendez que "Ready" apparaisse
echo.
echo ========================================
echo.

REM Démarrer le serveur
call npm start
