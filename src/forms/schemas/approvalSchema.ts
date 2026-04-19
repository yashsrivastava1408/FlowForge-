import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const approvalSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  approverRole: z.string().min(2),
  autoApproveThreshold: z.coerce.number().min(0).max(100),
});

export const APPROVAL_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'approverRole', label: 'Approver Role', type: 'text', required: true, placeholder: 'e.g. Manager, HRBP' },
  { name: 'autoApproveThreshold', label: 'Auto-approve threshold (%)', type: 'number', required: true },
];
