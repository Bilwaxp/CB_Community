@echo off
title Generer NEXTAUTH_SECRET
color 0B
cls

echo.
echo ========================================
echo   GENERATION DE CLE SECRETE
echo ========================================
echo.
echo Generation d'une cle secrete aleatoire pour NEXTAUTH_SECRET...
echo.

REM Générer une clé secrète aléatoire
for /f "delims=" %%i in ('powershell -Command "[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString())).Substring(0,64)"') do set SECRET=%%i

echo Votre cle secrete genere:
echo.
echo %SECRET%
echo.
echo ========================================
echo.
echo Instructions:
echo 1. Copiez la cle ci-dessus
echo 2. Ouvrez le fichier .env
echo 3. Remplacez la valeur de NEXTAUTH_SECRET par cette cle
echo 4. Sauvegardez le fichier .env
echo.
echo Exemple dans .env:
echo NEXTAUTH_SECRET=%SECRET%
echo.
pause

