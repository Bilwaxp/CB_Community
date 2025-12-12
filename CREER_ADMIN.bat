@echo off
setlocal enabledelayedexpansion
title CB_Community - Creer Utilisateur Admin
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CREATION UTILISATEUR ADMIN
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

echo Entrez les informations pour creer un utilisateur admin:
echo.
set /p admin_email="Email: "
set /p admin_password="Mot de passe: "
set /p admin_nom="Nom: "
set /p admin_prenom="Prenom: "

if "!admin_email!"=="" (
    echo ERREUR: Email requis!
    pause
    exit /b 1
)
if "!admin_password!"=="" (
    echo ERREUR: Mot de passe requis!
    pause
    exit /b 1
)

if "!admin_nom!"=="" set admin_nom=Admin
if "!admin_prenom!"=="" set admin_prenom=System

echo.
echo Creation de l'utilisateur admin...
echo.

REM Créer un fichier JavaScript temporaire pour éviter les problèmes de caractères spéciaux
(
    echo const { PrismaClient } = require('@prisma/client'^);
    echo const bcrypt = require('bcryptjs'^);
    echo const prisma = new PrismaClient(^);
    echo (async (^) =^> {
    echo   try {
    echo     const existingUser = await prisma.user.findUnique({ where: { email: '!admin_email!' } }^);
    echo     if (existingUser^) {
    echo       console.log('ERREUR: Un utilisateur avec cet email existe deja!'^);
    echo       await prisma.$disconnect(^);
    echo       process.exit(1^);
    echo     }
    echo     const hashedPassword = await bcrypt.hash('!admin_password!', 10^);
    echo     const user = await prisma.user.create({
    echo       data: {
    echo         email: '!admin_email!',
    echo         password: hashedPassword,
    echo         nom: '!admin_nom!',
    echo         prenom: '!admin_prenom!',
    echo         role: 'ADMIN',
    echo         status: 'APPROVED',
    echo         emailVerified: new Date(^),
    echo         plan: 'VIP'
    echo       }
    echo     }^);
    echo     console.log('SUCCES: Utilisateur admin cree!'^);
    echo     console.log('Email: ' + user.email^);
    echo     console.log('Role: ' + user.role^);
    echo     console.log('Status: ' + user.status^);
    echo     await prisma.$disconnect(^);
    echo   } catch (error^) {
    echo     console.error('ERREUR:', error.message^);
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
    echo ========================================
    echo   UTILISATEUR ADMIN CREE!
    echo ========================================
    echo.
    echo Vous pouvez maintenant vous connecter avec:
    echo   Email: !admin_email!
    echo   Mot de passe: !admin_password!
    echo.
) else (
    echo.
    echo ERREUR lors de la creation de l'utilisateur.
    echo Verifiez les messages ci-dessus.
    echo.
)

pause

