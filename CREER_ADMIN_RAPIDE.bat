@echo off
setlocal enabledelayedexpansion
title CB_Community - Creer Admin Rapide
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CREATION ADMIN RAPIDE
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

echo Entrez les informations:
echo.
set /p admin_email="Email: "
set /p admin_password="Mot de passe: "
set /p admin_nom="Nom (optionnel, defaut: Admin): "
set /p admin_prenom="Prenom (optionnel, defaut: System): "

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

REM Utiliser le script Node.js
node create-admin.js "!admin_email!" "!admin_password!" "!admin_nom!" "!admin_prenom!"

if %ERRORLEVEL% EQU 0 (
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
    echo ERREUR lors de la creation.
    echo.
)

pause

