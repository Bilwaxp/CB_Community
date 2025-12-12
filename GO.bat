@echo off
title CB_Community
color 0A
cd /d "%~dp0"
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 >nul
if exist ".next" rmdir /s /q ".next" >nul 2>&1
call npx prisma generate >nul 2>&1
if not exist "dev.db" call npx prisma db push --accept-data-loss >nul 2>&1
start http://localhost:3000
timeout /t 2 >nul
npm run dev
