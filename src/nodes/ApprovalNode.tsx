import type { ApprovalNodeData, WorkflowNodeProps } from '../types/workflow';
import { BaseNode } from './BaseNode';

export function ApprovalNode(props: WorkflowNodeProps<ApprovalNodeData>) {
  return <BaseNode {...props} subtitle="Approval" tone="linear-gradient(135deg, #7c3aed, #a78bfa)" />;
}
