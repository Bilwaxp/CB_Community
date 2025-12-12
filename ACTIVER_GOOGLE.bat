@echo off
setlocal enabledelayedexpansion
title CB_Community - Activer Google OAuth
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   ACTIVATION GOOGLE OAUTH
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

echo Cette operation va:
echo 1. Configurer GOOGLE_CLIENT_ID dans .env
echo 2. Reactiver les boutons Google dans les pages
echo.
pause

echo.
set /p google_client_id="Collez le Client ID: "
set /p google_client_secret="Collez le Client Secret: "

if "!google_client_id!"=="" (
    echo ERREUR: Client ID requis!
    pause
    exit /b 1
)

if "!google_client_secret!"=="" (
    echo ERREUR: Client Secret requis!
    pause
    exit /b 1
)

echo.
echo Mise a jour de .env...
if exist ".env" (
    (
        for /f "delims=" %%a in (.env) do (
            set "line=%%a"
            echo !line! | findstr /C:"GOOGLE_CLIENT_ID" >nul 2>&1
            if !ERRORLEVEL! NEQ 0 (
                echo !line! | findstr /C:"GOOGLE_CLIENT_SECRET" >nul 2>&1
                if !ERRORLEVEL! NEQ 0 (
                    echo !line!
                ) else (
                    echo GOOGLE_CLIENT_SECRET=!google_client_secret!
                )
            ) else (
                echo GOOGLE_CLIENT_ID=!google_client_id!
            )
        )
    ) > .env.tmp
    move /y .env.tmp .env >nul 2>&1
    echo [OK] .env mis a jour
)

echo.
echo Reactivation des boutons Google...
REM Les boutons sont déjà dans le code, ils apparaîtront automatiquement
echo [OK] Boutons Google seront visibles apres redemarrage
echo.
echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet!
echo.
pause

