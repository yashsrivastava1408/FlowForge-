import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const approvalSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  approver: z.string().min(2),
  slaHours: z.coerce.number().min(1).max(168),
  policyLink: z.string().url(),
  requiresComments: z.boolean(),
});

export const APPROVAL_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'approver', label: 'Approver', type: 'text', required: true },
  { name: 'slaHours', label: 'SLA (hours)', type: 'number', required: true },
  { name: 'policyLink', label: 'Policy link', type: 'text', required: true },
  { name: 'requiresComments', label: 'Require comments', type: 'boolean' },
];
