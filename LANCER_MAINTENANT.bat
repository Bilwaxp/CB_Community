@echo off
title CB_Community - Lancement
color 0A
cd /d "%~dp0"

echo.
echo ========================================
echo   LANCEMENT DU SERVEUR
echo ========================================
echo.

REM Tuer tous les processus Node.js
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

REM Nettoyer
if exist ".next" rmdir /s /q ".next" >nul 2>&1

REM Generer Prisma
call npx prisma generate >nul 2>&1

REM Lancer le serveur
echo Le site sera disponible sur: http://localhost:3000
echo.
echo Ouverture du navigateur dans 3 secondes...
timeout /t 3 >nul
start http://localhost:3000

echo.
echo Serveur en cours de demarrage...
echo (Ne fermez pas cette fenetre)
echo.

npm run dev




