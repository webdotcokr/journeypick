'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageSliderProps {
  images: string[];
  title: string;
  onWishlistToggle?: () => void;
  isWishlisted?: boolean;
}

export function ImageSlider({ 
  images, 
  title, 
  onWishlistToggle, 
  isWishlisted = false 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const validImages = images.filter((_, index) => !imageErrors.has(index));
  const hasMultipleImages = validImages.length > 1;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
    // If current image fails, move to next valid image
    if (index === currentIndex && validImages.length > 1) {
      handleNext();
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (validImages.length === 0) {
    return (
      <div className="relative">
        <div className="aspect-[16/10] bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Image
                src="/placeholder-experience.svg"
                alt="No image available"
                width={32}
                height={32}
                className="text-gray-500"
              />
            </div>
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
        
        {/* Wishlist Button */}
        {onWishlistToggle && (
          <button
            onClick={onWishlistToggle}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative">
        <div className="aspect-[16/10] relative rounded-lg overflow-hidden">
          <Image
            src={validImages[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            onError={() => handleImageError(currentIndex)}
          />
        </div>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Wishlist Button */}
        {onWishlistToggle && (
          <button
            onClick={onWishlistToggle}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>
        )}

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                currentIndex === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                onError={() => handleImageError(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}