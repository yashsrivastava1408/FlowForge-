import React from 'react';
import { 
  Plus, 
  ArrowRight, 
  Workflow, 
  Clock, 
  CheckCircle2, 
  Zap,
  Sparkles,
  ArrowUpRight,
  Database,
  Activity,
  Boxes,
  Layers,
  ShieldCheck,
  MousePointer2,
  Terminal,
  Box
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { setView, isDarkMode } = useWorkflowSelectors();

  return (
    <div className={cn("relative min-h-screen", isDarkMode ? "bg-[#0b0e14] text-slate-200" : "bg-[#f8fafc] text-slate-800")}>
      
      {/* SpaceX Cinematic Hero */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-sky-500/10 border border-sky-400/20 backdrop-blur-sm"
           >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-technical text-sky-400">WORKFLOW OVERVIEW</span>
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-5xl md:text-8xl font-display font-black text-white leading-tight max-w-5xl"
           >
             Design HR workflows that are <br />
             <span className="text-sky-400">visible, typed,</span> and simulation-ready.
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto"
           >
             This workspace is structured around the case-study brief: a node canvas, typed configuration forms, mock automation actions, and a simulation layer for validating the workflow before handoff.
           </motion.p>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="pt-8"
           >
              <button 
                onClick={() => setView('designer')}
                className="px-12 py-5 bg-sky-400 text-black font-technical text-sm rounded-sm hover:bg-white transition-all flex items-center gap-4 shadow-xl shadow-sky-400/10 active:scale-95 group"
              >
                 OPEN DESIGNER <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-4 text-[10px] text-slate-600 font-technical italic text-center uppercase tracking-[0.2em]">Last edited in current session</p>
           </motion.div>
        </div>
      </section>

      {/* Main Status Centerpiece */}
      <section className="px-6 py-24 border-y border-white/[0.05] bg-[#0f1218]/50">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-1 border border-white/[0.08] rounded-sm overflow-hidden bg-white/[0.03]">
            
            {/* Active Workflow Card */}
            <div className="lg:col-span-2 p-12 bg-[#0b0e14] flex flex-col justify-between space-y-12">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-technical text-slate-500">ACTIVE WORKFLOW</span>
                  </div>
                  <h3 className="text-4xl font-display font-black text-white">Campus Hiring <br />Pipeline</h3>
                  <p className="text-slate-400 font-medium">5 typed stages ready for simulation</p>
               </div>
               <button 
                 onClick={() => setView('designer')}
                 className="flex items-center gap-3 text-xs font-technical text-sky-400 hover:text-white transition-colors"
               >
                 GO TO CANVAS <ArrowUpRight className="w-4 h-4" />
               </button>
            </div>

            {/* Validation Status */}
            <div className="p-12 bg-[#0b0e14] space-y-8">
               <div className="space-y-2">
                  <span className="text-[10px] font-technical text-slate-500">VALIDATION STATUS</span>
                  <div className="flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                     <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Ready</h4>
                  </div>
               </div>
               <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">Single start and end path configured</p>
            </div>

            {/* Automation Coverage */}
            <div className="p-12 bg-[#0b0e14] space-y-8">
               <div className="space-y-2">
                  <span className="text-[10px] font-technical text-slate-500">AUTOMATION COVERAGE</span>
                  <div className="flex items-center gap-3">
                     <Zap className="w-5 h-5 text-sky-400" />
                     <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">1 Linked</h4>
                  </div>
               </div>
               <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">MSW-backed automations available</p>
            </div>
         </div>
      </section>

      {/* Technical Advantage Breakdown */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/[0.05] pb-12">
               <div className="space-y-4">
                  <span className="text-[10px] font-technical text-slate-600">MISSION CRITICAL DESIGN</span>
                  <h2 className="text-4xl md:text-6xl font-display font-black text-white">What This Prototype Shows</h2>
               </div>
               <div className="flex items-center gap-4 text-xs font-technical text-slate-500 text-right pb-1">
                  <span>DEPLOYMENT: LOCAL_HOST_3000</span>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span>SIM_VER: 1.0.4</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {[
                 { 
                   icon: Database, 
                   title: 'SCHEMA-DRIVEN FORMS', 
                   desc: 'Each node type renders from a shared config and validation schema instead of one-off panels.' 
                 },
                 { 
                   icon: Activity, 
                   title: 'GRAPH VALIDATION', 
                   desc: 'Reachability, orphan detection, start-end checks, and cycle protection are built into the workflow loop.' 
                 },
                 { 
                   icon: Box, 
                   title: 'SIMULATION SANDBOX', 
                   desc: 'The dashboard points directly to a working canvas where the flow can be validated and replayed.' 
                 }
               ].map((item, i) => (
                 <motion.div
                   key={item.title}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className="space-y-8 group"
                 >
                    <div className="w-16 h-16 bg-[#1e293b]/30 border border-white/5 flex items-center justify-center rounded-sm transition-all duration-500 group-hover:border-sky-400 group-hover:bg-sky-400/5 group-hover:scale-105">
                       <item.icon className="w-7 h-7 text-sky-400 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-display font-black text-white tracking-widest italic group-hover:text-sky-400 transition-colors uppercase">{item.title}</h4>
                       <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Suggested Starting Points Section */}
      <section className="py-32 px-6 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <span className="text-[10px] font-technical text-slate-600">WORKFLOWS</span>
                  <h3 className="text-3xl font-display font-black text-white">Suggested Starting Points</h3>
               </div>
               <button onClick={() => setView('designer')} className="px-6 py-2 border border-white/10 hover:border-white transition-all text-[10px] font-technical">VIEW ALL ARCHIVE</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05] rounded-sm overflow-hidden">
               {[
                 { 
                   id: '01', 
                   status: 'DRAFT', 
                   title: 'Candidate Screening', 
                   desc: 'Start -> task -> approval -> automated handoff', 
                   meta: '4 nodes',
                   color: 'text-slate-500'
                 },
                 { 
                   id: '02', 
                   status: 'VALIDATED', 
                   title: 'Offer Approval', 
                   desc: 'Compensation review with manager sign-off', 
                   meta: '5 nodes',
                   color: 'text-emerald-400'
                 },
                 { 
                   id: '03', 
                   status: 'SIMULATION READY', 
                   title: 'Document Collection', 
                   desc: 'Manual request flow with generated reminders', 
                   meta: 'Simulation available',
                   color: 'text-sky-400'
                 }
               ].map((flow) => (
                 <div 
                   key={flow.id} 
                   onClick={() => setView('designer')}
                   className="p-12 bg-[#0b0e14] hover:bg-white/[0.02] transition-colors group cursor-pointer"
                 >
                    <div className="space-y-8">
                       <div className="flex items-center justify-between">
                          <span className="text-4xl font-display font-black text-white/10 group-hover:text-sky-400/20 transition-colors">{flow.id}</span>
                          <span className={cn("text-[9px] font-technical", flow.color)}>{flow.status}</span>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-2xl font-display font-black text-white group-hover:text-sky-400 transition-colors">{flow.title}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{flow.desc}</p>
                       </div>
                       <div className="flex items-center gap-2 pt-4">
                          <div className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="text-[10px] font-technical text-slate-600 uppercase tracking-widest">{flow.meta}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Case Study Footer */}
      <footer className="py-16 px-6 border-t border-white/[0.05] text-center">
         <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-4">
               <div className="h-px w-12 bg-white/10" />
               <div className="w-6 h-6 bg-sky-500 rounded-sm flex items-center justify-center">
                 <span className="text-black font-black text-xs">F</span>
               </div>
               <div className="h-px w-12 bg-white/10" />
            </div>
            <p className="text-[9px] font-technical text-slate-700 uppercase tracking-[0.4em]">Integrated HR Workflow Designer / Case Study Portfolio 2026</p>
         </div>
      </footer>
    </div>
  );
}
