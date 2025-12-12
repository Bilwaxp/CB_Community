@echo off
setlocal enabledelayedexpansion
title CB_Community - Hebergement sur GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   HEBERGEMENT SUR GITHUB
echo ========================================
echo.
echo Ce script va:
echo   1. Initialiser Git
echo   2. Creer .gitignore
echo   3. Preparer le depot
echo.
echo ========================================
echo.
pause

REM ============================================
REM ETAPE 1: Verifier Git
REM ============================================
echo [ETAPE 1/5] Verification de Git...
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe!
    echo.
    echo Telechargez Git depuis: https://git-scm.com/download/win
    echo Installez-le et redemarrez ce script.
    echo.
    pause
    exit /b 1
)
echo [OK] Git installe
git --version
echo.

REM ============================================
REM ETAPE 2: Initialiser Git
REM ============================================
echo [ETAPE 2/5] Initialisation de Git...
echo.

if exist ".git" (
    echo [INFO] Depot Git existe deja
) else (
    git init
    if errorlevel 1 (
        echo [ERREUR] Echec de l'initialisation Git!
        pause
        exit /b 1
    )
    echo [OK] Depot Git initialise
)
echo.

REM ============================================
REM ETAPE 3: Verifier .gitignore
REM ============================================
echo [ETAPE 3/5] Verification de .gitignore...
echo.

if not exist ".gitignore" (
    echo Creation de .gitignore...
    (
        echo # Dependencies
        echo node_modules/
        echo /.pnp
        echo .pnp.js
        echo.
        echo # Testing
        echo /coverage
        echo.
        echo # Next.js
        echo /.next/
        echo /out/
        echo.
        echo # Production
        echo /build
        echo /dist
        echo.
        echo # Misc
        echo .DS_Store
        echo *.pem
        echo.
        echo # Debug
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
        echo.
        echo # Local env files
        echo .env
        echo .env*.local
        echo .env.production
        echo.
        echo # Vercel
        echo .vercel
        echo.
        echo # TypeScript
        echo *.tsbuildinfo
        echo next-env.d.ts
        echo.
        echo # Prisma
        echo prisma/dev.db
        echo prisma/dev.db-journal
        echo prisma/migrations/
        echo.
        echo # Logs
        echo logs
        echo *.log
        echo.
        echo # OS
        echo Thumbs.db
        echo.
        echo # IDE
        echo .vscode/
        echo .idea/
        echo *.swp
        echo *.swo
        echo *~
    ) > .gitignore
    echo [OK] .gitignore cree
) else (
    echo [OK] .gitignore existe deja
)
echo.

REM ============================================
REM ETAPE 4: Ajouter les fichiers
REM ============================================
echo [ETAPE 4/5] Ajout des fichiers...
echo.

git add .
if errorlevel 1 (
    echo [ERREUR] Echec de l'ajout des fichiers!
    pause
    exit /b 1
)
echo [OK] Fichiers ajoutes
echo.

REM ============================================
REM ETAPE 5: Instructions
REM ============================================
echo [ETAPE 5/5] Instructions...
echo.

cls
echo.
echo ========================================
echo   PREPARATION TERMINEE!
echo ========================================
echo.
echo Le depot Git est pret!
echo.
echo PROCHAINES ETAPES:
echo.
echo OPTION 1: SCRIPT AUTOMATIQUE (RECOMMANDE)
echo    → Executez: PUSHER_SUR_GITHUB.bat
echo    → Le script va tout faire automatiquement
echo.
echo OPTION 2: MANUEL
echo    1. CREEZ UN DEPOT SUR GITHUB:
echo       - Allez sur: https://github.com/new
echo       - Nommez votre depot (ex: CB_Community)
echo       - NE cochez PAS "Initialize with README"
echo       - Cliquez sur "Create repository"
echo.
echo    2. LIER VOTRE DEPOT LOCAL:
echo       git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_DEPOT.git
echo.
echo    3. COMMIT ET PUSH:
echo       git commit -m "Initial commit - CB_Community"
echo       git branch -M main
echo       git push -u origin main
echo.
echo ========================================
echo.
echo IMPORTANT:
echo - Le fichier .env NE sera PAS envoye (securite)
echo - La base de donnees NE sera PAS envoyee
echo - Vous devrez recreer .env sur le serveur
echo.
echo ========================================
echo.
pause

