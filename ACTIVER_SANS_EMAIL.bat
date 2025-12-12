@echo off
setlocal enabledelayedexpansion
title CB_Community - Activer Connexion Sans Email
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   ACTIVATION CONNEXION SANS EMAIL
echo ========================================
echo.
echo [ATTENTION] Cette modification permet aux utilisateurs
echo de se connecter SANS verifier leur email.
echo.
echo C'est TEMPORAIRE - reactivez la verification apres
echo avoir configure SMTP correctement.
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

echo.
echo Modification du fichier auth.ts...
echo.

REM Créer une sauvegarde
if exist "src\lib\auth.ts" (
    copy "src\lib\auth.ts" "src\lib\auth.ts.backup" >nul 2>&1
    echo [OK] Sauvegarde creee: auth.ts.backup
)

REM Modifier auth.ts pour désactiver la vérification email
powershell -Command "(Get-Content 'src\lib\auth.ts') -replace 'if \(!user\.emailVerified\)', 'if (false && !user.emailVerified)' | Set-Content 'src\lib\auth.ts'"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Verification email desactivee temporairement
    echo.
    echo Les utilisateurs peuvent maintenant se connecter sans verifier leur email.
    echo.
    echo IMPORTANT: Redemarrez le serveur pour que les changements prennent effet.
    echo.
) else (
    echo [ERREUR] Impossible de modifier le fichier
)

echo.
pause

