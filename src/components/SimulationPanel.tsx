import { useSimulation } from '../hooks/useSimulation';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { 
  Play, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export function SimulationPanel() {
  const { simulationLog } = useWorkflowSelectors();
  const { runSimulation, isSimulating, error } = useSimulation();

  return (
    <section className="h-full flex flex-col bg-transparent">
      {/* Dynamic Header */}
      <div className="px-10 py-6 border-b border-white/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-royal/10 flex items-center justify-center shadow-inner">
            <Activity className="w-5 h-5 text-royal" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight uppercase tracking-[0.1em]">Workflow Sync</h3>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">Simulation / Validation</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {error && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[9px] font-black uppercase tracking-widest">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </div>
          )}
          <button
            type="button"
            disabled={isSimulating}
            onClick={() => void runSimulation()}
            className={cn(
              "flex items-center gap-3 px-6 py-2.5 rounded-[1.5rem_0.5rem] text-[10px] font-black uppercase tracking-widest transition-all",
              isSimulating 
                ? "bg-slate-800 text-slate-500 cursor-wait shadow-inner" 
                : "bg-royal hover:bg-royal-dark text-white active:scale-95 shadow-lg shadow-royal/20"
            )}
          >
            {isSimulating ? "Validating..." : "Run Simulation"}
          </button>
        </div>
      </div>

      {/* Process Log Trace */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 pt-4">
        {simulationLog.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="w-16 h-16 rounded-[2rem_0.5rem] bg-white/[0.02] flex items-center justify-center mb-6 border border-white/[0.03]">
              <Terminal className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-3 leading-none">Awaiting sequence</p>
            <p className="text-[11px] text-slate-500 max-w-[240px] leading-relaxed font-bold italic opacity-60">
              Execute a simulation to observe the decision tree in real-time.
            </p>
          </div>
        ) : (
          <div className="space-y-4 relative ml-6">
            <div className="absolute left-[15.5px] top-4 bottom-4 w-1 bg-gradient-to-b from-royal/40 via-accent/20 to-transparent" />
            
            <AnimatePresence>
              {simulationLog.map((entry, index) => {
                const isLast = index === simulationLog.length - 1;
                return (
                  <motion.div 
                    key={`${entry}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-14 flex items-center group"
                  >
                    {/* Glowing Probe */}
                    <div 
                      className={cn(
                        "absolute left-0 w-8 h-8 rounded-full border-4 border-[#030712] flex items-center justify-center transition-all group-hover:scale-125 z-10 shadow-2xl",
                        isLast 
                          ? "bg-accent shadow-accent/50 scale-110" 
                          : "bg-royal shadow-royal/50"
                      )}
                    >
                      {isLast ? <Clock className="w-3.5 h-3.5 text-white" /> : <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>

                    <div className="flex-1 bg-white/[0.02] border border-white/[0.03] px-6 py-4 rounded-[2rem_0.75rem] flex items-center justify-between hover:bg-white/[0.05] transition-colors shadow-premium group-hover:border-white/10">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">Process Stage 0{index + 1}</span>
                        <p className="text-[11px] font-black text-white tracking-tight uppercase leading-none">{entry}</p>
                      </div>
                      <div className={cn(
                        "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
                        isLast ? "bg-accent/10 text-accent" : "bg-royal/10 text-royal"
                      )}>
                        {isLast ? "PENDING" : "LIVE"}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}


