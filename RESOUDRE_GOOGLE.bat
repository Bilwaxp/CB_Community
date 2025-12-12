@echo off
setlocal enabledelayedexpansion
title CB_Community - Resoudre Google OAuth
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   RESOLUTION PROBLEME GOOGLE OAUTH
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

echo Diagnostic du probleme...
echo.

if exist ".env" (
    findstr /C:"GOOGLE_CLIENT_ID" .env >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"GOOGLE_CLIENT_ID" .env') do (
            set GOOGLE_ID=%%a
            if "!GOOGLE_ID!"=="" (
                echo [PROBLEME] GOOGLE_CLIENT_ID est vide dans .env
                set HAS_GOOGLE=0
            ) else (
                echo [OK] GOOGLE_CLIENT_ID configure
                set HAS_GOOGLE=1
            )
        )
    ) else (
        echo [PROBLEME] GOOGLE_CLIENT_ID manquant dans .env
        set HAS_GOOGLE=0
    )
) else (
    echo [PROBLEME] Fichier .env non trouve
    set HAS_GOOGLE=0
)

echo.
echo ========================================
echo   SOLUTION
echo ========================================
echo.

if !HAS_GOOGLE! EQU 0 (
    echo Google OAuth n'est PAS configure.
    echo.
    echo Les boutons Google sont maintenant caches pour eviter l'erreur.
    echo.
    echo Pour activer Google OAuth:
    echo   1. Double-cliquez sur: CONFIGURER_GOOGLE_COMPLET.bat
    echo   2. Suivez les instructions pour obtenir Client ID et Secret
    echo   3. Redemarrez le serveur
    echo   4. Les boutons Google apparaîtront automatiquement
    echo.
    echo Le site fonctionne parfaitement avec email/mot de passe!
    echo.
) else (
    echo Google OAuth est configure.
    echo.
    echo Si les boutons ne fonctionnent pas:
    echo   1. Verifiez les URLs de redirection dans Google Cloud Console
    echo   2. Redemarrez le serveur
    echo   3. Testez a nouveau
    echo.
)

echo.
echo ========================================
echo   PROCHAINES ETAPES
echo ========================================
echo.
echo 1. Redemarrez le serveur: DEMARRER_MAINTENANT.bat
echo 2. Testez le site: http://localhost:3000
echo 3. Les boutons Google apparaîtront seulement si Google est configure
echo.
pause

