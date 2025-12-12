@echo off
setlocal enabledelayedexpansion
title CB_Community - Finalisation et Déploiement
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   FINALISATION ET DEPLOIEMENT
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

REM Ajouter les fichiers modifiés
echo Ajout des fichiers...
git add package.json vercel.json .env.example 2>nul
git add -A
echo [OK] Fichiers ajoutes
echo.

REM Commit
echo Creation du commit...
git commit -m "Configure for Vercel deployment" >nul 2>&1
if errorlevel 1 (
    git status --porcelain | findstr /R "." >nul
    if errorlevel 1 (
        echo [INFO] Aucun changement a commiter
    ) else (
        echo [INFO] Commit cree
    )
) else (
    echo [OK] Commit cree
)
echo.

REM Push
echo Poussee vers GitHub...
git push https://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@github.com/Bilwaxp/CB_Community.git main
if errorlevel 1 (
    echo [ERREUR] Echec du push!
    pause
    exit /b 1
)
echo [OK] Code pousse vers GitHub
echo.

echo ========================================
echo   DEPLOIEMENT SUR VERCEL
echo ========================================
echo.
echo Votre code est maintenant sur GitHub!
echo.
echo PROCHAINES ETAPES:
echo.
echo 1. OUVREZ VERCEL:
echo    https://vercel.com
echo.
echo 2. CONNECTEZ VOTRE COMPTE GITHUB
echo.
echo 3. IMPORTEZ LE DEPOT:
echo    - Cliquez sur "Add New Project"
echo    - Selectionnez "Bilwaxp/CB_Community"
echo    - Cliquez sur "Import"
echo.
echo 4. CONFIGUREZ LES VARIABLES D'ENVIRONNEMENT:
echo    - Allez dans Settings ^> Environment Variables
echo    - Ajoutez toutes les variables de votre .env
echo    - IMPORTANT: Changez DATABASE_URL pour une base distante
echo.
echo 5. DEPLOYEZ:
echo    - Cliquez sur "Deploy"
echo    - Attendez 2-5 minutes
echo    - Votre site sera en ligne!
echo.
echo ========================================
echo.
echo IMPORTANT - BASE DE DONNEES:
echo.
echo SQLite ne fonctionne pas sur Vercel.
echo Vous devez utiliser une base de donnees distante:
echo.
echo OPTIONS GRATUITES:
echo   - Supabase: https://supabase.com
echo   - PlanetScale: https://planetscale.com
echo   - Neon: https://neon.tech
echo.
echo ========================================
echo.
choice /C ON /M "Voulez-vous ouvrir Vercel maintenant?"
if errorlevel 2 goto :end
if errorlevel 1 (
    start https://vercel.com
    echo.
    echo Page Vercel ouverte dans votre navigateur.
)

:end
echo.
pause

