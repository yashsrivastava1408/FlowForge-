import type { ZodTypeAny } from 'zod';
import { APPROVAL_FIELDS, approvalSchema } from './schemas/approvalSchema';
import { AUTOMATED_STEP_FIELDS, automatedStepSchema } from './schemas/automatedStepSchema';
import { END_FIELDS, endSchema } from './schemas/endSchema';
import { START_FIELDS, startSchema } from './schemas/startSchema';
import { TASK_FIELDS, taskSchema } from './schemas/taskSchema';
import type { FieldConfig, NodeType } from '../types/workflow';

export interface NodeRegistryEntry {
  label: string;
  fields: FieldConfig[];
  schema: ZodTypeAny;
}

export const nodeRegistry: Record<NodeType, NodeRegistryEntry> = {
  start: { label: 'Start', fields: START_FIELDS, schema: startSchema },
  task: { label: 'Task', fields: TASK_FIELDS, schema: taskSchema },
  approval: { label: 'Approval', fields: APPROVAL_FIELDS, schema: approvalSchema },
  automatedStep: { label: 'Automated step', fields: AUTOMATED_STEP_FIELDS, schema: automatedStepSchema },
  end: { label: 'End', fields: END_FIELDS, schema: endSchema },
};
