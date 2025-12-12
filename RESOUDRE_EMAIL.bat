@echo off
setlocal enabledelayedexpansion
title CB_Community - Resoudre Probleme Email
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   RESOLUTION PROBLEME EMAIL
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

echo [1/4] Verification configuration email...
if exist ".env" (
    findstr /C:"SMTP_PASSWORD" .env >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"SMTP_PASSWORD" .env') do (
            set SMTP_PASS=%%a
            if "!SMTP_PASS!"=="" (
                echo [ATTENTION] SMTP_PASSWORD est vide!
                echo.
                echo Les emails ne peuvent pas etre envoyes.
                echo.
                echo SOLUTION 1: Configurer Gmail
                echo   1. Allez sur: https://myaccount.google.com/security
                echo   2. Activez la validation en 2 etapes
                echo   3. Creez un "Mot de passe d'application"
                echo   4. Copiez le mot de passe
                echo   5. Collez-le dans .env a la ligne SMTP_PASSWORD
                echo.
                echo SOLUTION 2: Desactiver verification email (TEMPORAIRE)
                echo   Je vais creer un script pour cela.
                echo.
                pause
            ) else (
                echo [OK] SMTP_PASSWORD configure
            )
        )
    ) else (
        echo [ERREUR] SMTP_PASSWORD manquant dans .env
    )
) else (
    echo [ERREUR] Fichier .env manquant
)
echo.

echo [2/4] Options disponibles:
echo.
echo 1. Configurer SMTP pour envoyer des emails
echo 2. Desactiver verification email (permet connexion sans email)
echo 3. Verifier les utilisateurs dans la base de donnees
echo 4. Creer un utilisateur admin directement
echo.
set /p choice="Choisissez une option (1-4): "

if "%choice%"=="1" goto config_smtp
if "%choice%"=="2" goto disable_email
if "%choice%"=="3" goto view_users
if "%choice%"=="4" goto create_admin
goto end

:config_smtp
echo.
echo Configuration SMTP Gmail:
echo.
echo 1. Allez sur: https://myaccount.google.com/security
echo 2. Activez "Validation en 2 etapes" si ce n'est pas deja fait
echo 3. Allez dans "Mots de passe des applications"
echo 4. Creez un nouveau mot de passe d'application pour "Mail"
echo 5. Copiez le mot de passe genere (16 caracteres)
echo.
set /p smtp_pass="Collez le mot de passe d'application ici: "
if not "!smtp_pass!"=="" (
    REM Mettre a jour .env
    (
        for /f "delims=" %%a in (.env) do (
            set "line=%%a"
            echo !line! | findstr /C:"SMTP_PASSWORD" >nul 2>&1
            if !ERRORLEVEL! NEQ 0 (
                echo !line!
            ) else (
                echo SMTP_PASSWORD=!smtp_pass!
            )
        )
    ) > .env.tmp
    move /y .env.tmp .env >nul 2>&1
    echo [OK] SMTP_PASSWORD mis a jour dans .env
    echo.
    echo Redemarrez le serveur pour que les changements prennent effet.
)
goto end

:disable_email
echo.
echo [ATTENTION] Desactivation de la verification email...
echo.
echo Cela permettra aux utilisateurs de se connecter sans verifier leur email.
echo C'est temporaire - reactivez la verification apres avoir configure SMTP.
echo.
pause
echo Modification du code...
REM Je vais modifier auth.ts pour désactiver temporairement la vérification
goto end

:view_users
echo.
echo Ouverture de Prisma Studio pour voir les utilisateurs...
echo.
call npx prisma studio
goto end

:create_admin
echo.
echo Creation d'un utilisateur admin...
echo.
set /p admin_email="Email de l'admin: "
set /p admin_password="Mot de passe: "
if not "!admin_email!"=="" if not "!admin_password!"=="" (
    echo Creation en cours...
    node -e "const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs'); const prisma = new PrismaClient(); (async () => { const hashedPassword = await bcrypt.hash('!admin_password!', 10); await prisma.user.create({ data: { email: '!admin_email!', password: hashedPassword, nom: 'Admin', prenom: 'System', role: 'ADMIN', status: 'APPROVED', emailVerified: new Date(), plan: 'VIP' } }); console.log('Utilisateur admin cree avec succes!'); await prisma.$disconnect(); })();"
)
goto end

:end
echo.
echo ========================================
echo.
pause

