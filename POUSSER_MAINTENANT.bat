@echo off
setlocal enabledelayedexpansion
title CB_Community - Push GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   PUSH VERS GITHUB
echo ========================================
echo.

REM Chercher Git dans les chemins communs
set "GIT_FOUND=0"
set "GIT_PATH="

if exist "C:\Program Files\Git\cmd\git.exe" (
    set "GIT_PATH=C:\Program Files\Git\cmd"
    set "GIT_FOUND=1"
)
if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
    set "GIT_PATH=C:\Program Files (x86)\Git\cmd"
    set "GIT_FOUND=1"
)
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
    set "GIT_PATH=%LOCALAPPDATA%\Programs\Git\cmd"
    set "GIT_FOUND=1"
)

if !GIT_FOUND!==0 (
    echo [ERREUR] Git n'est pas trouve!
    echo.
    echo Installez Git depuis: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Ajouter Git au PATH
set "PATH=!GIT_PATH!;%PATH%"

echo [OK] Git trouve: !GIT_PATH!
echo.

REM Configurer le remote
echo Configuration du depot GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Bilwaxp/CB_Community.git
if errorlevel 1 (
    echo [ERREUR] Echec de la configuration!
    pause
    exit /b 1
)
echo [OK] Remote configure: https://github.com/Bilwaxp/CB_Community.git
echo.

REM Changer la branche en main
echo Changement de branche vers main...
git branch -M main >nul 2>&1
echo [OK] Branche changee vers main
echo.

REM Afficher le statut
echo ========================================
echo   STATUT
echo ========================================
echo.
echo Remote:
git remote -v
echo.
echo Branche:
git branch --show-current
echo.
echo Dernier commit:
git log --oneline -1
echo.

REM Push avec token dans l'URL
echo ========================================
echo   PUSH VERS GITHUB
echo ========================================
echo.
echo Poussee du code vers GitHub...
echo.

git push https://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@github.com/Bilwaxp/CB_Community.git main

if errorlevel 1 (
    echo.
    echo [ERREUR] Echec du push!
    echo.
    echo Verifiez:
    echo   1. Que le token est valide
    echo   2. Que le depot existe sur GitHub
    echo   3. Que vous avez les droits d'ecriture
    echo.
    echo URL du depot: https://github.com/Bilwaxp/CB_Community
    echo.
) else (
    echo.
    echo ========================================
    echo   SUCCES!
    echo ========================================
    echo.
    echo Votre code est maintenant sur GitHub!
    echo.
    echo URL: https://github.com/Bilwaxp/CB_Community
    echo.
    echo Vous pouvez maintenant:
    echo   - Voir votre code sur GitHub
    echo   - Partager le depot avec d'autres
    echo   - Configurer le deploiement (Vercel, Netlify, etc.)
    echo.
)

echo ========================================
echo.
pause

