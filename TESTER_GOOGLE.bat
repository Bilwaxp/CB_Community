@echo off
setlocal enabledelayedexpansion
title CB_Community - Tester Google OAuth
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   TEST GOOGLE OAUTH
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

echo Verification de la configuration Google...
echo.

if exist ".env" (
    echo Contenu de .env relatif a Google:
    echo ----------------------------------------
    findstr /C:"GOOGLE" .env
    echo ----------------------------------------
    echo.
    
    findstr /C:"GOOGLE_CLIENT_ID" .env >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"GOOGLE_CLIENT_ID" .env') do (
            set GOOGLE_ID=%%a
            if "!GOOGLE_ID!"=="" (
                echo [ERREUR] GOOGLE_CLIENT_ID est vide!
                echo.
                echo SOLUTION: Configurez Google OAuth avec CONFIGURER_GOOGLE_COMPLET.bat
            ) else (
                echo [OK] GOOGLE_CLIENT_ID configure: !GOOGLE_ID:~0,30!...
            )
        )
    ) else (
        echo [ERREUR] GOOGLE_CLIENT_ID manquant dans .env
        echo.
        echo SOLUTION: Configurez Google OAuth avec CONFIGURER_GOOGLE_COMPLET.bat
    )
) else (
    echo [ERREUR] Fichier .env non trouve
)

echo.
echo ========================================
echo   DIAGNOSTIC
echo ========================================
echo.
echo Si Google OAuth ne fonctionne pas:
echo.
echo 1. Verifiez que GOOGLE_CLIENT_ID est dans .env
echo 2. Verifiez que GOOGLE_CLIENT_SECRET est dans .env
echo 3. Verifiez que les valeurs ne sont pas vides
echo 4. Redemarrez le serveur apres configuration
echo 5. Verifiez les URLs de redirection dans Google Cloud Console
echo.
echo Pour configurer Google:
echo   Double-cliquez sur: CONFIGURER_GOOGLE_COMPLET.bat
echo.
pause

