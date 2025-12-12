@echo off
title CB_Community - Demarrer Configuration Google
color 0B
cls

echo.
echo ========================================
echo   DEMARRAGE CONFIGURATION GOOGLE
echo ========================================
echo.
echo Ouverture de Google Cloud Console...
echo.
echo Le navigateur va s'ouvrir automatiquement.
echo.
timeout /t 3 /nobreak >nul

REM Ouvrir Google Cloud Console
start https://console.cloud.google.com/

echo.
echo ========================================
echo   INSTRUCTIONS
echo ========================================
echo.
echo 1. Google Cloud Console est maintenant ouvert
echo 2. Connectez-vous avec votre compte Google
echo 3. Suivez les instructions dans le guide
echo.
echo Pour voir le guide complet:
echo   - Ouvrez: GUIDE_GOOGLE_VISUEL.txt
echo   - Ou executez: CONFIGURER_GOOGLE_ETAPE_PAR_ETAPE.bat
echo.
echo ========================================
echo.
pause

REM Lancer le script de configuration
call CONFIGURER_GOOGLE_ETAPE_PAR_ETAPE.bat

