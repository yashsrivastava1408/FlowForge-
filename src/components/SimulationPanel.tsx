import { useSimulation } from '../hooks/useSimulation';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { 
  Play, Terminal, CheckCircle2, Clock, AlertCircle,
  Activity, BarChart3, Users, Zap, Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useMemo } from 'react';

export function SimulationPanel() {
  const { simulationLog, nodes } = useWorkflowSelectors();
  const { runSimulation, isSimulating, error } = useSimulation();

  const summary = useMemo(() => {
    if (simulationLog.length === 0) return null;
    const humanTasks = nodes.filter((n) => n.type === 'task' || n.type === 'approval').length;
    const automatedTasks = nodes.filter((n) => n.type === 'automatedStep').length;
    const bottleneck = nodes.find((n) => n.type === 'approval');
    const estimatedDays = nodes.reduce((sum, n) => {
      if (n.type === 'task' && n.data.dueInDays) return sum + Number(n.data.dueInDays);
      if (n.type === 'approval' && n.data.slaHours) return sum + Number(n.data.slaHours) / 24;
      return sum;
    }, 0);
    return { totalNodes: nodes.length, estimatedDays: Math.ceil(estimatedDays), bottleneck: bottleneck?.data.title ?? 'None', humanTasks, automatedTasks };
  }, [simulationLog, nodes]);

  return (
    <section className="h-full flex flex-col bg-transparent">
      {/* Compact Header */}
      <div className="px-4 py-2 border-b border-white/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] font-black text-white uppercase tracking-wider">Simulation</span>
          <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Live Trace</span>
        </div>
        <div className="flex items-center gap-2">
          {error && (
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 text-rose-400 text-[8px] font-black uppercase tracking-widest">
              <AlertCircle className="w-2.5 h-2.5" /> {error}
            </span>
          )}
          <button type="button" disabled={isSimulating} onClick={() => void runSimulation()}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
              isSimulating ? "bg-slate-800 text-slate-500 cursor-wait" : "bg-sky-400 hover:bg-white text-black active:scale-95"
            )}>
            <Play className="w-3 h-3 fill-current" />
            {isSimulating ? "Running..." : "Run Simulation"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex min-h-0">
        <div className="flex-1 p-4">
          {simulationLog.length === 0 ? (
            <div className="h-full flex items-center justify-center gap-3 text-center">
              <Terminal className="w-6 h-6 text-slate-800" />
              <div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Awaiting sequence</p>
                <p className="text-[9px] text-slate-600 mt-0.5">Run simulation to see execution trace</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 relative ml-3">
              <div className="absolute left-[5px] top-1 bottom-1 w-0.5 bg-gradient-to-b from-sky-400/30 to-transparent" />
              <AnimatePresence>
                {simulationLog.map((entry, index) => {
                  const isLast = index === simulationLog.length - 1;
                  return (
                    <motion.div key={`${entry}-${index}`}
                      initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="relative pl-6 flex items-center">
                      <div className={cn("absolute left-0 w-3 h-3 rounded-full border-2 border-[#0f1218] z-10", isLast ? "bg-emerald-500" : "bg-sky-400")} />
                      <div className="flex-1 bg-white/[0.02] border border-white/[0.03] px-3 py-1.5 rounded-md flex items-center justify-between">
                        <div>
                          <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest">Stage {String(index+1).padStart(2,'0')}</span>
                          <p className="text-[9px] font-bold text-white/80 mt-0.5 leading-none">{entry}</p>
                        </div>
                        <span className={cn("text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase", isLast ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-400/10 text-sky-400")}>
                          {isLast ? "DONE" : "OK"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {summary && (
          <div className="w-[220px] border-l border-white/[0.05] p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3 text-sky-400" />
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Summary</span>
            </div>
            {[
              { label: 'Nodes', value: String(summary.totalNodes), icon: Activity },
              { label: 'Est. Days', value: String(summary.estimatedDays), icon: Timer },
              { label: 'Bottleneck', value: summary.bottleneck, icon: AlertCircle },
              { label: 'Human', value: String(summary.humanTasks), icon: Users },
              { label: 'Automated', value: String(summary.automatedTasks), icon: Zap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between px-2 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.03]">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-2.5 h-2.5 text-slate-700" />
                  <span className="text-[8px] font-bold text-slate-500 uppercase">{label}</span>
                </div>
                <span className="text-[9px] font-black text-white truncate max-w-[80px]">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
