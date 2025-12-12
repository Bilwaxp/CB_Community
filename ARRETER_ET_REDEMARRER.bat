@echo off
setlocal enabledelayedexpansion
title CB_Community - Arreter et Redemarrer
color 0C
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   ARRET ET REDEMARRAGE DU SERVEUR
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

echo [1/3] Arret de tous les processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
if errorlevel 1 (
    echo [INFO] Aucun processus Node.js trouve
) else (
    echo [OK] Processus Node.js arretes
)
timeout /t 3 /nobreak >nul
echo.

echo [2/3] Verification du port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if errorlevel 1 (
    echo [OK] Port 3000 libre
) else (
    echo [ATTENTION] Port 3000 encore utilise
    echo Recherche du processus...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        set PID=%%a
        echo Arret du processus PID: !PID!
        taskkill /F /PID !PID! >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)
echo.

echo [3/3] Redemarrage du serveur...
echo.
timeout /t 2 /nobreak >nul

REM Trouver l'IP locale
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set LOCAL_IP=%%a
    set LOCAL_IP=!LOCAL_IP:~1!
    goto :found_ip
)
:found_ip

cls
echo.
echo ========================================
echo   SERVEUR EN COURS D'EXECUTION
echo ========================================
echo.
echo Le site est maintenant accessible!
echo.
if defined LOCAL_IP (
    echo   - Local:     http://localhost:3000
    echo   - Reseau:    http://%LOCAL_IP%:3000
) else (
    echo   - Local:     http://localhost:3000
)
echo.
echo (Fermez cette fenetre pour arreter le serveur)
echo.
echo ========================================
echo.

REM Demarrer le serveur
if exist ".next\standalone\server.js" (
    echo [INFO] Mode standalone detecte
    echo Demarrage avec node .next/standalone/server.js
    echo.
    node .next/standalone/server.js
) else (
    echo [INFO] Mode normal
    echo Demarrage avec npm start
    echo.
    call npm start
)

pause

