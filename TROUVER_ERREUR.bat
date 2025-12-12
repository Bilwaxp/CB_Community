@echo off
setlocal enabledelayedexpansion
title CB_Community - Diagnostic d'Erreur
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DIAGNOSTIC D'ERREUR COMPLET
echo ========================================
echo.

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

echo [1/8] Verification Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js non trouve
) else (
    echo [OK] Node.js trouve
    node --version
)
echo.

echo [2/8] Verification .env...
if exist ".env" (
    echo [OK] Fichier .env existe
    echo.
    echo Contenu DATABASE_URL:
    findstr /C:"DATABASE_URL" .env
) else (
    echo [ERREUR] Fichier .env manquant
)
echo.

echo [3/8] Verification base de donnees...
if exist "prisma\dev.db" (
    echo [OK] Base de donnees existe
    dir prisma\dev.db
) else (
    echo [ERREUR] Base de donnees manquante
)
echo.

echo [4/8] Verification node_modules...
if exist "node_modules" (
    echo [OK] node_modules existe
) else (
    echo [ERREUR] node_modules manquant
)
echo.

echo [5/8] Verification Prisma Client...
if exist "node_modules\@prisma\client" (
    echo [OK] Prisma Client installe
) else (
    echo [ERREUR] Prisma Client manquant
)
echo.

echo [6/8] Test de connexion a la base de donnees...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Test en cours...
    node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.user.findMany().then(() => { console.log('OK: Connexion reussie'); process.exit(0); }).catch((e) => { console.error('ERREUR:', e.message); process.exit(1); });" 2>test_db_error.txt
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Connexion a la base de donnees reussie
    ) else (
        echo [ERREUR] Echec de connexion a la base de donnees
        if exist test_db_error.txt (
            echo.
            echo Details de l'erreur:
            type test_db_error.txt
        )
    )
) else (
    echo [SKIP] Node.js non disponible pour le test
)
echo.

echo [7/8] Verification erreurs TypeScript...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    call npx tsc --noEmit 2>erreurs_ts.txt
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Aucune erreur TypeScript
        del erreurs_ts.txt >nul 2>&1
    ) else (
        echo [ERREUR] Erreurs TypeScript detectees
        if exist erreurs_ts.txt (
            echo.
            echo Erreurs TypeScript:
            type erreurs_ts.txt
        )
    )
) else (
    echo [SKIP] Node.js non disponible
)
echo.

echo [8/8] Verification processus et ports...
tasklist | findstr node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Processus Node.js en cours:
    tasklist | findstr node.exe
) else (
    echo [INFO] Aucun processus Node.js en cours
)

netstat -ano | findstr :3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Port 3000 en cours d'utilisation:
    netstat -ano | findstr :3000
) else (
    echo [INFO] Port 3000 libre
)
echo.

echo ========================================
echo   RESUME
echo ========================================
echo.
echo Pour voir les erreurs en temps reel:
echo 1. Lancez le serveur avec LANCER_TEST.bat
echo 2. Regardez la fenetre de commande pour les erreurs
echo 3. Ouvrez http://localhost:3000 dans le navigateur
echo 4. Appuyez sur F12 pour voir les erreurs dans la console
echo.
echo Fichiers d'erreur crees:
if exist test_db_error.txt echo   - test_db_error.txt
if exist erreurs_ts.txt echo   - erreurs_ts.txt
echo.
pause

