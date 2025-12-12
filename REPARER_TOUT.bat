@echo off
title Reparation Complete
color 0A
cls

echo.
echo ========================================
echo   REPARATION COMPLETE DU SITE
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Arret des processus...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo [2/5] Nettoyage complet...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo [3/5] Reinstallation des dependances...
call npm install --legacy-peer-deps

echo [4/5] Generation Prisma...
call npx prisma generate

echo [5/5] Verification de la base de donnees...
if not exist "dev.db" (
    call npx prisma db push --accept-data-loss
)

echo.
echo ========================================
echo   REPARATION TERMINEE!
echo ========================================
echo.
echo Le site a ete repare. Relancez avec LANCER_MAINTENANT.bat
echo.
echo IMPORTANT: Si les boutons ne fonctionnent toujours pas:
echo 1. Ouvrez le navigateur (F12)
echo 2. Allez dans l'onglet Console
echo 3. Regardez les erreurs affichees
echo 4. Partagez ces erreurs pour que je puisse les corriger
echo.
pause




