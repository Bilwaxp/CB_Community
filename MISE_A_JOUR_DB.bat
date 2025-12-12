@echo off
title Mise a jour de la base de donnees
color 0E

echo.
echo ========================================
echo   MISE A JOUR DE LA BASE DE DONNEES
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)

echo.
echo [2/2] Mise a jour du schema de la base de donnees...
call npx prisma db push
if errorlevel 1 (
    echo ERREUR lors de la mise a jour de la base de donnees!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   MISE A JOUR TERMINEE AVEC SUCCES!
echo ========================================
echo.
pause






