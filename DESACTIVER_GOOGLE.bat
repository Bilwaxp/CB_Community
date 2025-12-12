@echo off
setlocal enabledelayedexpansion
title CB_Community - Desactiver Google OAuth
color 0E
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   DESACTIVATION GOOGLE OAUTH
echo ========================================
echo.
echo Cette action va desactiver temporairement
echo la connexion avec Google.
echo.
echo Le bouton "Connexion avec Google" ne sera
echo plus disponible jusqu'a ce que vous configurez
echo GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET.
echo.
pause

if exist "src\lib\auth.ts" (
    REM Créer une sauvegarde
    copy "src\lib\auth.ts" "src\lib\auth.ts.backup" >nul 2>&1
    echo [OK] Sauvegarde creee: auth.ts.backup
    
    REM Commenter GoogleProvider
    powershell -Command "$content = Get-Content 'src\lib\auth.ts' -Raw; $content = $content -replace 'GoogleProvider\(', '// GoogleProvider('; $content = $content -replace 'clientId: process\.env\.GOOGLE_CLIENT_ID!', '// clientId: process.env.GOOGLE_CLIENT_ID!'; $content = $content -replace 'clientSecret: process\.env\.GOOGLE_CLIENT_SECRET!', '// clientSecret: process.env.GOOGLE_CLIENT_SECRET!'; Set-Content 'src\lib\auth.ts' -Value $content"
    
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Google OAuth desactive
        echo.
        echo IMPORTANT: Redemare le serveur pour que les changements prennent effet.
        echo.
    ) else (
        echo [ERREUR] Impossible de modifier le fichier
        echo.
        echo Modification manuelle necessaire:
        echo 1. Ouvrez src\lib\auth.ts
        echo 2. Commentez les lignes GoogleProvider (lignes 20-23)
        echo.
    )
) else (
    echo [ERREUR] Fichier auth.ts non trouve!
)

echo.
pause

