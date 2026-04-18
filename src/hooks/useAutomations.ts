import { useEffect, useState } from 'react';
import type { AutomationAction } from '../types/api';
import { fetchAutomations } from '../api/workflowApi';

export function useAutomations(enabled: boolean) {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let active = true;
    setLoading(true);
    fetchAutomations()
      .then((result) => {
        if (active) {
          setActions(result);
          setError(null);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load automations.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [enabled]);

  return { actions, loading, error };
}
