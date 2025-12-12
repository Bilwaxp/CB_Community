@echo off
setlocal enabledelayedexpansion
title CB_Community - Hebergement Complet
color 0A
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CB_COMMUNITY - HEBERGEMENT COMPLET
echo ========================================
echo.
echo Ce script va:
echo   1. Trouver votre IP
echo   2. Configurer le firewall
echo   3. Demarrer le serveur
echo.
echo ========================================
echo.
pause

REM ============================================
REM ETAPE 1: Trouver l'IP
REM ============================================
echo [ETAPE 1/3] Recherche de votre adresse IP...
echo.

REM Trouver l'IP locale
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set LOCAL_IP=%%a
    set LOCAL_IP=!LOCAL_IP:~1!
    goto :found_ip
)
:found_ip

if defined LOCAL_IP (
    echo [OK] IP locale trouvee: %LOCAL_IP%
) else (
    echo [ATTENTION] IP locale non trouvee
    set LOCAL_IP=localhost
)
echo.

REM ============================================
REM ETAPE 2: Arreter les processus existants
REM ============================================
echo [ETAPE 2/4] Arret des processus existants...
taskkill /F /IM node.exe >nul 2>&1
if errorlevel 1 (
    echo [INFO] Aucun processus Node.js trouve
) else (
    echo [OK] Processus Node.js arretes
)
timeout /t 3 /nobreak >nul

REM Verifier et liberer le port 3000
netstat -ano | findstr :3000 >nul 2>&1
if not errorlevel 1 (
    echo Liberation du port 3000...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        set PID=%%a
        taskkill /F /PID !PID! >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)
echo [OK] Port 3000 libre
echo.

REM ============================================
REM ETAPE 3: Configurer le firewall
REM ============================================
echo [ETAPE 3/4] Configuration du firewall Windows...
echo.

REM Ouvrir le port 3000 dans le firewall
netsh advfirewall firewall show rule name="CB_Community Port 3000" >nul 2>&1
if errorlevel 1 (
    echo Creation de la regle firewall...
    netsh advfirewall firewall add rule name="CB_Community Port 3000" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
    if errorlevel 1 (
        echo [ATTENTION] Impossible de creer la regle firewall automatiquement
        echo Vous devrez peut-etre le faire manuellement
    ) else (
        echo [OK] Regle firewall creee
    )
) else (
    echo [OK] Regle firewall existe deja
)
echo.

REM ============================================
REM ETAPE 4: Mettre a jour .env avec l'IP
REM ============================================
echo [ETAPE 4/4] Configuration de .env...
echo.

if exist ".env" (
    REM Verifier si NEXTAUTH_URL existe
    findstr /C:"NEXTAUTH_URL" .env >nul 2>&1
    if errorlevel 1 (
        echo NEXTAUTH_URL=http://%LOCAL_IP%:3000 >> .env
        echo [OK] NEXTAUTH_URL ajoute
    ) else (
        REM Mettre a jour NEXTAUTH_URL
        powershell -Command "(Get-Content .env) -replace 'NEXTAUTH_URL=.*', 'NEXTAUTH_URL=http://%LOCAL_IP%:3000' | Set-Content .env"
        echo [OK] NEXTAUTH_URL mis a jour
    )
) else (
    echo [ERREUR] Fichier .env non trouve
    echo Executez d'abord LANCER_FINAL.bat
    pause
    exit /b 1
)
echo.

REM ============================================
REM AFFICHAGE DES INFORMATIONS
REM ============================================
cls
echo.
echo ========================================
echo   CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Le site est maintenant accessible sur:
echo.
if defined LOCAL_IP (
    echo   - Local:     http://localhost:3000
    echo   - Reseau:    http://%LOCAL_IP%:3000
    echo.
    echo Pour l'acces depuis Internet:
    echo   1. Configurez le port forwarding sur votre routeur
    echo      (Port 3000 vers %LOCAL_IP%:3000)
    echo   2. Trouvez votre IP publique sur: https://whatismyipaddress.com
    echo   3. Mettez a jour NEXTAUTH_URL dans .env avec votre IP publique
    echo.
) else (
    echo   - Local:     http://localhost:3000
    echo.
)
echo ========================================
echo.
echo Appuyez sur une touche pour demarrer le serveur...
pause >nul

REM ============================================
REM DEMARRAGE DU SERVEUR
REM ============================================
cls
echo.
echo ========================================
echo   SERVEUR EN COURS D'EXECUTION
echo ========================================
echo.
echo Le site est maintenant accessible!
echo.
if defined LOCAL_IP (
    echo   - Local:     http://localhost:3000
    echo   - Reseau:    http://%LOCAL_IP%:3000
) else (
    echo   - Local:     http://localhost:3000
)
echo.
echo (Fermez cette fenetre pour arreter le serveur)
echo.
echo ========================================
echo.

REM Demarrer le serveur
if exist ".next\standalone\server.js" (
    echo [INFO] Mode standalone detecte
    echo Demarrage avec node .next/standalone/server.js
    echo.
    node .next/standalone/server.js
) else (
    echo [INFO] Mode normal
    echo Demarrage avec npm start
    echo.
    call npm start
)

pause
