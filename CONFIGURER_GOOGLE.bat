@echo off
setlocal enabledelayedexpansion
title CB_Community - Configuration Google OAuth
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH
echo ========================================
echo.

echo Pour utiliser la connexion avec Google, vous devez:
echo.
echo 1. Creer un projet sur Google Cloud Console
echo 2. Activer l'API Google+ 
echo 3. Creer des identifiants OAuth 2.0
echo 4. Configurer les URLs autorisees
echo.
echo Voulez-vous configurer Google OAuth maintenant? (O/N)
set /p configure="Votre choix: "

if /i not "!configure!"=="O" (
    echo.
    echo Configuration annulee.
    echo.
    echo Pour desactiver temporairement Google OAuth:
    echo Je vais commenter le code Google dans auth.ts
    echo.
    pause
    goto disable_google
)

echo.
echo ========================================
echo   ETAPES POUR CONFIGURER GOOGLE
echo ========================================
echo.
echo ETAPE 1: Creer un projet Google Cloud
echo   1. Allez sur: https://console.cloud.google.com/
echo   2. Cliquez sur "Nouveau projet"
echo   3. Donnez un nom au projet (ex: CB_Community)
echo   4. Cliquez sur "Creer"
echo.
echo ETAPE 2: Activer l'API
echo   1. Dans le menu, allez dans "APIs et services" ^> "Bibliotheque"
echo   2. Recherchez "Google+ API" ou "Google Identity"
echo   3. Cliquez sur "Activer"
echo.
echo ETAPE 3: Creer des identifiants OAuth
echo   1. Allez dans "APIs et services" ^> "Identifiants"
echo   2. Cliquez sur "Creer des identifiants" ^> "ID client OAuth"
echo   3. Type d'application: Application Web
echo   4. Nom: CB_Community
echo   5. URIs de redirection autorises:
echo      - http://localhost:3000/api/auth/callback/google
echo      - http://VOTRE_IP:3000/api/auth/callback/google
echo   6. Cliquez sur "Creer"
echo   7. COPIEZ le Client ID et Client Secret
echo.
pause

echo.
echo Entrez les identifiants Google:
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
) else (
    echo ERREUR: Fichier .env non trouve!
    pause
    exit /b 1
)

echo [OK] Configuration Google OAuth mise a jour!
echo.
echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet.
echo.
goto end

:disable_google
echo.
echo Desactivation temporaire de Google OAuth...
if exist "src\lib\auth.ts" (
    copy "src\lib\auth.ts" "src\lib\auth.ts.backup" >nul 2>&1
    powershell -Command "(Get-Content 'src\lib\auth.ts') -replace 'GoogleProvider\(', '// GoogleProvider(' | Set-Content 'src\lib\auth.ts'"
    echo [OK] Google OAuth desactive temporairement
    echo.
    echo Le bouton "Connexion avec Google" ne sera plus disponible.
    echo Pour le reactiver, configurez GOOGLE_CLIENT_ID dans .env
    echo et decommenter le code dans auth.ts
)
goto end

:end
echo.
pause

