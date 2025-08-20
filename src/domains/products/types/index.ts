export interface Category {
  id: number;
  name: string;
  description: string | null;
  icon_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  overview: string | null;
  price: number;
  location_text: string;
  location_lat: number | null;
  location_lng: number | null;
  duration_hours: number | null;
  max_participants: number | null;
  min_participants: number | null;
  planner_id: string;
  category_id: number;
  category?: Category;
  planner?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio?: string | null;
  };
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'suspended';
  rejection_reason: string | null;
  thumbnail_url: string | null;
  image_urls: string[] | null;
  tags: string[] | null;
  additional_info: any | null;
  rating_avg: number | null;
  rating_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface ExperienceFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
  participants?: number;
  search?: string;
}

export interface ExperienceListResponse {
  experiences: Experience[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// CRUD Types
export interface CreateExperienceData {
  title: string;
  description: string;
  overview: string;
  price: number;
  location_text: string;
  location_lat?: number;
  location_lng?: number;
  duration_hours: number;
  max_participants: number;
  min_participants: number;
  planner_id: string;
  category_id: number;
  thumbnail_url?: string;
  image_urls?: string[];
  tags?: string[];
  additional_info?: any;
}

export interface UpdateExperienceData {
  title?: string;
  description?: string;
  overview?: string;
  price?: number;
  location_text?: string;
  location_lat?: number;
  location_lng?: number;
  duration_hours?: number;
  max_participants?: number;
  min_participants?: number;
  category_id?: number;
  thumbnail_url?: string;
  image_urls?: string[];
  tags?: string[];
  additional_info?: any;
}