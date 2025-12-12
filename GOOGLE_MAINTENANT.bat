@echo off
title CB_Community - Configuration Google OAuth
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH
echo ========================================
echo.
echo Ce script va vous guider pour configurer Google OAuth.
echo.
echo IMPORTANT: Vous devez d'abord obtenir:
echo   - Client ID
echo   - Client Secret
echo.
echo Depuis: https://console.cloud.google.com/
echo.
echo Voulez-vous:
echo   1. Voir les instructions (ouvre le guide)
echo   2. Configurer maintenant (si vous avez deja les identifiants)
echo   3. Verifier la configuration actuelle
echo.
set /p choix="Votre choix (1/2/3): "

if "!choix!"=="1" (
    start notepad INSTRUCTIONS_GOOGLE_SIMPLE.txt
    start https://console.cloud.google.com/
    echo.
    echo Guide ouvert! Suivez les instructions.
    pause
    exit /b 0
)

if "!choix!"=="2" (
    call CONFIGURER_GOOGLE_RAPIDE.bat
    exit /b 0
)

if "!choix!"=="3" (
    call VERIFIER_GOOGLE.bat
    exit /b 0
)

echo.
echo Choix invalide!
pause

