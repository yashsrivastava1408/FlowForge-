import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const automatedStepSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  automationId: z.string().min(1),
  retryCount: z.coerce.number().min(0).max(10).optional(),
  params: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
});

export const AUTOMATED_STEP_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'automationId', label: 'Automation action', type: 'select', required: true, dynamic: true },
  { name: 'retryCount', label: 'Retry count', type: 'number' },
  { name: 'params', label: 'Action params', type: 'keyValue', dynamic: true },
];
