@echo off
title CB_Community - Relance Propre
color 0C
cls

echo.
echo ========================================
echo   NETTOYAGE COMPLET ET RELANCE
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] Arret de tous les processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
if errorlevel 1 (
    echo   Aucun processus a arreter.
) else (
    echo   Processus arretes.
)
timeout /t 2 /nobreak >nul

echo.
echo [2/6] Suppression du build corrompu...
if exist ".next" (
    rmdir /s /q ".next"
    echo   Build supprime.
) else (
    echo   Pas de build a supprimer.
)

echo.
echo [3/6] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo   ERREUR: Node.js n'est pas installe!
    pause
    exit /b 1
)
echo   Node.js OK

echo.
echo [4/6] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 (
    echo   ERREUR lors de la generation Prisma!
    pause
    exit /b 1
)

echo.
echo [5/6] Verification de la base de donnees...
if not exist "dev.db" (
    echo   Creation de la base de donnees...
    call npx prisma db push --accept-data-loss
    if errorlevel 1 (
        echo   ERREUR lors de la creation de la base!
        pause
        exit /b 1
    )
) else (
    echo   Base de donnees OK
)

echo.
echo [6/6] Lancement du serveur...
echo.
echo ========================================
echo   SERVEUR EN DEMARRAGE...
echo ========================================
echo.
echo ATTENTION: Regardez ci-dessous pour le port exact!
echo Le site peut etre sur http://localhost:3000, 3001, 3002, etc.
echo.
echo Ouverture du navigateur dans 5 secondes...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   LANCEMENT EN COURS...
echo ========================================
echo.

call npm run dev

pause




