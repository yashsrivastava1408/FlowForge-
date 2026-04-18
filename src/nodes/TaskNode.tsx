import type { TaskNodeData, WorkflowNodeProps } from '../types/workflow';
import { BaseNode } from './BaseNode';

export function TaskNode(props: WorkflowNodeProps<TaskNodeData>) {
  return <BaseNode {...props} subtitle="Task" tone="linear-gradient(135deg, #1d4ed8, #60a5fa)" />;
}
