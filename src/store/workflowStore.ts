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

interface HistoryEntry {
  timestamp: string;
  label: string;
  snapshot: WorkflowSnapshot;
}

interface WorkflowState extends WorkflowSnapshot {
  // View
  currentView: 'dashboard' | 'designer';
  setView: (view: 'dashboard' | 'designer') => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Selection
  selectedNodeId: string | null;
  setSelectedNodeId: (nodeId: string | null) => void;

  // Simulation
  simulationLog: string[];
  simulatingNodeId: string | null;
  setSimulatingNodeId: (nodeId: string | null) => void;
  setSimulationLog: (entries: string[]) => void;

  // History (Feature 12)
  history: HistoryEntry[];
  pushHistory: (label: string) => void;
  restoreHistory: (index: number) => void;

  // Core actions
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<WorkflowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: WorkflowNode['type'], position: { x: number; y: number }) => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  updateNodeData: <T extends WorkflowNodeData>(nodeId: string, data: Partial<T>) => void;
  updateEdgeLabel: (edgeId: string, label: string) => void;
  setValidationIssues: (issuesByNode: Record<string, ValidationIssue[]>) => void;
  importSnapshot: (snapshot: WorkflowSnapshot) => void;
  resetSelection: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  currentView: 'dashboard',
  setView: (currentView) => set({ currentView }),

  // Theme
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  selectedNodeId: initialNodes[1]?.id ?? null,
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),

  // Simulation
  simulationLog: [],
  simulatingNodeId: null,
  setSimulatingNodeId: (simulatingNodeId) => set({ simulatingNodeId }),
  setSimulationLog: (simulationLog) => set({ simulationLog }),

  // History
  history: [],
  pushHistory: (label) =>
    set((state) => ({
      history: [
        {
          timestamp: new Date().toISOString(),
          label,
          snapshot: { nodes: structuredClone(state.nodes), edges: structuredClone(state.edges) },
        },
        ...state.history,
      ].slice(0, 20),
    })),
  restoreHistory: (index) =>
    set((state) => {
      const entry = state.history[index];
      if (!entry) return {};
      return {
        nodes: entry.snapshot.nodes.map((node) => ({
          ...node,
          data: { ...createNodeData(node.type), ...node.data },
        })),
        edges: entry.snapshot.edges,
        selectedNodeId: entry.snapshot.nodes[0]?.id ?? null,
      };
    }),

  // Core actions
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
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    })),

  // Feature 7: Duplicate Node
  duplicateNode: (nodeId) =>
    set((state) => {
      const original = state.nodes.find((n) => n.id === nodeId);
      if (!original) return {};
      const newNode = createWorkflowNode(original.type, {
        x: original.position.x + 50,
        y: original.position.y + 80,
      });
      newNode.data = { ...structuredClone(original.data), validationIssues: [] };
      return {
        nodes: [...state.nodes, newNode],
        selectedNodeId: newNode.id,
      };
    }),

  updateNodeData: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node,
      ),
    })),

  // Feature 4: Edge labels
  updateEdgeLabel: (edgeId, label) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === edgeId ? { ...edge, label } : edge,
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
  importSnapshot: (snapshot) =>
    set({
      nodes: snapshot.nodes.map((node) => ({
        ...node,
        data: { ...createNodeData(node.type), ...node.data },
      })),
      edges: snapshot.edges,
      selectedNodeId: snapshot.nodes[0]?.id ?? null,
    }),
  resetSelection: () => set({ selectedNodeId: null }),
}));
