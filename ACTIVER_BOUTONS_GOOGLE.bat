@echo off
setlocal enabledelayedexpansion
title CB_Community - Activer Boutons Google
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   ACTIVATION BOUTONS GOOGLE
echo ========================================
echo.

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\ Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

echo Verification de la configuration Google...
echo.

if exist ".env" (
    findstr /C:"GOOGLE_CLIENT_ID" .env >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"GOOGLE_CLIENT_ID" .env') do (
            set GOOGLE_ID=%%a
            if not "!GOOGLE_ID!"=="" (
                echo [OK] Google OAuth est configure
                echo [OK] Les boutons Google sont deja actives dans le code
                echo.
                echo IMPORTANT: Redemarrez le serveur pour que les boutons apparaissent!
                echo.
                goto end
            )
        )
    )
)

echo [ATTENTION] Google OAuth n'est pas configure
echo.
echo Les boutons Google ne fonctionneront pas sans configuration.
echo.
echo Voulez-vous:
echo   1. Configurer Google OAuth maintenant
echo   2. Laisser les boutons caches (recommandé si pas de Google)
echo.
set /p choice="Choisissez (1 ou 2): "

if "!choice!"=="1" (
    call CONFIGURER_GOOGLE_COMPLET.bat
) else (
    echo.
    echo Les boutons Google resteront caches.
    echo Pour les activer plus tard, configurez Google OAuth.
)

:end
echo.
pause

