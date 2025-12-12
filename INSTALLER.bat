@echo off
title Installation des dependances
color 0E
cd /d "%~dp0"

echo.
echo ========================================
echo   INSTALLATION DES DEPENDANCES
echo ========================================
echo.
echo Resolution du conflit de dependances...
echo.

call npm install --legacy-peer-deps

if errorlevel 1 (
    echo.
    echo ERREUR lors de l'installation!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   INSTALLATION TERMINEE AVEC SUCCES!
echo ========================================
echo.
echo Vous pouvez maintenant lancer le serveur avec START_SERVER.bat
echo.
pause








