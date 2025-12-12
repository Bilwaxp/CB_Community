/**
 * Configuration des informations de paiement
 * Ces informations sont utilisées pour les paiements manuels
 */

export const PAYMENT_CONFIG = {
  // Moncash
  MONCASH: {
    phoneNumber: '+50948176784',
    displayNumber: '+509 4817 6784',
  },

  // Natcash
  NATCASH: {
    phoneNumber: '+50942681445',
    displayNumber: '+509 4268 1445',
  },

  // PayPal
  PAYPAL: {
    email: 'wadlexmo@gmail.com',
    name: 'CB Community',
  },

  // Zelle (utilise le même email que PayPal)
  ZELLE: {
    email: 'wadlexmo@gmail.com',
    name: 'CB Community',
  },

  // Cryptomonnaie
  CRYPTO: {
    USDT: {
      address: 'TEzp6i7rzBws15CUsXxhZg75SNL7FPghxD',
      network: 'TRC20',
      currency: 'USDT',
    },
    BTC: {
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: 'Bitcoin',
      currency: 'BTC',
    },
  },
};

