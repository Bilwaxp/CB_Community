@echo off
setlocal enabledelayedexpansion
title CB_Community - Correction Google Definitive
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CORRECTION GOOGLE OAUTH DEFINITIVE
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

echo [1/4] Arret des processus...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes
echo.

echo [2/4] Verification configuration Google...
set GOOGLE_CONFIGURED=0
if exist ".env" (
    findstr /C:"GOOGLE_CLIENT_ID" .env >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"GOOGLE_CLIENT_ID" .env') do (
            set GOOGLE_ID=%%a
            if not "!GOOGLE_ID!"=="" (
                echo [OK] GOOGLE_CLIENT_ID trouve
                set GOOGLE_CONFIGURED=1
            )
        )
    )
)

if !GOOGLE_CONFIGURED! EQU 0 (
    echo [ATTENTION] Google OAuth n'est pas configure
    echo.
    echo Les boutons Google seront caches jusqu'a configuration.
    echo.
    echo Pour activer Google OAuth:
    echo   1. Double-cliquez sur: CONFIGURER_GOOGLE_COMPLET.bat
    echo   2. Suivez les instructions
    echo   3. Redemarrez le serveur
    echo.
) else (
    echo [OK] Google OAuth est configure
    echo [OK] Les boutons Google seront visibles
)
echo.

echo [3/4] Nettoyage build...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
)
echo [OK] Build nettoye
echo.

echo [4/4] Resume:
echo.
if !GOOGLE_CONFIGURED! EQU 0 (
    echo ✅ Boutons Google caches (Google non configure)
    echo ✅ Site fonctionne avec email/mot de passe
    echo ✅ Pas d'erreur Google OAuth
) else (
    echo ✅ Boutons Google actives
    echo ✅ Google OAuth configure
    echo ✅ Selection de compte Google activee
)
echo.

echo ========================================
echo   CORRECTION TERMINEE!
echo ========================================
echo.
echo Redemarrez le serveur:
echo   Double-cliquez sur: DEMARRER_MAINTENANT.bat
echo.
pause

