@echo off
setlocal enabledelayedexpansion
title CB_Community - Verification Complete
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   VERIFICATION COMPLETE DU SYSTEME
echo ========================================
echo.

set ERRORS=0
set WARNINGS=0

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

echo [1/10] Verification Node.js...
where node >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo    [ERREUR] Node.js non trouve
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('node --version') do echo    [OK] Node.js: %%i
)

echo.
echo [2/10] Verification npm...
where npm >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo    [ERREUR] npm non trouve
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('npm --version') do echo    [OK] npm: %%i
)

echo.
echo [3/10] Verification fichiers essentiels...
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

if not exist "prisma\schema.prisma" (
    echo    [ERREUR] schema.prisma manquant
    set /a ERRORS+=1
) else (
    echo    [OK] schema.prisma
)

if not exist "tsconfig.json" (
    echo    [ERREUR] tsconfig.json manquant
    set /a ERRORS+=1
) else (
    echo    [OK] tsconfig.json
)

echo.
echo [4/10] Verification .env...
if not exist ".env" (
    echo    [ERREUR] .env manquant
    set /a ERRORS+=1
) else (
    echo    [OK] .env existe
    findstr /C:"DATABASE_URL=" .env >nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        echo    [ERREUR] DATABASE_URL manquant dans .env
        set /a ERRORS+=1
    ) else (
        echo    [OK] DATABASE_URL configure
    )
    findstr /C:"NEXTAUTH_SECRET=" .env | findstr /V "^#" | findstr /V "^$" | findstr /V "NEXTAUTH_SECRET=$" >nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        echo    [ATTENTION] NEXTAUTH_SECRET vide ou manquant
        set /a WARNINGS+=1
    ) else (
        echo    [OK] NEXTAUTH_SECRET configure
    )
    findstr /C:"NEXTAUTH_URL=" .env >nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        echo    [ATTENTION] NEXTAUTH_URL manquant
        set /a WARNINGS+=1
    ) else (
        echo    [OK] NEXTAUTH_URL configure
    )
)

echo.
echo [5/10] Verification dependances...
if not exist "node_modules" (
    echo    [ERREUR] node_modules manquant - executez: npm install
    set /a ERRORS+=1
) else (
    echo    [OK] node_modules existe
    if not exist "node_modules\next" (
        echo    [ERREUR] Next.js non installe
        set /a ERRORS+=1
    ) else (
        echo    [OK] Next.js installe
    )
    if not exist "node_modules\@prisma\client" (
        echo    [ERREUR] Prisma Client non installe
        set /a ERRORS+=1
    ) else (
        echo    [OK] Prisma Client installe
    )
)

echo.
echo [6/10] Verification Prisma...
where npx >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    call npx prisma --version >nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        echo    [ERREUR] Prisma non trouve
        set /a ERRORS+=1
    ) else (
        echo    [OK] Prisma installe
        if exist "node_modules\.prisma" (
            echo    [OK] Client Prisma genere
        ) else (
            echo    [ATTENTION] Client Prisma non genere - executez: npx prisma generate
            set /a WARNINGS+=1
        )
    )
) else (
    echo    [ERREUR] npx non trouve
    set /a ERRORS+=1
)

echo.
echo [7/10] Verification base de donnees...
if exist "prisma\dev.db" (
    echo    [OK] Base de donnees existe
) else (
    echo    [ATTENTION] Base de donnees non trouvee - sera creee au premier demarrage
    set /a WARNINGS+=1
)

echo.
echo [8/10] Verification build...
if exist ".next" (
    echo    [OK] Build existe
    if exist ".next\standalone" (
        echo    [OK] Build standalone pret
    )
) else (
    echo    [ATTENTION] Build non trouve - executez: npm run build
    set /a WARNINGS+=1
)

echo.
echo [9/10] Verification Google OAuth...
if exist ".env" (
    findstr /C:"GOOGLE_CLIENT_ID=" .env | findstr /V "^#" | findstr /V "^$" | findstr /V "GOOGLE_CLIENT_ID=$" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        findstr /C:"GOOGLE_CLIENT_SECRET=" .env | findstr /V "^#" | findstr /V "^$" | findstr /V "GOOGLE_CLIENT_SECRET=$" >nul 2>&1
        if !ERRORLEVEL! EQU 0 (
            echo    [OK] Google OAuth configure
        ) else (
            echo    [ATTENTION] Google OAuth partiellement configure
            set /a WARNINGS+=1
        )
    ) else (
        echo    [INFO] Google OAuth non configure (optionnel)
    )
)

echo.
echo [10/10] Verification processus...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if !ERRORLEVEL! EQU 0 (
    echo    [INFO] Processus Node.js en cours d'execution
    echo    [ATTENTION] Arretez-les avant de reconstruire
    set /a WARNINGS+=1
) else (
    echo    [OK] Aucun processus Node.js en cours
)

echo.
echo ========================================
echo   RESUME
echo ========================================
echo.
if !ERRORS! EQU 0 (
    echo [SUCCES] Aucune erreur critique trouvee!
) else (
    echo [ERREUR] !ERRORS! erreur(s) critique(s) trouvee(s)
)
if !WARNINGS! GTR 0 (
    echo [ATTENTION] !WARNINGS! avertissement(s)
)
echo.

if !ERRORS! GTR 0 (
    echo ========================================
    echo   ACTIONS RECOMMANDEES
    echo ========================================
    echo.
    echo Pour corriger les erreurs:
    echo   1. Executez: FINALISER_TOUT.bat
    echo   2. Ou suivez les instructions ci-dessus
    echo.
) else (
    echo ========================================
    echo   SYSTEME PRET!
    echo ========================================
    echo.
    echo Le site est pret a etre demarre.
    echo Executez: DEMARRER_MAINTENANT.bat
    echo.
)

pause

