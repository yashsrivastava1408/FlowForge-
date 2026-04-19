import React, { useRef, useState, useMemo } from 'react';
import { Canvas } from '../components/Canvas';
import { Sidebar } from '../components/Sidebar';
import { NodeFormPanel } from '../forms/NodeFormPanel';
import { SimulationPanel } from '../components/SimulationPanel';
import { ValidationBadge } from '../components/ValidationBadge';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { workflowTemplates } from '../workflowTemplates';
import { 
  Download, Upload, Layers, Play, FolderOpen, HelpCircle,
  ChevronLeft, ChevronRight, MoreVertical, Keyboard, Clock,
  LayoutGrid, FileText, X, ChevronDown, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export function DesignerView() {
  const { nodes, edges, setView, importSnapshot, history, restoreHistory, pushHistory } = useWorkflowSelectors();
  const inputRef = useRef<HTMLInputElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  
  // Resizable Bottom Panel
  const [bottomPanelHeight, setBottomPanelHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 100 && newHeight < window.innerHeight * 0.7) {
        setBottomPanelHeight(newHeight);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  useKeyboardShortcuts();

  const stats = useMemo(() => {
    const startCount = nodes.filter((n) => n.type === 'start').length;
    const endCount = nodes.filter((n) => n.type === 'end').length;
    const invalidCount = nodes.filter((n) => (n.data.validationIssues?.length ?? 0) > 0).length;
    const isValid = startCount === 1 && endCount === 1 && invalidCount === 0;
    return { nodeCount: nodes.length, edgeCount: edges.length, isValid };
  }, [nodes, edges]);

  const autoLayout = () => {
    const startNode = nodes.find((n) => n.type === 'start');
    if (!startNode) return;
    const adjacency = new Map<string, string[]>();
    edges.forEach((e) => {
      adjacency.set(e.source, [...(adjacency.get(e.source) ?? []), e.target]);
    });
    const visited = new Set<string>();
    const levels = new Map<string, number>();
    const queue = [{ id: startNode.id, level: 0 }];
    while (queue.length > 0) {
      const { id: current, level } = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      levels.set(current, level);
      (adjacency.get(current) ?? []).forEach((neighbor) => {
        if (!visited.has(neighbor)) queue.push({ id: neighbor, level: level + 1 });
      });
    }
    const byLevel = new Map<number, string[]>();
    levels.forEach((level, id) => {
      byLevel.set(level, [...(byLevel.get(level) ?? []), id]);
    });
    const arrangedNodes = nodes.map((node) => {
      const level = levels.get(node.id);
      if (level === undefined) return node;
      const siblings = byLevel.get(level) ?? [];
      const index = siblings.indexOf(node.id);
      return {
        ...node,
        position: {
          x: index * 350 + 200 - (siblings.length - 1) * 175,
          y: level * 250 + 100,
        },
      };
    });
    importSnapshot({ nodes: arrangedNodes, edges });
  };

  const exportJson = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flowforge-workflow.json';
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try { importSnapshot(JSON.parse(content)); } catch (err) { console.error(err); }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex h-full bg-[#0b0e14] relative overflow-hidden text-slate-200">
      
      {/* Collapsible Left Sidebar */}
      <aside className={cn(
        "h-full border-r border-white/[0.05] bg-[#0f1218] flex flex-col z-40 transition-all duration-300 overflow-hidden",
        sidebarOpen ? "w-[220px]" : "w-0"
      )}>
        <div className="p-4 border-b border-white/[0.05] flex items-center gap-3 min-w-[220px]">
          <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-[10px] font-black text-white uppercase tracking-wider">Palette</h2>
            <p className="text-[9px] text-slate-600 font-bold uppercase">Drag to canvas</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar min-w-[220px]">
          <Sidebar />
        </div>
        <div className="p-3 border-t border-white/[0.05] min-w-[220px] flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase hover:text-white transition-colors">
            <FolderOpen className="w-3 h-3" /> Docs
          </button>
          <button className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase hover:text-white transition-colors">
            <HelpCircle className="w-3 h-3" /> Help
          </button>
        </div>
      </aside>

      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-1/2 -translate-y-1/2 z-50 w-4 h-10 bg-[#1e293b] border border-white/10 rounded-r-md flex items-center justify-center text-slate-600 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all"
        style={{ left: sidebarOpen ? '220px' : '0px' }}
      >
        {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>

      {/* Main Workspace */}
      <div className="flex-1 relative flex flex-col h-full bg-[#0b0e14]">
        {/* Compact Toolbar */}
        <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#0f1218] px-4 py-2">
          {/* Left: Nav & Stats */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('dashboard')}
              className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white">Back</span>
            </button>
            <div className="w-px h-4 bg-white/5" />
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
              <span className="text-white">{stats.nodeCount}</span> nodes
              <span className="mx-1 text-slate-700">·</span>
              <span className="text-white">{stats.edgeCount}</span> edges
              <span className="mx-1 text-slate-700">·</span>
              <span className={stats.isValid ? 'text-emerald-400' : 'text-amber-400'}>{stats.isValid ? '✓ Valid' : '⚠ Issues'}</span>
            </div>
            <div className="w-px h-3 bg-white/5 mx-1" />
            <ValidationBadge />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            {/* Templates */}
            <div className="relative">
              <button
                onClick={() => { setShowTemplates(!showTemplates); setShowHistory(false); setShowMoreActions(false); }}
                className="px-3 py-1.5 rounded-md border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
              >
                <FileText className="h-3 w-3" /> Templates
              </button>
              <AnimatePresence>
                {showTemplates && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-1 w-64 bg-[#0f1218] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-2.5 border-b border-white/5">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Load Template</p>
                    </div>
                    {workflowTemplates.map((tmpl) => (
                      <button key={tmpl.id} onClick={() => { importSnapshot(tmpl.snapshot); setShowTemplates(false); }}
                        className="w-full p-3 hover:bg-white/5 transition-all text-left border-b border-white/5 last:border-0">
                        <p className="text-[11px] font-black text-white">{tmpl.name}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{tmpl.description}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auto Layout */}
            <button onClick={autoLayout}
              className="px-3 py-1.5 rounded-md border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/[0.05] transition-all flex items-center gap-1.5">
              <LayoutGrid className="h-3 w-3" /> Layout
            </button>

            {/* History */}
            <div className="relative">
              <button onClick={() => { setShowHistory(!showHistory); setShowTemplates(false); setShowMoreActions(false); }}
                className="px-3 py-1.5 rounded-md border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/[0.05] transition-all flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> {history.length > 0 && <span className="text-sky-400">{history.length}</span>}
              </button>
              <AnimatePresence>
                {showHistory && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-1 w-56 max-h-48 bg-[#0f1218] border border-white/10 rounded-lg shadow-2xl z-50 overflow-y-auto custom-scrollbar">
                    <div className="p-2.5 border-b border-white/5 sticky top-0 bg-[#0f1218] flex items-center justify-between">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">History</p>
                      <button onClick={() => setShowHistory(false)}><X className="w-3 h-3 text-slate-600" /></button>
                    </div>
                    {history.length === 0 ? (
                      <p className="p-3 text-[9px] text-slate-600 text-center">Run simulation to save</p>
                    ) : history.map((entry, i) => (
                      <button key={i} onClick={() => { restoreHistory(i); setShowHistory(false); }}
                        className="w-full p-2.5 hover:bg-white/5 transition-all text-left border-b border-white/5 last:border-0">
                        <p className="text-[10px] font-bold text-white">{entry.label}</p>
                        <p className="text-[8px] text-slate-600">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More actions: Export / Import */}
            <div className="relative">
              <button onClick={() => { setShowMoreActions(!showMoreActions); setShowTemplates(false); setShowHistory(false); }}
                className="px-2 py-1.5 rounded-md border border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] transition-all">
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {showMoreActions && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-1 w-40 bg-[#0f1218] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                    <button onClick={() => { exportJson(); setShowMoreActions(false); }}
                      className="w-full p-2.5 hover:bg-white/5 transition-all text-left flex items-center gap-2 text-[10px] font-bold text-slate-300">
                      <Download className="w-3 h-3" /> Export JSON
                    </button>
                    <button onClick={() => { inputRef.current?.click(); setShowMoreActions(false); }}
                      className="w-full p-2.5 hover:bg-white/5 transition-all text-left flex items-center gap-2 text-[10px] font-bold text-slate-300 border-t border-white/5">
                      <Upload className="w-3 h-3" /> Import JSON
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <input ref={inputRef} type="file" accept=".json,application/json" className="hidden" onChange={handleImport} />

          </div>
        </div>

        {/* Canvas — maximum space */}
        <div className="flex-1 min-h-0 bg-dot-pattern relative">
          <Canvas />

          {/* Shortcuts tooltip */}
          <div className="absolute bottom-3 right-3 z-40">
            <button onClick={() => setShowShortcuts(!showShortcuts)}
              className="w-8 h-8 rounded-md bg-[#1e293b]/80 border border-white/10 flex items-center justify-center text-slate-600 hover:text-white hover:border-sky-400 transition-all"
              title="Keyboard Shortcuts">
              <Keyboard className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showShortcuts && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-10 right-0 w-48 bg-[#0f1218] border border-white/10 rounded-lg shadow-2xl p-3 space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Shortcuts</p>
                  {[['Delete', 'Remove node'], ['⌘D', 'Duplicate'], ['⌘E', 'Export']].map(([key, action]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500">{action}</span>
                      <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-mono text-white">{key}</kbd>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resizer Handle */}
        <div 
          onMouseDown={() => setIsResizing(true)}
          className={cn(
            "h-1.5 w-full cursor-row-resize z-50 hover:bg-sky-500/30 transition-colors flex items-center justify-center group relative",
            isResizing ? "bg-sky-500/40" : "bg-transparent border-t border-white/[0.03]"
          )}
        >
          <div className="w-12 h-0.5 rounded-full bg-slate-800 group-hover:bg-sky-400/50 transition-colors" />
        </div>

        {/* Simulation Panel — resizable */}
        <div 
          className="border-t border-white/[0.05] bg-[#0f1218] overflow-hidden"
          style={{ height: bottomPanelHeight }}
        >
          <SimulationPanel />
        </div>
      </div>

      {/* Right Sidebar — slightly narrower */}
      <aside className="w-[300px] h-full border-l border-white/[0.05] bg-[#0f1218] flex flex-col z-40">
        <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="text-[11px] font-black text-white uppercase tracking-wider">Properties</h2>
          <MoreVertical className="w-3.5 h-3.5 text-slate-600 cursor-pointer" />
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <NodeFormPanel />
        </div>
      </aside>
    </div>
  );
}
