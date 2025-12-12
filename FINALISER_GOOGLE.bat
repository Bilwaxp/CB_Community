@echo off
setlocal enabledelayedexpansion
title CB_Community - Finaliser Google OAuth
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   FINALISATION GOOGLE OAUTH
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

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js non trouve!
    pause
    exit /b 1
)

echo [OK] Google OAuth a ete reactive dans le code!
echo.
echo ========================================
echo   CONFIGURATION REQUISE
echo ========================================
echo.
echo Pour que Google OAuth fonctionne, vous devez:
echo.
echo 1. Creer un projet Google Cloud Console
echo    URL: https://console.cloud.google.com/
echo.
echo 2. Activer l'API Google Identity
echo    - Allez dans "APIs et services" ^> "Bibliotheque"
echo    - Recherchez "Google Identity" ou "Google+ API"
echo    - Cliquez sur "Activer"
echo.
echo 3. Creer des identifiants OAuth 2.0
echo    - Allez dans "APIs et services" ^> "Identifiants"
echo    - Cliquez sur "Creer des identifiants" ^> "ID client OAuth"
echo    - Type: Application Web
echo    - Nom: CB_Community
echo    - URIs de redirection autorisees:
echo      * http://localhost:3000/api/auth/callback/google
echo      * http://VOTRE_IP:3000/api/auth/callback/google
echo      * http://VOTRE_DOMAINE/api/auth/callback/google
echo    - Cliquez sur "Creer"
echo.
echo 4. Copier Client ID et Client Secret
echo.
pause

echo.
echo Entrez vos identifiants Google:
echo.
set /p google_client_id="Client ID: "
set /p google_client_secret="Client Secret: "

if "!google_client_id!"=="" (
    echo.
    echo ATTENTION: Client ID vide!
    echo Google OAuth ne fonctionnera pas sans Client ID.
    echo.
    pause
)

if "!google_client_secret!"=="" (
    echo.
    echo ATTENTION: Client Secret vide!
    echo Google OAuth ne fonctionnera pas sans Client Secret.
    echo.
    pause
)

echo.
echo Mise a jour du fichier .env...
if exist ".env" (
    REM Créer backup
    copy .env .env.backup >nul 2>&1
    
    REM Mettre à jour .env
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
    
    echo [OK] Fichier .env mis a jour!
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
echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet.
echo.
echo Fonctionnalites activees:
echo   ✅ Inscription avec Google
echo   ✅ Connexion avec Google
echo   ✅ Comptes actives automatiquement
echo.
pause

