@echo off
setlocal enabledelayedexpansion
title CB_Community - Préparation GitHub
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   PREPARATION POUR GITHUB
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

REM Ajouter Git au PATH si trouvé
if !GIT_FOUND!==1 (
    set "PATH=%GIT_PATH%;%PATH%"
)

REM Vérifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe ou pas dans le PATH
    echo.
    echo Le depot Git existe deja, mais Git n'est pas accessible.
    echo.
    echo SOLUTIONS:
    echo   1. Installez Git: https://git-scm.com/download/win
    echo   2. Redemarrez votre ordinateur apres l'installation
    echo   3. Relancez ce script
    echo.
    echo OU utilisez GitHub Desktop:
    echo   https://desktop.github.com
    echo.
    pause
    exit /b 1
)

echo [OK] Git trouve
git --version
echo.

REM Vérifier si Git est initialisé
if not exist ".git" (
    echo Initialisation de Git...
    git init
    if errorlevel 1 (
        echo [ERREUR] Echec de l'initialisation!
        pause
        exit /b 1
    )
    echo [OK] Git initialise
) else (
    echo [OK] Git deja initialise
)
echo.

REM Vérifier .gitignore
if not exist ".gitignore" (
    echo Creation de .gitignore...
    call :CREATE_GITIGNORE
    echo [OK] .gitignore cree
) else (
    echo [OK] .gitignore existe deja
    echo.
    echo Verification du contenu...
    findstr /C:"prisma/dev.db" .gitignore >nul
    if errorlevel 1 (
        echo [INFO] Ajout de regles manquantes...
        call :UPDATE_GITIGNORE
    )
)
echo.

REM Ajouter tous les fichiers
echo Ajout des fichiers au staging...
git add .
if errorlevel 1 (
    echo [ERREUR] Echec de l'ajout!
    pause
    exit /b 1
)
echo [OK] Fichiers ajoutes
echo.

REM Vérifier s'il y a des changements
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
    echo [INFO] Aucun changement a commiter
    git log --oneline -1 >nul 2>&1
    if errorlevel 1 (
        echo [INFO] Creation d'un commit initial...
        git commit --allow-empty -m "Initial commit - CB_Community"
        echo [OK] Commit initial cree
    ) else (
        echo [OK] Commit deja existe
        git log --oneline -1
    )
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
    echo Branche actuelle:
    git branch --show-current
    echo.
    echo Dernier commit:
    git log --oneline -1
    echo.
    echo Pour pousser vers GitHub:
    echo   git push -u origin main
    echo.
)

echo ========================================
echo.
pause
exit /b 0

:CREATE_GITIGNORE
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
exit /b

:UPDATE_GITIGNORE
(
    echo.
    echo # Prisma - Database
    echo prisma/dev.db
    echo prisma/dev.db-journal
    echo prisma/migrations/
    echo *.db
    echo *.db-journal
) >> .gitignore
exit /b

