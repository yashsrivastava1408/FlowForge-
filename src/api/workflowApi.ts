import type { AutomationAction, SimulationRequest, SimulationResult } from '../types/api';

export async function fetchAutomations(): Promise<AutomationAction[]> {
  const response = await fetch('/api/automations');
  if (!response.ok) {
    throw new Error('Failed to fetch automations');
  }
  return response.json() as Promise<AutomationAction[]>;
}

export async function simulateWorkflow(payload: SimulationRequest): Promise<SimulationResult> {
  const response = await fetch('/api/simulate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to simulate workflow');
  }

  return response.json() as Promise<SimulationResult>;
}
