import { useShallow } from 'zustand/shallow';
import { useWorkflowStore as useWorkflowStoreBase } from '../store/workflowStore';

export function useWorkflowSelectors() {
  return useWorkflowStoreBase(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      currentView: state.currentView,
      setView: state.setView,
      selectedNodeId: state.selectedNodeId,
      simulationLog: state.simulationLog,
      setSelectedNodeId: state.setSelectedNodeId,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      addNode: state.addNode,
      updateNodeData: state.updateNodeData,
      setValidationIssues: state.setValidationIssues,
      setSimulationLog: state.setSimulationLog,
      importSnapshot: state.importSnapshot,
      resetSelection: state.resetSelection,
    })),
  );
}
