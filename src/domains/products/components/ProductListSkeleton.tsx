export function ProductListSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar Skeleton */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="space-y-6">
          {/* Search Bar Skeleton */}
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Image Skeleton */}
              <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}