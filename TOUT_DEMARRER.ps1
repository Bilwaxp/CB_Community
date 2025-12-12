Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEMARRAGE AUTOMATIQUE CB_COMMUNITY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location "C:\Users\carlhensley\Desktop\CB_ONE"

# Nettoyer les processus
Write-Host "[1/5] Nettoyage des processus..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Nettoyer le build
Write-Host "[2/5] Nettoyage du build..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
}

# Génération Prisma
Write-Host "[3/5] Generation Prisma..." -ForegroundColor Yellow
npx prisma generate --silent 2>&1 | Out-Null

# Base de données
Write-Host "[4/5] Verification base de donnees..." -ForegroundColor Yellow
if (-not (Test-Path "dev.db")) {
    npx prisma db push --accept-data-loss --silent 2>&1 | Out-Null
}

# Lancer le serveur
Write-Host "[5/5] Lancement du serveur..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Le serveur demarre sur http://localhost:3000" -ForegroundColor Green
Write-Host "Ouverture du navigateur dans 10 secondes..." -ForegroundColor Green
Write-Host ""

Start-Job -ScriptBlock {
    Start-Sleep -Seconds 15
    Start-Process "http://localhost:3000"
} | Out-Null

npm run dev




