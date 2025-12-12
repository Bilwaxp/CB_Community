# 🚀 CB_Community - Guide d'Hébergement Final

## ⚡ Démarrage Rapide

### Option 1 : Hébergement Automatique (Recommandé)

```batch
1. VERIFIER_CONFIG.bat    → Vérifie la configuration
2. HEBERGER_FINAL.bat     → Héberge le site automatiquement
```

**C'est tout !** Le site sera accessible après quelques minutes.

---

## 📋 Hébergement Manuel

### Prérequis

- ✅ Node.js 18+ installé
- ✅ npm installé
- ✅ Windows 10/11

### Étapes

#### 1. Vérification

```batch
VERIFIER_CONFIG.bat
```

Corrigez les erreurs si nécessaire.

#### 2. Configuration IP et Firewall

```batch
TROUVER_IP.bat                    → Trouve votre IP
CONFIGURER_FIREWALL.bat (admin)   → Ouvre le port 3000
```

#### 3. Configuration .env

Le fichier `.env` sera créé automatiquement par `HEBERGER_FINAL.bat`.

**Variables importantes à configurer :**

```env
# Générer une clé secrète
GENERER_SECRET.bat  → Copiez la clé dans NEXTAUTH_SECRET

# Configurer l'URL
NEXTAUTH_URL=http://VOTRE_IP:3000

# Configurer l'email (mot de passe d'application Gmail)
SMTP_PASSWORD=votre-mot-de-passe-application
```

#### 4. Hébergement

```batch
HEBERGER_FINAL.bat
```

Le script va :
- ✅ Vérifier les prérequis
- ✅ Installer les dépendances
- ✅ Configurer Prisma
- ✅ Créer la base de données
- ✅ Build de production
- ✅ Démarrer le serveur

#### 5. Accès

- **Local** : http://localhost:3000
- **Réseau** : http://VOTRE_IP:3000

---

## 🌐 Accès depuis Internet

### Configuration Routeur

1. **Trouvez votre IP publique** : https://whatismyipaddress.com

2. **Port Forwarding** :
   - Ouvrez les paramètres du routeur (192.168.1.1)
   - Allez dans "Port Forwarding"
   - Ajoutez :
     - Port externe : 3000
     - Port interne : 3000
     - IP interne : VOTRE_IP_LOCALE
     - Protocole : TCP

3. **Mettez à jour .env** :
   ```env
   NEXTAUTH_URL=http://VOTRE_IP_PUBLIQUE:3000
   ```

4. **Redémarrez le serveur**

5. **Accès** : http://VOTRE_IP_PUBLIQUE:3000

---

## ⚠️ Sécurité

### Obligatoire

1. **NEXTAUTH_SECRET** :
   ```batch
   GENERER_SECRET.bat  → Génère une clé sécurisée
   ```
   ⚠️ **Changez la valeur par défaut !**

2. **SMTP_PASSWORD** :
   - Utilisez un "Mot de passe d'application" Gmail
   - Créez-le dans : Paramètres Google > Sécurité > Validation en 2 étapes

### Recommandé

- **HTTPS** : Configurez pour production (Cloudflare, Let's Encrypt)
- **Firewall** : Le port 3000 est ouvert uniquement pour le serveur
- **Sauvegardes** : Sauvegardez régulièrement `prisma/dev.db`

---

## 🔧 Dépannage

### Site non accessible

```batch
✓ Vérifiez le firewall: CONFIGURER_FIREWALL.bat (admin)
✓ Vérifiez que le serveur est démarré
✓ Vérifiez votre IP: TROUVER_IP.bat
✓ Vérifiez que les appareils sont sur le même réseau
```

### Erreurs de build

```batch
✓ Vérifiez la config: VERIFIER_CONFIG.bat
✓ Supprimez node_modules et .next
✓ Réinstallez: npm install --legacy-peer-deps
```

### Emails ne fonctionnent pas

```batch
✓ Vérifiez SMTP_PASSWORD dans .env
✓ Utilisez un "Mot de passe d'application" Gmail
✓ Vérifiez que la validation en 2 étapes est activée
```

### Port déjà utilisé

```powershell
# Tuer les processus Node.js
taskkill /F /IM node.exe
```

---

## 📝 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `HEBERGER_FINAL.bat` | **Script principal** - Héberge le site (RECOMMANDÉ) |
| `VERIFIER_CONFIG.bat` | Vérifie la configuration |
| `TROUVER_IP.bat` | Trouve votre adresse IP |
| `CONFIGURER_FIREWALL.bat` | Configure le firewall (admin requis) |
| `GENERER_SECRET.bat` | Génère NEXTAUTH_SECRET |
| `DEMARRER_SERVEUR.bat` | Démarre rapidement (si déjà configuré) |

---

## 🚀 Hébergement Permanent

Pour un hébergement professionnel permanent :

### Options Cloud

- **Vercel** (Gratuit) - Déploiement automatique, HTTPS inclus
- **Railway** (~$5-20/mois) - Simple, supporte SQLite/PostgreSQL
- **Render** (Gratuit avec limitations) - Supporte PostgreSQL

### Options VPS

- **DigitalOcean** ($6-12/mois)
- **Linode** ($5-10/mois)
- **Vultr** ($6-12/mois)

Voir `GUIDE_HEBERGEMENT.md` pour plus de détails.

---

## 📚 Documentation

- **Guide complet** : `GUIDE_HEBERGEMENT.md`
- **Instructions rapides** : `INSTRUCTIONS_HEBERGEMENT.txt`
- **Documentation projet** : `README.md`

---

## ✅ Checklist d'Hébergement

- [ ] Node.js 18+ installé
- [ ] Configuration vérifiée (`VERIFIER_CONFIG.bat`)
- [ ] IP trouvée (`TROUVER_IP.bat`)
- [ ] Firewall configuré (`CONFIGURER_FIREWALL.bat` en admin)
- [ ] `.env` configuré avec :
  - [ ] `NEXTAUTH_SECRET` (généré avec `GENERER_SECRET.bat`)
  - [ ] `NEXTAUTH_URL` (avec votre IP)
  - [ ] `SMTP_PASSWORD` (mot de passe d'application Gmail)
- [ ] Site hébergé (`HEBERGER_FINAL.bat`)
- [ ] Site accessible sur http://localhost:3000
- [ ] Site accessible sur http://VOTRE_IP:3000

---

## 🆘 Support

- **Email** : cbcommunity7@gmail.com
- **Documentation** : Consultez `GUIDE_HEBERGEMENT.md`

---

© 2024 CB_Community - Tous droits réservés

