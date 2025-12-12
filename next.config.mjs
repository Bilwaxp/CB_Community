/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['pdfkit'],
  },
  // Configuration pour hébergement serveur
  output: 'standalone',
  // Optimisations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Désactiver ESLint pendant le build si nécessaire
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Exposer les variables d'environnement pour vérifier si Google est configuré
  env: {
    NEXT_PUBLIC_GOOGLE_ENABLED: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? 'true' : 'false',
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;








