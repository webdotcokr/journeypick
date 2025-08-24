'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImageUpload } from './ImageUpload';
import { RichTextEditor } from './RichTextEditor';
import { useCategories } from '../hooks/useExperiences';
import { CreateExperienceData } from '../types';

const experienceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  overview: z.string().min(50, 'Overview must be at least 50 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  location_text: z.string().min(3, 'Location must be at least 3 characters'),
  location_lat: z.number().optional(),
  location_lng: z.number().optional(),
  duration_hours: z.number().min(0.5, 'Duration must be at least 30 minutes').max(24, 'Duration cannot exceed 24 hours'),
  max_participants: z.number().min(1, 'Must allow at least 1 participant').max(100, 'Cannot exceed 100 participants'),
  min_participants: z.number().min(1, 'Must require at least 1 participant'),
  category_id: z.number().min(1, 'Please select a category'),
  tags: z.array(z.string()).optional(),
  image_urls: z.array(z.string()).min(1, 'At least one image is required'),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  onSubmit: (data: CreateExperienceData) => Promise<void>;
  isSubmitting: boolean;
  initialData?: Partial<ExperienceFormData>;
}

export function ExperienceForm({ onSubmit, isSubmitting, initialData }: ExperienceFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.image_urls || []);
  const [overview, setOverview] = useState(initialData?.overview || '');
  const { categories, isLoading: categoriesLoading } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      overview: initialData?.overview || '',
      price: initialData?.price || 0,
      location_text: initialData?.location_text || '',
      duration_hours: initialData?.duration_hours || 2,
      max_participants: initialData?.max_participants || 10,
      min_participants: initialData?.min_participants || 1,
      category_id: initialData?.category_id || 0,
      image_urls: initialData?.image_urls || [],
    },
  });

  // Watch min_participants to validate max_participants
  const minParticipants = watch('min_participants');

  const handleFormSubmit = async (data: ExperienceFormData) => {
    const formData: CreateExperienceData = {
      ...data,
      overview,
      image_urls: imageUrls,
    };

    await onSubmit(formData);
  };

  const handleImagesChange = (urls: string[]) => {
    setImageUrls(urls);
    setValue('image_urls', urls, { shouldValidate: true });
  };

  const handleOverviewChange = (content: string) => {
    setOverview(content);
    setValue('overview', content, { shouldValidate: true });
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Basic Information</h3>
        
        <FormItem>
          <FormLabel htmlFor="title">Experience Title *</FormLabel>
          <Input
            id="title"
            placeholder="e.g., Traditional Korean Cooking Class"
            {...register('title')}
          />
          {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="description">Short Description *</FormLabel>
          <textarea
            id="description"
            rows={3}
            className="w-full px-3 py-2 border border-light-gray rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Brief description that will appear in search results..."
            {...register('description')}
          />
          {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="category_id">Category *</FormLabel>
          <select
            id="category_id"
            className="w-full px-3 py-2 border border-light-gray rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            {...register('category_id', { valueAsNumber: true })}
          >
            <option value={0}>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <FormMessage>{errors.category_id.message}</FormMessage>}
          {categoriesLoading && <p className="text-sm text-warm-gray">Loading categories...</p>}
        </FormItem>
      </div>

      {/* Location & Logistics */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Location & Logistics</h3>
        
        <FormItem>
          <FormLabel htmlFor="location_text">Location *</FormLabel>
          <Input
            id="location_text"
            placeholder="e.g., Gangnam-gu, Seoul"
            {...register('location_text')}
          />
          {errors.location_text && <FormMessage>{errors.location_text.message}</FormMessage>}
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormItem>
            <FormLabel htmlFor="duration_hours">Duration (hours) *</FormLabel>
            <Input
              id="duration_hours"
              type="number"
              step="0.5"
              min="0.5"
              max="24"
              {...register('duration_hours', { valueAsNumber: true })}
            />
            {errors.duration_hours && <FormMessage>{errors.duration_hours.message}</FormMessage>}
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="min_participants">Min Participants *</FormLabel>
            <Input
              id="min_participants"
              type="number"
              min="1"
              max="100"
              {...register('min_participants', { valueAsNumber: true })}
            />
            {errors.min_participants && <FormMessage>{errors.min_participants.message}</FormMessage>}
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="max_participants">Max Participants *</FormLabel>
            <Input
              id="max_participants"
              type="number"
              min={minParticipants || 1}
              max="100"
              {...register('max_participants', { valueAsNumber: true })}
            />
            {errors.max_participants && <FormMessage>{errors.max_participants.message}</FormMessage>}
          </FormItem>
        </div>

        <FormItem>
          <FormLabel htmlFor="price">Price (KRW) *</FormLabel>
          <Input
            id="price"
            type="number"
            min="1"
            placeholder="50000"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <FormMessage>{errors.price.message}</FormMessage>}
        </FormItem>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Images</h3>
        <FormItem>
          <FormLabel>Experience Photos *</FormLabel>
          <ImageUpload
            images={imageUrls}
            onImagesChange={handleImagesChange}
            maxImages={5}
          />
          {errors.image_urls && <FormMessage>{errors.image_urls.message}</FormMessage>}
        </FormItem>
      </div>

      {/* Detailed Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Detailed Description</h3>
        <FormItem>
          <FormLabel>Overview *</FormLabel>
          <p className="text-sm text-warm-gray mb-2">
            Provide detailed information about your experience, what's included, what to expect, etc.
          </p>
          <RichTextEditor
            content={overview}
            onChange={handleOverviewChange}
            placeholder="Describe your experience in detail..."
          />
          {errors.overview && <FormMessage>{errors.overview.message}</FormMessage>}
        </FormItem>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Creating...' : 'Create Experience'}
        </Button>
      </div>
    </Form>
  );
}