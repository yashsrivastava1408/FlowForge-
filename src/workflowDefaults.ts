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
        owner: 'HR Operations',
        kickoffDate: new Date().toISOString().slice(0, 10),
        validationIssues: [],
      };
    case 'task':
      return {
        title: 'Collect Documents',
        description: 'Request and track all hiring documents.',
        assignee: 'Recruiter',
        dueInDays: 3,
        instructions: 'Ask for resume, ID proof, and compensation details.',
        validationIssues: [],
      };
    case 'approval':
      return {
        title: 'Manager Review',
        description: 'Approve compensation and role alignment.',
        approver: 'Hiring Manager',
        slaHours: 24,
        policyLink: 'https://company.example/policy',
        requiresComments: true,
        validationIssues: [],
      };
    case 'automatedStep':
      return {
        title: 'Send Offer Packet',
        description: 'Automate outbound communication or docs.',
        automationId: 'send_email',
        params: {
          to: '{{candidate.email}}',
          subject: 'Offer documents',
          body: 'Please review the attached package.',
        },
        retryCount: 2,
        validationIssues: [],
      };
    case 'end':
      return {
        title: 'Onboarding Ready',
        description: 'Workflow completed and handed to onboarding.',
        outcome: 'Candidate cleared for onboarding',
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
