@echo off
setlocal enabledelayedexpansion
title CB_Community - Reparation Base de Donnees
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   REPARATION DE LA BASE DE DONNEES
echo ========================================
echo.

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "NODE_PATH=C:\Program Files\nodejs"
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "NODE_PATH=C:\Program Files (x86)\nodejs"
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "NODE_PATH=%LOCALAPPDATA%\Programs\nodejs"
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js non trouve!
    echo.
    echo Installez Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js trouve
node --version
echo.

REM Arrêter les processus
echo [1/4] Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes
echo.

REM Corriger .env avec chemin absolu
echo [2/4] Correction du fichier .env...
set "PROJECT_DIR=%~dp0"
set "DB_PATH=%PROJECT_DIR%prisma\dev.db"
set "DB_PATH=%DB_PATH:\=/%"
set "DB_PATH=%DB_PATH::=%"

if exist ".env" (
    REM Créer nouveau .env sans DATABASE_URL
    (
        for /f "delims=" %%a in (.env) do (
            set "line=%%a"
            echo !line! | findstr /C:"DATABASE_URL" >nul 2>&1
            if !ERRORLEVEL! NEQ 0 (
                echo !line!
            )
        )
        echo DATABASE_URL=file:./prisma/dev.db
    ) > .env.new
    
    move /y .env.new .env >nul 2>&1
    echo [OK] DATABASE_URL corrige dans .env
) else (
    echo Creation du fichier .env...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=cb-community-secret-key-changez-en-production
        echo GOOGLE_CLIENT_ID=
        echo GOOGLE_CLIENT_SECRET=
        echo STRIPE_SECRET_KEY=
        echo STRIPE_PUBLISHABLE_KEY=
        echo STRIPE_WEBHOOK_SECRET=
        echo STRIPE_PRO_PRICE_ID=
        echo STRIPE_VIP_PRICE_ID=
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=cbcommunity7@gmail.com
        echo SMTP_PASSWORD=
        echo SMTP_FROM=cbcommunity7@gmail.com
        echo NODE_ENV=development
    ) > .env
    echo [OK] Fichier .env cree
)
echo.

REM Vérifier la base de données
echo [3/4] Verification de la base de donnees...
if exist "prisma\dev.db" (
    echo [OK] Base de donnees existe: prisma\dev.db
) else (
    echo [INFO] Base de donnees non trouvee - sera creee
)
echo.

REM Générer Prisma et mettre à jour DB
echo [4/4] Generation Prisma et mise a jour de la base de donnees...
call npx prisma generate
if errorlevel 1 (
    echo [ERREUR] Erreur lors de la generation Prisma
    pause
    exit /b 1
)

call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo [ERREUR] Erreur lors de la mise a jour de la base de donnees
    pause
    exit /b 1
)
echo [OK] Base de donnees mise a jour
echo.

echo ========================================
echo   REPARATION TERMINEE!
echo ========================================
echo.
echo La base de donnees a ete reparee.
echo.
echo DATABASE_URL: file:./prisma/dev.db
echo Fichier DB: prisma\dev.db
echo.
echo Vous pouvez maintenant relancer le serveur.
echo.
pause

