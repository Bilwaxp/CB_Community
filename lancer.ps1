Write-Host "========================================" -ForegroundColor Green
Write-Host "  CB_COMMUNITY - LANCEMENT DU SITE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Vérifier Node.js
Write-Host "[1/4] Verification de Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR: Node.js n'est pas installe!" -ForegroundColor Red
    Write-Host "Telechargez-le sur: https://nodejs.org" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green

# Vérifier si node_modules existe
Write-Host ""
Write-Host "[2/4] Verification des dependances..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances (cela peut prendre quelques minutes)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERREUR lors de l'installation des dependances!" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "Dependances installees avec succes!" -ForegroundColor Green
} else {
    Write-Host "Dependances deja installees." -ForegroundColor Green
}

# Générer Prisma Client
Write-Host ""
Write-Host "[3/4] Generation du client Prisma..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "ATTENTION: Erreur lors de la generation Prisma (peut etre normal si la DB n'est pas configuree)" -ForegroundColor Yellow
}

# Lancer le serveur
Write-Host ""
Write-Host "[4/4] Lancement du serveur..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SITE DISPONIBLE SUR:" -ForegroundColor Green
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Ouverture du navigateur dans 5 secondes..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Serveur en cours d'execution..." -ForegroundColor Green
Write-Host "(Appuyez sur Ctrl+C pour arreter le serveur)" -ForegroundColor Yellow
Write-Host ""

npm run dev








