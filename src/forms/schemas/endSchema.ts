import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const endSchema = z.object({
  title: z.string().min(2),
  endMessage: z.string().min(2),
  summaryFlag: z.boolean(),
});

export const END_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'endMessage', label: 'End Message', type: 'textarea', required: true },
  { name: 'summaryFlag', label: 'Show Summary', type: 'boolean' },
];
