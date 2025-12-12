@echo off
setlocal enabledelayedexpansion
title CB_Community - Verifier Configuration Google
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   VERIFICATION CONFIGURATION GOOGLE
echo ========================================
echo.

if not exist ".env" (
    echo [ERREUR] Fichier .env non trouve!
    pause
    exit /b 1
)

set has_client_id=0
set has_client_secret=0

for /f "delims=" %%a in (.env) do (
    set "line=%%a"
    echo !line! | findstr /C:"GOOGLE_CLIENT_ID=" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        set has_client_id=1
        for /f "tokens=2 delims==" %%b in ("!line!") do (
            set "client_id=%%b"
        )
    )
    echo !line! | findstr /C:"GOOGLE_CLIENT_SECRET=" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        set has_client_secret=1
        for /f "tokens=2 delims==" %%b in ("!line!") do (
            set "client_secret=%%b"
        )
    )
)

echo.
echo ========================================
echo   RESULTAT
echo ========================================
echo.

if !has_client_id! EQU 1 (
    echo [OK] GOOGLE_CLIENT_ID trouve
    echo       Valeur: !client_id:~0,30!...
) else (
    echo [ERREUR] GOOGLE_CLIENT_ID manquant
)

if !has_client_secret! EQU 1 (
    echo [OK] GOOGLE_CLIENT_SECRET trouve
    echo       Valeur: !client_secret:~0,20!...
) else (
    echo [ERREUR] GOOGLE_CLIENT_SECRET manquant
)

echo.
echo ========================================
echo   STATUT
echo ========================================
echo.

if !has_client_id! EQU 1 if !has_client_secret! EQU 1 (
    echo [SUCCES] Google OAuth est configure!
    echo.
    echo Les boutons Google devraient apparaître sur:
    echo   - http://localhost:3000/login
    echo   - http://localhost:3000/register
    echo.
    echo Si les boutons n'apparaissent pas:
    echo   1. Redemarrez le serveur
    echo   2. Videz le cache du navigateur
    echo   3. Testez en navigation privee
) else (
    echo [ERREUR] Google OAuth n'est pas configure!
    echo.
    echo Pour configurer:
    echo   1. Executez: CONFIGURER_GOOGLE_RAPIDE.bat
    echo   2. Ou suivez: INSTRUCTIONS_GOOGLE_SIMPLE.txt
)

echo.
pause

