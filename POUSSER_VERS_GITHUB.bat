@echo off
setlocal enabledelayedexpansion
title CB_Community - Pousser vers GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   POUSSER VERS GITHUB
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

REM Verifier si remote existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [INFO] Aucun depot GitHub configure
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
) else (
    echo [OK] Depot GitHub deja configure
    git remote get-url origin
    echo.
)

REM Changer la branche en main
git branch --show-current | findstr /i "main" >nul
if errorlevel 1 (
    echo Changement de branche vers main...
    git branch -M main
    echo [OK] Branche changee vers main
    echo.
)

REM Instructions pour le push
echo ========================================
echo   PUSH VERS GITHUB
echo ========================================
echo.
echo IMPORTANT: Authentification GitHub
echo.
echo GitHub ne permet plus d'utiliser votre mot de passe.
echo Vous devez utiliser un token d'acces.
echo.
echo Si vous n'avez pas de token:
echo   1. Allez sur: https://github.com/settings/tokens
echo   2. Cliquez sur "Generate new token" ^> "Generate new token (classic)"
echo   3. Donnez un nom (ex: CB_Community)
echo   4. Cochez "repo" (toutes les permissions)
echo   5. Cliquez sur "Generate token"
echo   6. COPIEZ le token (vous ne le reverrez plus!)
echo.
echo ========================================
echo.
echo Quand Git vous demande:
echo   Username: VOTRE_USERNAME_GITHUB
echo   Password: VOTRE_TOKEN_GITHUB (pas votre mot de passe!)
echo.
echo ========================================
echo.
pause

echo.
echo Poussee du code vers GitHub...
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   ERREUR LORS DU PUSH
    echo ========================================
    echo.
    echo Verifiez:
    echo   1. Que le depot existe sur GitHub
    echo   2. Que vous avez les droits d'ecriture
    echo   3. Que vous utilisez un token d'acces (pas votre mot de passe)
    echo   4. Que l'URL du depot est correcte
    echo.
    echo Pour creer un token:
    echo   https://github.com/settings/tokens
    echo.
) else (
    echo.
    echo ========================================
    echo   SUCCES!
    echo ========================================
    echo.
    echo Votre code est maintenant sur GitHub!
    echo.
    echo URL du depot:
    git remote get-url origin
    echo.
    echo Vous pouvez maintenant:
    echo   - Voir votre code sur GitHub
    echo   - Partager le depot avec d'autres
    echo   - Configurer le deploiement (Vercel, Netlify, etc.)
    echo.
)

pause

