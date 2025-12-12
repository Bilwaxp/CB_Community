@echo off
title Finalisation SQLite
color 0A

echo.
echo ========================================
echo   FINALISATION CONFIGURATION SQLITE
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation!
    pause
    exit /b 1
)

echo.
echo [2/2] Creation de la base de donnees SQLite...
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo ERREUR lors de la creation de la base de donnees!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo La base de donnees SQLite a ete creee: dev.db
echo Vous pouvez maintenant lancer le site avec INSTALL_ET_LANCER.bat
echo.
pause





