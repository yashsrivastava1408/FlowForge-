import { describe, expect, it } from 'vitest';
import { validateWorkflow } from './useSimulation';
import type { WorkflowEdge, WorkflowNode } from '../types/workflow';
import { createNodeData } from '../workflowDefaults';

function node(id: string, type: WorkflowNode['type'], x: number, y: number): WorkflowNode {
  return {
    id,
    type,
    position: { x, y },
    data: createNodeData(type),
  };
}

function edge(id: string, source: string, target: string): WorkflowEdge {
  return { id, source, target };
}

describe('validateWorkflow', () => {
  it('accepts a valid path from start to end', () => {
    const nodes = [
      node('start-1', 'start', 0, 0),
      node('task-1', 'task', 0, 120),
      node('end-1', 'end', 0, 240),
    ];
    const edges = [edge('s-t', 'start-1', 'task-1'), edge('t-e', 'task-1', 'end-1')];

    const result = validateWorkflow(nodes, edges);

    expect(result.success).toBe(true);
    expect(result.issuesByNode).toEqual({});
  });

  it('flags unreachable and orphan nodes', () => {
    const nodes = [
      node('start-1', 'start', 0, 0),
      node('task-1', 'task', 0, 120),
      node('end-1', 'end', 0, 240),
      node('task-2', 'task', 220, 120),
    ];
    const edges = [edge('s-t', 'start-1', 'task-1')];

    const result = validateWorkflow(nodes, edges);

    expect(result.success).toBe(false);
    expect(result.issuesByNode['end-1']?.some((issue) => issue.code === 'orphan')).toBe(true);
    expect(result.issuesByNode['task-2']?.some((issue) => issue.code === 'unreachable-node')).toBe(true);
  });

  it('detects cycles in the workflow graph', () => {
    const nodes = [
      node('start-1', 'start', 0, 0),
      node('task-1', 'task', 0, 120),
      node('approval-1', 'approval', 0, 240),
      node('end-1', 'end', 0, 360),
    ];
    const edges = [
      edge('s-t', 'start-1', 'task-1'),
      edge('t-a', 'task-1', 'approval-1'),
      edge('a-t', 'approval-1', 'task-1'),
      edge('a-e', 'approval-1', 'end-1'),
    ];

    const result = validateWorkflow(nodes, edges);

    expect(result.success).toBe(false);
    expect(
      Object.values(result.issuesByNode)
        .flat()
        .some((issue) => issue.code === 'cycle'),
    ).toBe(true);
  });

  it('rejects a start node with incoming edges', () => {
    const nodes = [
      node('start-1', 'start', 0, 0),
      node('task-1', 'task', 0, 120),
    ];
    // Create a cycle back to start or just an edge to start
    const edges = [
      edge('s-t', 'start-1', 'task-1'),
      edge('t-s', 'task-1', 'start-1'),
    ];

    const result = validateWorkflow(nodes, edges);

    expect(result.success).toBe(false);
    expect(result.issuesByNode['start-1']?.some((issue) => issue.code === 'start-not-first')).toBe(true);
  });
});
