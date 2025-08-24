import { useState, useEffect } from 'react';
import { PlannerProfile } from '../types';
import { PlannerService } from '../services/plannerService';

export function usePlanners() {
  const [planners, setPlanners] = useState<PlannerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlanners();
  }, []);

  const fetchPlanners = async () => {
    try {
      setLoading(true);
      setError(null);
      const plannersData = await PlannerService.getPlanners();
      setPlanners(plannersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch planners');
      console.error('Error fetching planners:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    planners,
    loading,
    error,
    refetch: fetchPlanners,
  };
}