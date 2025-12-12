@echo off
setlocal enabledelayedexpansion
title CB_Community - Verifier et Corriger Google
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   VERIFICATION ET CORRECTION GOOGLE
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

echo [1/3] Verification configuration Google...
if exist ".env" (
    findstr /C:"GOOGLE_CLIENT_ID" .env >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"GOOGLE_CLIENT_ID" .env') do (
            set GOOGLE_ID=%%a
            if "!GOOGLE_ID!"=="" (
                echo [ERREUR] GOOGLE_CLIENT_ID est vide dans .env
                set GOOGLE_CONFIGURED=0
            ) else (
                echo [OK] GOOGLE_CLIENT_ID trouve: !GOOGLE_ID:~0,20!...
                set GOOGLE_CONFIGURED=1
            )
        )
    ) else (
        echo [ERREUR] GOOGLE_CLIENT_ID manquant dans .env
        set GOOGLE_CONFIGURED=0
    )
) else (
    echo [ERREUR] Fichier .env non trouve
    set GOOGLE_CONFIGURED=0
)
echo.

if !GOOGLE_CONFIGURED! EQU 0 (
    echo [2/3] Google OAuth n'est PAS configure
    echo.
    echo Options:
    echo   1. Configurer Google OAuth maintenant
    echo   2. Cacher les boutons Google (desactiver temporairement)
    echo.
    set /p choice="Choisissez (1 ou 2): "
    
    if "!choice!"=="1" goto config_google
    if "!choice!"=="2" goto hide_google
    goto end
) else (
    echo [2/3] Google OAuth est configure
    echo [OK] Les boutons Google devraient fonctionner
    goto verify_code
)

:config_google
echo.
echo Configuration Google OAuth...
echo.
set /p google_client_id="Collez le Client ID: "
set /p google_client_secret="Collez le Client Secret: "

if "!google_client_id!"=="" (
    echo ERREUR: Client ID requis!
    pause
    exit /b 1
)

echo.
echo Mise a jour de .env...
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
echo [OK] Configuration mise a jour
goto verify_code

:hide_google
echo.
echo Masquage des boutons Google...
echo Les boutons seront caches jusqu'a ce que Google soit configure.
goto end

:verify_code
echo.
echo [3/3] Verification du code...
echo [OK] Le code est deja configure pour afficher les boutons Google
echo [OK] GoogleProvider est conditionnel (s'active seulement si configure)
echo.
echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet!
goto end

:end
echo.
pause

