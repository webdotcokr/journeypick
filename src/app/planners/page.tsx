'use client';

import { usePlanners } from '@/domains/users/hooks/usePlanners';
import { PlannerCard } from '@/domains/users/components/PlannerCard';
import { Loader2 } from 'lucide-react';

export default function PlannersPage() {
  const { planners, loading, error } = usePlanners();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-warm-gray">Loading planners...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-charcoal mb-2">Something went wrong</h2>
          <p className="text-warm-gray">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-4">
              Our Local Planners
            </h1>
            <p className="text-lg text-warm-gray">
              Meet the passionate locals who create and guide authentic Korean cultural experiences
            </p>
          </header>

          {planners.length === 0 ? (
            <div className="bg-white rounded-lg border border-light-gray p-8 text-center">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                No planners found
              </h2>
              <p className="text-warm-gray">
                We're working on adding more amazing local planners to our platform.
                Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {planners.map((planner) => (
                <PlannerCard key={planner.id} planner={planner} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}