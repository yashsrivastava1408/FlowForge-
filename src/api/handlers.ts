import { HttpResponse, http } from 'msw';
import type { SimulationRequest, SimulationResult } from '../types/api';
import { automations } from '../mocks/automations';

export const handlers = [
  http.get('/api/automations', () => HttpResponse.json(automations)),
  http.post('/api/simulate', async ({ request }) => {
    const body = (await request.json()) as SimulationRequest;
    const sortedNodes = [...body.nodes].sort((a, b) => a.position.y - b.position.y);

    const result: SimulationResult = {
      success: true,
      steps: sortedNodes.map((node, index) => {
        const label = node.data.title || `${node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node`;
        return {
          nodeId: node.id,
          nodeType: node.type,
          label,
          status: index < sortedNodes.length - 1 ? 'completed' : 'pending',
          duration: index < sortedNodes.length - 1 ? 600 + index * 250 : null,
        };
      }),
    };

    return HttpResponse.json(result, { status: 200 });
  }),
];
