import { useState } from 'react';
import { 
  Play, ClipboardList, ShieldCheck, Zap, Flag,
  GripVertical, Search
} from 'lucide-react';
import type { NodeType } from '../types/workflow';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const nodeTypes: { type: NodeType; label: string; icon: any; color: string }[] = [
  { type: 'start', label: 'Start', icon: Play, color: 'text-emerald-400 bg-emerald-500/10' },
  { type: 'task', label: 'Task', icon: ClipboardList, color: 'text-sky-400 bg-sky-500/10' },
  { type: 'approval', label: 'Approval', icon: ShieldCheck, color: 'text-violet-400 bg-violet-500/10' },
  { type: 'automatedStep', label: 'Automated', icon: Zap, color: 'text-amber-400 bg-amber-500/10' },
  { type: 'end', label: 'End', icon: Flag, color: 'text-rose-400 bg-rose-500/10' },
];

export function Sidebar() {
  const [search, setSearch] = useState('');

  const filtered = nodeTypes.filter((n) =>
    n.label.toLowerCase().includes(search.toLowerCase()) ||
    n.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-3 space-y-1.5">
      {/* Search */}
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter nodes..."
          className="w-full bg-white/[0.03] border border-white/5 rounded-md pl-7 pr-3 py-2 text-[10px] font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/30 transition-all"
        />
      </div>

      {filtered.map((node, i) => (
        <motion.div
          key={node.type}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('application/reactflow', node.type);
            event.dataTransfer.effectAllowed = 'move';
          }}
          className="group flex items-center gap-3 w-full px-3 py-2.5 bg-white/[0.02] border border-white/[0.03] rounded-lg cursor-grab active:cursor-grabbing transition-all hover:bg-white/[0.05] hover:border-white/10"
        >
          <div className={cn("w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", node.color)}>
            <node.icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.12em] flex-1">{node.label}</span>
          <GripVertical className="w-3 h-3 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      ))}

      {filtered.length === 0 && (
        <p className="text-[9px] text-slate-600 text-center py-3 font-bold">No match</p>
      )}
    </div>
  );
}
