@echo off
title Regenerer Prisma Client
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   REGENERATION PRISMA CLIENT
echo ========================================
echo.

REM Chercher Node.js
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

echo [1/2] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo [ERREUR] Echec de la generation Prisma!
    pause
    exit /b 1
)
echo [OK] Client Prisma genere
echo.

echo [2/2] Mise a jour de la base de donnees...
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo [ERREUR] Echec de la mise a jour!
    pause
    exit /b 1
)
echo [OK] Base de donnees mise a jour
echo.

echo ========================================
echo   REGENERATION TERMINEE!
echo ========================================
echo.
echo Vous pouvez maintenant relancer le build.
echo.
pause

