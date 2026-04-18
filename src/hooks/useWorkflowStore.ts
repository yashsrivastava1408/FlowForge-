import { useShallow } from 'zustand/shallow';
import { useWorkflowStore as useWorkflowStoreBase } from '../store/workflowStore';

export function useWorkflowSelectors() {
  return useWorkflowStoreBase(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      currentView: state.currentView,
      setView: state.setView,
      isDarkMode: state.isDarkMode,
      toggleDarkMode: state.toggleDarkMode,
      selectedNodeId: state.selectedNodeId,
      simulationLog: state.simulationLog,
      simulatingNodeId: state.simulatingNodeId,
      setSimulatingNodeId: state.setSimulatingNodeId,
      setSelectedNodeId: state.setSelectedNodeId,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      addNode: state.addNode,
      removeNode: state.removeNode,
      duplicateNode: state.duplicateNode,
      updateNodeData: state.updateNodeData,
      updateEdgeLabel: state.updateEdgeLabel,
      setValidationIssues: state.setValidationIssues,
      setSimulationLog: state.setSimulationLog,
      importSnapshot: state.importSnapshot,
      resetSelection: state.resetSelection,
      history: state.history,
      pushHistory: state.pushHistory,
      restoreHistory: state.restoreHistory,
    })),
  );
}
