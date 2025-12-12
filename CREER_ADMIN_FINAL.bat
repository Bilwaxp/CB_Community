@echo off
setlocal enabledelayedexpansion
title CB_Community - Creer Admin Final
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CREATION ADMIN - renaudchenet0@gmail.com
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

echo Creation de l'utilisateur admin...
echo Email: renaudchenet0@gmail.com
echo Nom: ING Bilwax
echo Prenom: Bilwax
echo.

REM Utiliser le script Node.js
node create-admin.js "renaudchenet0@gmail.com" "Wawa200$$" "ING Bilwax" "Bilwax"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   UTILISATEUR ADMIN CREE AVEC SUCCES!
    echo ========================================
    echo.
    echo Vous pouvez maintenant vous connecter avec:
    echo   Email: renaudchenet0@gmail.com
    echo   Mot de passe: Wawa200$$
    echo.
    echo Allez sur: http://localhost:3000/login
    echo.
) else (
    echo.
    echo ERREUR lors de la creation.
    echo Verifiez les messages ci-dessus.
    echo.
)

pause

