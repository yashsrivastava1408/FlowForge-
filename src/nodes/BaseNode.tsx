import { Handle, Position } from '@xyflow/react';
import type { WorkflowNodeData, WorkflowNodeProps } from '../types/workflow';
import { cn } from '../lib/utils';
import { 
  ClipboardList, Play, ShieldCheck, Zap, Flag,
  User, Copy, AlertTriangle, Box
} from 'lucide-react';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';

interface BaseNodeProps<T extends WorkflowNodeData> extends WorkflowNodeProps<T> {
  tone: string;
  subtitle: string;
  allowTarget?: boolean;
  allowSource?: boolean;
}

const typeIcons: Record<string, any> = {
  start: Play, task: ClipboardList, approval: ShieldCheck, automatedStep: Zap, end: Flag
};

export function BaseNode<T extends WorkflowNodeData>({
  data, selected, type, id, subtitle,
  allowSource = true, allowTarget = true,
}: BaseNodeProps<T>) {
  const Icon = typeIcons[type as string] || Box;
  const issues = data.validationIssues ?? [];
  const { duplicateNode, simulatingNodeId } = useWorkflowSelectors();
  const isSimulating = simulatingNodeId === id;
  const isApproval = type === 'approval';

  const meta =
    type === 'start'   ? String(data.owner ?? 'HR Ops')
    : type === 'task'  ? String(data.assignee ?? 'Recruiter')
    : type === 'approval' ? String(data.approver ?? 'Manager')
    : type === 'automatedStep' ? String(data.automationId ?? 'send_email')
    : String(data.outcome ?? 'Done');

  return (
    <div className={cn('w-[180px] transition-all duration-200', selected ? 'z-50' : 'z-0')}>
      <div className={cn(
        "relative rounded-lg border transition-all duration-200 bg-[#1a2232]/95 backdrop-blur-sm overflow-hidden",
        isSimulating
          ? "border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/20 animate-pulse"
          : selected
            ? "border-emerald-500/60 shadow-lg shadow-emerald-500/5"
            : "border-white/[0.06] hover:border-white/15"
      )}>
        {/* Warning dot */}
        {issues.length > 0 && (
          <div className="absolute top-1.5 right-1.5 z-20">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_6px_#f59e0b]" />
          </div>
        )}

        {/* Duplicate button (shows on hover via group) */}
        {issues.length === 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); duplicateNode(id); }}
            className="absolute top-1.5 right-1.5 z-20 w-5 h-5 rounded bg-white/5 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-sky-500 hover:text-black transition-all text-slate-600"
            title="Duplicate (⌘D)"
          >
            <Copy className="w-2.5 h-2.5" />
          </button>
        )}

        {/* Handles */}
        {allowTarget && (
          <Handle type="target" position={Position.Top}
            className="!w-2 !h-2 !bg-emerald-400 !border-0 !-translate-y-1/2" />
        )}
        
        {/* Compact content */}
        <div className="px-3 py-2.5 space-y-1.5">
          {/* Header row */}
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-6 h-6 rounded flex items-center justify-center flex-shrink-0",
              type === 'start' ? 'bg-emerald-500/15 text-emerald-400' :
              type === 'task' ? 'bg-sky-500/15 text-sky-400' :
              type === 'approval' ? 'bg-violet-500/15 text-violet-400' :
              type === 'automatedStep' ? 'bg-amber-500/15 text-amber-400' :
              'bg-rose-500/15 text-rose-400'
            )}>
              <Icon className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block">{subtitle}</span>
              <h3 className="text-[10px] font-bold text-white/90 leading-tight truncate">{data.title}</h3>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-1.5">
            <User className="w-2.5 h-2.5 text-slate-700 flex-shrink-0" />
            <span className="text-[8px] text-slate-500 truncate">{meta}</span>
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-1">
            <span className={cn(
              "px-1.5 py-px rounded text-[6px] font-black uppercase tracking-widest",
              type === 'start' ? 'bg-emerald-500/15 text-emerald-400' :
              type === 'task' ? 'bg-sky-500/15 text-sky-400' :
              type === 'approval' ? 'bg-violet-500/15 text-violet-400' :
              type === 'automatedStep' ? 'bg-amber-500/15 text-amber-400' :
              'bg-rose-500/15 text-rose-400'
            )}>{type === 'automatedStep' ? 'auto' : type}</span>
            <span className={cn(
              "px-1.5 py-px rounded text-[6px] font-black uppercase",
              issues.length > 0 ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"
            )}>
              {issues.length > 0 ? `${issues.length} issue` : '✓'}
            </span>
          </div>
        </div>

        {/* Conditional branching for Approval */}
        {allowSource && isApproval ? (
          <>
            <Handle type="source" position={Position.Bottom} id="approved"
              style={{ left: '35%' }}
              className="!w-2 !h-2 !bg-emerald-400 !border-0 !translate-y-1/2" />
            <Handle type="source" position={Position.Bottom} id="rejected"
              style={{ left: '65%' }}
              className="!w-2 !h-2 !bg-rose-400 !border-0 !translate-y-1/2" />
            <div className="flex items-center justify-between px-3 pb-1.5 -mt-0.5">
              <span className="text-[6px] font-black text-emerald-400/70 uppercase tracking-widest">✓ yes</span>
              <span className="text-[6px] font-black text-rose-400/70 uppercase tracking-widest">✕ no</span>
            </div>
          </>
        ) : allowSource ? (
          <Handle type="source" position={Position.Bottom}
            className="!w-2 !h-2 !bg-emerald-400 !border-0 !translate-y-1/2" />
        ) : null}
      </div>
    </div>
  );
}
