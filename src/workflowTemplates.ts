import type { WorkflowSnapshot } from './types/workflow';
import { createNodeData } from './workflowDefaults';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  nodeCount: number;
  snapshot: WorkflowSnapshot;
}

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'employee-onboarding',
    name: 'Employee Onboarding',
    description: 'Complete new hire onboarding with document collection, IT setup, and orientation.',
    nodeCount: 5,
    snapshot: {
      nodes: [
        { id: 'tmpl-s1', type: 'start', position: { x: 400, y: 50 }, data: { ...createNodeData('start'), title: 'New Hire Joins', metadata: [{ key: 'dept', value: 'Engineering' }], validationIssues: [] } },
        { id: 'tmpl-t1', type: 'task', position: { x: 200, y: 250 }, data: { ...createNodeData('task'), title: 'Collect Documents', description: 'Gather ID and tax forms.', assignee: 'HR Coordinator', dueDate: '2026-05-15', customFields: [{ key: 'priority', value: 'high' }], validationIssues: [] } },
        { id: 'tmpl-a1', type: 'automatedStep', position: { x: 600, y: 250 }, data: { ...createNodeData('automatedStep'), title: 'IT Account Setup', automationId: 'provision_it', params: [{ key: 'email', value: '{{employee.email}}' }], retryCount: 3, validationIssues: [] } },
        { id: 'tmpl-ap1', type: 'approval', position: { x: 400, y: 450 }, data: { ...createNodeData('approval'), title: 'Manager Sign-off', approverRole: 'Department Head', autoApproveThreshold: 90, validationIssues: [] } },
        { id: 'tmpl-e1', type: 'end', position: { x: 400, y: 650 }, data: { ...createNodeData('end'), title: 'Onboarding Complete', endMessage: 'Employee is fully onboarded.', summaryFlag: true, validationIssues: [] } },
      ],
      edges: [
        { id: 'tmpl-e-s1-t1', source: 'tmpl-s1', target: 'tmpl-t1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'tmpl-e-s1-a1', source: 'tmpl-s1', target: 'tmpl-a1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'tmpl-e-t1-ap1', source: 'tmpl-t1', target: 'tmpl-ap1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'tmpl-e-a1-ap1', source: 'tmpl-a1', target: 'tmpl-ap1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'tmpl-e-ap1-e1', source: 'tmpl-ap1', target: 'tmpl-e1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
      ],
    },
  },
  {
    id: 'leave-approval',
    name: 'Leave Approval',
    description: 'Standard leave request with manager and HR approval chain.',
    nodeCount: 5,
    snapshot: {
      nodes: [
        { id: 'la-s1', type: 'start', position: { x: 400, y: 50 }, data: { ...createNodeData('start'), title: 'Leave Requested', metadata: [{ key: 'type', value: 'Casual' }], validationIssues: [] } },
        { id: 'la-ap1', type: 'approval', position: { x: 400, y: 250 }, data: { ...createNodeData('approval'), title: 'Manager Approval', approverRole: 'Reporting Manager', autoApproveThreshold: 100, validationIssues: [] } },
        { id: 'la-ap2', type: 'approval', position: { x: 400, y: 450 }, data: { ...createNodeData('approval'), title: 'HR Confirmation', approverRole: 'HR Manager', autoApproveThreshold: 50, validationIssues: [] } },
        { id: 'la-auto1', type: 'automatedStep', position: { x: 400, y: 650 }, data: { ...createNodeData('automatedStep'), title: 'Send Notification', automationId: 'send_email', params: [{ key: 'to', value: '{{team.email}}' }], retryCount: 1, validationIssues: [] } },
        { id: 'la-e1', type: 'end', position: { x: 400, y: 850 }, data: { ...createNodeData('end'), title: 'Leave Approved', endMessage: 'Leave has been fully approved.', summaryFlag: true, validationIssues: [] } },
      ],
      edges: [
        { id: 'la-e1-e', source: 'la-s1', target: 'la-ap1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'la-e2-e', source: 'la-ap1', target: 'la-ap2', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'la-e3-e', source: 'la-ap2', target: 'la-auto1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'la-e4-e', source: 'la-auto1', target: 'la-e1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
      ],
    },
  },
  {
    id: 'document-verification',
    name: 'Document Verification',
    description: 'Manual document verification with automated reminders.',
    nodeCount: 5,
    snapshot: {
      nodes: [
        { id: 'dv-s1', type: 'start', position: { x: 400, y: 50 }, data: { ...createNodeData('start'), title: 'Documents Submitted', metadata: [{ key: 'batch', value: '2025-A' }], validationIssues: [] } },
        { id: 'dv-t1', type: 'task', position: { x: 400, y: 250 }, data: { ...createNodeData('task'), title: 'Verify Identity', assignee: 'Verification Officer', dueDate: '2026-05-02', customFields: [{ key: 'method', value: 'manual' }], validationIssues: [] } },
        { id: 'dv-t2', type: 'task', position: { x: 400, y: 450 }, data: { ...createNodeData('task'), title: 'Verify Education', assignee: 'Verification Officer', dueDate: '2026-05-05', customFields: [{ key: 'background_check', value: 'required' }], validationIssues: [] } },
        { id: 'dv-auto1', type: 'automatedStep', position: { x: 400, y: 650 }, data: { ...createNodeData('automatedStep'), title: 'Send Reminder', automationId: 'send_email', params: [{ key: 'to', value: '{{officer.email}}' }], retryCount: 2, validationIssues: [] } },
        { id: 'dv-e1', type: 'end', position: { x: 400, y: 850 }, data: { ...createNodeData('end'), title: 'Verification Complete', endMessage: 'All documents verified.', summaryFlag: false, validationIssues: [] } },
      ],
      edges: [
        { id: 'dv-e1-e', source: 'dv-s1', target: 'dv-t1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'dv-e2-e', source: 'dv-t1', target: 'dv-t2', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'dv-e3-e', source: 'dv-t2', target: 'dv-auto1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
        { id: 'dv-e4-e', source: 'dv-auto1', target: 'dv-e1', animated: true, style: { strokeWidth: 2, stroke: '#10b981' } },
      ],
    },
  },
];
