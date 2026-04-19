import type {
  ApprovalNodeData,
  AutomatedStepNodeData,
  EndNodeData,
  NodeType,
  StartNodeData,
  TaskNodeData,
  WorkflowEdge,
  WorkflowNode,
  WorkflowNodeData,
} from './types/workflow';

const counters: Record<NodeType, number> = {
  start: 1,
  task: 1,
  approval: 1,
  automatedStep: 1,
  end: 1,
};

export function createNodeData(type: NodeType): WorkflowNodeData {
  switch (type) {
    case 'start':
      return {
        title: 'Candidate Applied',
        description: 'Kick off the hiring workflow.',
        metadata: [
          { key: 'source', value: 'Referral' },
          { key: 'priority', value: 'High' }
        ],
        validationIssues: [],
      };
    case 'task':
      return {
        title: 'Collect Documents',
        description: 'Request and track all hiring documents.',
        assignee: 'Recruiter',
        dueDate: '2026-05-01',
        customFields: [
          { key: 'form_type', value: 'I-9' }
        ],
        validationIssues: [],
      };
    case 'approval':
      return {
        title: 'Manager Review',
        approverRole: 'Hiring Manager',
        autoApproveThreshold: 80,
        validationIssues: [],
      };
    case 'automatedStep':
      return {
        title: 'Send Offer Packet',
        automationId: 'send_email',
        params: [
          { key: 'to', value: '{{candidate.email}}' },
          { key: 'subject', value: 'Offer documents' }
        ],
        retryCount: 2,
        validationIssues: [],
      };
    case 'end':
      return {
        title: 'Onboarding Ready',
        endMessage: 'Workflow completed successfully.',
        summaryFlag: true,
        validationIssues: [],
      };
  }
}

export function createWorkflowNode(type: NodeType, position: { x: number; y: number }): WorkflowNode {
  const nextIndex = counters[type]++;
  return {
    id: `${type}-${nextIndex}`,
    type,
    position,
    data: createNodeData(type),
  };
}

export const initialNodes: WorkflowNode[] = [
  { id: 'start-0', type: 'start', position: { x: 400, y: 80 }, data: createNodeData('start') },
  { id: 'task-0', type: 'task', position: { x: 150, y: 380 }, data: createNodeData('task') },
  {
    id: 'approval-0',
    type: 'approval',
    position: { x: 650, y: 380 },
    data: createNodeData('approval'),
  },
  {
    id: 'automatedStep-0',
    type: 'automatedStep',
    position: { x: 650, y: 680 },
    data: createNodeData('automatedStep'),
  },
  { id: 'end-0', type: 'end', position: { x: 150, y: 680 }, data: createNodeData('end') },
];

export const initialEdges: WorkflowEdge[] = [
  {
    id: 'start-task',
    source: 'start-0',
    target: 'task-0',
    animated: true,
    style: { strokeWidth: 2, stroke: 'rgba(129, 140, 248, 0.4)' },
  },
  {
    id: 'task-approval',
    source: 'task-0',
    target: 'approval-0',
    animated: true,
    style: { strokeWidth: 2, stroke: 'rgba(129, 140, 248, 0.4)' },
  },
  {
    id: 'approval-automated',
    source: 'approval-0',
    target: 'automatedStep-0',
    animated: true,
    style: { strokeWidth: 2, stroke: 'rgba(129, 140, 248, 0.4)' },
  },
  {
    id: 'automated-end',
    source: 'automatedStep-0',
    target: 'end-0',
    animated: true,
    style: { strokeWidth: 2, stroke: 'rgba(129, 140, 248, 0.4)' },
  },
];
