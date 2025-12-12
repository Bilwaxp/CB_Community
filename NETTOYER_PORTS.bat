@echo off
title Nettoyage des ports
color 0E

echo.
echo ========================================
echo   NETTOYAGE DES PORTS
echo ========================================
echo.

echo Arret de tous les processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
if errorlevel 1 (
    echo Aucun processus Node.js trouve.
) else (
    echo Processus Node.js arretes.
)

echo.
echo Attente de 2 secondes...
timeout /t 2 /nobreak >nul

echo.
echo Ports liberes! Vous pouvez maintenant lancer le site.
echo.
pause




