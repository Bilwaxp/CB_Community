# Guide d'Hébergement CB_Community - Version Finale

## 🚀 Hébergement Rapide (Méthode Recommandée)

### Option 1 : Hébergement Automatique (Recommandé)

1. **Vérifiez la configuration**
   - Double-cliquez sur `VERIFIER_CONFIG.bat`
   - Corrigez les erreurs si nécessaire

2. **Hébergez le site**
   - Double-cliquez sur `HEBERGER_FINAL.bat`
   - Le script va tout configurer automatiquement

C'est tout ! Le site sera accessible après le démarrage.

---

## 📋 Hébergement Manuel (Étape par Étape)

### Étape 1 : Vérification des prérequis

1. **Vérifiez Node.js**
   - Ouvrez PowerShell et tapez : `node --version`
   - Doit être version 18 ou supérieure
   - Téléchargez sur https://nodejs.org si nécessaire

2. **Vérifiez la configuration**
   - Double-cliquez sur `VERIFIER_CONFIG.bat`
   - Assurez-vous qu'il n'y a pas d'erreurs

### Étape 2 : Configuration initiale

1. **Trouvez votre adresse IP**
   - Double-cliquez sur `TROUVER_IP.bat`
   - Notez votre adresse IP (ex: 192.168.1.100)

2. **Configurez le firewall Windows**
   - **Clic droit** sur `CONFIGURER_FIREWALL.bat`
   - Sélectionnez **"Exécuter en tant qu'administrateur"**
   - Cela ouvre le port 3000 pour l'accès externe

### Étape 3 : Configuration du fichier .env

Ouvrez le fichier `.env` et modifiez :

```env
NEXTAUTH_URL=http://VOTRE_IP:3000
NEXTAUTH_SECRET=votre-cle-secrete-aleatoire-longue
SMTP_PASSWORD=votre-mot-de-passe-application-gmail
```

**Important :**
- Remplacez `VOTRE_IP` par l'adresse IP trouvée à l'étape 2
- Pour `NEXTAUTH_SECRET`, générez une clé aléatoire :
  ```powershell
  powershell -Command "[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString())).Substring(0,64)"
  ```
- Pour `SMTP_PASSWORD`, utilisez un "Mot de passe d'application" Gmail :
  - Allez dans : Paramètres Google > Sécurité > Validation en 2 étapes > Mots de passe des applications

### Étape 4 : Démarrer le serveur de production

**Double-cliquez sur `HEBERGER_FINAL.bat`**

Ce script va automatiquement :
- ✅ Vérifier tous les prérequis
- ✅ Installer les dépendances si nécessaire
- ✅ Générer Prisma
- ✅ Créer/initialiser la base de données
- ✅ Créer le build de production
- ✅ Démarrer le serveur

### Étape 5 : Accéder au site

Le site sera accessible sur :
- **Local** : http://localhost:3000
- **Réseau local** : http://VOTRE_IP:3000
- **Depuis Internet** : http://VOTRE_IP_PUBLIQUE:3000

## 🌐 Accès depuis Internet

Pour que le site soit accessible depuis Internet :

1. **Trouvez votre IP publique** :
   - Allez sur https://whatismyipaddress.com
   - Notez votre IP publique

2. **Configurez le routeur** :
   - Ouvrez les paramètres du routeur (généralement 192.168.1.1 ou 192.168.0.1)
   - Allez dans "Port Forwarding" ou "Redirection de port" ou "Virtual Server"
   - Ajoutez une règle :
     - **Nom** : CB_Community
     - **Port externe** : 3000
     - **Port interne** : 3000
     - **IP interne** : VOTRE_IP_LOCALE (trouvée avec TROUVER_IP.bat)
     - **Protocole** : TCP
   - Sauvegardez les modifications

3. **Mettez à jour NEXTAUTH_URL dans .env** :
   ```env
   NEXTAUTH_URL=http://VOTRE_IP_PUBLIQUE:3000
   ```
   Redémarrez le serveur après cette modification.

4. **Accès depuis Internet** :
   - http://VOTRE_IP_PUBLIQUE:3000
   - ⚠️ **Note** : L'IP publique peut changer si vous n'avez pas d'IP fixe

## ⚠️ Important - Sécurité et Maintenance

### Sécurité

1. **NEXTAUTH_SECRET** :
   - ⚠️ **OBLIGATOIRE** : Changez la valeur par défaut dans `.env`
   - Utilisez une clé aléatoire longue (minimum 32 caractères)
   - Ne partagez jamais cette clé

2. **SMTP Password** :
   - Utilisez un "Mot de passe d'application" Gmail, pas votre mot de passe principal
   - Créez-le dans : Paramètres Google > Sécurité > Validation en 2 étapes

3. **HTTPS (Recommandé pour production)** :
   - Pour un site en production, configurez HTTPS
   - Options : Cloudflare (gratuit), Let's Encrypt avec Nginx, ou hébergement cloud

4. **Firewall** :
   - Le port 3000 est ouvert uniquement pour le serveur
   - Ne partagez pas votre IP publique publiquement

### Performance

1. **Laptop** :
   - Le laptop doit rester allumé pour que le site soit accessible
   - Utilisez un onduleur (UPS) pour éviter les coupures
   - Configurez Windows pour ne pas entrer en veille

