@echo off
setlocal enabledelayedexpansion
title CB_Community - Verifier et Configurer Google
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   VERIFICATION GOOGLE OAUTH
echo ========================================
echo.

if not exist ".env" (
    echo [ERREUR] Fichier .env non trouve
    pause
    exit /b 1
)

set HAS_CLIENT_ID=0
set HAS_CLIENT_SECRET=0

for /f "delims=" %%a in (.env) do (
    set "line=%%a"
    echo !line! | findstr /C:"GOOGLE_CLIENT_ID=" | findstr /V "^#" | findstr /V "^$" | findstr /V "GOOGLE_CLIENT_ID=$" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        set HAS_CLIENT_ID=1
        for /f "tokens=2 delims==" %%b in ("!line!") do set CLIENT_ID=%%b
    )
    echo !line! | findstr /C:"GOOGLE_CLIENT_SECRET=" | findstr /V "^#" | findstr /V "^$" | findstr /V "GOOGLE_CLIENT_SECRET=$" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        set HAS_CLIENT_SECRET=1
        for /f "tokens=2 delims==" %%b in ("!line!") do set CLIENT_SECRET=%%b
    )
)

echo.
echo ========================================
echo   RESULTAT
echo ========================================
echo.

if !HAS_CLIENT_ID! EQU 1 (
    if !HAS_CLIENT_SECRET! EQU 1 (
        echo [OK] Google OAuth est configure!
        echo.
        echo Client ID: !CLIENT_ID:~0,30!...
        echo Client Secret: !CLIENT_SECRET:~0,20!...
        echo.
        echo Si vous avez toujours des erreurs:
        echo   1. Verifiez que les identifiants sont corrects
        echo   2. Verifiez les URLs de redirection dans Google Console
        echo   3. Redemarrez le serveur apres modification
    ) else (
        echo [ERREUR] GOOGLE_CLIENT_SECRET manquant
        echo.
        echo Configuration incomplete!
        goto CONFIGURER
    )
) else (
    echo [ERREUR] GOOGLE_CLIENT_ID manquant
    echo.
    echo Google OAuth n'est pas configure!
    goto CONFIGURER
)

echo.
echo ========================================
echo   PROCHAINES ETAPES
echo ========================================
echo.
echo Si le bouton Google ne fonctionne pas:
echo   1. Verifiez les URLs de redirection dans Google Console:
echo      - http://localhost:3000/api/auth/callback/google
echo      - http://127.0.0.1:3000/api/auth/callback/google
echo   2. Redemarrez le serveur
echo   3. Testez a nouveau
echo.
pause
exit /b 0

:CONFIGURER
echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH
echo ========================================
echo.
echo Google OAuth n'est pas configure.
echo.
echo Voulez-vous le configurer maintenant? (O/N)
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
) else (
    echo.
    echo Configuration annulee.
    echo.
    echo Pour configurer plus tard:
    echo   - Executez: GOOGLE_MAINTENANT.bat
    echo   - Ou: CONFIGURER_GOOGLE_RAPIDE.bat
    echo.
)

pause

