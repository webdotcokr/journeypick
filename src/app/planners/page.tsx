import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planners - JourneyPick',
  description: 'Meet our local Korean cultural experience planners',
};

export default function PlannersPage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <header className='mb-8'>
            <h1 className='text-3xl font-bold text-dark-gray mb-4'>
              Our Local Planners
            </h1>
            <p className='text-lg text-medium-gray'>
              Meet the passionate locals who create and guide authentic Korean cultural experiences
            </p>
          </header>

          <div className='bg-white rounded-lg border border-light-gray p-8 text-center'>
            <h2 className='text-xl font-semibold text-dark-gray mb-4'>
              Planners Directory Coming Soon
            </h2>
            <p className='text-medium-gray mb-6'>
              This page will showcase all our verified local planners, 
              their specialties, ratings, and available experiences.
            </p>
            <div className='text-sm text-light-gray'>
              Features will include:
              <ul className='list-disc list-inside mt-2 space-y-1'>
                <li>Planner profiles and backgrounds</li>
                <li>Experience specialties and ratings</li>
                <li>Search and filter by location/category</li>
                <li>Direct booking capabilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}