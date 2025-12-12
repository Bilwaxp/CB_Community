'use client';

import Link from 'next/link';
import {
  Twitter,
  Instagram,
  Youtube,
  Send,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  platform: [
    { name: 'Accueil', href: '/' },
    { name: 'Cours', href: '/courses' },
    { name: 'Signaux', href: '/signals' },
    { name: 'Communauté', href: '/community' },
    { name: 'Tarifs', href: '/pricing' },
  ],
  company: [
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Conditions d\'utilisation', href: '/terms' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Cookies', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'Telegram', href: 'https://t.me', icon: Send },
];

export function Footer() {
  return (
    <footer className="relative bg-surface-dark border-t border-border-glow mt-20">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-violet to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-neon-violet to-neon-cyan rounded-xl shadow-glow-sm">
                <span className="font-display font-bold text-xl text-white">CB</span>
              </div>
              <span className="font-display font-bold text-2xl text-text-primary">
                CB_<span className="text-neon-violet">Community</span>
              </span>
            </Link>

            <p className="text-text-secondary mb-6 max-w-sm">
              La plateforme premium pour maîtriser le trading et les cryptomonnaies.
              Formations, signaux exclusifs et coaching personnalisé.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-text-primary">
                Restez informé de nos dernières actualités
              </p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1"
                />
                <Button variant="primary" size="icon">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Plateforme</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-neon-violet transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-neon-violet transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-neon-violet transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border-glow flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} CB_Community. Tous droits réservés.
            Créé par <span className="text-neon-violet font-medium">Wadlex Pluviose</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-neon-violet hover:bg-neon-violet/10 rounded-lg transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}













