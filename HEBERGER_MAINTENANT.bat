@echo off
title CB_Community - Hebergement Automatique
color 0A
cls

echo.
echo ========================================
echo   HEBERGEMENT AUTOMATIQUE CB_COMMUNITY
echo ========================================
echo.

cd /d "%~dp0"

echo [ETAPE 1/4] Preparation...
call TOUT_PREPARER.bat
if errorlevel 1 (
    echo ERREUR lors de la preparation!
    pause
    exit /b 1
)

echo.
echo [ETAPE 2/4] Recherche de l'adresse IP...
echo.
ipconfig | findstr /i "IPv4"
echo.
echo NOTEZ VOTRE IP CI-DESSUS (ex: 192.168.1.100)
echo.
pause

echo.
echo [ETAPE 3/4] Configuration du firewall...
echo.
echo IMPORTANT: Vous devez executer CONFIGURER_FIREWALL.bat en tant qu'administrateur
echo Clic droit sur CONFIGURER_FIREWALL.bat ^> Executer en tant qu'administrateur
echo.
pause

echo.
echo [ETAPE 4/4] Demarrage du serveur...
echo.
echo Le serveur va demarrer en mode production.
echo Le site sera accessible sur http://VOTRE_IP:3000
echo.
pause

call DEMARRER_SERVEUR.bat




