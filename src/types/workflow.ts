import type { Edge, Node, NodeProps } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automatedStep' | 'end';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'number'
  | 'boolean'
  | 'date'
  | 'keyValue';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: FieldOption[];
  dynamic?: boolean;
}

export interface ValidationIssue {
  code: string;
  message: string;
}

export interface BaseNodeData extends Record<string, unknown> {
  title: string;
  description?: string;
  validationIssues?: ValidationIssue[];
}

export interface StartNodeData extends BaseNodeData {
  metadata?: Record<string, string>[];
}

export interface TaskNodeData extends BaseNodeData {
  assignee: string;
  dueDate: string;
  customFields?: Record<string, string>[];
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  automationId: string;
  params: Record<string, string>[];
  retryCount?: number;
}

export interface EndNodeData extends BaseNodeData {
  endMessage: string;
  summaryFlag: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

export type WorkflowNode<T extends WorkflowNodeData = WorkflowNodeData> = Node<T, NodeType>;
export type WorkflowEdge = Edge;
export type WorkflowNodeProps<T extends WorkflowNodeData = WorkflowNodeData> = NodeProps<Node<T, NodeType>>;

export interface WorkflowSnapshot {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
