@echo off
setlocal enabledelayedexpansion
title CB_Community - Resoudre Erreur Google
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   RESOLUTION ERREUR GOOGLE OAUTH
echo ========================================
echo.
echo Si vous voyez "Une erreur est survenue"
echo lors du clic sur "Continuer avec Google",
echo cela signifie que Google OAuth n'est pas
echo configure.
echo.
pause

if not exist ".env" (
    echo [ERREUR] Fichier .env non trouve
    pause
    exit /b 1
)

echo.
echo ========================================
echo   VERIFICATION CONFIGURATION
echo ========================================
echo.

set HAS_CLIENT_ID=0
set HAS_CLIENT_SECRET=0

for /f "delims=" %%a in (.env) do (
    set "line=%%a"
    echo !line! | findstr /C:"GOOGLE_CLIENT_ID=" | findstr /V "^#" | findstr /V "^$" | findstr /V "GOOGLE_CLIENT_ID=$" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        set HAS_CLIENT_ID=1
    )
    echo !line! | findstr /C:"GOOGLE_CLIENT_SECRET=" | findstr /V "^#" | findstr /V "^$" | findstr /V "GOOGLE_CLIENT_SECRET=$" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        set HAS_CLIENT_SECRET=1
    )
)

if !HAS_CLIENT_ID! EQU 1 if !HAS_CLIENT_SECRET! EQU 1 (
    echo [OK] Google OAuth est configure dans .env
    echo.
    echo Si vous avez toujours des erreurs:
    echo   1. Verifiez que les identifiants sont corrects
    echo   2. Verifiez les URLs de redirection dans Google Console
    echo   3. REDEMARREZ le serveur (important!)
    echo.
    echo Pour redemarrer:
    echo   - Fermez la fenetre du serveur (Ctrl+C)
    echo   - Executez: DEMARRER_SIMPLE.bat
    echo.
    pause
    exit /b 0
) else (
    echo [ERREUR] Google OAuth n'est PAS configure
    echo.
    echo ========================================
    echo   CONFIGURATION NECESSAIRE
    echo ========================================
    echo.
    echo Pour utiliser Google OAuth, vous devez:
    echo   1. Creer un projet sur Google Cloud Console
    echo   2. Activer Google Identity Services API
    echo   3. Creer un OAuth 2.0 Client ID
    echo   4. Configurer les URLs de redirection
    echo   5. Copier Client ID et Secret
    echo   6. Les ajouter dans .env
    echo.
    echo ========================================
    echo   SOLUTION RAPIDE
    echo ========================================
    echo.
    echo Voulez-vous configurer Google OAuth maintenant? (O/N)
    set /p configurer="Votre choix: "
    
    if /i "!configurer!"=="O" (
        echo.
        echo Ouverture du guide de configuration...
        start notepad INSTRUCTIONS_GOOGLE_SIMPLE.txt
        start https://console.cloud.google.com/
        echo.
        echo Suivez les instructions dans le guide.
        echo.
        echo Apres avoir obtenu Client ID et Secret:
        echo   - Executez: CONFIGURER_GOOGLE_RAPIDE.bat
        echo   - Ou: GOOGLE_MAINTENANT.bat
        echo.
        echo IMPORTANT: Redemarrez le serveur apres configuration!
        echo.
    ) else (
        echo.
        echo Configuration annulee.
        echo.
        echo Pour configurer plus tard:
        echo   - Executez: GOOGLE_MAINTENANT.bat
        echo   - Ou: CONFIGURER_GOOGLE_RAPIDE.bat
        echo.
        echo En attendant, vous pouvez utiliser:
        echo   - Inscription avec email/mot de passe
        echo   - Connexion avec email/mot de passe
        echo.
    )
)

pause

