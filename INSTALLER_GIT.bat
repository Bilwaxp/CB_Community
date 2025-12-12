@echo off
title Installation Git
color 0B
cls

echo.
echo ========================================
echo   INSTALLATION DE GIT
echo ========================================
echo.
echo Git n'est pas installe sur votre ordinateur.
echo.
echo ========================================
echo   INSTRUCTIONS D'INSTALLATION
echo ========================================
echo.
echo 1. TELECHARGEZ GIT:
echo    https://git-scm.com/download/win
echo.
echo 2. INSTALLEZ GIT:
echo    - Double-cliquez sur le fichier telecharge
echo    - Suivez les instructions d'installation
echo    - Acceptez les options par defaut
echo.
echo 3. REDEMARREZ VOTRE ORDINATEUR:
echo    - Important pour que Git soit reconnu
echo.
echo 4. RELANCEZ HEBERGER_SUR_GITHUB.bat:
echo    - Apres le redemarrage
echo.
echo ========================================
echo.
echo Voulez-vous ouvrir la page de telechargement maintenant?
echo.
choice /C ON /M "Ouvrir la page de telechargement"
if errorlevel 2 goto :end
if errorlevel 1 (
    start https://git-scm.com/download/win
    echo.
    echo Page de telechargement ouverte dans votre navigateur.
)

:end
echo.
pause

