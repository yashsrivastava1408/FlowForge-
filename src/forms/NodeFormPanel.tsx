import { NodeFormRenderer } from './NodeFormRenderer';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { useNodeForm } from '../hooks/useNodeForm';
import type { AutomatedStepNodeData } from '../types/workflow';
import { Settings, Info, Box, Activity, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NodeFormPanel() {
  const { nodes, selectedNodeId, updateNodeData } = useWorkflowSelectors();
  const node = nodes.find((item) => item.id === selectedNodeId);
  const { entry, fields, loading, error } = useNodeForm(node);

  if (!node || !entry) {
    return (
      <div className="h-full bg-transparent p-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 shadow-2xl group transition-transform hover:scale-105"
        >
          <Box className="w-9 h-9 text-slate-700 group-hover:text-indigo-400 transition-colors" />
        </motion.div>
        <h3 className="text-lg font-display font-black text-white mb-2 uppercase tracking-tight">Step Config</h3>
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-6">Select a stage</p>
        <p className="text-xs text-slate-600 leading-relaxed max-w-[200px] font-medium opacity-80">
          Select any step on the canvas to configure its settings and parameters.
        </p>
      </div>
    );
  }

  const defaultValues =
    node.type === 'automatedStep'
      ? {
          ...node.data,
          params: Object.entries((node.data as AutomatedStepNodeData).params).map(([key, value]) => ({
            key,
            value,
          })),
        }
      : node.data;

  return (
    <div className="h-full bg-transparent overflow-y-auto custom-scrollbar flex flex-col">
      {/* Header with Visual Status */}
      <div className="p-8 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full -mr-16 -mt-16" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Settings className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Editing Step</h3>
              <p className="text-lg font-display font-black text-white tracking-tight">{entry.label}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Saved</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium pl-1">
          Synchronizing changes live to the workflow engine.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-8 pb-32">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 p-12"
            >
              <Activity className="w-5 h-5 text-indigo-400 animate-spin" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading...</span>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Error: {error}</span>
            </motion.div>
          ) : (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-8">
                <NodeFormRenderer
                  fields={fields}
                  schema={entry.schema}
                  defaultValues={defaultValues}
                  onSubmit={(values) => {
                    if (node.type === 'automatedStep') {
                      const params = Array.isArray(values.params)
                        ? Object.fromEntries(
                            values.params
                              .filter(
                                (item): item is { key: string; value: string } =>
                                  typeof item === 'object' &&
                                  item !== null &&
                                  'key' in item &&
                                  'value' in item &&
                                  typeof item.key === 'string' &&
                                  typeof item.value === 'string' &&
                                  item.key.length > 0,
                              )
                              .map((item) => [item.key, item.value]),
                          )
                        : {};

                      updateNodeData(node.id, {
                        ...values,
                        params,
                      });
                      return;
                    }

                    updateNodeData(node.id, values);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
