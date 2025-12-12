@echo off
setlocal enabledelayedexpansion
title CB_Community - Hébergement en ligne
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   HEBERGEMENT EN LIGNE
echo ========================================
echo.
echo Votre code est deja sur GitHub:
echo https://github.com/Bilwaxp/CB_Community
echo.
echo ========================================
echo   OPTIONS D'HEBERGEMENT
echo ========================================
echo.
echo 1. VERCEL (RECOMMANDE pour Next.js)
echo    - Gratuit
echo    - Facile a utiliser
echo    - Deploiement automatique
echo    - URL: https://vercel.com
echo.
echo 2. NETLIFY
echo    - Gratuit
echo    - Facile a utiliser
echo    - URL: https://netlify.com
echo.
echo 3. RAILWAY
echo    - Gratuit (avec limites)
echo    - URL: https://railway.app
echo.
echo 4. RENDER
echo    - Gratuit (avec limites)
echo    - URL: https://render.com
echo.
echo ========================================
echo.
echo INSTRUCTIONS POUR VERCEL (RECOMMANDE):
echo.
echo 1. Allez sur: https://vercel.com
echo 2. Cliquez sur "Sign Up" (inscrivez-vous)
echo 3. Connectez votre compte GitHub
echo 4. Cliquez sur "Add New Project"
echo 5. Selectionnez le depot: Bilwaxp/CB_Community
echo 6. Cliquez sur "Deploy"
echo 7. Vercel va deployer automatiquement votre site!
echo.
echo ========================================
echo.
echo IMPORTANT - CONFIGURATION REQUISE:
echo.
echo Apres le deploiement, vous devez configurer:
echo.
echo 1. Variables d'environnement (.env):
echo    - Allez dans Settings ^> Environment Variables
echo    - Ajoutez toutes les variables de votre .env
echo    - Exemple: DATABASE_URL, NEXTAUTH_SECRET, etc.
echo.
echo 2. Base de donnees:
echo    - Vercel utilise SQLite par defaut
echo    - Pour la production, utilisez une base de donnees distante
echo    - Options: Supabase, PlanetScale, ou autre
echo.
echo 3. Rebuild:
echo    - Apres avoir ajoute les variables
echo    - Allez dans Deployments
echo    - Cliquez sur "Redeploy"
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
    echo Suivez les instructions ci-dessus pour deployer.
)

:end
echo.
pause

