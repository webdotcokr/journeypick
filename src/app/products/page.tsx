import { Suspense } from 'react';
import { ExperienceService } from '@/domains/products/services/experienceService';
import { ProductsClient } from '@/domains/products/components/ProductsClient';
import { ProductListSkeleton } from '@/domains/products/components/ProductListSkeleton';
import { ExperienceFilters } from '@/domains/products/types';

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}

export async function generateMetadata() {
  return {
    title: 'Discover Cultural Experiences in Korea | 저니픽',
    description: 'Explore authentic Korean cultural experiences curated by local planners. Book cooking classes, art workshops, historical tours and more.',
    keywords: 'Korea experience, cultural tour, cooking class, Korean culture, travel Korea',
  };
}

async function getInitialData(searchParams: ProductsPageProps['searchParams']) {
  const params = await searchParams;
  
  const filters: ExperienceFilters = {
    search: params.search,
    category: params.category,
    location: params.location,
    minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
  };

  const page = params.page ? parseInt(params.page) : 1;

  try {
    const [experiencesData, categories] = await Promise.all([
      ExperienceService.getExperiences(filters, page, 12),
      ExperienceService.getCategories(),
    ]);

    return {
      experiences: experiencesData.experiences,
      total: experiencesData.total,
      hasMore: experiencesData.hasMore,
      categories,
      currentPage: page,
      filters,
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      experiences: [],
      total: 0,
      hasMore: false,
      categories: [],
      currentPage: 1,
      filters,
    };
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const initialData = await getInitialData(searchParams);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal mb-2">
            Discover Korean Experiences
          </h1>
          <p className="text-warm-gray">
            Authentic cultural experiences curated by local experts
          </p>
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductsClient initialData={initialData} />
        </Suspense>
      </div>
    </div>
  );
}