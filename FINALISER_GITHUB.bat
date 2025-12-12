@echo off
setlocal enabledelayedexpansion
title CB_Community - Finalisation GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   FINALISATION POUR GITHUB
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

if !GIT_FOUND!==1 (
    set "PATH=%GIT_PATH%;%PATH%"
)

REM Vérifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe!
    echo Executez INSTALLER_GIT.bat d'abord.
    pause
    exit /b 1
)

echo [OK] Git trouve
echo.

REM Configurer Git si nécessaire
git config user.email >nul 2>&1
if errorlevel 1 (
    echo Configuration de Git...
    echo.
    echo Entrez votre email GitHub (ou appuyez sur Entree pour utiliser l'email par defaut):
    set /p GIT_EMAIL="Email: "
    if "!GIT_EMAIL!"=="" (
        set "GIT_EMAIL=cb-community@example.com"
    )
    
    echo.
    echo Entrez votre nom (ou appuyez sur Entree pour utiliser le nom par defaut):
    set /p GIT_NAME="Nom: "
    if "!GIT_NAME!"=="" (
        set "GIT_NAME=CB Community"
    )
    
    git config user.email "!GIT_EMAIL!"
    git config user.name "!GIT_NAME!"
    echo [OK] Git configure
    echo.
) else (
    echo [OK] Git deja configure
    git config user.name
    git config user.email
    echo.
)

REM Vérifier si Git est initialisé
if not exist ".git" (
    echo Initialisation de Git...
    git init
    echo [OK] Git initialise
    echo.
)

REM Vérifier .gitignore
if not exist ".gitignore" (
    echo Creation de .gitignore...
    (
        echo # Dependencies
        echo /node_modules/
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
        echo.
        echo # Uploads
        echo /uploads/
        echo /public/uploads/
    ) > .gitignore
    echo [OK] .gitignore cree
) else (
    echo [OK] .gitignore existe deja
)
echo.

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

REM Créer le commit
git diff --cached --quiet
if errorlevel 1 (
    echo Creation du commit...
    git commit -m "Initial commit - CB_Community"
    if errorlevel 1 (
        echo [ERREUR] Echec du commit!
        pause
        exit /b 1
    )
    echo [OK] Commit cree
) else (
    git log --oneline -1 >nul 2>&1
    if errorlevel 1 (
        echo Creation d'un commit initial...
        git commit --allow-empty -m "Initial commit - CB_Community"
        echo [OK] Commit initial cree
    ) else (
        echo [OK] Commit deja existe
    )
)
echo.

REM Afficher le statut
echo ========================================
echo   STATUT DU DEPOT
echo ========================================
echo.
echo Branche actuelle:
git branch --show-current
echo.
echo Dernier commit:
git log --oneline -1
echo.
echo Fichiers dans le depot:
git ls-files | find /c /v "" >nul
if errorlevel 1 (
    echo Aucun fichier
) else (
    git ls-files | find /c /v ""
    echo fichier(s) suivis
)
echo.

REM Vérifier si remote existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ========================================
    echo   DEPOT PRET POUR GITHUB
    echo ========================================
    echo.
    echo Le depot local est pret!
    echo.
    echo PROCHAINES ETAPES:
    echo.
    echo 1. CREEZ UN DEPOT SUR GITHUB:
    echo    → https://github.com/new
    echo    → Nommez-le (ex: CB_Community)
    echo    → NE cochez PAS "Initialize with README"
    echo    → Cliquez sur "Create repository"
    echo.
    echo 2. LIER LE DEPOT:
    echo    git remote add origin https://github.com/VOTRE_USERNAME/CB_Community.git
    echo.
    echo 3. POUSSER LE CODE:
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    echo OU executez: HEBERGER_GITHUB_COMPLET.bat
    echo.
) else (
    echo ========================================
    echo   DEPOT DEJA CONFIGURE
    echo ========================================
    echo.
    echo Remote GitHub:
    git remote get-url origin
    echo.
    echo Pour pousser vers GitHub:
    echo   git push -u origin main
    echo.
)

echo ========================================
echo.
pause

