import React from 'react';
import { 
  Plus, 
  ArrowRight, 
  Workflow, 
  Clock, 
  CheckCircle2, 
  Zap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { setView } = useWorkflowSelectors();

  const stats = [
    { label: 'Active Recruitment Drives', value: '12', icon: Workflow, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Avg. Onboarding Time', value: '4.2d', icon: Clock, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { label: 'Pending Approvals', value: '28', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  const recentWorkflows = [
    { id: '1', name: 'Campus Placement 2026', steps: 8, status: 'Active', color: 'indigo' },
    { id: '2', name: 'Senior Leadership Hiring', steps: 12, status: 'Draft', color: 'rose' },
    { id: '3', name: 'Internship Program', steps: 5, status: 'Active', color: 'violet' },
  ];

  return (
    <div className="relative min-h-screen pt-12 pb-32 px-8 overflow-hidden bg-lumina">

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Lumina Asymmetrical Hero */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
          <div className="flex-1 space-y-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-gradient-nova rounded-xl shadow-nova">
                    <Sparkles className="w-5 h-5 text-white" />
                 </div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Next_Gen Placement Hub</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-10">
                Crafting <br />
                <span className="text-gradient-nova">Exceptional</span> <br />
                Talent Flows.
              </h2>

              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-12">
                Elevate your student recruitment with an immersive, intelligent, and beautifully simple workflow orchestration system.
              </p>

              <div className="flex items-center gap-6">
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setView('designer')}
                   className="px-10 py-5 bg-white text-black font-black text-sm rounded-[24px] shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center gap-3 group transition-all"
                 >
                   Start New Drive <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                 </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end order-1 lg:order-2">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ duration: 1.2, delay: 0.2 }}
               className="relative w-full max-w-[440px] aspect-square rounded-[64px] lumina-glass border border-white/10 p-12 flex items-center justify-center group overflow-hidden"
             >
                {/* Holographic Center Detail */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-50" />
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-24 h-24 rounded-full bg-gradient-nova p-0.5 mb-8 animate-pulse shadow-nova">
                      <div className="w-full h-full bg-[#02020a] rounded-full flex items-center justify-center">
                         <Workflow className="w-10 h-10 text-white" />
                      </div>
                   </div>
                   <h3 className="text-4xl font-display font-black text-white mb-2 leading-none">94.2%</h3>
                   <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest leading-none">Global Sync Success</p>
                </div>

                {/* Satellite Tags */}
                <div className="absolute top-12 left-12 p-4 lumina-glass rounded-3xl border border-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="absolute bottom-16 right-10 p-4 lumina-glass rounded-3xl border border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <Zap className="w-6 h-6 text-amber-400" />
                </div>
             </motion.div>
          </div>
        </section>

        {/* Lumina Organic Stat Ribbon */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {stats.map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + i * 0.1 }}
               whileHover={{ scale: 1.02 }}
               className="group relative p-10 rounded-[48px] lumina-glass prism-border border border-white/5 transition-all cursor-pointer"
             >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", stat.bg)}>
                   <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <p className="text-5xl font-display font-black text-white mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
             </motion.div>
           ))}
        </section>

        {/* Unique Workspace Preview */}
        <section className="space-y-12">
           <div className="flex items-end justify-between px-2">
             <div className="space-y-2">
                <h3 className="text-2xl font-display font-black text-white tracking-tight">Active Recruitment Streams</h3>
                <p className="text-xs text-slate-500 font-medium">Continue where you left off in your latest drives.</p>
             </div>
             <button className="text-[11px] font-bold text-indigo-400 hover:text-white transition-colors uppercase tracking-[0.2em]">Explore Archive</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentWorkflows.map((flow, i) => (
                <motion.div
                  key={flow.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  onClick={() => setView('designer')}
                  className="group p-8 rounded-[40px] lumina-glass border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden h-64 flex flex-col justify-between"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Workflow className="w-32 h-32 -rotate-12" />
                   </div>
                   
                   <div className="relative z-10 flex justify-between items-start">
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-widest">{flow.steps} Stages</div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white">
                         <ArrowUpRight className="w-4 h-4" />
                      </div>
                   </div>

                   <div className="relative z-10">
                      <h4 className="text-2xl font-display font-black text-white mb-1 group-hover:text-indigo-300 transition-colors tracking-tight">{flow.name}</h4>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">{flow.status} Process</span>
                      </div>
                   </div>
                </motion.div>
              ))}
              
              {/* Artistic Call to Action Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
                onClick={() => setView('designer')}
                className="group p-8 rounded-[40px] bg-gradient-nova border border-white/10 transition-all cursor-pointer h-64 flex flex-col items-center justify-center text-center shadow-nova"
              >
                 <Plus className="w-12 h-12 text-white mb-4 group-hover:scale-110 transition-transform duration-500" />
                 <h4 className="text-xl font-display font-black text-white px-8 leading-tight">Create Custom Recruitment Drive</h4>
              </motion.div>
           </div>
        </section>
      </div>
    </div>
  );
}
