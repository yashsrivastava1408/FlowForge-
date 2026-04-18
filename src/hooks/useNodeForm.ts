import { useMemo } from 'react';
import { nodeRegistry } from '../forms/nodeRegistry';
import { useAutomations } from './useAutomations';
import type { AutomatedStepNodeData, FieldConfig, WorkflowNode } from '../types/workflow';

export function useNodeForm(node: WorkflowNode | undefined) {
  const isAutomationNode = node?.type === 'automatedStep';
  const { actions, loading, error } = useAutomations(isAutomationNode);

  const entry = node ? nodeRegistry[node.type] : null;

  const fields = useMemo<FieldConfig[]>(() => {
    if (!node || !entry) {
      return [];
    }

    if (node.type !== 'automatedStep') {
      return entry.fields;
    }

    const automationData = node.data as AutomatedStepNodeData;
    const selectedAction = actions.find((action) => action.id === automationData.automationId) ?? actions[0];

    return entry.fields.map((field) => {
      if (field.name === 'automationId') {
        return {
          ...field,
          options: actions.map((action) => ({ label: action.label, value: action.id })),
        };
      }

      if (field.name === 'params') {
        return {
          ...field,
          description: selectedAction
            ? `Expected params: ${selectedAction.params.join(', ')}`
            : 'Choose an automation to configure params.',
        };
      }

      return field;
    });
  }, [actions, entry, node]);

  return {
    entry,
    fields,
    loading,
    error,
  };
}
