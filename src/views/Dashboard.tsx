import React from 'react';
import { 
  Plus, 
  ArrowRight, 
  Workflow, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Play,
  Zap,
  Box,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { setView } = useWorkflowSelectors();

  const stats = [
    { label: 'Active Recruitment Drives', value: '12', icon: Workflow, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
    { label: 'Average Onboarding Time', value: '4.2d', icon: Clock, color: 'text-rose-400', bg: 'bg-rose-400/5' },
    { label: 'Success Rate', value: '94%', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/5' },
    { label: 'Pending Approvals', value: '28', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/5' },
  ];

  const recentWorkflows = [
    { id: '1', name: 'Campus Placement 2026', steps: 8, status: 'Active', updated: '2h ago', color: 'bg-indigo-500' },
    { id: '2', name: 'Senior Leadership Hiring', steps: 12, status: 'Draft', updated: '5h ago', color: 'bg-rose-500' },
    { id: '3', name: 'Internship Program', steps: 5, status: 'Active', updated: '1d ago', color: 'bg-violet-500' },
    { id: '4', name: 'Off-campus Drive', steps: 6, status: 'Active', updated: '3d ago', color: 'bg-amber-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      {/* Nova Welcome Section */}
      <section className="relative overflow-hidden p-12 rounded-[32px] nova-glass border border-white/10 group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Hiring_Active</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight">
                Streamline Your<br />
                <span className="text-gradient-nova">Placement Program.</span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                Design, automate, and manage complex recruitment workflows with a sophisticated, intuitive designer.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setView('designer')}
                  className="px-8 py-4 bg-white text-black font-bold text-sm rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-white/5"
                >
                  Create New Drive <Plus className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm rounded-2xl transition-all active:scale-95">
                  View Components
                </button>
              </div>
            </motion.div>
          </div>

          <div className="relative hidden lg:block w-72">
             <div className="p-8 nova-glass rounded-3xl border border-white/10 shadow-2xl space-y-6">
               <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-nova flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Status</span>
               </div>
               <div className="space-y-4">
                  {[75, 45, 90].map((val, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                          className="h-full bg-indigo-500" 
                        />
                      </div>
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-center text-slate-600 font-bold uppercase tracking-widest">Processing Drive</p>
             </div>
          </div>
        </div>
      </section>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[32px] nova-glass border border-white/5 hover:border-white/20 transition-all group flex flex-col justify-between h-48"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-3xl font-display font-black text-white mb-1">{stat.value}</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">Active Recruitment Flows</h3>
          <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">View All Drives</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentWorkflows.map((flow, i) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.4 }}
              onClick={() => setView('designer')}
              className="p-1 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent hover:from-indigo-500/20 transition-all cursor-pointer group"
            >
              <div className="p-8 rounded-[28px] bg-[#0c0c14] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={cn("w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-2xl", flow.color)}>
                    <Workflow className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{flow.name}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{flow.steps} Steps</span>
                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Updated {flow.updated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center pr-2">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


