@echo off
title Configuration du mot de passe email
color 0E

echo.
echo ========================================
echo   CONFIGURATION MOT DE PASSE EMAIL GMAIL
echo ========================================
echo.
echo Email configure: cbcommunity7@gmail.com
echo.
echo IMPORTANT: Gmail necessite un "Mot de passe d'application"
echo.
echo Pour creer un mot de passe d'application:
echo 1. Allez sur: https://myaccount.google.com/apppasswords
echo 2. Selectionnez "Autre (nom personnalise)"
echo 3. Entrez "CB_Community" comme nom
echo 4. Cliquez sur "Generer"
echo 5. Copiez le mot de passe de 16 caracteres
echo.
echo.
set /p PASSWORD="Entrez le mot de passe d'application Gmail: "

if "%PASSWORD%"=="" (
    echo.
    echo ERREUR: Mot de passe vide!
    pause
    exit /b 1
)

echo.
echo Mise a jour du fichier .env...

REM Lire le fichier .env et mettre à jour SMTP_PASSWORD
powershell -Command "(Get-Content .env) -replace 'SMTP_PASSWORD=.*', 'SMTP_PASSWORD=%PASSWORD%' | Set-Content .env"

echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Le mot de passe a ete ajoute au fichier .env
echo Les emails de verification seront maintenant envoyes depuis cbcommunity7@gmail.com
echo.
pause




