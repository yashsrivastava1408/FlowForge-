import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const startSchema = z.object({
  title: z.string().min(2),
  metadata: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
});

export const START_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Start Title', type: 'text', required: true },
  { name: 'metadata', label: 'Metadata', type: 'keyValue' },
];
