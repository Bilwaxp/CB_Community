@echo off
title CB_Community - Verification Serveur
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   VERIFICATION DU SERVEUR
echo ========================================
echo.

echo [1/3] Verification processus Node.js...
tasklist | findstr node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Processus Node.js en cours:
    tasklist | findstr node.exe
) else (
    echo [ERREUR] Aucun processus Node.js en cours
    echo.
    echo Le serveur n'est pas demarre!
    echo Lancez: DEMARRER_MAINTENANT.bat
    echo.
    pause
    exit /b 1
)
echo.

echo [2/3] Verification port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Port 3000 est ouvert:
    netstat -ano | findstr :3000
    echo.
    echo Le serveur est accessible sur: http://localhost:3000
) else (
    echo [ATTENTION] Port 3000 n'est pas encore ouvert
    echo.
    echo Le serveur est peut-etre en cours de demarrage.
    echo Attendez 30 secondes a 2 minutes pour le premier demarrage.
    echo.
    echo Verifiez la fenetre du serveur pour voir les messages.
)
echo.

echo [3/3] Test de connexion...
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Le serveur repond!
    echo.
    echo Ouvrez votre navigateur sur: http://localhost:3000
) else (
    echo [ATTENTION] Le serveur ne repond pas encore
    echo.
    echo Cela peut signifier:
    echo - Le serveur est en cours de compilation (attendez 1-2 minutes)
    echo - Il y a une erreur dans la fenetre du serveur
    echo.
    echo Verifiez la fenetre du serveur pour les messages d'erreur.
)
echo.

echo ========================================
echo.
echo Pour demarrer le serveur:
echo   Double-cliquez sur: DEMARRER_MAINTENANT.bat
echo.
pause
