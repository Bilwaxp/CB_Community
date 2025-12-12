@echo off
setlocal enabledelayedexpansion
title CB_Community - Déploiement Vercel
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DEPLOIEMENT SUR VERCEL
echo ========================================
echo.

REM Vérifier si les fichiers de configuration existent
if exist "vercel.json" (
    echo [OK] vercel.json existe
) else (
    echo [INFO] vercel.json sera cree lors du deploiement
)
echo.

REM Vérifier package.json
findstr /C:"postinstall" package.json >nul
if errorlevel 1 (
    echo [ERREUR] postinstall manquant dans package.json!
    echo.
    echo Executez d'abord: CONFIGURER_VERCEL.bat
    pause
    exit /b 1
) else (
    echo [OK] postinstall configure dans package.json
)
echo.

echo ========================================
echo   INSTRUCTIONS
echo ========================================
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
echo Apres avoir cree la base de donnees:
echo   1. Copiez l'URL de connexion
echo   2. Ajoutez-la dans Vercel comme DATABASE_URL
echo   3. Redeployez le projet
echo.
echo ========================================
echo.
choice /C ON /M "Voulez-vous ouvrir Vercel maintenant?"
if errorlevel 2 goto :end
if errorlevel 1 (
    start https://vercel.com
    echo.
    echo Page Vercel ouverte dans votre navigateur.
    echo.
    echo Suivez les instructions ci-dessus.
)

:end
echo.
pause

