import type { NodeType, WorkflowSnapshot } from './workflow';

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  label: string;
  status: 'completed' | 'pending' | 'waiting';
  duration: number | null;
}

export interface SimulationRequest extends WorkflowSnapshot {}

export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
}
