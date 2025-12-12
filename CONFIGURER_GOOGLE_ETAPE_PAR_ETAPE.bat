@echo off
setlocal enabledelayedexpansion
title CB_Community - Configuration Google OAuth Complete
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH COMPLETE
echo ========================================
echo.
echo Ce script va vous guider pour configurer Google OAuth.
echo.
pause

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

echo.
echo ========================================
echo   ETAPE 1: CREER PROJET GOOGLE CLOUD
echo ========================================
echo.
echo 1. Ouvrez votre navigateur
echo 2. Allez sur: https://console.cloud.google.com/
echo 3. Connectez-vous avec votre compte Google
echo 4. Cliquez sur "Nouveau projet" (en haut a droite)
echo 5. Nom du projet: CB_Community
echo 6. Cliquez sur "Creer"
echo.
echo Appuyez sur une touche quand le projet est cree...
pause

echo.
echo ========================================
echo   ETAPE 2: ACTIVER L'API
echo ========================================
echo.
echo 1. Dans le menu de gauche, cliquez sur "APIs et services"
echo 2. Cliquez sur "Bibliotheque"
echo 3. Dans la barre de recherche, tapez: "Google Identity"
echo 4. Cliquez sur "Google Identity Services API" ou "Google+ API"
echo 5. Cliquez sur "ACTIVER"
echo.
echo Appuyez sur une touche quand l'API est activee...
pause

echo.
echo ========================================
echo   ETAPE 3: CREER ID CLIENT OAUTH
echo ========================================
echo.
echo 1. Dans le menu de gauche, cliquez sur "Identifiants"
echo 2. Cliquez sur "CREER DES IDENTIFIANTS" (en haut)
echo 3. Cliquez sur "ID client OAuth"
echo 4. Type d'application: Selectionnez "Application Web"
echo 5. Nom: CB_Community
echo.
echo 6. URIs de redirection autorisees:
echo    Cliquez sur "AJOUTER UN URI"
echo    Ajoutez ces URLs (une par une):
echo.
echo    http://localhost:3000/api/auth/callback/google
echo    http://127.0.0.1:3000/api/auth/callback/google
echo.

REM Trouver l'IP locale
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set LOCAL_IP=%%a
    set LOCAL_IP=!LOCAL_IP:~1!
    goto :found_ip
)
:found_ip

if defined LOCAL_IP (
    echo    http://%LOCAL_IP%:3000/api/auth/callback/google
    echo.
    echo    Votre IP locale: %LOCAL_IP%
    echo.
)

echo 7. Cliquez sur "CREER"
echo 8. Une fenetre va s'ouvrir avec:
echo    - Client ID (copiez-le)
echo    - Client Secret (copiez-le)
echo.
echo IMPORTANT: Gardez cette fenetre ouverte!
echo.
pause

echo.
echo ========================================
echo   ETAPE 4: ENTRER LES IDENTIFIANTS
echo ========================================
echo.
echo Collez les identifiants que vous avez copies:
echo.
set /p google_client_id="Client ID: "
set /p google_client_secret="Client Secret: "

if "!google_client_id!"=="" (
    echo.
    echo ERREUR: Client ID requis!
    echo.
    pause
    exit /b 1
)

if "!google_client_secret!"=="" (
    echo.
    echo ERREUR: Client Secret requis!
    echo.
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
echo Configuration:
echo   Client ID: !google_client_id:~0,30!...
echo   Client Secret: !google_client_secret:~0,20!...
echo.
echo ========================================
echo   PROCHAINES ETAPES
echo ========================================
echo.
echo 1. Redemarrez le serveur:
echo    - Fermez la fenetre du serveur actuel
echo    - Double-cliquez sur: DEMARRER_MAINTENANT.bat
echo.
echo 2. Testez Google OAuth:
echo    - Allez sur: http://localhost:3000/login
echo    - Cliquez sur "Continuer avec Google"
echo    - Tous vos comptes Google apparaîtront
echo    - Choisissez le compte que vous voulez utiliser
echo.
echo 3. Fonctionnalites activees:
echo    ✅ Inscription avec Google
echo    ✅ Connexion avec Google
echo    ✅ Selection de compte (tous les comptes apparaissent)
echo    ✅ Comptes actives automatiquement
echo.
echo IMPORTANT: Redemarrez le serveur maintenant!
echo.
pause

