@echo off
setlocal enabledelayedexpansion
title CB_Community - Menu Principal
color 0B
cls

cd /d "%~dp0"

:MENU
cls
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║   CB_COMMUNITY - MENU PRINCIPAL                              ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo Choisissez une option:
echo.
echo [1] PREMIERE FOIS - Finaliser et configurer tout
echo [2] VERIFIER - Verifier que tout est correct
echo [3] DEMARRER - Demarrer le serveur
echo [4] CONFIGURER GOOGLE - Configurer Google OAuth
echo [5] CREER ADMIN - Creer un compte administrateur
echo [6] DIAGNOSTIC - Diagnostiquer les problemes
echo [7] GUIDES - Voir les guides disponibles
echo [8] QUITTER
echo.
set /p choix="Votre choix (1-8): "

if "!choix!"=="1" goto FINALISER
if "!choix!"=="2" goto VERIFIER
if "!choix!"=="3" goto DEMARRER
if "!choix!"=="4" goto GOOGLE
if "!choix!"=="5" goto ADMIN
if "!choix!"=="6" goto DIAGNOSTIC
if "!choix!"=="7" goto GUIDES
if "!choix!"=="8" goto QUITTER

echo.
echo Choix invalide!
timeout /t 2 /nobreak >nul
goto MENU

:FINALISER
cls
echo.
echo ========================================
echo   FINALISATION COMPLETE
echo ========================================
echo.
echo Ce script va configurer tout le site.
echo Cela peut prendre 5-10 minutes.
echo.
pause
call FINALISER_TOUT.bat
pause
goto MENU

:VERIFIER
cls
echo.
echo ========================================
echo   VERIFICATION
echo ========================================
echo.
call VERIFIER_TOUT.bat
pause
goto MENU

:DEMARRER
cls
echo.
echo ========================================
echo   DEMARRAGE DU SERVEUR
echo ========================================
echo.
echo Le serveur va demarrer...
echo Appuyez sur Ctrl+C pour arreter.
echo.
pause
call DEMARRER_MAINTENANT.bat
pause
goto MENU

:GOOGLE
cls
echo.
echo ========================================
echo   CONFIGURATION GOOGLE OAUTH
echo ========================================
echo.
call GOOGLE_MAINTENANT.bat
pause
goto MENU

:ADMIN
cls
echo.
echo ========================================
echo   CREATION COMPTE ADMINISTRATEUR
echo ========================================
echo.
call CREER_ADMIN.bat
pause
goto MENU

:DIAGNOSTIC
cls
echo.
echo ========================================
echo   DIAGNOSTIC
echo ========================================
echo.
call DIAGNOSTIC_ERREUR.bat
pause
goto MENU

:GUIDES
cls
echo.
echo ========================================
echo   GUIDES DISPONIBLES
echo ========================================
echo.
echo Guides disponibles:
echo.
echo 1. GUIDE_DEMARRAGE_RAPIDE.txt
echo 2. GUIDE_HAITIEN.txt (Kreyol)
echo 3. RESUME_FINAL.txt
echo 4. INSTRUCTIONS_GOOGLE_SIMPLE.txt
echo 5. README.md
echo 6. GUIDE_HEBERGEMENT.md
echo.
set /p guide="Quel guide ouvrir (1-6): "

if "!guide!"=="1" start notepad GUIDE_DEMARRAGE_RAPIDE.txt
if "!guide!"=="2" start notepad GUIDE_HAITIEN.txt
if "!guide!"=="3" start notepad RESUME_FINAL.txt
if "!guide!"=="4" start notepad INSTRUCTIONS_GOOGLE_SIMPLE.txt
if "!guide!"=="5" start notepad README.md
if "!guide!"=="6" start notepad GUIDE_HEBERGEMENT.md

pause
goto MENU

:QUITTER
cls
echo.
echo Au revoir!
echo.
timeout /t 2 /nobreak >nul
exit /b 0

