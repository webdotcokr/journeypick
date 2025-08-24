'use client';

import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { SearchFilters } from './SearchFilters';
import { Button } from '@/components/ui/button';
import { Grid3X3, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Experience, Category, ExperienceFilters } from '../types';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductsClientProps {
  initialData: {
    experiences: Experience[];
    total: number;
    hasMore: boolean;
    categories: Category[];
    currentPage: number;
    filters: ExperienceFilters;
  };
}

export function ProductsClient({ initialData }: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set());

  const { experiences, total, hasMore, categories, currentPage } = initialData;

  const handleWishlistToggle = (experienceId: number) => {
    const newWishlisted = new Set(wishlistedItems);
    if (newWishlisted.has(experienceId)) {
      newWishlisted.delete(experienceId);
    } else {
      newWishlisted.add(experienceId);
    }
    setWishlistedItems(newWishlisted);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const totalPages = Math.ceil(total / 12);
  const hasResults = experiences.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-80 flex-shrink-0">
        <SearchFilters categories={categories} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              {total > 0 ? `${total} experiences found` : 'No experiences found'}
            </h2>
            {currentPage > 1 && (
              <p className="text-sm text-warm-gray">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-warm-gray">View:</span>
            <div className="flex border border-gray-200 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {hasResults ? (
          <>
            {/* Experience Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {experiences.map((experience) => (
                <ProductCard
                  key={experience.id}
                  experience={experience}
                  onWishlistToggle={handleWishlistToggle}
                  isWishlisted={wishlistedItems.has(experience.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid3X3 className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No experiences found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all experiences
            </p>
            <Button onClick={() => router.push('/products')}>
              View All Experiences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}