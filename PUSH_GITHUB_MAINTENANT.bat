@echo off
setlocal enabledelayedexpansion
title CB_Community - Push vers GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   PUSH VERS GITHUB
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

REM Configurer le remote
echo Configuration du depot GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Bilwaxp/CB_Community.git
if errorlevel 1 (
    echo [ERREUR] Echec de la configuration du remote!
    pause
    exit /b 1
)
echo [OK] Remote configure
echo.

REM Changer la branche en main
echo Changement de branche vers main...
git branch -M main
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

REM Instructions pour le push avec token
echo ========================================
echo   PUSH VERS GITHUB
echo ========================================
echo.
echo Pour pousser le code, utilisez cette commande:
echo.
echo   git push -u origin main
echo.
echo Quand Git demande vos identifiants:
echo   Username: Bilwaxp
echo   Password: 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
echo.
echo OU utilisez cette commande avec le token:
echo   git push https://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@github.com/Bilwaxp/CB_Community.git main
echo.
echo ========================================
echo.
choice /C ON /M "Voulez-vous pousser maintenant?"
if errorlevel 2 goto :end
if errorlevel 1 (
    echo.
    echo Poussee du code vers GitHub...
    echo.
    git push -u origin main
    if errorlevel 1 (
        echo.
        echo [ERREUR] Echec du push!
        echo.
        echo Essayez avec cette commande:
        echo   git push https://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@github.com/Bilwaxp/CB_Community.git main
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
    )
)

:end
echo.
pause

