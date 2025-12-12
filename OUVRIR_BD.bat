@echo off
setlocal enabledelayedexpansion
title CB_Community - Ouvrir Base de Donnees
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   OUVERTURE DE LA BASE DE DONNEES
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

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js non trouve!
    pause
    exit /b 1
)

echo [OK] Ouverture de Prisma Studio...
echo.
echo Prisma Studio va s'ouvrir dans votre navigateur.
echo Vous pourrez voir et modifier la base de donnees.
echo.
echo URL: http://localhost:5555
echo.
echo Appuyez sur Ctrl+C dans cette fenetre pour fermer Prisma Studio.
echo.
pause

call npx prisma studio

