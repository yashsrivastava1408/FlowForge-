import { 
  Play, 
  UserCheck, 
  ShieldCheck, 
  Zap, 
  Flag,
  GripVertical,
  Workflow
} from 'lucide-react';
import type { NodeType } from '../types/workflow';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const cards: { type: NodeType; label: string; description: string; icon: any; color: string; hoverShadow: string; glow: string }[] = [
  { 
    type: 'start', 
    label: 'Start Step', 
    description: 'Entry point of drive.', 
    icon: Play, 
    color: 'bg-indigo-500/10 text-indigo-400',
    hoverShadow: 'shadow-indigo-500/20',
    glow: 'from-indigo-500/20'
  },
  { 
    type: 'task', 
    label: 'Manual Task', 
    description: 'Human review stage.', 
    icon: UserCheck, 
    color: 'bg-rose-500/10 text-rose-400',
    hoverShadow: 'shadow-rose-500/20',
    glow: 'from-rose-500/20'
  },
  { 
    type: 'approval', 
    label: 'Approval', 
    description: 'Managerial sign-off.', 
    icon: ShieldCheck, 
    color: 'bg-violet-500/10 text-violet-400',
    hoverShadow: 'shadow-violet-500/20',
    glow: 'from-violet-500/20'
  },
  { 
    type: 'automatedStep', 
    label: 'Automation', 
    description: 'Smart system action.', 
    icon: Zap, 
    color: 'bg-amber-500/10 text-amber-400',
    hoverShadow: 'shadow-amber-500/20',
    glow: 'from-amber-500/20'
  },
  { 
    type: 'end', 
    label: 'Finish', 
    description: 'Process completion.', 
    icon: Flag, 
    color: 'bg-emerald-500/10 text-emerald-400',
    hoverShadow: 'shadow-emerald-500/20',
    glow: 'from-emerald-500/20'
  },
];

export function Sidebar() {
  return (
    <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 h-full bg-transparent">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Components</p>
        <p className="text-[11px] text-slate-600 font-medium pl-1">Drag and drop to build your flow</p>
      </div>
      
      <div className="space-y-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', card.type);
              event.dataTransfer.effectAllowed = 'move';
            }}
            className={cn(
              "group relative w-full rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-white/10 cursor-grab active:cursor-grabbing hover:translate-x-1"
            )}
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg", card.color)}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{card.label}</p>
                  <GripVertical className="w-3.5 h-3.5 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] text-slate-500 font-medium tracking-tight line-clamp-1">{card.description}</p>
              </div>
            </div>
            
            <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", card.glow)} />
          </motion.div>
        ))}
      </div>

      <div className="mt-auto p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 relative overflow-hidden group">
        <Workflow className="absolute -right-2 -bottom-2 w-16 h-16 text-indigo-500/[0.05] -rotate-12 group-hover:scale-110 transition-transform" />
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 relative z-10">Designer Tip</p>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium relative z-10">
          Connect nodes to define the sequence of your recruitment drive.
        </p>
      </div>
    </div>
  );
}
