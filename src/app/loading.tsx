export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-neon-violet/20 border-t-neon-violet rounded-full animate-spin" />
        <p className="text-text-secondary">Chargement...</p>
      </div>
    </div>
  );
}




