@echo off
setlocal enabledelayedexpansion
title CB_Community - Configuration GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION GITHUB
echo ========================================
echo.

REM Chercher Git
set "GIT_PATH="
if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_PATH=C:\Program Files\Git\cmd"
if exist "C:\Program Files (x86)\Git\cmd\git.exe" set "GIT_PATH=C:\Program Files (x86)\Git\cmd"
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "GIT_PATH=%LOCALAPPDATA%\Programs\Git\cmd"

if not "!GIT_PATH!"=="" set "PATH=!GIT_PATH!;%PATH%"

git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe!
    pause
    exit /b 1
)

echo [OK] Git trouve
echo.

REM Configurer Git
git config user.email >nul 2>&1
if errorlevel 1 (
    git config user.email "cb-community@example.com"
    git config user.name "CB Community"
    echo [OK] Git configure
) else (
    echo [OK] Git deja configure
)
echo.

REM Initialiser Git si necessaire
if not exist ".git" (
    git init
    echo [OK] Git initialise
    echo.
)

REM Ajouter fichiers
echo Ajout des fichiers...
git add .
echo [OK] Fichiers ajoutes
echo.

REM Commit
git diff --cached --quiet
if not errorlevel 1 (
    git log --oneline -1 >nul 2>&1
    if errorlevel 1 (
        git commit --allow-empty -m "Initial commit - CB_Community"
    )
) else (
    git commit -m "Initial commit - CB_Community"
)
echo [OK] Commit cree
echo.

REM Afficher statut
echo ========================================
echo   DEPOT PRET
echo ========================================
echo.
echo Branche: 
git branch --show-current
echo.
echo Dernier commit:
git log --oneline -1
echo.

REM Verifier remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo PROCHAINES ETAPES:
    echo.
    echo 1. Creez un depot sur: https://github.com/new
    echo 2. Executez: HEBERGER_GITHUB_COMPLET.bat
    echo    OU
    echo    git remote add origin https://github.com/VOTRE_USERNAME/CB_Community.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
) else (
    echo Remote GitHub:
    git remote get-url origin
    echo.
    echo Pour pousser:
    echo   git push -u origin main
    echo.
)

pause

