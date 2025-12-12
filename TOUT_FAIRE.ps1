Write-Host "========================================" -ForegroundColor Green
Write-Host "  CONFIGURATION COMPLETE AUTOMATIQUE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location "C:\Users\carlhensley\Desktop\CB_ONE"

# Nettoyer les processus
Write-Host "[1/7] Nettoyage des processus..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Nettoyer le build
Write-Host "[2/7] Nettoyage du build..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
}

# Configuration .env
Write-Host "[3/7] Configuration du fichier .env..." -ForegroundColor Yellow
@"
DATABASE_URL=file:./dev.db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=cb-community-secret-key-change-in-production-2024
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_VIP_PRICE_ID=
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=cbcommunity7@gmail.com
SMTP_PASSWORD=
SMTP_FROM=cbcommunity7@gmail.com
"@ | Out-File -FilePath .env -Encoding utf8

# Installation dépendances
Write-Host "[4/7] Installation des dependances..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    npm install --legacy-peer-deps 2>&1 | Out-Null
}

# Génération Prisma
Write-Host "[5/7] Generation Prisma..." -ForegroundColor Yellow
npx prisma generate --silent 2>&1 | Out-Null

# Base de données
Write-Host "[6/7] Verification base de donnees..." -ForegroundColor Yellow
if (-not (Test-Path "dev.db")) {
    npx prisma db push --accept-data-loss --silent 2>&1 | Out-Null
}

# Trouver l'IP
Write-Host "[7/7] Recherche de l'adresse IP..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VOTRE ADRESSE IP:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*"}).IPAddress | Select-Object -First 1
if ($ip) {
    Write-Host "  $ip" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Modifiez NEXTAUTH_URL dans .env avec cette IP" -ForegroundColor Yellow
    Write-Host "  Exemple: NEXTAUTH_URL=http://$ip:3000" -ForegroundColor Yellow
} else {
    Write-Host "  Executez ipconfig pour trouver votre IP" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Demander si on veut lancer
Write-Host "Voulez-vous lancer le serveur maintenant? (O/N)" -ForegroundColor Green
$reponse = Read-Host "> "

if ($reponse -eq "O" -or $reponse -eq "o") {
    Write-Host ""
    Write-Host "Build de production en cours..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Serveur en cours de demarrage..." -ForegroundColor Green
        Write-Host "Le site sera accessible sur http://localhost:3000" -ForegroundColor Green
        Write-Host ""
        npm start
    } else {
        Write-Host "ERREUR lors du build!" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "Pour lancer le serveur plus tard, executez: DEMARRER_SERVEUR.bat" -ForegroundColor Yellow
    Write-Host ""
}
