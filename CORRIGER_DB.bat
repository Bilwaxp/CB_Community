@echo off
setlocal enabledelayedexpansion
title CB_Community - Correction Base de Donnees
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CORRECTION DE LA BASE DE DONNEES
echo ========================================
echo.

REM Arrêter les processus Node.js
echo [1/5] Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes
echo.

REM Vérifier et corriger .env
echo [2/5] Correction du fichier .env...
if exist ".env" (
    REM Créer une copie de sauvegarde
    copy .env .env.backup >nul 2>&1
    
    REM Créer un nouveau .env avec le bon DATABASE_URL
    (
        for /f "delims=" %%a in (.env) do (
            set "line=%%a"
            echo !line! | findstr /C:"DATABASE_URL" >nul 2>&1
            if !ERRORLEVEL! NEQ 0 (
                echo !line!
            )
        )
        echo DATABASE_URL=file:./prisma/dev.db
    ) > .env.tmp
    
    move /y .env.tmp .env >nul 2>&1
    echo [OK] Fichier .env corrige
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
echo [3/5] Verification de la base de donnees...
if exist "prisma\dev.db" (
    echo [OK] Base de donnees existe: prisma\dev.db
) else (
    echo [ATTENTION] Base de donnees non trouvee
    echo Creation de la base de donnees...
)
echo.

REM Générer Prisma
echo [4/5] Generation Prisma...
call npx prisma generate
if errorlevel 1 (
    echo [ERREUR] Erreur lors de la generation Prisma
    echo.
    echo Verifiez que Node.js est installe et dans le PATH
    pause
    exit /b 1
)
echo [OK] Prisma genere
echo.

REM Créer/mettre à jour la base de données
echo [5/5] Mise a jour de la base de donnees...
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo [ERREUR] Erreur lors de la mise a jour de la base de donnees
    echo.
    echo Verifiez les erreurs ci-dessus
    pause
    exit /b 1
)
echo [OK] Base de donnees mise a jour
echo.

echo ========================================
echo   CORRECTION TERMINEE!
echo ========================================
echo.
echo La base de donnees a ete corrigee.
echo.
echo DATABASE_URL dans .env: file:./prisma/dev.db
echo Fichier de base de donnees: prisma\dev.db
echo.
echo Vous pouvez maintenant relancer le serveur:
echo   - LANCER_TEST.bat
echo   - HEBERGER_FINAL.bat
echo.
pause

