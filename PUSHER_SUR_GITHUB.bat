@echo off
setlocal enabledelayedexpansion
title CB_Community - Pousser sur GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   PUSH SUR GITHUB
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

REM Verifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe!
    echo.
    echo Executez d'abord INSTALLER_GIT.bat
    pause
    exit /b 1
)

echo [OK] Git installe
echo.

REM Verifier si Git est deja initialise
if not exist ".git" (
    echo Initialisation de Git...
    git init
    if errorlevel 1 (
        echo [ERREUR] Echec de l'initialisation!
        pause
        exit /b 1
    )
    echo [OK] Git initialise
    echo.
)

REM Verifier .gitignore
if not exist ".gitignore" (
    echo Creation de .gitignore...
    call HEBERGER_SUR_GITHUB.bat
    echo.
)

REM Ajouter tous les fichiers
echo Ajout des fichiers...
git add .
if errorlevel 1 (
    echo [ERREUR] Echec de l'ajout!
    pause
    exit /b 1
)
echo [OK] Fichiers ajoutes
echo.

REM Faire le commit
echo Creation du commit...
git commit -m "Initial commit - CB_Community" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Aucun changement a commiter
) else (
    echo [OK] Commit cree
)
echo.

REM Verifier si remote existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ========================================
    echo   CONFIGURATION DU DEPOT GITHUB
    echo ========================================
    echo.
    echo Vous devez d'abord creer un depot sur GitHub:
    echo   1. Allez sur: https://github.com/new
    echo   2. Nommez votre depot (ex: CB_Community)
    echo   3. NE cochez PAS "Initialize with README"
    echo   4. Cliquez sur "Create repository"
    echo.
    echo Ensuite, entrez l'URL de votre depot:
    echo   Exemple: https://github.com/VOTRE_USERNAME/CB_Community.git
    echo.
    set /p GITHUB_URL="URL du depot GitHub: "
    
    if "!GITHUB_URL!"=="" (
        echo [ERREUR] URL non fournie
        pause
        exit /b 1
    )
    
    git remote add origin !GITHUB_URL!
    if errorlevel 1 (
        echo [ERREUR] Echec de l'ajout du remote!
        pause
        exit /b 1
    )
    echo [OK] Remote ajoute
    echo.
)

REM Changer la branche en main
git branch -M main >nul 2>&1

REM Pousser vers GitHub
echo ========================================
echo   PUSH VERS GITHUB
echo ========================================
echo.
echo Poussee du code vers GitHub...
echo.
echo Si Git demande vos identifiants:
echo   - Nom d'utilisateur: VOTRE_USERNAME_GITHUB
echo   - Mot de passe: VOTRE_TOKEN_GITHUB (pas votre mot de passe!)
echo.
echo Pour creer un token:
echo   https://github.com/settings/tokens
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERREUR] Echec du push!
    echo.
    echo Verifiez:
    echo   1. Que le depot existe sur GitHub
    echo   2. Que vous avez les droits d'ecriture
    echo   3. Que vous utilisez un token d'acces (pas votre mot de passe)
    echo.
) else (
    echo.
    echo ========================================
    echo   SUCCES!
    echo ========================================
    echo.
    echo Votre code est maintenant sur GitHub!
    echo.
    git remote get-url origin
    echo.
)

pause

