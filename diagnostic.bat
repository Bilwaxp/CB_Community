@echo off
title Diagnostic CB_Community
color 0E

echo.
echo ========================================
echo   DIAGNOSTIC DU SYSTEME
echo ========================================
echo.

echo [1] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    node --version
    echo Node.js est installe: OK
) else (
    echo ERREUR: Node.js n'est pas trouve dans le PATH
    echo.
    echo Cherchant dans les emplacements standards...
    if exist "C:\Program Files\nodejs\node.exe" (
        echo Trouve dans: C:\Program Files\nodejs\node.exe
        "C:\Program Files\nodejs\node.exe" --version
    ) else (
        echo Node.js non trouve dans C:\Program Files\nodejs\
    )
)
echo.

echo [2] Verification de npm...
where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    npm --version
    echo npm est installe: OK
) else (
    echo ERREUR: npm n'est pas trouve dans le PATH
)
echo.

echo [3] Verification du dossier du projet...
cd /d "%~dp0"
echo Dossier actuel: %CD%
echo.

echo [4] Verification des fichiers du projet...
if exist "package.json" (
    echo package.json: OK
) else (
    echo ERREUR: package.json introuvable
)
if exist "next.config.mjs" (
    echo next.config.mjs: OK
) else (
    echo ERREUR: next.config.mjs introuvable
)
echo.

echo [5] Verification des dependances...
if exist "node_modules" (
    echo node_modules existe: OK
    dir node_modules 2>nul | find /c "<DIR>" >nul
    if %ERRORLEVEL% EQU 0 (
        echo Dependances installees
    ) else (
        echo ATTENTION: node_modules existe mais semble vide
    )
) else (
    echo node_modules n'existe pas - dependances non installees
)
echo.

echo [6] Verification du fichier .env...
if exist ".env" (
    echo .env existe: OK
) else (
    echo ATTENTION: .env n'existe pas
)
echo.

echo [7] Test de connexion au port 3000...
netstat -an | find "3000" >nul
if %ERRORLEVEL% EQU 0 (
    echo ATTENTION: Le port 3000 est deja utilise!
    netstat -an | find "3000"
) else (
    echo Le port 3000 est libre: OK
)
echo.

echo ========================================
echo   FIN DU DIAGNOSTIC
echo ========================================
echo.
pause