2. **Base de données** :
   - La base de données SQLite est dans `prisma/dev.db`
   - Faites des sauvegardes régulières de ce fichier

### Maintenance

1. **Redémarrage** :
   - Après chaque redémarrage du laptop, exécutez `HEBERGER_FINAL.bat`
   - Pour redémarrer rapidement : `DEMARRER_SERVEUR.bat`

2. **Mises à jour** :
   - Mettez à jour les dépendances régulièrement : `npm update`
   - Régénérez Prisma après mise à jour : `npx prisma generate`

3. **Logs** :
   - Surveillez la console pour les erreurs
   - Les erreurs critiques s'affichent dans la fenêtre du serveur

4. **Sauvegardes** :
   - Sauvegardez régulièrement `prisma/dev.db`
   - Sauvegardez le fichier `.env` (gardez-le secret)

## 🔧 Dépannage

### Le site n'est pas accessible depuis un autre appareil

1. ✅ Vérifiez que le firewall est configuré (`CONFIGURER_FIREWALL.bat` en tant qu'administrateur)
2. ✅ Vérifiez que le serveur est démarré (fenêtre ouverte)
3. ✅ Vérifiez que vous utilisez la bonne IP (utilisez `TROUVER_IP.bat`)
4. ✅ Vérifiez que les deux appareils sont sur le même réseau Wi-Fi/Ethernet
5. ✅ Essayez de désactiver temporairement l'antivirus

### Erreur de connexion / Port déjà utilisé

1. ✅ Vérifiez que le port 3000 n'est pas utilisé :
   ```powershell
   netstat -ano | findstr :3000
   ```
2. ✅ Tuez les processus Node.js :
   ```powershell
   taskkill /F /IM node.exe
   ```
3. ✅ Redémarrez le serveur avec `HEBERGER_FINAL.bat`

### Erreurs de build

1. ✅ Vérifiez la configuration avec `VERIFIER_CONFIG.bat`
2. ✅ Supprimez `node_modules` et `.next`, puis réinstallez :
   ```batch
   rmdir /s /q node_modules
   rmdir /s /q .next
   npm install --legacy-peer-deps
   ```
3. ✅ Vérifiez que Node.js est à jour (version 18+)

### Erreurs de base de données

1. ✅ Régénérez Prisma :
   ```batch
   npx prisma generate
   npx prisma db push
   ```
2. ✅ Vérifiez que `prisma/dev.db` existe
3. ✅ Vérifiez `DATABASE_URL` dans `.env`

### Emails ne sont pas envoyés

1. ✅ Vérifiez `SMTP_PASSWORD` dans `.env` (doit être un mot de passe d'application)
2. ✅ Vérifiez que la validation en 2 étapes est activée sur Gmail
3. ✅ Vérifiez les logs dans la console du serveur

## 📝 Commandes Utiles

### Gestion du serveur

- **Arrêter le serveur** : Fermez la fenêtre du serveur ou appuyez sur `Ctrl+C`
- **Voir les processus Node.js** :
  ```batch
  tasklist | findstr node
  ```
- **Tuer tous les processus Node.js** :
  ```batch
  taskkill /F /IM node.exe
  ```
- **Voir l'IP** :
  ```batch
  ipconfig
  ```
  Ou utilisez `TROUVER_IP.bat`

### Base de données

- **Ouvrir Prisma Studio** (interface graphique) :
  ```batch
  npx prisma studio
  ```
- **Réinitialiser la base de données** :
  ```batch
  npx prisma db push --accept-data-loss
  ```

### Scripts Disponibles

| Script | Description |
|--------|------------|
| `HEBERGER_FINAL.bat` | **Script principal** - Héberge le site (recommandé) |
| `VERIFIER_CONFIG.bat` | Vérifie la configuration avant hébergement |
| `TROUVER_IP.bat` | Trouve votre adresse IP locale |
| `CONFIGURER_FIREWALL.bat` | Configure le firewall Windows (admin requis) |
| `DEMARRER_SERVEUR.bat` | Démarre rapidement le serveur (si déjà configuré) |

## 🚀 Hébergement Permanent (Recommandé après tests)

Pour un hébergement professionnel et permanent, considérez :

### Options Cloud (Recommandées)

1. **Vercel** (Gratuit pour début)
   - Déploiement automatique depuis GitHub
   - HTTPS inclus
   - CDN global
   - Limite : Base de données externe requise

2. **Railway** (Payant mais simple)
   - Supporte PostgreSQL et SQLite
   - Déploiement automatique
   - HTTPS inclus
   - ~$5-20/mois

3. **Render** (Gratuit avec limitations)
   - Supporte PostgreSQL
   - HTTPS inclus
   - Limite : S'endort après inactivité (plan gratuit)

### Options VPS (Plus de contrôle)

1. **DigitalOcean** ($6-12/mois)
2. **Linode** ($5-10/mois)
3. **Vultr** ($6-12/mois)
4. **Hetzner** (€4-8/mois, Europe)

### Migration vers PostgreSQL

Pour un hébergement cloud, migrez vers PostgreSQL :

1. Modifiez `prisma/schema.prisma` :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Mettez à jour `DATABASE_URL` dans `.env`

3. Exécutez :
   ```batch
   npx prisma db push
   ```




