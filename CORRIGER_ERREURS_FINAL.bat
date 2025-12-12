@echo off
setlocal enabledelayedexpansion
title CB_Community - Correction des Erreurs
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CORRECTION DES ERREURS
echo ========================================
echo.

echo [1/5] Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK] Processus arretes
echo.

echo [2/5] Nettoyage...
if exist ".next" (
    echo Suppression du build...
    rmdir /s /q ".next" >nul 2>&1
)
echo [OK] Nettoyage termine
echo.

echo [3/5] Correction du fichier .env...
REM Supprimer les doublons DATABASE_URL
if exist ".env" (
    (
        for /f "delims=" %%a in (.env) do (
            set "line=%%a"
            set "is_db_url=0"
            echo !line! | findstr /C:"DATABASE_URL" >nul 2>&1
            if !ERRORLEVEL! EQU 0 (
                set "is_db_url=1"
                set "db_url_found=1"
            )
            if !is_db_url! EQU 0 (
                echo !line!
            ) else if !db_url_found! EQU 1 (
                echo DATABASE_URL=file:./prisma/dev.db
                set "db_url_found=0"
            )
        )
    ) > .env.tmp
    move /y .env.tmp .env >nul 2>&1
    echo [OK] Fichier .env corrige
) else (
    echo [INFO] Fichier .env non trouve - sera cree
)
echo.

echo [4/5] Generation Prisma...
call npx prisma generate >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Prisma genere
) else (
    echo [ATTENTION] Erreur lors de la generation Prisma
)
echo.

echo [5/5] Verification TypeScript...
call npx tsc --noEmit >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Aucune erreur TypeScript
) else (
    echo [ATTENTION] Erreurs TypeScript detectees
    echo Executez: npx tsc --noEmit pour voir les details
)
echo.

echo ========================================
echo   CORRECTION TERMINEE!
echo ========================================
echo.
echo Vous pouvez maintenant relancer le serveur:
echo   - TESTER_SITE.bat (mode developpement)
echo   - HEBERGER_FINAL.bat (mode production)
echo.
pause

