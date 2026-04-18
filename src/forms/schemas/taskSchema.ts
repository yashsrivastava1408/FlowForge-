import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  assignee: z.string().min(2),
  dueInDays: z.coerce.number().min(1).max(30),
  instructions: z.string().min(4),
});

export const TASK_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'assignee', label: 'Assignee', type: 'text', required: true },
  { name: 'dueInDays', label: 'Due in days', type: 'number', required: true },
  { name: 'instructions', label: 'Instructions', type: 'textarea', required: true },
];
