import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react';
import { create } from 'zustand';
import type {
  ValidationIssue,
  WorkflowEdge,
  WorkflowNode,
  WorkflowNodeData,
  WorkflowSnapshot,
} from '../types/workflow';
import { createNodeData, createWorkflowNode, initialEdges, initialNodes } from '../workflowDefaults';

interface WorkflowState extends WorkflowSnapshot {
  currentView: 'dashboard' | 'designer';
  setView: (view: 'dashboard' | 'designer') => void;
  selectedNodeId: string | null;
  simulationLog: string[];
  setSelectedNodeId: (nodeId: string | null) => void;
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<WorkflowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: WorkflowNode['type'], position: { x: number; y: number }) => void;
  updateNodeData: <T extends WorkflowNodeData>(nodeId: string, data: Partial<T>) => void;
  setValidationIssues: (issuesByNode: Record<string, ValidationIssue[]>) => void;
  setSimulationLog: (entries: string[]) => void;
  importSnapshot: (snapshot: WorkflowSnapshot) => void;
  resetSelection: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  currentView: 'dashboard',
  setView: (currentView) => set({ currentView }),
  selectedNodeId: initialNodes[1]?.id ?? null,
  simulationLog: [],
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          animated: true,
          style: { strokeWidth: 2, stroke: '#10b981' },
        },
        state.edges,
      ),
    })),
  addNode: (type, position) =>
    set((state) => {
      const node = createWorkflowNode(type, position);
      return {
        nodes: [...state.nodes, node],
        selectedNodeId: node.id,
      };
    }),
  updateNodeData: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            }
          : node,
      ),
    })),
  setValidationIssues: (issuesByNode) =>
    set((state) => ({
      nodes: state.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          validationIssues: issuesByNode[node.id] ?? [],
        },
      })),
    })),
  setSimulationLog: (simulationLog) => set({ simulationLog }),
  importSnapshot: (snapshot) =>
    set({
      nodes: snapshot.nodes.map((node) => ({
        ...node,
        data: {
          ...createNodeData(node.type),
          ...node.data,
        },
      })),
      edges: snapshot.edges,
      selectedNodeId: snapshot.nodes[0]?.id ?? null,
    }),
  resetSelection: () => set({ selectedNodeId: null }),
}));
