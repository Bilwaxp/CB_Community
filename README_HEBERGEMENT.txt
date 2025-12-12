========================================
  GUIDE RAPIDE D'HEBERGEMENT
========================================

POUR HEBERGER LE SITE AUJOURD'HUI:

1. Double-cliquez sur: HEBERGER_MAINTENANT.bat
   (Ce script fait tout automatiquement)

OU manuellement:

1. TOUT_PREPARER.bat          - Prepare tout
2. TROUVER_IP.bat              - Trouve votre IP
3. CONFIGURER_FIREWALL.bat     - Ouvre le port 3000 (en admin)
4. DEMARRER_SERVEUR.bat        - Lance le serveur

========================================
  CONFIGURATION IMPORTANTE
========================================

1. Modifiez le fichier .env:
   NEXTAUTH_URL=http://VOTRE_IP:3000
   
   Remplacez VOTRE_IP par votre adresse IP locale

2. Pour acces depuis Internet:
   - Configurez le port forwarding sur votre routeur
   - Port externe: 3000
   - Port interne: 3000
   - IP interne: Votre IP locale

========================================
  ACCES AU SITE
========================================

- Local: http://localhost:3000
- Reseau: http://VOTRE_IP:3000
- Internet: http://VOTRE_IP_PUBLIQUE:3000

========================================
  SECURITE
========================================

1. Changez NEXTAUTH_SECRET dans .env
2. Utilisez un mot de passe fort
3. Configurez HTTPS si possible

========================================
  SUPPORT
========================================

Voir GUIDE_HEBERGEMENT.md pour plus de details.




