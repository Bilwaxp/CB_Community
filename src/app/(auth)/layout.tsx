import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-neon-violet to-neon-cyan rounded-xl shadow-glow-md">
            <span className="font-display font-bold text-xl text-white">CB</span>
          </div>
          <span className="font-display font-bold text-2xl text-text-primary">
            CB_<span className="text-neon-violet">Community</span>
          </span>
        </Link>

        {children}

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary mt-8">
          © {new Date().getFullYear()} CB_Community. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}













