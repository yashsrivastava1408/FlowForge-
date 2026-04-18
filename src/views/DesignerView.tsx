import React, { useRef } from 'react';
import { Canvas } from '../components/Canvas';
import { Sidebar } from '../components/Sidebar';
import { NodeFormPanel } from '../forms/NodeFormPanel';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { 
  Play, 
  Download, 
  Upload, 
  ChevronRight,
  Layout,
  Library,
  Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DesignerView() {
  const { nodes, edges, importSnapshot } = useWorkflowSelectors();
  const inputRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'placement-workflow.json';
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const snapshot = JSON.parse(content);
          importSnapshot(snapshot);
        } catch (err) {
          console.error('Failed to parse JSON', err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex h-full bg-[#02020a] relative overflow-hidden text-slate-200 selection:bg-indigo-500/30">
      {/* Designer Background Ambience */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      
      {/* Left Sidebar: Step Library */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-80 h-full nova-glass border-r border-white/10 z-40 flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Library className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-display font-black text-white uppercase tracking-tight">Step Library</h2>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-slate-500">
            PRO
          </div>
        </div>
        <Sidebar />
      </motion.aside>

      {/* Main Canvas Area */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Designer Sub-Header / Breadcrumb */}
        <div className="h-14 px-8 flex items-center justify-between nova-glass-soft border-b border-white/5 z-30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              <span>Pro_Drives</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <h2 className="text-sm font-display font-black text-white tracking-wide">Campus Placement 2026</h2>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-none">Live</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={exportJson}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Save Workflow"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => inputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Import Workflow"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
            
            <input 
              type="file" 
              ref={inputRef} 
              onChange={handleImport} 
              className="hidden" 
              accept=".json"
            />

            <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-nova text-white text-xs font-bold shadow-nova transition-all hover:scale-105 active:scale-95 group">
              <Play className="w-3.5 h-3.5 fill-current" /> 
              <span>Start Flow</span>
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <Canvas />
          
          {/* Floating Workspace Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl nova-glass border border-white/10 shadow-2xl z-40">
            <button className="p-3 text-white bg-indigo-500 rounded-xl shadow-lg">
               <Layout className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <span className="text-[10px] font-bold text-slate-400 px-4 uppercase tracking-[0.2em] whitespace-nowrap">
               Spatial_Draft_v1.2
            </span>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Configuration Panel */}
      <motion.aside 
        initial={{ x: 340 }}
        animate={{ x: 0 }}
        className="w-[340px] h-full nova-glass border-l border-white/10 z-40 flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-display font-black text-white uppercase tracking-tight">Step Settings</h2>
          </div>
        </div>
        <NodeFormPanel />
      </motion.aside>
    </div>
  );
}
