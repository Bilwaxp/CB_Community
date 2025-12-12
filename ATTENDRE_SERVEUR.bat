@echo off
title Attente du serveur
color 0A

echo.
echo ========================================
echo   VERIFICATION DU DEMARRAGE
echo ========================================
echo.

echo Attente de 10 secondes pour que le serveur demarre...
timeout /t 10 /nobreak

echo.
echo Verification du port 3000...
netstat -an | findstr ":3000" >nul
if errorlevel 1 (
    echo   [ATTENTION] Le serveur ne semble pas avoir demarre sur le port 3000
    echo   Verifiez la fenetre du serveur pour les erreurs.
) else (
    echo   [OK] Le serveur ecoute sur le port 3000
)

echo.
echo Ouverture du navigateur...
start http://localhost:3000

echo.
echo Si la page ne s'ouvre pas automatiquement:
echo 1. Ouvrez votre navigateur
echo 2. Allez sur: http://localhost:3000
echo.
pause




