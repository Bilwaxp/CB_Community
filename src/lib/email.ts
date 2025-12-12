import nodemailer from 'nodemailer';

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true pour 465, false pour autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  // Check if SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP non configuré - email non envoyé');
    return { success: false, error: 'SMTP non configuré' };
  }

  const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Vérifiez votre email - CB_Community',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #7B4BFF 0%, #4BD8FF 100%);
              padding: 30px;
              border-radius: 10px;
              color: white;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 10px;
              margin-top: 20px;
              color: #333;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: linear-gradient(135deg, #7B4BFF 0%, #4BD8FF 100%);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Bienvenue sur CB_Community! 🎉</h1>
          </div>
          <div class="content">
            <h2>Vérification de votre email</h2>
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit sur CB_Community. Pour activer votre compte et accéder à toutes les fonctionnalités, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Vérifier mon email</a>
            </div>
            
            <p>Ou copiez et collez ce lien dans votre navigateur :</p>
            <p style="word-break: break-all; color: #7B4BFF;">${verificationUrl}</p>
            
            <p><strong>Ce lien est valide pendant 24 heures.</strong></p>
            
            <p>Si vous n'avez pas créé de compte sur CB_Community, vous pouvez ignorer cet email.</p>
            
            <p>Cordialement,<br>L'équipe CB_Community<br>Email: cbcommunity7@gmail.com</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} CB_Community. Tous droits réservés.</p>
            <p>Pour toute question, contactez-nous à: cbcommunity7@gmail.com</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Bienvenue sur CB_Community!
      
      Vérifiez votre email en cliquant sur ce lien:
      ${verificationUrl}
      
      Ce lien est valide pendant 24 heures.
      
      Si vous n'avez pas créé de compte, ignorez cet email.
      
      Cordialement,
      L'équipe CB_Community
      Email: cbcommunity7@gmail.com
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}



