import type { AutomatedStepNodeData, WorkflowNodeProps } from '../types/workflow';
import { BaseNode } from './BaseNode';

export function AutomatedStepNode(props: WorkflowNodeProps<AutomatedStepNodeData>) {
  return <BaseNode {...props} subtitle="Automation" tone="linear-gradient(135deg, #ea580c, #fb923c)" />;
}
