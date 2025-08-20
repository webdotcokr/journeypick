'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Experience } from '../types';
import { ImageSlider } from './ImageSlider';
import { ProductCard } from './ProductCard';
import { LocationMap } from './LocationMap';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Calendar, 
  ArrowLeft,
  Share2,
  MessageCircle
} from 'lucide-react';

interface ProductDetailClientProps {
  experience: Experience;
  relatedExperiences: Experience[];
}

export function ProductDetailClient({ experience, relatedExperiences }: ProductDetailClientProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [participants, setParticipants] = useState(1);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getRatingDisplay = () => {
    if (experience.rating_avg && experience.rating_count) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{experience.rating_avg.toFixed(1)}</span>
          </div>
          <span className="text-warm-gray">({experience.rating_count} reviews)</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <Star className="h-5 w-5 text-gray-300" />
        <span className="text-warm-gray">No reviews yet</span>
      </div>
    );
  };

  const images = experience.image_urls || (experience.thumbnail_url ? [experience.thumbnail_url] : []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/products" 
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Experiences
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <ImageSlider
            images={images}
            title={experience.title}
            onWishlistToggle={handleWishlistToggle}
            isWishlisted={isWishlisted}
          />
        </div>

        {/* Right Column - Details & Booking */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            {experience.category && (
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                {experience.category.name}
              </span>
            )}
            <h1 className="text-3xl font-bold text-charcoal mb-3">{experience.title}</h1>
            {getRatingDisplay()}
          </div>

          {/* Quick Info */}
          <div className="space-y-3 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 text-warm-gray">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{experience.location_text}</span>
            </div>
            {experience.duration_hours && (
              <div className="flex items-center gap-2 text-warm-gray">
                <Clock className="h-5 w-5 text-primary" />
                <span>{experience.duration_hours} hours</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-warm-gray">
              <Users className="h-5 w-5 text-primary" />
              <span>
                {experience.min_participants === experience.max_participants
                  ? `${experience.max_participants} participants`
                  : `${experience.min_participants}-${experience.max_participants} participants`
                }
              </span>
            </div>
          </div>

          {/* Planner Info */}
          {experience.planner && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                {experience.planner.avatar_url ? (
                  <img
                    src={experience.planner.avatar_url}
                    alt={experience.planner.full_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Users className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-charcoal">Hosted by {experience.planner.full_name}</p>
                {experience.planner.bio && (
                  <p className="text-sm text-warm-gray line-clamp-2">{experience.planner.bio}</p>
                )}
              </div>
            </div>
          )}

          {/* Booking Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-charcoal">
                  ₩{formatPrice(experience.price)}
                </span>
                <span className="text-warm-gray">per person</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Participants
                </label>
                <select
                  value={participants}
                  onChange={(e) => setParticipants(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {Array.from(
                    { length: (experience.max_participants || 10) - (experience.min_participants || 1) + 1 },
                    (_, i) => (experience.min_participants || 1) + i
                  ).map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'participant' : 'participants'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200">
              <span className="font-medium text-charcoal">Total</span>
              <span className="text-2xl font-bold text-charcoal">
                ₩{formatPrice(experience.price * participants)}
              </span>
            </div>

            {/* Book Button */}
            <Button 
              className="w-full mb-3" 
              size="lg"
              disabled={!selectedDate}
            >
              {selectedDate ? 'Book Now' : 'Select Date to Book'}
            </Button>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Host
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">About this experience</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-warm-gray leading-relaxed">{experience.description}</p>
            </div>
          </div>

          {/* Overview */}
          {experience.overview && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">What you'll do</h2>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: experience.overview }}
              />
            </div>
          )}

          {/* Additional Info */}
          {experience.additional_info && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Additional Information</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-warm-gray">
                  {JSON.stringify(experience.additional_info, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Location Map */}
        <div>
          <LocationMap
            locationText={experience.location_text}
            latitude={experience.location_lat || undefined}
            longitude={experience.location_lng || undefined}
          />
        </div>
      </div>

      {/* Related Experiences */}
      {relatedExperiences.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8">Similar experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedExperiences.map((related) => (
              <ProductCard key={related.id} experience={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}