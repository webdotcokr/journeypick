'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Experience } from '../types';
import { MapPin, Users, Clock, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductCardProps {
  experience: Experience;
  onWishlistToggle?: (experienceId: number) => void;
  isWishlisted?: boolean;
}

export function ProductCard({ experience, onWishlistToggle, isWishlisted = false }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle?.(experience.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getRatingDisplay = () => {
    if (experience.rating_avg && experience.rating_count) {
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{experience.rating_avg.toFixed(1)}</span>
          <span className="text-sm text-warm-gray">({experience.rating_count})</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-gray-300" />
        <span className="text-sm text-warm-gray">New</span>
      </div>
    );
  };

  return (
    <Link href={`/products/${experience.id}`}>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imageError && experience.thumbnail_url ? (
            <Image
              src={experience.thumbnail_url}
              alt={experience.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">No image</p>
              </div>
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          {/* Category Badge */}
          {experience.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                {experience.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title & Rating */}
          <div className="mb-2">
            <h3 className="font-semibold text-lg text-charcoal mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {experience.title}
            </h3>
            {getRatingDisplay()}
          </div>

          {/* Description */}
          <p className="text-warm-gray text-sm mb-3 line-clamp-2">
            {experience.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-warm-gray">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{experience.location_text}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-warm-gray">
              <div className="flex items-center gap-4">
                {experience.duration_hours && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{experience.duration_hours}h</span>
                  </div>
                )}
                {experience.max_participants && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {experience.max_participants}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Planner Info */}
          {experience.planner && (
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              {experience.planner.avatar_url ? (
                <Image
                  src={experience.planner.avatar_url}
                  alt={experience.planner.full_name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              )}
              <span className="text-sm text-warm-gray">
                by {experience.planner.full_name}
              </span>
            </div>
          )}

          {/* Price & Book Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-charcoal">
                ₩{formatPrice(experience.price)}
              </span>
              <span className="text-sm text-warm-gray ml-1">per person</span>
            </div>
            <Button size="sm" className="group-hover:bg-primary/90">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}