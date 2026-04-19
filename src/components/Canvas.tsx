import {
  Background, BackgroundVariant, Controls, MiniMap,
  ReactFlow, ReactFlowProvider, useReactFlow,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useRef, useEffect } from 'react';
import { nodeTypes } from '../nodes';
import { LabeledEdge } from './LabeledEdge';
import { useWorkflowSelectors } from '../hooks/useWorkflowStore';
import type { NodeType, WorkflowEdge, WorkflowNode } from '../types/workflow';

const edgeTypes = { default: LabeledEdge };

function FlowCanvas() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const reactFlow = useReactFlow();
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect,
    addNode, setSelectedNodeId, resetSelection, updateEdgeLabel,
  } = useWorkflowSelectors();

  // Listen for edge label changes from LabeledEdge component
  useEffect(() => {
    function handleEdgeLabelChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.id && typeof detail.label === 'string') {
        updateEdgeLabel(detail.id, detail.label);
      }
    }
    window.addEventListener('edge-label-change', handleEdgeLabelChange);
    return () => window.removeEventListener('edge-label-change', handleEdgeLabelChange);
  }, [updateEdgeLabel]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type || !wrapperRef.current) return;
      const bounds = wrapperRef.current.getBoundingClientRect();
      const position = reactFlow.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      addNode(type, position);
    },
    [addNode, reactFlow],
  );

  const onNodeClick: NodeMouseHandler = (_, node) => {
    setSelectedNodeId(node.id);
  };

  return (
    <div ref={wrapperRef} className="h-full w-full relative bg-slate-950">
      <ReactFlow<WorkflowNode, WorkflowEdge>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={() => resetSelection()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="bg-grid bg-[size:40px_40px]"
        defaultEdgeOptions={{
          type: 'default',
          style: { strokeWidth: 3, stroke: '#425b7a' },
          animated: true,
        }}
      >
        <Background 
          variant={BackgroundVariant.Dots}
          color="#1e293b" gap={40} size={0.8} className="opacity-40"
        />
        <MiniMap
          pannable zoomable
          style={{ 
            backgroundColor: 'rgba(15, 23, 42, 0.8)', 
            border: '1px solid rgba(51, 65, 85, 0.5)',
            borderRadius: '12px', bottom: 20, left: 20
          }}
          maskColor="rgba(15, 23, 42, 0.4)"
          nodeColor={(node) => {
            switch (node.type) {
              case 'start': return '#0ea5a5';
              case 'automatedStep': return '#ef7f45';
              case 'approval': return '#8b5cf6';
              default: return '#3b82f6';
            }
          }}
        />
        <Controls 
          className="bg-slate-900 border-slate-800 fill-slate-400"
          style={{ bottom: 20, right: 20, left: 'auto' }}
        />
      </ReactFlow>
    </div>
  );
}

export function Canvas() {
  return <FlowCanvas />;
}
