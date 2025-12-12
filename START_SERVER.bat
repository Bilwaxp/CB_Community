@echo off
title CB_Community - Serveur
color 0A
cd /d "%~dp0"

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo Installation des dependances en cours...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERREUR: Installation echouee
        pause
        exit /b 1
    )
)

REM Générer Prisma
call npx prisma generate >nul 2>&1

REM Lancer le serveur
echo.
echo ========================================
echo   SERVEUR EN COURS DE DEMARRAGE...
echo ========================================
echo.
echo Le site sera disponible sur: http://localhost:3000
echo.
echo Ouverture du navigateur...
timeout /t 2 /nobreak >nul
start http://localhost:3000
echo.

npm run dev

pause

