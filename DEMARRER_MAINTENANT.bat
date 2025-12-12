@echo off
setlocal enabledelayedexpansion
title CB_Community - Serveur
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DEMARRAGE DU SERVEUR CB_COMMUNITY
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
    echo [ERREUR] Node.js n'est pas installe ou non trouve dans PATH
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
    echo IMPORTANT: Configurez NEXTAUTH_SECRET dans .env
    echo Executez: GENERER_SECRET.bat
    echo.
    pause
)

REM Vérifier que la base de données existe
if not exist "prisma\dev.db" (
    echo [ATTENTION] Base de donnees non trouvee
    echo Creation de la base de donnees...
    if exist "node_modules\.prisma" (
        call npx prisma db push --accept-data-loss
    ) else (
        call npx prisma generate
        call npx prisma db push --accept-data-loss
    )
    echo.
)

REM Vérifier que le build existe
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
        echo Pour plus d'aide:
        echo   - Executez: LANCER_SITE.bat (compilation automatique)
        echo   - Ou: RESOUDRE_CONNEXION.bat (diagnostic complet)
        pause
        exit /b 1
    )
    echo.
    echo [OK] Compilation reussie
    echo.
)

echo ========================================
echo   DEMARRAGE DU SERVEUR
echo ========================================
echo.
echo Le serveur va demarrer sur:
echo   - Local: http://localhost:3000
echo   - Reseau: http://VOTRE_IP:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
echo ========================================
echo.

REM Démarrer le serveur
REM Vérifier si on est en mode standalone
if exist ".next\standalone\server.js" (
    echo [INFO] Mode standalone detecte
    node .next/standalone/server.js
) else (
    call npm start
)
