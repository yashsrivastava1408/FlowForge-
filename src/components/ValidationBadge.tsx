import { useMemo } from 'react';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export function ValidationBadge() {
  const { nodes, edges } = useWorkflowSelectors();

  const status = useMemo(() => {
    const startCount = nodes.filter((n) => n.type === 'start').length;
    const endCount = nodes.filter((n) => n.type === 'end').length;
    const invalidCount = nodes.filter((n) => (n.data.validationIssues?.length ?? 0) > 0).length;

    // Check for empty required fields (Feature 6: Incomplete state)
    const incompleteCount = nodes.filter((n) => {
      const d = n.data;
      if (!d.title || d.title.trim() === '') return true;
      if (n.type === 'task' && (!d.assignee || String(d.assignee).trim() === '')) return true;
      if (n.type === 'approval' && (!d.approver || String(d.approver).trim() === '')) return true;
      return false;
    }).length;

    if (startCount !== 1 || endCount !== 1 || invalidCount > 0) {
      return {
        level: 'invalid' as const,
        label: `Invalid · start ${startCount}/1 · end ${endCount}/1`,
        color: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
        dotColor: 'bg-rose-500',
        Icon: AlertCircle,
      };
    }

    if (incompleteCount > 0) {
      return {
        level: 'incomplete' as const,
        label: `Incomplete · ${incompleteCount} node${incompleteCount > 1 ? 's' : ''} need data`,
        color: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        dotColor: 'bg-amber-500',
        Icon: AlertTriangle,
      };
    }

    return {
      level: 'ready' as const,
      label: 'Ready to Run',
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      dotColor: 'bg-emerald-500',
      Icon: CheckCircle2,
    };
  }, [nodes, edges]);

  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
      status.color
    )}>
      <span className={cn("h-2 w-2 rounded-full animate-pulse", status.dotColor)} />
      <status.Icon className="w-3.5 h-3.5" />
      {status.label}
    </div>
  );
}
