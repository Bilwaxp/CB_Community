@echo off
title Correction des erreurs
color 0E
cls

echo.
echo ========================================
echo   CORRECTION DES ERREURS
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Arret des processus...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo [2/4] Nettoyage complet...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo [3/4] Reinstallation des dependances...
call npm install --legacy-peer-deps

echo [4/4] Generation Prisma...
call npx prisma generate

echo.
echo ========================================
echo   CORRECTION TERMINEE
echo ========================================
echo.
echo Relancez le serveur avec LANCER_MAINTENANT.bat
echo.
pause




