@echo off
title Reparation Next.js
color 0E

echo.
echo ========================================
echo   REPARATION DU BUILD NEXT.JS
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Suppression du build corrompu...
if exist ".next" (
    rmdir /s /q ".next"
    echo Dossier .next supprime.
) else (
    echo Dossier .next n'existe pas.
)

if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo Cache supprime.
)

echo.
echo [2/3] Reinstallation des dependances...
call npm install --legacy-peer-deps

echo.
echo [3/3] Generation du client Prisma...
call npx prisma generate

echo.
echo ========================================
echo   REPARATION TERMINEE!
echo ========================================
echo.
echo Vous pouvez maintenant relancer le site avec DEMARRER_COMPLET.bat
echo.
pause




