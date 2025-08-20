'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel } from '@/components/ui/form';
import { useCategories } from '../hooks/useExperiences';
import { ExperienceFilters } from '../types';
import { X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: ExperienceFilters;
  onFiltersChange: (filters: ExperienceFilters) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: FilterSidebarProps) {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof ExperienceFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearSingleFilter = (key: keyof ExperienceFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  const FilterContent = () => (
    <div className='space-y-6'>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-charcoal'>Active Filters</span>
          <Button
            variant='tertiary'
            size='sm'
            onClick={onClearFilters}
            className='text-xs'
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Category Filter */}
      <FormItem>
        <FormLabel>Category</FormLabel>
        <div className='space-y-2'>
          {categoriesLoading ? (
            <div className='space-y-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='h-8 bg-light-gray animate-pulse rounded'></div>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <label key={category.id} className='flex items-center space-x-2 cursor-pointer'>
                <input
                  type='radio'
                  name='category'
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={(e) => 
                    handleFilterChange('category', e.target.checked ? category.id : undefined)
                  }
                  className='text-primary focus:ring-primary'
                />
                <span className='text-sm flex items-center'>
                  {category.icon && <span className='mr-1'>{category.icon}</span>}
                  {category.name}
                </span>
              </label>
            ))
          )}
          {filters.category && (
            <Button
              variant='tertiary'
              size='sm'
              onClick={() => clearSingleFilter('category')}
              className='text-xs'
            >
              <X className='h-3 w-3 mr-1' />
              Clear category
            </Button>
          )}
        </div>
      </FormItem>

      {/* Location Filter */}
      <FormItem>
        <FormLabel htmlFor='location'>Location</FormLabel>
        <Input
          id='location'
          type='text'
          placeholder='Enter location...'
          value={filters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
        />
      </FormItem>

      {/* Price Range */}
      <FormItem>
        <FormLabel>Price Range</FormLabel>
        <div className='grid grid-cols-2 gap-2'>
          <Input
            type='number'
            placeholder='Min price'
            value={filters.minPrice || ''}
            onChange={(e) => 
              handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <Input
            type='number'
            placeholder='Max price'
            value={filters.maxPrice || ''}
            onChange={(e) => 
              handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </FormItem>

      {/* Participants */}
      <FormItem>
        <FormLabel htmlFor='participants'>Number of Participants</FormLabel>
        <Input
          id='participants'
          type='number'
          min='1'
          placeholder='How many people?'
          value={filters.participants || ''}
          onChange={(e) => 
            handleFilterChange('participants', e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </FormItem>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className='lg:hidden mb-4'>
        <Button
          variant='secondary'
          onClick={() => setIsOpen(!isOpen)}
          className='w-full flex items-center justify-center space-x-2'
        >
          <Filter className='h-4 w-4' />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className='bg-primary text-white text-xs px-2 py-1 rounded-full'>
              {Object.keys(filters).length}
            </span>
          )}
        </Button>
        
        {isOpen && (
          <div className='mt-4 p-4 bg-white border border-light-gray rounded-md'>
            <FilterContent />
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className='hidden lg:block w-64 bg-white p-6 border-r border-light-gray h-fit sticky top-24'>
        <div className='flex items-center space-x-2 mb-6'>
          <Filter className='h-5 w-5 text-primary' />
          <h3 className='font-semibold text-charcoal'>Filters</h3>
        </div>
        <FilterContent />
      </div>
    </>
  );
}