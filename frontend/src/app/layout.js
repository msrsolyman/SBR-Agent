import './globals.css';

export const metadata = {
  title: 'SBR Agent AI - No-Code Multi-Agent & Workflow Automation Platform',
  description: 'Design, train, connect, and monetize custom AI agents and visual workflow pipelines without writing any code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between cyber-grid radial-glow-indigo">
        
        {/* Global Shimmering Header */}
        <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 md:px-8 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-lg text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              S
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                SBR AGENT AI
              </span>
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-violet-500/20 text-violet-400 border border-violet-500/30 pulse-badge uppercase">
                Enterprise
              </span>
            </div>
          </div>

          {/* Desktop Nav Hub */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-300">
            <a href="/" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Home</a>
            <a href="/dashboard" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Dashboard</a>
            <a href="/builder" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Agent Builder</a>
            <a href="/canvas" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Workflow Canvas</a>
            <a href="/chat" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">AI Chat</a>
            <a href="/marketplace" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Marketplace</a>
            <a href="/developer" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Developer API</a>
            <a href="/billing" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors">Billing</a>
            <a href="/admin" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 border border-red-500/20 text-red-400 transition-colors">Admin</a>
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-white/5 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Workspace: <strong className="text-slate-200">SBR Main</strong>
            </div>

            <a href="/auth" className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95">
              Launch Console
            </a>
          </div>
        </header>

        {/* Primary Page Canvas */}
        <main className="flex-1 w-full flex flex-col relative z-20">
          {children}
        </main>

        {/* Global Footer (Visible on desktops) */}
        <footer className="hidden md:flex border-t border-white/5 bg-slate-950/30 py-6 px-8 items-center justify-between text-xs text-slate-500 relative z-30">
          <div>
            © 2026 SBR Agent AI Inc. Engineered for next-gen automation pipelines.
          </div>
          <div className="flex gap-4">
            <a href="/docs" className="hover:text-slate-300">API Documentation</a>
            <a href="/privacy" className="hover:text-slate-300">Security Audit logs</a>
            <a href="/pricing" className="hover:text-slate-300">Stripe Invoicing</a>
          </div>
        </footer>

        {/* Futuristic Mobile Bottom Navigation Menu */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 px-4 py-2 flex items-center justify-around backdrop-blur-lg">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-violet-400 transition-colors">
            <span className="text-base">📊</span>
            <span className="text-[9px] font-medium">Dashboard</span>
          </a>
          <a href="/builder" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-violet-400 transition-colors">
            <span className="text-base">🤖</span>
            <span className="text-[9px] font-medium">Builder</span>
          </a>
          <a href="/canvas" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-violet-400 transition-colors">
            <span className="text-base">🕸️</span>
            <span className="text-[9px] font-medium">Canvas</span>
          </a>
          <a href="/chat" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-violet-400 transition-colors">
            <span className="text-base">💬</span>
            <span className="text-[9px] font-medium">Chat</span>
          </a>
          <a href="/marketplace" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-violet-400 transition-colors">
            <span className="text-base">🛒</span>
            <span className="text-[9px] font-medium">Store</span>
          </a>
        </nav>
        
      </body>
    </html>
  );
}
