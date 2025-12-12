@echo off
setlocal enabledelayedexpansion
title CB_Community - Resoudre Port 3000
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   RESOLUTION DU PORT 3000
echo ========================================
echo.
echo Ce script va liberer le port 3000.
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
timeout /t 2 /nobreak >nul
echo.

echo [2/3] Recherche des processus utilisant le port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if errorlevel 1 (
    echo [OK] Port 3000 libre
) else (
    echo [ATTENTION] Port 3000 encore utilise
    echo.
    echo Processus utilisant le port 3000:
    netstat -ano | findstr :3000
    echo.
    echo Arret des processus...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        set PID=%%a
        echo   - Arret du processus PID: !PID!
        taskkill /F /PID !PID! >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)
echo.

echo [3/3] Verification finale...
timeout /t 1 /nobreak >nul
netstat -ano | findstr :3000 >nul 2>&1
if errorlevel 1 (
    echo [OK] Port 3000 maintenant libre!
) else (
    echo [ERREUR] Port 3000 toujours utilise
    echo.
    echo Essayez de redemarrer votre ordinateur ou fermez
    echo manuellement les applications utilisant le port 3000.
)
echo.

echo ========================================
echo   RESOLUTION TERMINEE
echo ========================================
echo.
echo Vous pouvez maintenant relancer le serveur.
echo.
pause

