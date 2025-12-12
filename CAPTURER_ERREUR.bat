@echo off
setlocal enabledelayedexpansion
title CB_Community - Capture d'Erreur
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CAPTURE D'ERREUR DU SERVEUR
echo ========================================
echo.
echo Ce script va lancer le serveur et capturer toutes les erreurs.
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur.
echo.
pause

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

REM Arrêter les processus existants
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo Lancement du serveur...
echo Les erreurs seront affichees ci-dessous:
echo.
echo ========================================
echo.

REM Lancer et capturer les erreurs
call npm run dev 2>&1 | tee erreurs_serveur.txt

echo.
echo ========================================
echo   SERVEUR ARRETE
echo ========================================
echo.
echo Les erreurs ont ete sauvegardees dans: erreurs_serveur.txt
echo.
pause

