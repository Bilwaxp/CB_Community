'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  TrendingUp,
  Video,
  CreditCard,
  Award,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Shield,
  Upload,
  Activity,
} from 'lucide-react';
import { Avatar, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Utilisateurs', href: '/admin/users', icon: Users },
  { name: 'Cours', href: '/admin/courses', icon: BookOpen },
  { name: 'Plans', href: '/admin/plans', icon: Award },
  { name: 'Signaux', href: '/admin/signals', icon: TrendingUp },
  { name: 'Appels vidéo', href: '/admin/video', icon: Video },
  { name: 'Paiements', href: '/admin/payments', icon: CreditCard },
  { name: 'Certificats', href: '/admin/certificates', icon: Award },
  { name: 'Médias', href: '/admin/media', icon: Upload },
  { name: 'Forum', href: '/admin/forum', icon: MessageSquare },
  { name: 'Logs', href: '/admin/logs', icon: Activity },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
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
          'fixed inset-y-0 left-0 z-50 w-72 bg-surface-dark border-r border-neon-violet/30 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-neon-violet/30">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-neon-violet to-red-500 rounded-xl shadow-neon-violet">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-text-primary block">
                  Admin Panel
                </span>
                <span className="text-xs text-neon-violet">CB_Community</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-neon-violet/20 text-neon-violet shadow-glow-sm border border-neon-violet/30'
                    : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Admin Info */}
          <div className="p-4 border-t border-neon-violet/30">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neon-violet/10 border border-neon-violet/20">
              <Avatar nom="Pluviose" prenom="Wadlex" size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary truncate">
                  Wadlex Pluviose
                </p>
                <Badge variant="violet" size="sm" glow>
                  <Shield className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              </div>
            </div>
            <Link href="/dashboard">
              <button className="flex items-center gap-2 w-full mt-4 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-light rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                Retour au site
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface-dark/80 backdrop-blur-xl border-b border-neon-violet/20">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Title */}
            <div className="hidden lg:block">
              <Badge variant="violet" glow>
                <Shield className="w-3 h-3 mr-1" />
                Zone Admin Sécurisée
              </Badge>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-light rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link href="/" className="hidden sm:block">
                <Badge variant="cyan">Voir le site</Badge>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}













