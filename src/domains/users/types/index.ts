export type UserRole = 'tourist' | 'planner' | 'admin' | 'super_admin';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string | null;
  phone?: string | null;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile?: Profile;
}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  role?: UserRole;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface PlannerStats {
  totalExperiences: number;
  averageRating: number;
  totalReviews: number;
  specialties: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface PlannerProfile extends Profile {
  role: 'planner';
  stats: PlannerStats;
  featuredExperiences: {
    id: number;
    title: string;
    thumbnail_url: string | null;
    price: number;
  }[];
}