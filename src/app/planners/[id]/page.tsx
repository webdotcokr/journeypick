'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Star, Calendar, Users, Loader2 } from 'lucide-react';
import { PlannerProfile } from '@/domains/users/types';
import { PlannerService } from '@/domains/users/services/plannerService';
import { ExperienceCard } from '@/domains/products/components/ExperienceCard';

export default function PlannerDetailPage() {
  const params = useParams();
  const plannerId = params.id as string;
  
  const [planner, setPlanner] = useState<PlannerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (plannerId) {
      fetchPlanner();
    }
  }, [plannerId]);

  const fetchPlanner = async () => {
    try {
      setLoading(true);
      setError(null);
      const plannerData = await PlannerService.getPlannerById(plannerId);
      setPlanner(plannerData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch planner');
      console.error('Error fetching planner:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-warm-gray">Loading planner...</p>
        </div>
      </div>
    );
  }

  if (error || !planner) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            {error || 'Planner not found'}
          </h2>
          <p className="text-warm-gray mb-4">
            The planner you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/planners">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Planners
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { stats } = planner;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/planners" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Planners
          </Link>

          {/* Planner Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={planner.avatar_url || '/placeholder-avatar.svg'}
                      alt={planner.full_name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-charcoal mb-2">
                    {planner.full_name}
                  </h1>
                  
                  {planner.bio && (
                    <p className="text-warm-gray mb-4">
                      {planner.bio}
                    </p>
                  )}

                  {/* Specialties */}
                  {stats.specialties.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-charcoal mb-2">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {stats.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-0"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 text-sm text-warm-gray">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{stats.totalExperiences} experiences</span>
                    </div>
                    
                    {stats.averageRating > 0 && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{stats.averageRating}</span>
                        <span className="ml-1">({stats.totalReviews} reviews)</span>
                      </div>
                    )}

                    {stats.priceRange.max > 0 && (
                      <div className="flex items-center">
                        <span className="font-medium">
                          ${stats.priceRange.min.toLocaleString()}
                          {stats.priceRange.min !== stats.priceRange.max && 
                            ` - $${stats.priceRange.max.toLocaleString()}`
                          }
                        </span>
                        <span className="ml-1">per experience</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Experiences */}
          {planner.featuredExperiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6">
                Featured Experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planner.featuredExperiences.map((experience) => (
                  <div key={experience.id} className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={experience.thumbnail_url || '/placeholder-experience.svg'}
                        alt={experience.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-charcoal mb-2 line-clamp-2">
                        {experience.title}
                      </h3>
                      <div className="text-primary font-semibold">
                        ${experience.price.toLocaleString()}
                        <span className="text-warm-gray text-sm font-normal"> per person</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No experiences message */}
          {planner.featuredExperiences.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal mb-2">
                No experiences yet
              </h3>
              <p className="text-warm-gray">
                This planner is still working on creating amazing experiences for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}