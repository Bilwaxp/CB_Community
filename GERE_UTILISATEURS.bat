@echo off
setlocal enabledelayedexpansion
title CB_Community - Gestion Utilisateurs
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   GESTION DES UTILISATEURS
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

echo Options disponibles:
echo.
echo 1. Voir tous les utilisateurs (Prisma Studio)
echo 2. Creer un utilisateur admin
echo 3. Activer un utilisateur (desactiver verification email)
echo 4. Voir les utilisateurs en attente
echo.
set /p choice="Choisissez une option (1-4): "

if "%choice%"=="1" goto prisma_studio
if "%choice%"=="2" goto create_admin
if "%choice%"=="3" goto activate_user
if "%choice%"=="4" goto view_pending
goto end

:prisma_studio
echo.
echo Ouverture de Prisma Studio...
echo URL: http://localhost:5555
echo.
echo Appuyez sur Ctrl+C pour fermer Prisma Studio.
echo.
call npx prisma studio
goto end

:create_admin
echo.
echo Creation d'un utilisateur admin...
echo.
set /p admin_email="Email: "
set /p admin_password="Mot de passe: "
set /p admin_nom="Nom (optionnel): "
set /p admin_prenom="Prenom (optionnel): "

if "!admin_nom!"=="" set admin_nom=Admin
if "!admin_prenom!"=="" set admin_prenom=System

if not "!admin_email!"=="" if not "!admin_password!"=="" (
    REM Créer un fichier temporaire pour éviter les problèmes de caractères spéciaux
    (
        echo const { PrismaClient } = require('@prisma/client'^);
        echo const bcrypt = require('bcryptjs'^);
        echo const prisma = new PrismaClient(^);
        echo (async (^) =^> {
        echo   try {
        echo     const existing = await prisma.user.findUnique({ where: { email: '!admin_email!' } }^);
        echo     if (existing^) {
        echo       console.log('ERREUR: Email deja utilise!'^);
        echo       process.exit(1^);
        echo     }
        echo     const hash = await bcrypt.hash('!admin_password!', 10^);
        echo     const user = await prisma.user.create({
        echo       data: {
        echo         email: '!admin_email!',
        echo         password: hash,
        echo         nom: '!admin_nom!',
        echo         prenom: '!admin_prenom!',
        echo         role: 'ADMIN',
        echo         status: 'APPROVED',
        echo         emailVerified: new Date(^),
        echo         plan: 'VIP'
        echo       }
        echo     }^);
        echo     console.log('SUCCES! Utilisateur cree:'^);
        echo     console.log('  Email: ' + user.email^);
        echo     console.log('  Role: ADMIN'^);
        echo     console.log('  Status: APPROVED'^);
        echo     await prisma.$disconnect(^);
        echo   } catch (e^) {
        echo     console.error('ERREUR:', e.message^);
        echo     await prisma.$disconnect(^);
        echo     process.exit(1^);
        echo   }
        echo }^)(^);
    ) > create_admin_temp.js
    
    node create_admin_temp.js
    set CREATE_RESULT=!ERRORLEVEL!
    del create_admin_temp.js >nul 2>&1
    
    if !CREATE_RESULT! EQU 0 (
        echo.
        echo [OK] Utilisateur admin cree avec succes!
    )
)
goto end

:activate_user
echo.
echo Activation d'un utilisateur (desactiver verification email)...
echo.
set /p user_email="Email de l'utilisateur: "
if not "!user_email!"=="" (
    (
        echo const { PrismaClient } = require('@prisma/client'^);
        echo const prisma = new PrismaClient(^);
        echo (async (^) =^> {
        echo   try {
        echo     const user = await prisma.user.update({
        echo       where: { email: '!user_email!' },
        echo       data: { emailVerified: new Date(^), status: 'APPROVED' }
        echo     }^);
        echo     console.log('SUCCES! Utilisateur active:'^);
        echo     console.log('  Email: ' + user.email^);
        echo     console.log('  Status: ' + user.status^);
        echo     await prisma.$disconnect(^);
        echo   } catch (e^) {
        echo     console.error('ERREUR:', e.message^);
        echo     await prisma.$disconnect(^);
        echo     process.exit(1^);
        echo   }
        echo }^)(^);
    ) > activate_user_temp.js
    
    node activate_user_temp.js
    set ACTIVATE_RESULT=!ERRORLEVEL!
    del activate_user_temp.js >nul 2>&1
    
    if !ACTIVATE_RESULT! EQU 0 (
        echo.
        echo [OK] Utilisateur active!
    )
)
goto end

:view_pending
echo.
echo Utilisateurs en attente de verification:
echo.
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); (async () => { const users = await prisma.user.findMany({ where: { OR: [{ emailVerified: null }, { status: 'PENDING' }] }, select: { email: true, nom: true, prenom: true, status: true, emailVerified: true } }); if (users.length === 0) { console.log('Aucun utilisateur en attente.'); } else { console.log('Utilisateurs en attente:'); users.forEach((u, i) => { console.log((i+1) + '. ' + u.email + ' - ' + u.prenom + ' ' + u.nom + ' (Status: ' + u.status + ')'); }); } await prisma.$disconnect(); })();"
goto end

:end
echo.
pause

