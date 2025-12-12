# Guide de Dépannage - Erreur d'Inscription

## Problèmes courants et solutions

### 1. Modèles Prisma manquants

Si vous obtenez une erreur concernant `verificationToken` ou `auditLog`, vous devez ajouter ces modèles dans `prisma/schema.prisma` :

```prisma
model VerificationToken {
  id         String   @id @default(cuid())
  identifier String
  token      String   @unique
  expires    DateTime
  type       String   @default("EMAIL_VERIFICATION")
  createdAt  DateTime @default(now())

  @@map("verification_tokens")
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String
  entity    String
  entityId  String?
  metadata  Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  @@map("audit_logs")
}
```

Ensuite, exécutez :
```bash
npx prisma generate
npx prisma db push
```

### 2. Configuration SMTP (Optionnel)

L'envoi d'email est optionnel. Si SMTP n'est pas configuré, l'inscription fonctionnera quand même mais l'email ne sera pas envoyé.

Pour configurer SMTP, ajoutez dans `.env` :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app
SMTP_FROM=noreply@cbcommunity.com
```

### 3. Base de données non initialisée

Assurez-vous que la base de données est initialisée :
```bash
npx prisma generate
npx prisma db push
```

### 4. Vérifier les logs

Consultez la console du serveur pour voir les erreurs exactes :
- Erreurs Prisma
- Erreurs de connexion à la base de données
- Erreurs d'envoi d'email

### 5. Mode développement sans email

Pour tester sans configurer SMTP, l'inscription fonctionnera mais vous devrez vérifier manuellement l'email dans la base de données ou créer une route de test.

## Test rapide

1. Vérifiez que la base de données fonctionne :
```bash
npx prisma studio
```

2. Testez l'inscription avec des données valides

3. Vérifiez les logs dans la console du serveur






