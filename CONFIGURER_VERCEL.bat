@echo off
setlocal enabledelayedexpansion
title CB_Community - Configuration Vercel
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CONFIGURATION POUR VERCEL
echo ========================================
echo.

REM Vérifier si vercel.json existe
if exist "vercel.json" (
    echo [OK] vercel.json existe deja
) else (
    echo Creation de vercel.json...
    (
        echo {
        echo   "buildCommand": "npm run build",
        echo   "installCommand": "npm install",
        echo   "framework": "nextjs",
        echo   "outputDirectory": ".next"
        echo }
    ) > vercel.json
    echo [OK] vercel.json cree
)
echo.

REM Vérifier package.json pour postinstall
findstr /C:"postinstall" package.json >nul
if errorlevel 1 (
    echo Ajout de postinstall dans package.json...
    echo.
    echo ATTENTION: Modification manuelle requise!
    echo.
    echo Ajoutez cette ligne dans package.json, dans la section "scripts":
    echo   "postinstall": "prisma generate",
    echo.
    echo Exemple:
    echo   "scripts": {
    echo     "dev": "next dev",
    echo     "build": "next build",
    echo     "postinstall": "prisma generate",
    echo     ...
    echo   }
    echo.
) else (
    echo [OK] postinstall deja configure
)
echo.

REM Créer un fichier .env.example pour référence
if not exist ".env.example" (
    echo Creation de .env.example...
    (
        echo # Database
        echo DATABASE_URL=file:./prisma/dev.db
        echo.
        echo # NextAuth
        echo NEXTAUTH_SECRET=your-secret-here
        echo NEXTAUTH_URL=http://localhost:3000
        echo.
        echo # Google OAuth (optional)
        echo GOOGLE_CLIENT_ID=
        echo GOOGLE_CLIENT_SECRET=
        echo.
        echo # Stripe (optional)
        echo STRIPE_SECRET_KEY=
        echo STRIPE_PUBLISHABLE_KEY=
        echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
        echo.
        echo # SMTP (optional)
        echo SMTP_HOST=
        echo SMTP_PORT=
        echo SMTP_USER=
        echo SMTP_PASSWORD=
        echo SMTP_FROM=
    ) > .env.example
    echo [OK] .env.example cree
) else (
    echo [OK] .env.example existe deja
)
echo.

echo ========================================
echo   CONFIGURATION TERMINEE
echo ========================================
echo.
echo PROCHAINES ETAPES:
echo.
echo 1. MODIFIEZ package.json:
echo    Ajoutez "postinstall": "prisma generate" dans scripts
echo.
echo 2. ALLEZ SUR VERCEL:
echo    https://vercel.com
echo.
echo 3. DEPLOYEZ VOTRE PROJET:
echo    - Importez le depot GitHub
echo    - Configurez les variables d'environnement
echo    - Deployez!
echo.
echo 4. CONFIGUREZ UNE BASE DE DONNEES DISTANTE:
echo    - Supabase, PlanetScale, ou Neon
echo    - Mettez a jour DATABASE_URL dans Vercel
echo.
echo ========================================
echo.
pause

