import { Handle, Position } from '@xyflow/react';
import type { WorkflowNodeData, WorkflowNodeProps } from '../types/workflow';
import { cn } from '../lib/utils';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BaseNodeProps<T extends WorkflowNodeData> extends WorkflowNodeProps<T> {
  tone: string;
  subtitle: string;
  allowTarget?: boolean;
  allowSource?: boolean;
  icon?: any;
}

export function BaseNode<T extends WorkflowNodeData>({
  data,
  selected,
  tone,
  subtitle,
  allowSource = true,
  allowTarget = true,
}: BaseNodeProps<T>) {
  const issues = data.validationIssues ?? [];
  const hasIssues = issues.length > 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'w-64 transition-all duration-500 group relative',
        selected ? 'z-[100]' : 'z-0'
      )}
    >
      <div className={cn(
        "relative rounded-[28px] nova-glass overflow-hidden transition-all duration-500",
        selected 
          ? "border-white/40 shadow-2xl scale-[1.02]" 
          : hasIssues 
            ? "border-rose-500/40 bg-rose-500/5 shadow-xl shadow-rose-500/5" 
            : "border-white/10 hover:border-white/30"
      )}>
        {/* Connection Handle: Target */}
        {allowTarget && (
          <Handle
            type="target"
            position={Position.Top}
            className="!h-2.5 !w-16 !rounded-full !border-0 !bg-white/10 hover:!bg-indigo-400 transition-all !top-0 !translate-y-[-50%] group-hover:scale-x-110 z-50 cursor-crosshair"
          />
        )}
        
        {/* Nova Step Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white/[0.02] border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{subtitle}</span>
            <h3 className="text-sm font-display font-black text-white tracking-tight truncate max-w-[150px] leading-tight">{data.title}</h3>
          </div>
          <div className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center border transition-all shadow-lg",
            hasIssues ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
          )}>
            {hasIssues ? <AlertCircle className="w-4 h-4 shadow-rose-500/50" /> : <CheckCircle2 className="w-4 h-4" />}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 pt-4 space-y-4">
          <p className="text-[11px] font-medium leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors">
            {data.description || 'Provide a brief summary...'}
          </p>
          
          {hasIssues && (
            <div className="py-2.5 border-t border-rose-500/10 space-y-1.5">
              {issues.map((issue) => (
                <div key={issue.code} className="flex gap-2 items-start">
                  <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 flex-shrink-0 animate-pulse" />
                  <p className="text-[10px] font-bold text-rose-400/90 leading-tight uppercase">
                    {issue.message}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!hasIssues && (
            <div className="flex items-center justify-between pt-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-emerald-400">●</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>

        {/* Action / Identity Footer */}
        <div className="px-5 py-3 bg-white/[0.03] border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">ID_REF</span>
            <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">
               <span className="text-[10px] font-technical font-bold text-slate-400">#{data.nodeId?.substring(0, 4)}</span>
            </div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-indigo-400 transition-colors" />
        </div>

        {/* Connection Handle: Source */}
        {allowSource && (
          <Handle
            type="source"
            position={Position.Bottom}
            className="!h-2.5 !w-16 !rounded-full !border-0 !bg-white/10 hover:!bg-indigo-400 transition-all !bottom-0 !translate-y-[50%] group-hover:scale-x-110 z-50 cursor-crosshair"
          />
        )}
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 -z-10 bg-indigo-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
