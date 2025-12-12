@echo off
setlocal enabledelayedexpansion
title CB_Community - Configuration Google Rapide
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH RAPIDE
echo ========================================
echo.

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

echo IMPORTANT: Vous devez d'abord obtenir Client ID et Secret
echo depuis Google Cloud Console.
echo.
echo Si vous ne les avez pas encore:
echo   1. Allez sur: https://console.cloud.google.com/
echo   2. Creez un projet
echo   3. Activez "Google Identity Services API"
echo   4. Creez "OAuth 2.0 Client ID"
echo   5. Copiez Client ID et Client Secret
echo.
echo Voir GUIDE_GOOGLE_VISUEL.txt pour instructions detaillees.
echo.
pause

echo.
echo ========================================
echo   ENTREE DES IDENTIFIANTS
echo ========================================
echo.
echo Collez les identifiants que vous avez obtenus:
echo.
set /p google_client_id="Client ID: "
set /p google_client_secret="Client Secret: "

if "!google_client_id!"=="" (
    echo.
    echo ERREUR: Client ID requis!
    echo.
    echo Si vous n'avez pas encore les identifiants:
    echo   1. Ouvrez: GUIDE_GOOGLE_VISUEL.txt
    echo   2. Suivez les instructions
    echo   3. Reexecutez ce script
    echo.
    pause
    exit /b 1
)

if "!google_client_secret!"=="" (
    echo.
    echo ERREUR: Client Secret requis!
    pause
    exit /b 1
)

echo.
echo Mise a jour du fichier .env...
if exist ".env" (
    REM Créer backup
    copy .env .env.backup >nul 2>&1
    
    REM Mettre à jour .env
    (
        set found_client_id=0
        set found_client_secret=0
        for /f "delims=" %%a in (.env) do (
            set "line=%%a"
            echo !line! | findstr /C:"GOOGLE_CLIENT_ID" >nul 2>&1
            if !ERRORLEVEL! EQU 0 (
                echo GOOGLE_CLIENT_ID=!google_client_id!
                set found_client_id=1
            ) else (
                echo !line! | findstr /C:"GOOGLE_CLIENT_SECRET" >nul 2>&1
                if !ERRORLEVEL! EQU 0 (
                    echo GOOGLE_CLIENT_SECRET=!google_client_secret!
                    set found_client_secret=1
                ) else (
                    echo !line!
                )
            )
        )
        if !found_client_id! EQU 0 (
            echo GOOGLE_CLIENT_ID=!google_client_id!
        )
        if !found_client_secret! EQU 0 (
            echo GOOGLE_CLIENT_SECRET=!google_client_secret!
        )
    ) > .env.tmp
    move /y .env.tmp .env >nul 2>&1
    echo [OK] Configuration Google OAuth mise a jour!
) else (
    echo ERREUR: Fichier .env non trouve!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Google OAuth est maintenant configure!
echo.
echo IMPORTANT: Redemarrez le serveur maintenant!
echo.
echo 1. Fermez la fenetre du serveur actuel (Ctrl+C)
echo 2. Double-cliquez sur: DEMARRER_MAINTENANT.bat
echo 3. Les boutons Google apparaîtront automatiquement
echo 4. Testez sur: http://localhost:3000/login
echo.
pause

