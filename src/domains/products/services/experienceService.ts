import { supabase } from '@/lib/supabase/client';
import { Experience, ExperienceFilters, ExperienceListResponse, CreateExperienceData, UpdateExperienceData } from '../types';

export class ExperienceService {
  static async getExperiences(
    filters: ExperienceFilters = {},
    page = 1,
    limit = 12
  ): Promise<ExperienceListResponse> {
    let query = supabase
      .from('experiences')
      .select(`
        *,
        category:categories(*),
        planner:profiles!planner_id(id, full_name, avatar_url)
      `)
      .eq('status', 'approved');

    // Apply filters
    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.location) {
      query = query.ilike('location_text', `%${filters.location}%`);
    }

    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters.search) {
      query = query.or(`
        title.ilike.%${filters.search}%,
        description.ilike.%${filters.search}%,
        location_text.ilike.%${filters.search}%
      `);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to).order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      experiences: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit,
    };
  }

  static async getExperienceById(id: string): Promise<Experience | null> {
    const { data, error } = await supabase
      .from('experiences')
      .select(`
        *,
        category:categories(*),
        planner:profiles!planner_id(id, full_name, avatar_url, bio)
      `)
      .eq('id', id)
      .eq('status', 'approved')
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  }

  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  static async getFeaturedExperiences(limit = 6): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select(`
        *,
        category:categories(*),
        planner:profiles!planner_id(id, full_name, avatar_url)
      `)
      .eq('status', 'approved')
      .not('rating_avg', 'is', null)
      .order('rating_avg', { ascending: false })
      .order('review_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Planner-specific methods
  static async createExperience(experienceData: CreateExperienceData): Promise<Experience> {
    const { data, error } = await supabase
      .from('experiences')
      .insert({
        ...experienceData,
        status: 'pending_approval', // Always start as pending approval
      })
      .select(`
        *,
        category:categories(*),
        planner:profiles!planner_id(id, full_name, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateExperience(id: number, experienceData: UpdateExperienceData): Promise<Experience> {
    const { data, error } = await supabase
      .from('experiences')
      .update(experienceData)
      .eq('id', id)
      .select(`
        *,
        category:categories(*),
        planner:profiles!planner_id(id, full_name, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteExperience(id: number): Promise<void> {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getPlannerExperiences(plannerId: string, statusFilter?: string): Promise<Experience[]> {
    let query = supabase
      .from('experiences')
      .select(`
        *,
        category:categories(*),
        planner:profiles!planner_id(id, full_name, avatar_url)
      `)
      .eq('planner_id', plannerId);

    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }
}