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
      <section className="relative pt-48 pb-40 px-6 overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="flex flex-col items-start text-left space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-start gap-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-sky-500/10 border border-sky-400/20 backdrop-blur-sm">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[10px] font-technical text-sky-400 uppercase tracking-[0.2em]">MISSION CRITICAL DESIGN v1.0.4</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter"
            >
              Design workflows <br />
              <span className="text-sky-400 italic">simulation-ready.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
            >
              The industry-standard workspace for HR automation. Canvas-driven logic, schema-validated nodes, and a sandbox simulation engine for mission-critical handoffs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <button
                onClick={() => setView('designer')}
                className="px-12 py-5 bg-sky-400 text-black font-technical text-sm rounded-sm hover:bg-white transition-all flex items-center gap-4 shadow-2xl shadow-sky-400/20 active:scale-95 group"
              >
                OPEN WORKSPACE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </motion.div>
          </div>

          {/* Premium Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative perspective-1000 group hidden lg:block"
          >
            {/* Background Glows */}
            <div className="absolute -inset-4 bg-sky-500/10 blur-[120px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_70%)] pointer-events-none" />

            {/* Glass Frame */}
            <div className="glass-container rounded-lg p-3 relative z-10 overflow-hidden transform group-hover:rotate-x-2 group-hover:rotate-y-2 transition-transform duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Fake Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="mx-auto bg-white/5 rounded-md px-10 py-1 text-[8px] font-technical text-slate-500 lowercase tracking-widest">
                  flowforge.tredence.ai/canvas
                </div>
              </div>

              <div className="relative aspect-video rounded-sm overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src="/logo.png"
                  alt="FlowForge Workflow Interface"
                  className="w-full h-full object-cover relative z-10 drop-shadow-2xl scale-150 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />

                {/* Floating Micro-UI Overlays */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 right-6 z-20 glass-container px-4 py-3 rounded-lg border-sky-400/30 flex items-center gap-3"
                >

                </motion.div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-400/5 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-400/5 blur-3xl rounded-full" />
          </motion.div>

          {/* Mobile Image Fallback */}
          <div className="lg:hidden mt-12 w-full">
            <div className="glass-container rounded-lg p-2 overflow-hidden aspect-video">
              <img src="/logo.png" alt="Hero" className="w-full h-full object-cover" />
            </div>
          </div>
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
            <div className="w-8 h-8 flex items-center justify-center p-1 relative">
              <div className="absolute inset-0 bg-sky-500/20 blur-lg rounded-full opacity-40" />
              <img src="/logo.png" alt="FlowForge" className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="h-px w-12 bg-white/10" />
          </div>
          <p className="text-[9px] font-technical text-slate-700 uppercase tracking-[0.4em]"><link rel="stylesheet" href="https://github.com/yashsrivastava1408/FlowForge-" /><button>github</button></p>
        </div>
      </footer>
    </div>
  );
}
