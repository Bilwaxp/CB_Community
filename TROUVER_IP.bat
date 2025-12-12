@echo off
title Trouver l'adresse IP
color 0B
cls

echo.
echo ========================================
echo   ADRESSE IP DE VOTRE SERVEUR
echo ========================================
echo.

echo Recherche de votre adresse IP...
echo.

ipconfig | findstr /i "IPv4"

echo.
echo ========================================
echo.
echo Votre site sera accessible sur:
echo   http://VOTRE_IP:3000
echo.
echo Remplacez VOTRE_IP par l'adresse affichee ci-dessus.
echo.
echo Exemple: http://192.168.1.100:3000
echo.
pause




