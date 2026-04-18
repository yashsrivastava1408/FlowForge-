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
        { id: 'tmpl-s1', type: 'start', position: { x: 400, y: 50 }, data: { ...createNodeData('start'), title: 'New Hire Joins', description: 'Employee accepted the offer and is onboarding.', owner: 'HR Operations', kickoffDate: new Date().toISOString().slice(0, 10), validationIssues: [] } },
        { id: 'tmpl-t1', type: 'task', position: { x: 200, y: 250 }, data: { ...createNodeData('task'), title: 'Collect Documents', description: 'Gather ID, tax forms, and bank details.', assignee: 'HR Coordinator', dueInDays: 2, instructions: 'Request passport, PAN card, bank account details.', validationIssues: [] } },
        { id: 'tmpl-a1', type: 'automatedStep', position: { x: 600, y: 250 }, data: { ...createNodeData('automatedStep'), title: 'IT Account Setup', description: 'Auto-provision email, Slack, and laptop access.', automationId: 'provision_it', params: { email: '{{employee.email}}', department: '{{employee.department}}' }, retryCount: 3, validationIssues: [] } },
        { id: 'tmpl-ap1', type: 'approval', position: { x: 400, y: 450 }, data: { ...createNodeData('approval'), title: 'Manager Sign-off', description: 'Manager confirms employee setup is complete.', approver: 'Department Head', slaHours: 48, policyLink: '', requiresComments: false, validationIssues: [] } },
        { id: 'tmpl-e1', type: 'end', position: { x: 400, y: 650 }, data: { ...createNodeData('end'), title: 'Onboarding Complete', description: 'Employee is fully onboarded and operational.', outcome: 'Employee active in all systems', validationIssues: [] } },
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
        { id: 'la-s1', type: 'start', position: { x: 400, y: 50 }, data: { ...createNodeData('start'), title: 'Leave Requested', description: 'Employee submits a leave application.', owner: 'Employee Self-Service', kickoffDate: new Date().toISOString().slice(0, 10), validationIssues: [] } },
        { id: 'la-ap1', type: 'approval', position: { x: 400, y: 250 }, data: { ...createNodeData('approval'), title: 'Manager Approval', description: 'Direct manager reviews and approves leave.', approver: 'Reporting Manager', slaHours: 24, policyLink: '', requiresComments: true, validationIssues: [] } },
        { id: 'la-ap2', type: 'approval', position: { x: 400, y: 450 }, data: { ...createNodeData('approval'), title: 'HR Confirmation', description: 'HR validates leave balance and policy compliance.', approver: 'HR Manager', slaHours: 12, policyLink: '', requiresComments: false, validationIssues: [] } },
        { id: 'la-auto1', type: 'automatedStep', position: { x: 400, y: 650 }, data: { ...createNodeData('automatedStep'), title: 'Send Notification', description: 'Notify team about approved leave.', automationId: 'send_email', params: { to: '{{team.email}}', subject: 'Leave notification' }, retryCount: 1, validationIssues: [] } },
        { id: 'la-e1', type: 'end', position: { x: 400, y: 850 }, data: { ...createNodeData('end'), title: 'Leave Approved', description: 'Leave has been fully approved and recorded.', outcome: 'Leave recorded in HRMS', validationIssues: [] } },
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
        { id: 'dv-s1', type: 'start', position: { x: 400, y: 50 }, data: { ...createNodeData('start'), title: 'Documents Submitted', description: 'Candidate uploads required documents.', owner: 'Recruitment', kickoffDate: new Date().toISOString().slice(0, 10), validationIssues: [] } },
        { id: 'dv-t1', type: 'task', position: { x: 400, y: 250 }, data: { ...createNodeData('task'), title: 'Verify Identity', description: 'Cross-check ID proof against government database.', assignee: 'Verification Officer', dueInDays: 1, instructions: 'Match photo ID, address proof, and signature.', validationIssues: [] } },
        { id: 'dv-t2', type: 'task', position: { x: 400, y: 450 }, data: { ...createNodeData('task'), title: 'Verify Education', description: 'Confirm degree certificates and transcripts.', assignee: 'Verification Officer', dueInDays: 3, instructions: 'Contact university registrar for confirmation.', validationIssues: [] } },
        { id: 'dv-auto1', type: 'automatedStep', position: { x: 400, y: 650 }, data: { ...createNodeData('automatedStep'), title: 'Send Reminder', description: 'Auto-follow-up if verification is pending.', automationId: 'send_email', params: { to: '{{officer.email}}', subject: 'Verification pending' }, retryCount: 2, validationIssues: [] } },
        { id: 'dv-e1', type: 'end', position: { x: 400, y: 850 }, data: { ...createNodeData('end'), title: 'Verification Complete', description: 'All documents verified and approved.', outcome: 'Candidate cleared for next stage', validationIssues: [] } },
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
