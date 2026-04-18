import React from 'react';
import { 
  User, Workflow, Sun, Moon
} from 'lucide-react';
import { useWorkflowSelectors } from '../../hooks/useWorkflowStore';
import { cn } from '../../lib/utils';
import { AnimatePresence } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { currentView, setView, isDarkMode, toggleDarkMode } = useWorkflowSelectors();
  const isLanding = currentView === 'dashboard';

  return (
    <div className={cn(
      "relative h-screen selection:bg-sky-500/30 flex flex-col overflow-hidden transition-colors duration-500",
      isDarkMode 
        ? "bg-[#0b0e14] text-slate-200" 
        : "bg-[#f8fafc] text-slate-800",
      isLanding ? "overflow-y-auto custom-scrollbar" : ""
    )}>
      
      {/* Dynamic Header */}
      <header className={cn(
        "h-[64px] border-b transition-all duration-500 z-[100] px-6 flex items-center justify-between",
        isDarkMode ? "border-white/[0.05]" : "border-slate-200",
        isLanding 
          ? (isDarkMode ? "bg-[#0b0e14]/80 backdrop-blur-md sticky top-0" : "bg-white/80 backdrop-blur-md sticky top-0")
          : (isDarkMode ? "bg-[#0f1218] shadow-sm" : "bg-white shadow-sm")
      )}>
        <div className="flex items-center gap-12 h-full">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('dashboard')}>
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center">
              <span className="text-white font-black text-xl leading-none">F</span>
            </div>
            <h1 className={cn(
              "text-xl font-display font-black tracking-tight group-hover:text-sky-400 transition-colors",
              isDarkMode ? "text-white" : "text-slate-900"
            )}>
              FlowForge
            </h1>
          </div>

          {/* Conditional Navigation */}
          {isLanding ? (
            <nav className="hidden lg:flex items-center gap-8 ml-8">
              {['Overview', 'Workflow Canvas', 'Simulation'].map((label) => (
                <button key={label} className={cn(
                  "text-[11px] font-black uppercase tracking-widest hover:text-sky-400 transition-colors",
                  isDarkMode ? "text-slate-500" : "text-slate-400"
                )}>
                  {label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="flex items-center gap-4 ml-8">
               <div className={cn("h-4 w-px", isDarkMode ? "bg-white/10" : "bg-slate-200")} />
               <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-sky-400" />
                  <span className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    isDarkMode ? "text-white/90" : "text-slate-800"
                  )}>Campus Placement Drive</span>
                  <div className="px-2 py-0.5 rounded-sm bg-sky-500/10 border border-sky-500/20 text-[8px] font-black text-sky-400">DRAFT</div>
               </div>
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
           {/* Feature 1: Dark Mode Toggle */}
           <button
             onClick={toggleDarkMode}
             className={cn(
               "w-9 h-9 rounded-lg border flex items-center justify-center transition-all",
               isDarkMode 
                 ? "border-white/10 hover:border-sky-400 text-slate-400 hover:text-sky-400" 
                 : "border-slate-200 hover:border-sky-400 text-slate-500 hover:text-sky-400"
             )}
             title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
           >
             {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
           </button>

           {isLanding ? (
             <div className="flex items-center gap-6">
                <div className={cn(
                  "hidden md:flex items-center gap-3 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em]",
                  isDarkMode ? "border-white/10 bg-white/[0.03] text-slate-400" : "border-slate-200 bg-slate-100 text-slate-500"
                )}>
                  HR workflow designer prototype
                </div>
                <button 
                  onClick={() => setView('designer')}
                  className="px-6 py-2 border border-sky-400/50 hover:bg-sky-400 hover:text-black rounded-sm text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Open Workspace
                </button>
             </div>
           ) : (
             <>
               <button
                 onClick={() => setView('dashboard')}
                 className={cn(
                   "mr-3 rounded-lg border px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                   isDarkMode ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]" : "border-slate-200 text-slate-600 hover:bg-slate-100"
                 )}
               >
                 Overview
               </button>

               <div className={cn("h-6 w-px mx-1", isDarkMode ? "bg-white/10" : "bg-slate-200")} />

               <div className="flex items-center gap-3">
                 <div className={cn(
                   "w-9 h-9 rounded-lg border p-0.5 hover:border-sky-400 transition-all cursor-pointer overflow-hidden",
                   isDarkMode ? "border-white/10" : "border-slate-200"
                 )}>
                   <div className={cn(
                     "w-full h-full rounded-sm flex items-center justify-center",
                     isDarkMode ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"
                   )}>
                     <User className="w-5 h-5" />
                   </div>
                 </div>
               </div>
             </>
           )}
        </div>
      </header>

      {/* Main View Port */}
      <main className={cn(
        "flex-1 relative overflow-hidden",
        isLanding ? "overflow-visible" : ""
      )}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
    </div>
  );
}
