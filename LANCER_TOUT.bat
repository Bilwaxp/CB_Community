@echo off
title CB_Community - Lancement Complet
color 0A
cls

echo.
echo ========================================
echo   CB_COMMUNITY - LANCEMENT COMPLET
echo ========================================
echo.

cd /d "%~dp0"

REM Tuer les processus Node.js existants
echo [1/6] Nettoyage des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Vérifier Node.js
echo [2/6] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas installe!
    pause
    exit /b 1
)
echo Node.js OK

REM Vérifier .env
echo [3/6] Verification du fichier .env...
if not exist ".env" (
    echo Creation du fichier .env...
    call TOUT_CONFIGURER.bat
)

REM Vérifier node_modules
echo [4/6] Verification des dependances...
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install --legacy-peer-deps
)

REM Vérifier la base de données
echo [5/6] Verification de la base de donnees...
if not exist "dev.db" (
    echo Creation de la base de donnees...
    call npx prisma generate
    call npx prisma db push --accept-data-loss
)

REM Lancer le serveur
echo [6/6] Lancement du serveur...
echo.
echo ========================================
echo   SERVEUR EN COURS DE DEMARRAGE...
echo ========================================
echo.
echo Le site sera disponible sur: http://localhost:3000
echo.
echo Ouverture du navigateur dans 3 secondes...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo Serveur en cours d'execution...
echo (Fermez cette fenetre pour arreter le serveur)
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo ERREUR: Le serveur n'a pas pu demarrer!
    echo.
    pause
)




