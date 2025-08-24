import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const mainImage = experience.thumbnail_url || experience.image_urls?.[0] || '/placeholder-experience.svg';
  const rating = experience.rating_avg || 0;
  const reviewCount = experience.rating_count || 0;

  return (
    <Link href={`/experiences/${experience.id}`}>
      <Card className='overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
        <div className='relative h-48 w-full'>
          <Image
            src={mainImage}
            alt={experience.title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {experience.category && (
            <div className='absolute top-3 left-3'>
              <span className='bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-xs font-medium'>
                {experience.category.name}
              </span>
            </div>
          )}
        </div>
        
        <CardContent className='p-4'>
          <div className='mb-2'>
            <h3 className='font-semibold text-charcoal mb-1 line-clamp-2'>
              {experience.title}
            </h3>
            <div className='flex items-center text-warm-gray text-sm mb-2'>
              <MapPin className='h-3 w-3 mr-1' />
              <span className='truncate'>{experience.location_text}</span>
            </div>
          </div>

          <div className='flex items-center justify-between text-sm text-warm-gray mb-3'>
            <div className='flex items-center space-x-3'>
              <div className='flex items-center'>
                <Clock className='h-3 w-3 mr-1' />
                <span>{experience.duration_hours}h</span>
              </div>
              <div className='flex items-center'>
                <Users className='h-3 w-3 mr-1' />
                <span>Max {experience.max_participants}</span>
              </div>
            </div>
            
            {rating > 0 && (
              <div className='flex items-center'>
                <Star className='h-3 w-3 mr-1 fill-yellow-400 text-yellow-400' />
                <span className='font-medium'>{rating.toFixed(1)}</span>
                <span className='text-xs ml-1'>({reviewCount})</span>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-primary font-semibold'>
              ${experience.price.toLocaleString()}
              <span className='text-warm-gray text-sm font-normal'> per person</span>
            </div>
            
            {experience.planner && (
              <div className='text-xs text-warm-gray'>
                by {experience.planner.full_name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}