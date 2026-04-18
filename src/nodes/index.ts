import type { NodeTypes } from '@xyflow/react';
import { ApprovalNode } from './ApprovalNode';
import { AutomatedStepNode } from './AutomatedStepNode';
import { EndNode } from './EndNode';
import { StartNode } from './StartNode';
import { TaskNode } from './TaskNode';

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automatedStep: AutomatedStepNode,
  end: EndNode,
} satisfies NodeTypes;
