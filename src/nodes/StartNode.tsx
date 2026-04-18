import type { WorkflowNodeProps, StartNodeData } from '../types/workflow';
import { BaseNode } from './BaseNode';

export function StartNode(props: WorkflowNodeProps<StartNodeData>) {
  return <BaseNode {...props} subtitle="Start" tone="linear-gradient(135deg, #0f766e, #14b8a6)" allowTarget={false} />;
}
