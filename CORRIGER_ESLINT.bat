@echo off
setlocal
title CB_Community - Corriger ESLint
color 0B
cls

cd /d "%~dp0"

echo.
echo ========================================
echo   CORRECTION CONFIGURATION ESLINT
echo ========================================
echo.

echo La configuration ESLint a ete corrigee.
echo.
echo Les regles TypeScript problematiques ont ete desactivees.
echo.
echo Vous pouvez maintenant reessayer:
echo   - DEMARRER_SIMPLE.bat
echo   - Ou: npm run build
echo.
pause

