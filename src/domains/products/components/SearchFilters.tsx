'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { Category } from '../types';

interface SearchFiltersProps {
  categories: Category[];
  className?: string;
}

export function SearchFilters({ categories, className = '' }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const updateURL = (filters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    
    // Remove existing filter params
    params.delete('search');
    params.delete('category');
    params.delete('location');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('page'); // Reset to first page when filtering
    
    // Add new filter params
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        params.set(key, value);
      }
    });
    
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({
      search: searchTerm,
      category: selectedCategory,
      location,
      minPrice,
      maxPrice,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    router.push('/products');
  };

  const hasActiveFilters = searchTerm || selectedCategory || location || minPrice || maxPrice;

  return (
    <div className={className}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </form>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-charcoal">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-light-gray rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Location
              </label>
              <Input
                type="text"
                placeholder="Seoul, Busan..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Min Price (₩)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Max Price (₩)
              </label>
              <Input
                type="number"
                placeholder="500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
              )}
              <span className="text-sm text-warm-gray">
                {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
              </span>
            </div>
            <Button onClick={handleSearch}>Apply Filters</Button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchTerm && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Search: "{searchTerm}"
              <button
                onClick={() => {
                  setSearchTerm('');
                  updateURL({ category: selectedCategory, location, minPrice, maxPrice });
                }}
                className="hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Category: {categories.find(c => c.id.toString() === selectedCategory)?.name}
              <button
                onClick={() => {
                  setSelectedCategory('');
                  updateURL({ search: searchTerm, location, minPrice, maxPrice });
                }}
                className="hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {location && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Location: {location}
              <button
                onClick={() => {
                  setLocation('');
                  updateURL({ search: searchTerm, category: selectedCategory, minPrice, maxPrice });
                }}
                className="hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {(minPrice || maxPrice) && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Price: ₩{minPrice || '0'} - ₩{maxPrice || '∞'}
              <button
                onClick={() => {
                  setMinPrice('');
                  setMaxPrice('');
                  updateURL({ search: searchTerm, category: selectedCategory, location });
                }}
                className="hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}