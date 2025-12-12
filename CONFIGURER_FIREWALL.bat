@echo off
title Configuration Firewall Windows
color 0E
cls

echo.
echo ========================================
echo   CONFIGURATION FIREWALL WINDOWS
echo ========================================
echo.
echo Cette operation necessite les droits administrateur.
echo.

REM Vérifier les droits admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Vous devez executer ce script en tant qu'administrateur!
    echo.
    echo Clic droit sur ce fichier ^> Executer en tant qu'administrateur
    echo.
    pause
    exit /b 1
)

echo [1/2] Ajout de la regle pour le port 3000 (entree)...
netsh advfirewall firewall add rule name="CB_Community HTTP" dir=in action=allow protocol=TCP localport=3000
if errorlevel 1 (
    echo ERREUR lors de l'ajout de la regle!
) else (
    echo Regle ajoutee avec succes!
)

echo.
echo [2/2] Verification des regles...
netsh advfirewall firewall show rule name="CB_Community HTTP"

echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Le port 3000 est maintenant ouvert dans le firewall.
echo.
pause




