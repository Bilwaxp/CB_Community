@echo off
setlocal enabledelayedexpansion
title CB_Community - Diagnostic Complet
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DIAGNOSTIC COMPLET DU SYSTEME
echo ========================================
echo.

set ERRORS=0

REM Chercher Node.js
set NODE_PATH=
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
    set NODE_PATH=C:\Program Files\nodejs
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
    set NODE_PATH=C:\Program Files (x86)\nodejs
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set "PATH=%PATH%;%LOCALAPPDATA%\Programs\nodejs"
    set NODE_PATH=%LOCALAPPDATA%\Programs\nodejs
)

echo [1] Verification Node.js...
where node >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo    [ERREUR] Node.js non trouve dans PATH
    if defined NODE_PATH (
        echo    [INFO] Node.js trouve dans: !NODE_PATH!
        echo    [INFO] Ajout au PATH pour cette session...
    ) else (
        echo    [ERREUR CRITIQUE] Node.js non installe
        echo.
        echo    SOLUTION: Installez Node.js depuis https://nodejs.org/
        set /a ERRORS+=1
    )
) else (
    for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
    echo    [OK] Node.js: !NODE_VERSION!
)

echo.
echo [2] Verification npm...
where npm >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo    [ERREUR] npm non trouve
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('npm --version 2^>nul') do set NPM_VERSION=%%i
    echo    [OK] npm: !NPM_VERSION!
)

echo.
echo [3] Verification fichiers...
if not exist "package.json" (
    echo    [ERREUR] package.json manquant
    set /a ERRORS+=1
) else (
    echo    [OK] package.json
)

if not exist "next.config.mjs" (
    echo    [ERREUR] next.config.mjs manquant
    set /a ERRORS+=1
) else (
    echo    [OK] next.config.mjs
)

echo.
echo [4] Verification .env...
if not exist ".env" (
    echo    [ERREUR] .env manquant
    echo    Creation du fichier .env...
    (
        echo DATABASE_URL=file:./prisma/dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=
    ) > .env
    echo    [OK] .env cree
) else (
    echo    [OK] .env existe
    findstr /C:"DATABASE_URL=" .env >nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        echo    [ATTENTION] DATABASE_URL manquant dans .env
    )
)

echo.
echo [5] Verification dependances...
if not exist "node_modules" (
    echo    [ERREUR] node_modules manquant
    echo    Installation des dependances...
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo    [ERREUR] Echec de l'installation
        set /a ERRORS+=1
    ) else (
        echo    [OK] Dependances installees
    )
) else (
    echo    [OK] node_modules existe
    if not exist "node_modules\next" (
        echo    [ATTENTION] Next.js non installe correctement
        echo    Reinstallation...
        call npm install
    )
)

echo.
echo [6] Verification Prisma...
if exist "node_modules\.prisma" (
    echo    [OK] Prisma Client genere
) else (
    echo    [ATTENTION] Prisma Client non genere
    echo    Generation...
    call npx prisma generate
    if !ERRORLEVEL! NEQ 0 (
        echo    [ERREUR] Echec de la generation Prisma
        set /a ERRORS+=1
    ) else (
        echo    [OK] Prisma Client genere
    )
)

echo.
echo [7] Verification base de donnees...
if not exist "prisma" mkdir prisma
if not exist "prisma\dev.db" (
    echo    [ATTENTION] Base de donnees non trouvee
    echo    Creation...
    call npx prisma db push --accept-data-loss
    if !ERRORLEVEL! NEQ 0 (
        echo    [ERREUR] Echec de la creation de la base
        set /a ERRORS+=1
    ) else (
        echo    [OK] Base de donnees creee
    )
) else (
    echo    [OK] Base de donnees existe
)

echo.
echo [8] Verification build...
if not exist ".next" (
    echo    [ATTENTION] Build non trouve
    echo    Compilation necessaire
) else (
    echo    [OK] Build existe
)

echo.
echo ========================================
echo   RESUME
echo ========================================
echo.

if !ERRORS! GTR 0 (
    echo [ERREUR] !ERRORS! erreur(s) trouvee(s)
    echo.
    echo Actions recommandees:
    echo   1. Corrigez les erreurs ci-dessus
    echo   2. Reexecutez ce script
    echo   3. Ou executez: FINALISER_TOUT.bat
) else (
    echo [OK] Aucune erreur critique
    echo.
    echo Le systeme est pret!
    echo.
    echo Pour demarrer le serveur:
    echo   - Executez: LANCER_SITE.bat
    echo   - Ou: DEMARRER_MAINTENANT.bat
)

echo.
pause

