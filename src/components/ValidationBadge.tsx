import { useMemo } from 'react';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';

export function ValidationBadge() {
  const { nodes } = useWorkflowSelectors();

  const counts = useMemo(() => {
    const start = nodes.filter((node) => node.type === 'start').length;
    const end = nodes.filter((node) => node.type === 'end').length;
    const invalid = nodes.filter((node) => (node.data.validationIssues?.length ?? 0) > 0).length;
    return { start, end, invalid };
  }, [nodes]);

  const healthy = counts.start === 1 && counts.end === 1 && counts.invalid === 0;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        healthy ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${healthy ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      {healthy
        ? 'Canvas ready for simulation'
        : `Needs attention · start ${counts.start}/1 · end ${counts.end}/1 · invalid ${counts.invalid}`}
    </div>
  );
}
