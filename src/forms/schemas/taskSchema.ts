import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  assignee: z.string().min(2),
  dueDate: z.string().min(1),
  customFields: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
});

export const TASK_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'assignee', label: 'Assignee', type: 'text', required: true },
  { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
  { name: 'customFields', label: 'Custom Fields', type: 'keyValue' },
];
