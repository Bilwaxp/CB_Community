@echo off
title CB_Community - Demarrage Auto
color 0A
cls

cd /d "%~dp0"

REM Nettoyer les processus existants
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Nettoyer le build
if exist ".next" rmdir /s /q ".next" >nul 2>&1

REM Verification basique
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install --legacy-peer-deps
)

REM Generation Prisma
call npx prisma generate >nul 2>&1

REM Creation DB si necessaire
if not exist "dev.db" (
    call npx prisma db push --accept-data-loss >nul 2>&1
)

REM Lancer le serveur
start http://localhost:3000
timeout /t 3 /nobreak >nul
call npm run dev




