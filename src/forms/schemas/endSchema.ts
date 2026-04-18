import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const endSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  outcome: z.string().min(2),
});

export const END_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'outcome', label: 'Outcome', type: 'textarea', required: true },
];
