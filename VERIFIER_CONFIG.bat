@echo off
setlocal enabledelayedexpansion
title CB_Community - Verification Configuration
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   VERIFICATION DE LA CONFIGURATION
echo ========================================
echo.

set ERRORS=0
set WARNINGS=0

REM Vérifier Node.js
echo [1/10] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe
    set /a ERRORS+=1
) else (
    echo [OK] Node.js: 
    node --version
)
echo.

REM Vérifier npm
echo [2/10] Verification de npm...
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] npm n'est pas installe
    set /a ERRORS+=1
) else (
    echo [OK] npm:
    npm --version
)
echo.

REM Vérifier .env
echo [3/10] Verification du fichier .env...
if not exist ".env" (
    echo [ERREUR] Fichier .env manquant
    set /a ERRORS+=1
) else (
    echo [OK] Fichier .env existe
)
echo.

REM Vérifier DATABASE_URL
echo [4/10] Verification DATABASE_URL...
if exist ".env" (
    findstr /C:"DATABASE_URL" .env >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] DATABASE_URL manquant dans .env
        set /a ERRORS+=1
    ) else (
        echo [OK] DATABASE_URL configure
    )
)
echo.

REM Vérifier NEXTAUTH_SECRET
echo [5/10] Verification NEXTAUTH_SECRET...
if exist ".env" (
    findstr /C:"NEXTAUTH_SECRET" .env >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] NEXTAUTH_SECRET manquant dans .env
        set /a ERRORS+=1
    ) else (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"NEXTAUTH_SECRET" .env') do (
            set SECRET=%%a
            if "!SECRET!"=="cb-community-secret-key-changez-en-production" (
                echo [ATTENTION] NEXTAUTH_SECRET utilise la valeur par defaut - Changez-la!
                set /a WARNINGS+=1
            ) else (
                echo [OK] NEXTAUTH_SECRET configure
            )
        )
    )
)
echo.

REM Vérifier NEXTAUTH_URL
echo [6/10] Verification NEXTAUTH_URL...
if exist ".env" (
    findstr /C:"NEXTAUTH_URL" .env >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] NEXTAUTH_URL manquant dans .env
        set /a ERRORS+=1
    ) else (
        echo [OK] NEXTAUTH_URL configure
    )
)
echo.

REM Vérifier node_modules
echo [7/10] Verification des dependances...
if not exist "node_modules" (
    echo [ERREUR] node_modules manquant - Executez: npm install
    set /a ERRORS+=1
) else (
    echo [OK] Dependances installees
)
echo.

REM Vérifier Prisma
echo [8/10] Verification Prisma...
if exist "node_modules" (
    where npx >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        npx prisma --version >nul 2>&1
        if %ERRORLEVEL% EQU 0 (
            echo [OK] Prisma installe
        ) else (
            echo [ATTENTION] Prisma non installe
            set /a WARNINGS+=1
        )
    )
)
echo.

REM Vérifier base de données
echo [9/10] Verification base de donnees...
if exist "prisma\dev.db" (
    echo [OK] Base de donnees existe
) else (
    echo [ATTENTION] Base de donnees non creee - Executez: npx prisma db push
    set /a WARNINGS+=1
)
echo.

REM Vérifier SMTP
echo [10/10] Verification configuration SMTP...
if exist ".env" (
    findstr /C:"SMTP_PASSWORD" .env >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ATTENTION] SMTP_PASSWORD non configure - Les emails ne fonctionneront pas
        set /a WARNINGS+=1
    ) else (
        for /f "tokens=2 delims==" %%a in ('findstr /C:"SMTP_PASSWORD" .env') do (
            set SMTP_PASS=%%a
            if "!SMTP_PASS!"=="" (
                echo [ATTENTION] SMTP_PASSWORD vide - Les emails ne fonctionneront pas
                set /a WARNINGS+=1
            ) else (
                echo [OK] SMTP configure
            )
        )
    )
)
echo.

REM Résumé
echo ========================================
echo   RESUME DE LA VERIFICATION
echo ========================================
echo.
if %ERRORS% EQU 0 (
    echo [OK] Aucune erreur critique trouvee
) else (
    echo [ERREUR] %ERRORS% erreur^(s^) trouvee^(s^)
)
if %WARNINGS% GTR 0 (
    echo [ATTENTION] %WARNINGS% avertissement^(s^)
)
echo.

if %ERRORS% GTR 0 (
    echo CORRIGEZ LES ERREURS AVANT DE CONTINUER!
    echo.
    pause
    exit /b 1
) else (
    echo La configuration semble correcte.
    echo Vous pouvez maintenant executer HEBERGER_FINAL.bat
    echo.
    pause
)

