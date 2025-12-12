import type { Metadata } from 'next';
import { Space_Grotesk, Orbitron, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'CB_Community | Trading & Crypto Education Platform',
  description:
    'Rejoignez CB_Community pour des formations premium en trading et cryptomonnaies, des signaux exclusifs, coaching personnalisé et une communauté active.',
  keywords: [
    'trading',
    'crypto',
    'bitcoin',
    'formation',
    'forex',
    'signals',
    'coaching',
  ],
  authors: [{ name: 'Wadlex Pluviose' }],
  openGraph: {
    title: 'CB_Community | Trading & Crypto Education Platform',
    description:
      'Formations premium, signaux exclusifs et coaching en trading et cryptomonnaies.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CB_Community',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CB_Community',
    description: 'Trading & Crypto Education Platform',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        {/* Animated background */}
        <div className="animated-bg" />
        <div className="grid-bg fixed inset-0 pointer-events-none z-[-1]" />

        {/* Main content */}
        {children}

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0D0B24',
              color: '#FFFFFF',
              border: '1px solid rgba(123, 75, 255, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#00FFA3',
                secondary: '#0D0B24',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF4B6E',
                secondary: '#0D0B24',
              },
            },
          }}
        />
      </body>
    </html>
  );
}













