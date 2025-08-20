'use client';

import { ExperienceCard } from './ExperienceCard';
import { Experience } from '../types';

interface ExperienceGridProps {
  experiences: Experience[];
  loading?: boolean;
}

export function ExperienceGrid({ experiences, loading }: ExperienceGridProps) {
  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='space-y-4'>
            <div className='h-48 bg-light-gray animate-pulse rounded-md'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-light-gray animate-pulse rounded w-3/4'></div>
              <div className='h-3 bg-light-gray animate-pulse rounded w-1/2'></div>
              <div className='h-3 bg-light-gray animate-pulse rounded w-1/4'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-warm-gray text-lg mb-4'>
          No experiences found
        </div>
        <p className='text-warm-gray'>
          Try adjusting your search criteria or browse all experiences.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}