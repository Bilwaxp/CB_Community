'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Video,
  User,
  CreditCard,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { Avatar, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mes cours', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Signaux', href: '/dashboard/signals', icon: TrendingUp },
  { name: 'Communauté', href: '/dashboard/community', icon: MessageSquare },
  { name: 'Appels vidéo', href: '/dashboard/live', icon: Video },
  { name: 'Certificats', href: '/dashboard/certificates', icon: Award },
  { name: 'Paiements', href: '/dashboard/billing', icon: CreditCard },
];

const bottomNavigation = [
  { name: 'Profil', href: '/dashboard/profile', icon: User },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{
    nom: string;
    prenom: string;
    email: string;
    plan: string;
    photo: string | null;
  } | null>(null);

  // Fetch user data from database
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetch('/api/user/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUserData({
              nom: data.user.nom || '',
              prenom: data.user.prenom || 'Utilisateur',
              email: data.user.email || '',
              plan: data.user.plan || 'BASIC',
              photo: data.user.photo || null,
            });
          }
        })
        .catch(() => {
          // Fallback to session data
          const userName = session?.user?.name || '';
          const nameParts = userName.split(' ');
          setUserData({
            nom: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
            prenom: nameParts[0] || 'Utilisateur',
            email: session?.user?.email || '',
            plan: (session?.user as any)?.plan || 'BASIC',
            photo: session?.user?.image || null,
          });
        });
    }
  }, [session, status]);

  // Get user data from state or fallback to session
  const userName = session?.user?.name || '';
  const nameParts = userName.split(' ');
  const user = userData || {
    nom: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
    prenom: nameParts[0] || 'Utilisateur',
    email: session?.user?.email || '',
    plan: (session?.user as any)?.plan || 'BASIC',
    photo: session?.user?.image || null,
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-surface-dark border-r border-border-glow transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border-glow">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-neon-violet to-neon-cyan rounded-xl shadow-glow-sm">
                <span className="font-display font-bold text-lg text-white">CB</span>
              </div>
              <span className="font-display font-bold text-xl text-text-primary">
                CB_<span className="text-neon-violet">Community</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-neon-violet/10 text-neon-violet shadow-glow-sm'
                    : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {item.name === 'Signaux' && (
                  <Badge variant="green" size="sm" className="ml-auto">
                    3 NEW
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="px-4 py-4 border-t border-border-glow space-y-2">
            {bottomNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-neon-violet/10 text-neon-violet'
                    : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-t border-border-glow">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-light">
              <Avatar
                nom={user.nom}
                prenom={user.prenom}
                src={user.photo}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary truncate">
                  {user.prenom} {user.nom}
                </p>
                <Badge variant="violet" size="sm">
                  {user.plan}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface-dark/80 backdrop-blur-xl border-b border-border-glow">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search - hidden on mobile */}
            <div className="hidden lg:block flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-2 pl-10 bg-surface-light border border-border-glow rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-neon-violet focus:outline-none"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-light rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full" />
              </button>

              {/* User menu - desktop */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-light transition-colors"
                >
                  <Avatar
                    nom={user.nom}
                    prenom={user.prenom}
                    src={user.photo}
                    size="sm"
                  />
                  <span className="font-medium text-text-primary">
                    {user.prenom}
                  </span>
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-surface-dark border border-border-glow rounded-xl shadow-glass overflow-hidden"
                    >
                      <div className="p-4 border-b border-border-glow">
                        <p className="font-medium text-text-primary">
                          {user.prenom} {user.nom}
                        </p>
                        <p className="text-sm text-text-secondary truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-surface-light hover:text-text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Profil
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-surface-light hover:text-text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Paramètres
                        </Link>
                      </div>
                      <div className="py-2 border-t border-border-glow">
                        <button className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}













