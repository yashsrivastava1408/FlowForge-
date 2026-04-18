import { z } from 'zod';
import type { FieldConfig } from '../../types/workflow';

export const startSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  owner: z.string().min(2),
  kickoffDate: z.string().min(1),
});

export const START_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'owner', label: 'Owner', type: 'text', required: true },
  { name: 'kickoffDate', label: 'Kickoff date', type: 'date', required: true },
];
