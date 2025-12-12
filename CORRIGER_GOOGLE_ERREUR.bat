@echo off
setlocal enabledelayedexpansion
title CB_Community - Corriger Erreur Google
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CORRECTION ERREUR GOOGLE OAUTH
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

echo Erreur detectee: "Missing required parameter: client_id"
echo.
echo Cela signifie que GOOGLE_CLIENT_ID n'est pas configure.
echo.
echo Options disponibles:
echo.
echo 1. Configurer Google OAuth maintenant
echo 2. Desactiver Google OAuth temporairement (cacher les boutons)
echo.
set /p choice="Choisissez une option (1 ou 2): "

if "%choice%"=="1" goto config_google
if "%choice%"=="2" goto disable_google
goto end

:config_google
echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH
echo ========================================
echo.
echo Pour obtenir Client ID et Client Secret:
echo.
echo 1. Allez sur: https://console.cloud.google.com/
echo 2. Creer un nouveau projet (ou selectionner un existant)
echo 3. Activer "Google Identity API"
echo 4. Creer "OAuth 2.0 Client ID"
echo 5. Type: Application Web
echo 6. URIs de redirection:
echo    - http://localhost:3000/api/auth/callback/google
echo    - http://VOTRE_IP:3000/api/auth/callback/google
echo 7. Copier Client ID et Client Secret
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
    echo.
    echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet.
) else (
    echo ERREUR: Fichier .env non trouve!
)
goto end

:disable_google
echo.
echo Desactivation temporaire de Google OAuth...
echo Les boutons Google seront caches.
echo.

REM Modifier auth.ts pour désactiver GoogleProvider si client_id est vide
if exist "src\lib\auth.ts" (
    copy "src\lib\auth.ts" "src\lib\auth.ts.backup" >nul 2>&1
    
    REM Créer un script Node.js pour modifier conditionnellement
    (
        echo const fs = require('fs'^);
        echo const content = fs.readFileSync('src/lib/auth.ts', 'utf8'^);
        echo const hasClientId = content.includes('process.env.GOOGLE_CLIENT_ID ||'^);
        echo if (!hasClientId^) {
        echo   const modified = content.replace(
        echo     /GoogleProvider\(\{[\s\S]*?\}\),/,
        echo     '// Google OAuth désactivé - Configurez GOOGLE_CLIENT_ID dans .env pour l\'activer\n    // GoogleProvider({\n    //   clientId: process.env.GOOGLE_CLIENT_ID || \'\',\n    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || \'\',\n    // }),'
        echo   ^);
        echo   fs.writeFileSync('src/lib/auth.ts', modified^);
        echo   console.log('Google OAuth desactive dans auth.ts'^);
        echo }
    ) > disable_google_temp.js
    
    node disable_google_temp.js
    del disable_google_temp.js >nul 2>&1
    
    REM Cacher les boutons dans login et register
    powershell -Command "$content = Get-Content 'src/app/(auth)/login/page.tsx' -Raw; if ($content -notmatch 'Google OAuth temporairement') { $content = $content -replace '(\{/\* Divider \*/\}[\s\S]*?Continuer avec Google[\s\S]*?\</Button\>)', '/* Google OAuth désactivé - Configurez GOOGLE_CLIENT_ID pour l''activer */$1'; $content = $content -replace '(\{/\* Divider \*/\}[\s\S]*?Continuer avec Google[\s\S]*?\</Button\>)', '{/* Google OAuth désactivé */}'; Set-Content 'src/app/(auth)/login/page.tsx' -Value $content }"
    
    echo [OK] Google OAuth desactive temporairement
    echo.
    echo Les boutons Google sont maintenant caches.
    echo Pour les reactiver, configurez GOOGLE_CLIENT_ID dans .env
    echo et decommentez le code dans auth.ts
)
goto end

:end
echo.
pause

