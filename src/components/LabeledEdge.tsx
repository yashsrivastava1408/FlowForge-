import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from '@xyflow/react';
import { useState } from 'react';

export function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
}: EdgeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localLabel, setLocalLabel] = useState(String(label ?? ''));

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {isEditing ? (
            <input
              value={localLabel}
              onChange={(e) => setLocalLabel(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                // Edge label is saved via the store externally
                const event = new CustomEvent('edge-label-change', {
                  detail: { id, label: localLabel },
                });
                window.dispatchEvent(event);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditing(false);
                  const event = new CustomEvent('edge-label-change', {
                    detail: { id, label: localLabel },
                  });
                  window.dispatchEvent(event);
                }
              }}
              autoFocus
              className="w-24 bg-[#0f1218] border border-sky-400/50 rounded px-2 py-1 text-[10px] font-bold text-white text-center outline-none focus:ring-2 focus:ring-sky-400/30"
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-0.5 rounded bg-[#1e293b]/90 border border-white/10 text-[9px] font-bold text-slate-400 hover:text-white hover:border-sky-400 transition-all cursor-pointer backdrop-blur-sm"
              title="Click to label this connection"
            >
              {localLabel || '+ label'}
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
