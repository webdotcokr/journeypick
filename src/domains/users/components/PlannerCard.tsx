import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users, Calendar } from 'lucide-react';
import { PlannerProfile } from '../types';

interface PlannerCardProps {
  planner: PlannerProfile;
}

export function PlannerCard({ planner }: PlannerCardProps) {
  const { stats, featuredExperiences } = planner;
  
  return (
    <Link href={`/planners/${planner.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Featured Experiences Images */}
        <div className="relative h-48 w-full">
          {featuredExperiences.length > 0 ? (
            <div className="grid grid-cols-3 h-full gap-1">
              {featuredExperiences.slice(0, 3).map((experience, index) => (
                <div key={experience.id} className="relative">
                  <Image
                    src={experience.thumbnail_url || '/placeholder-experience.svg'}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 11vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Planner Avatar */}
          <div className="absolute bottom-3 left-3">
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
              <Image
                src={planner.avatar_url || '/placeholder-avatar.svg'}
                alt={planner.full_name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Planner Name */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-charcoal mb-1">
              {planner.full_name}
            </h3>
            {planner.bio && (
              <p className="text-sm text-warm-gray line-clamp-2">
                {planner.bio}
              </p>
            )}
          </div>

          {/* Specialties */}
          {stats.specialties.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {stats.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-primary/10 text-primary border-0"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm text-warm-gray mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{stats.totalExperiences} experiences</span>
              </div>
              
              {stats.averageRating > 0 && (
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{stats.averageRating}</span>
                  <span className="text-xs ml-1">({stats.totalReviews})</span>
                </div>
              )}
            </div>
          </div>

          {/* Price Range */}
          {stats.priceRange.max > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-primary font-semibold">
                ${stats.priceRange.min.toLocaleString()}
                {stats.priceRange.min !== stats.priceRange.max && 
                  ` - $${stats.priceRange.max.toLocaleString()}`
                }
                <span className="text-warm-gray text-sm font-normal"> per experience</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}