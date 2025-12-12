'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Video,
  Info,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Cours', href: '/courses', icon: BookOpen },
  { name: 'Signaux', href: '/signals', icon: TrendingUp },
  { name: 'Communauté', href: '/community', icon: MessageSquare },
  { name: 'À propos', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border-glow shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-neon-violet to-neon-cyan rounded-xl group-hover:shadow-glow-md transition-shadow">
              <span className="font-display font-bold text-lg text-white">CB</span>
            </div>
            <span className="font-display font-bold text-xl text-text-primary hidden sm:block">
              CB_<span className="text-neon-violet">Community</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                  isActive(item.href)
                    ? 'text-neon-violet bg-neon-violet/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" leftIcon={<User className="w-4 h-4" />}>
                S&apos;inscrire
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-primary hover:bg-surface-light rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-dark border-b border-border-glow"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive(item.href)
                      ? 'text-neon-violet bg-neon-violet/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                  )}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-border-glow space-y-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full" leftIcon={<LogIn className="w-4 h-4" />}>
                    Connexion
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" leftIcon={<User className="w-4 h-4" />}>
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}













