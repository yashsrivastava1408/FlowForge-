import { useState } from 'react';
import { simulateWorkflow } from '../api/workflowApi';
import { useWorkflowSelectors } from './useWorkflowStore';
import type { ValidationIssue, WorkflowEdge, WorkflowNode } from '../types/workflow';

function pushIssue(map: Record<string, ValidationIssue[]>, nodeId: string, issue: ValidationIssue) {
  map[nodeId] = [...(map[nodeId] ?? []), issue];
}

export function validateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
  const issuesByNode: Record<string, ValidationIssue[]> = {};
  const startNodes = nodes.filter((node) => node.type === 'start');
  const endNodes = nodes.filter((node) => node.type === 'end');
  const incoming = new Set(edges.map((edge) => edge.target));
  const adjacency = new Map<string, string[]>();
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  edges.forEach((edge) => {
    adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
  });

  if (startNodes.length !== 1) {
    startNodes.forEach((node) =>
      pushIssue(issuesByNode, node.id, {
        code: 'start-count',
        message: 'Workflow requires exactly one start node.',
      }),
    );
  }

  if (endNodes.length !== 1) {
    endNodes.forEach((node) =>
      pushIssue(issuesByNode, node.id, {
        code: 'end-count',
        message: 'Workflow requires exactly one end node.',
      }),
    );
  }

  nodes.forEach((node) => {
    if (node.type !== 'start' && !incoming.has(node.id)) {
      pushIssue(issuesByNode, node.id, {
        code: 'orphan',
        message: 'Node has no incoming path.',
      });
    }
  });

  const startNode = startNodes[0];
  const endNode = endNodes[0];
  const visited = new Set<string>();

  if (startNode) {
    const queue = [startNode.id];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) {
        continue;
      }
      visited.add(current);
      (adjacency.get(current) ?? []).forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      });
    }
  }

  if (endNode && !visited.has(endNode.id)) {
    pushIssue(issuesByNode, endNode.id, {
      code: 'unreachable-end',
      message: 'End node is not reachable from the start node.',
    });
  }

  nodes.forEach((node) => {
    if (startNode && !visited.has(node.id)) {
      pushIssue(issuesByNode, node.id, {
        code: 'unreachable-node',
        message: 'Node is unreachable from the current start path.',
      });
    }
  });

  const color = new Map<string, 'white' | 'gray' | 'black'>();
  nodes.forEach((node) => color.set(node.id, 'white'));

  const walk = (nodeId: string): boolean => {
    color.set(nodeId, 'gray');
    for (const neighbor of adjacency.get(nodeId) ?? []) {
      const state = color.get(neighbor) ?? 'white';
      if (state === 'gray') {
        pushIssue(issuesByNode, neighbor, {
          code: 'cycle',
          message: 'Cycle detected in workflow path.',
        });
        return true;
      }
      if (state === 'white' && walk(neighbor)) {
        pushIssue(issuesByNode, nodeId, {
          code: 'cycle',
          message: 'Cycle detected in workflow path.',
        });
        return true;
      }
    }
    color.set(nodeId, 'black');
    return false;
  };

  nodes.forEach((node) => {
    if ((color.get(node.id) ?? 'white') === 'white') {
      walk(node.id);
    }
  });

  const success = Object.keys(issuesByNode).length === 0;
  return { success, issuesByNode, nodeMap };
}

export function useSimulation() {
  const { nodes, edges, setValidationIssues, setSimulationLog } = useWorkflowSelectors();
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSimulation() {
    const validation = validateWorkflow(nodes, edges);
    setValidationIssues(validation.issuesByNode);

    if (!validation.success) {
      setSimulationLog([]);
      setError('Resolve validation issues before simulation.');
      return;
    }

    setError(null);
    setIsSimulating(true);
    try {
      const result = await simulateWorkflow({ nodes, edges });
      const entries = result.steps.map(
        (step) =>
          `${step.label} · ${step.status}${step.duration === null ? '' : ` · ${step.duration}ms`}`,
      );
      setSimulationLog(entries);
    } catch {
      setError('Simulation failed. Check MSW setup.');
    } finally {
      setIsSimulating(false);
    }
  }

  return { runSimulation, isSimulating, error };
}
