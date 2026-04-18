import React from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  Settings, 
  Bell, 
  Search, 
  User,
  Plus
} from 'lucide-react';
import { useWorkflowSelectors } from '../../hooks/useWorkflowStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { currentView, setView } = useWorkflowSelectors();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'designer', label: 'Designer', icon: Workflow },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="relative h-screen bg-[#02020a] text-slate-200 selection:bg-indigo-500/30 flex flex-col overflow-hidden">
      {/* Background Ambience */}
      <div className="orb w-[600px] h-[600px] bg-indigo-500/10 -top-48 -left-48" />
      <div className="orb w-[800px] h-[800px] bg-rose-500/10 bottom-0 -right-48" style={{ animationDelay: '-10s' }} />

      {/* Nova Floating Header */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4">
        <header className="h-16 nova-glass rounded-full px-8 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('dashboard')}>
              <div className="w-8 h-8 bg-gradient-nova rounded-lg flex items-center justify-center shadow-nova group-hover:scale-110 transition-transform duration-500">
                <Workflow className="w-4.5 h-4.5 text-white" />
              </div>
              <h1 className="text-lg font-display font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all">
                Nova<span className="text-indigo-400">Hire</span>
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as any)}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold transition-all relative group overflow-hidden",
                    currentView === item.id 
                      ? "text-white" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {currentView === item.id && (
                    <motion.div 
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 w-[200px] gap-2 transition-all focus-within:w-[280px] focus-within:border-indigo-500/30">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search drive..."
                className="bg-transparent border-none outline-none text-[11px] font-medium text-white placeholder:text-slate-600 w-full"
              />
            </div>
            
            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-400 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <div className="w-9 h-9 rounded-full border border-white/10 p-0.5 hover:border-indigo-400 transition-all cursor-pointer overflow-hidden">
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Main View Port */}
      <main className="flex-1 pt-28 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Quick Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-nova rounded-2xl flex items-center justify-center shadow-nova z-[100] group"
        onClick={() => setView('designer')}
      >
        <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-500" />
      </motion.button>
    </div>
  );
}
