@echo off
cd /d "%~dp0"
echo Creation de la base de donnees...
npx prisma generate
npx prisma db push --accept-data-loss
echo.
echo Termine! Appuyez sur une touche pour fermer.
pause >nul





