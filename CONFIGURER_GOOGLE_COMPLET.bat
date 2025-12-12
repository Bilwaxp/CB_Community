@echo off
setlocal enabledelayedexpansion
title CB_Community - Configuration Google Complete
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH COMPLETE
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

echo Cette configuration va permettre aux utilisateurs de:
echo   - Voir tous leurs comptes Google (telephone, laptop, etc.)
echo   - Choisir le compte qu'ils veulent utiliser
echo   - S'inscrire ou se connecter avec n'importe quel compte Google
echo.
pause

echo.
echo ========================================
echo   ETAPES POUR CONFIGURER GOOGLE
echo ========================================
echo.
echo ETAPE 1: Creer un projet Google Cloud
echo   1. Allez sur: https://console.cloud.google.com/
echo   2. Cliquez sur "Nouveau projet"
echo   3. Nom du projet: CB_Community
echo   4. Cliquez sur "Creer"
echo.
echo ETAPE 2: Activer l'API
echo   1. Allez dans "APIs et services" ^> "Bibliotheque"
echo   2. Recherchez "Google Identity" ou "Google+ API"
echo   3. Cliquez sur "Activer"
echo.
echo ETAPE 3: Creer OAuth 2.0 Client ID
echo   1. Allez dans "APIs et services" ^> "Identifiants"
echo   2. Cliquez sur "Creer des identifiants" ^> "ID client OAuth"
echo   3. Type d'application: Application Web
echo   4. Nom: CB_Community
echo   5. URIs de redirection autorisees (AJOUTEZ TOUS):
echo      - http://localhost:3000/api/auth/callback/google
echo      - http://127.0.0.1:3000/api/auth/callback/google
echo      - http://VOTRE_IP_LOCALE:3000/api/auth/callback/google
echo      - http://VOTRE_IP_PUBLIQUE:3000/api/auth/callback/google
echo      - http://VOTRE_DOMAINE/api/auth/callback/google (si vous en avez un)
echo   6. Cliquez sur "Creer"
echo   7. COPIEZ le Client ID et Client Secret
echo.
pause

echo.
echo Entrez vos identifiants Google:
echo.
set /p google_client_id="Client ID: "
set /p google_client_secret="Client Secret: "

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
echo Mise a jour du fichier .env...
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
echo Fonctionnalites activees:
echo   ✅ Inscription avec Google
echo   ✅ Connexion avec Google
echo   ✅ Selection de compte Google (tous les comptes apparaissent)
echo   ✅ Comptes actives automatiquement
echo.
echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet.
echo.
echo Quand un utilisateur clique sur "Continuer avec Google":
echo   - Tous ses comptes Google apparaissent (telephone, laptop, etc.)
echo   - Il peut choisir le compte qu'il veut utiliser
echo   - Le compte sera cree ou connecte automatiquement
echo.
pause

