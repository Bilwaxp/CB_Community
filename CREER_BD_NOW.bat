@echo off
title Creation Base de Donnees
cd /d "%~dp0"
echo Creation de la base de donnees SQLite...
echo.
npx prisma generate
echo.
npx prisma db push --accept-data-loss
echo.
echo Base de donnees creee!
pause





