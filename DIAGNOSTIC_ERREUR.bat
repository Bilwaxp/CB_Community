@echo off
setlocal enabledelayedexpansion
title CB_Community - Diagnostic d'Erreur
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DIAGNOSTIC D'ERREUR
echo ========================================
echo.

REM Chercher Node.js
set NODE_FOUND=0
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
    set NODE_FOUND=1
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
    set NODE_FOUND=1
)

echo [1/8] Verification Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js non trouve dans le PATH
    echo.
) else (
    echo [OK] Node.js trouve
    node --version
)
echo.

echo [2/8] Verification .env...
if exist ".env" (
    echo [OK] Fichier .env existe
    echo.
    echo Contenu de .env:
    echo ----------------------------------------
    type .env
    echo ----------------------------------------
) else (
    echo [ERREUR] Fichier .env manquant
)
echo.

echo [3/8] Verification node_modules...
if exist "node_modules" (
    echo [OK] node_modules existe
) else (
    echo [ERREUR] node_modules manquant
)
echo.

echo [4/8] Verification Prisma...
if exist "prisma\schema.prisma" (
    echo [OK] Schema Prisma existe
) else (
    echo [ERREUR] Schema Prisma manquant
)
if exist "prisma\dev.db" (
    echo [OK] Base de donnees existe
) else (
    echo [ATTENTION] Base de donnees non creee
)
echo.

echo [5/8] Verification processus Node.js...
tasklist | findstr node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Processus Node.js en cours:
    tasklist | findstr node.exe
) else (
    echo [INFO] Aucun processus Node.js en cours
)
echo.

echo [6/8] Verification port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Port 3000 en cours d'utilisation:
    netstat -ano | findstr :3000
) else (
    echo [INFO] Port 3000 libre
)
echo.

echo [7/8] Verification build...
if exist ".next" (
    echo [OK] Dossier .next existe
    if exist ".next\BUILD_ID" (
        echo [OK] Build ID trouve
        type .next\BUILD_ID
    ) else (
        echo [ATTENTION] Build ID manquant - build peut-etre incomplet
    )
) else (
    echo [INFO] Aucun build trouve
)
echo.

echo [8/8] Tentative de compilation TypeScript...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Verification des erreurs TypeScript...
    call npx tsc --noEmit 2>erreurs_typescript.txt
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Aucune erreur TypeScript
        del erreurs_typescript.txt >nul 2>&1
    ) else (
        echo [ERREUR] Erreurs TypeScript trouvees!
        echo.
        echo Erreurs:
        type erreurs_typescript.txt
        echo.
        echo Fichier sauvegarde: erreurs_typescript.txt
    )
) else (
    echo [SKIP] Node.js non disponible pour verification TypeScript
)
echo.

echo ========================================
echo   RESUME DU DIAGNOSTIC
echo ========================================
echo.
echo Pour voir les erreurs detaillees:
echo 1. Ouvrez le navigateur sur http://localhost:3000
echo 2. Appuyez sur F12 pour ouvrir les outils developpeur
echo 3. Allez dans l'onglet "Console" pour voir les erreurs
echo.
echo Ou consultez la fenetre du serveur pour les erreurs de compilation.
echo.
pause

