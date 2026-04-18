import type { EndNodeData, WorkflowNodeProps } from '../types/workflow';
import { BaseNode } from './BaseNode';

export function EndNode(props: WorkflowNodeProps<EndNodeData>) {
  return <BaseNode {...props} subtitle="End" tone="linear-gradient(135deg, #475569, #94a3b8)" allowSource={false} />;
}
