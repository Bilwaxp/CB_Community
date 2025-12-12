@echo off
setlocal enabledelayedexpansion
title CB_Community - Resoudre Probleme Connexion
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   RESOLUTION PROBLEME CONNEXION
echo ========================================
echo.
echo Ce script va diagnostiquer et resoudre
echo le probleme de connexion au serveur.
echo.
pause

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
)

echo.
echo ========================================
echo   ETAPE 1: VERIFICATION PROCESSUS
echo ========================================
echo.

tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if !ERRORLEVEL! EQU 0 (
    echo [INFO] Processus Node.js trouves
    echo.
    echo Arret des processus Node.js existants...
    taskkill /F /IM node.exe >nul 2>&1
    timeout /t 2 /nobreak >nul
    echo [OK] Processus arretes
) else (
    echo [OK] Aucun processus Node.js en cours
)

echo.
echo ========================================
echo   ETAPE 2: VERIFICATION PORT 3000
echo ========================================
echo.

netstat -ano | findstr :3000 >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo [ATTENTION] Le port 3000 est utilise
    echo.
    echo Tentative de liberation du port...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        echo Arret du processus utilisant le port 3000: %%a
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
    echo [OK] Port 3000 libere
) else (
    echo [OK] Port 3000 disponible
)

echo.
echo ========================================
echo   ETAPE 3: VERIFICATION CONFIGURATION
echo ========================================
echo.

if not exist ".env" (
    echo [ERREUR] Fichier .env manquant
    echo Creation du fichier .env...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
    ) > .env
    echo [OK] Fichier .env cree
    echo.
    echo IMPORTANT: Configurez NEXTAUTH_SECRET
    echo Executez: GENERER_SECRET.bat
    pause
) else (
    echo [OK] Fichier .env existe
)

if not exist "node_modules" (
    echo [ERREUR] node_modules manquant
    echo Installation des dependances...
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de l'installation
        pause
        exit /b 1
    )
    echo [OK] Dependances installees
) else (
    echo [OK] node_modules existe
)

if not exist "prisma\dev.db" (
    echo [ATTENTION] Base de donnees non trouvee
    echo Creation de la base de donnees...
    if exist "node_modules\.prisma" (
        call npx prisma db push --accept-data-loss
    ) else (
        call npx prisma generate
        call npx prisma db push --accept-data-loss
    )
    echo [OK] Base de donnees creee
) else (
    echo [OK] Base de donnees existe
)

echo.
echo ========================================
echo   ETAPE 4: VERIFICATION BUILD
echo ========================================
echo.

if not exist ".next" (
    echo [ATTENTION] Build non trouve
    echo Compilation du projet...
    call npm run build
    if !ERRORLEVEL! NEQ 0 (
        echo [ERREUR] Echec de la compilation
        echo.
        echo Vérifiez les erreurs ci-dessus.
        pause
        exit /b 1
    )
    echo [OK] Build reussi
) else (
    echo [OK] Build existe
)

echo.
echo ========================================
echo   ETAPE 5: DEMARRAGE DU SERVEUR
echo ========================================
echo.

echo Le serveur va demarrer maintenant...
echo.
echo IMPORTANT:
echo   - Le serveur demarrera sur http://localhost:3000
echo   - Appuyez sur Ctrl+C pour arreter le serveur
echo   - Ne fermez pas cette fenetre
echo.
echo ========================================
echo.

timeout /t 3 /nobreak >nul

REM Demarrer le serveur
call npm start

