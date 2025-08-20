'use client';

import useSWR from 'swr';
import { ExperienceService } from '../services/experienceService';
import { ExperienceFilters } from '../types';

export function useExperiences(filters: ExperienceFilters = {}, page = 1) {
  const key = ['experiences', filters, page];
  
  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => ExperienceService.getExperiences(filters, page),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export function useExperience(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? ['experience', id] : null,
    () => ExperienceService.getExperienceById(id),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    experience: data,
    error,
    isLoading,
  };
}

export function useCategories() {
  const { data, error, isLoading } = useSWR(
    'categories',
    ExperienceService.getCategories,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    categories: data || [],
    error,
    isLoading,
  };
}

export function useFeaturedExperiences() {
  const { data, error, isLoading } = useSWR(
    'featured-experiences',
    () => ExperienceService.getFeaturedExperiences(),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    experiences: data || [],
    error,
    isLoading,
  };
}