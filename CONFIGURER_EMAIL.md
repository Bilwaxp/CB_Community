# Configuration de l'Email pour CB_Community

## Email configuré
- **Adresse email**: cbcommunity7@gmail.com
- **Serveur SMTP**: smtp.gmail.com
- **Port**: 587

## Configuration requise pour Gmail

Gmail nécessite un **"Mot de passe d'application"** (App Password) pour l'authentification SMTP. Voici comment l'obtenir :

### Étapes pour créer un mot de passe d'application Gmail :

1. **Activez la validation en 2 étapes** (si ce n'est pas déjà fait) :
   - Allez sur https://myaccount.google.com/security
   - Activez la "Validation en deux étapes"

2. **Créez un mot de passe d'application** :
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)"
   - Entrez "CB_Community" comme nom
   - Cliquez sur "Générer"
   - **Copiez le mot de passe généré** (16 caractères)

3. **Ajoutez le mot de passe dans le fichier .env** :
   - Ouvrez le fichier `.env` dans le projet
   - Trouvez la ligne `SMTP_PASSWORD=`
   - Collez le mot de passe d'application après le `=`
   - Exemple : `SMTP_PASSWORD=abcd efgh ijkl mnop`

### Fichier .env final devrait contenir :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=cbcommunity7@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application-ici
SMTP_FROM=cbcommunity7@gmail.com
```

## Test de l'envoi d'email

Une fois configuré, les emails de vérification seront automatiquement envoyés à chaque nouvelle inscription.

## Note importante

- Ne partagez jamais votre mot de passe d'application
- Le fichier `.env` ne doit jamais être commité dans Git (il est déjà dans .gitignore)
- Si vous changez le mot de passe Gmail, vous devrez créer un nouveau mot de passe d'application




