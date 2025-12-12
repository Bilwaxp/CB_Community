@echo off
setlocal enabledelayedexpansion
title CB_Community - Hébergement GitHub Complet
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   HEBERGEMENT SUR GITHUB
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
    echo [ERREUR] Git n'est pas installe!
    echo.
    echo ========================================
    echo   INSTALLATION DE GIT REQUISE
    echo ========================================
    echo.
    echo Vous devez installer Git avant de continuer.
    echo.
    echo OPTION 1: Installation automatique
    echo   1. Executez: INSTALLER_GIT.bat
    echo   2. Suivez les instructions
    echo   3. Redemarrez votre ordinateur
    echo   4. Relancez ce script
    echo.
    echo OPTION 2: Installation manuelle
    echo   1. Telechargez: https://git-scm.com/download/win
    echo   2. Installez Git
    echo   3. Redemarrez votre ordinateur
    echo   4. Relancez ce script
    echo.
    echo OPTION 3: Utiliser GitHub Desktop
    echo   1. Telechargez: https://desktop.github.com
    echo   2. Installez GitHub Desktop
    echo   3. Utilisez l'interface graphique
    echo.
    echo ========================================
    echo.
    choice /C ON /M "Voulez-vous ouvrir la page de telechargement?"
    if errorlevel 2 goto :end
    if errorlevel 1 (
        start https://git-scm.com/download/win
        echo.
        echo Page de telechargement ouverte.
    )
    echo.
    pause
    exit /b 1
)

echo [OK] Git installe
git --version
echo.

REM Vérifier si Git est déjà initialisé
if not exist ".git" (
    echo Initialisation de Git...
    git init
    if errorlevel 1 (
        echo [ERREUR] Echec de l'initialisation!
        pause
        exit /b 1
    )
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

REM Faire le commit
echo Creation du commit...
git commit -m "Initial commit - CB_Community" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Aucun changement a commiter
) else (
    echo [OK] Commit cree
)
echo.

REM Vérifier si remote existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ========================================
    echo   CONFIGURATION DU DEPOT GITHUB
    echo ========================================
    echo.
    echo Vous devez d'abord creer un depot sur GitHub:
    echo.
    echo ETAPE 1: Creer le depot
    echo   → Allez sur: https://github.com/new
    echo   → Nommez votre depot (ex: CB_Community)
    echo   → NE cochez PAS "Initialize with README"
    echo   → Cliquez sur "Create repository"
    echo.
    echo ETAPE 2: Copier l'URL
    echo   → Copiez l'URL de votre depot
    echo   → Exemple: https://github.com/VOTRE_USERNAME/CB_Community.git
    echo.
    echo ========================================
    echo.
    set /p GITHUB_URL="Entrez l'URL de votre depot GitHub: "
    
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
)

REM Changer la branche en main
git branch -M main >nul 2>&1

REM Pousser vers GitHub
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
    echo Pour verifier l'URL:
    echo   git remote -v
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

:end
echo.
pause

