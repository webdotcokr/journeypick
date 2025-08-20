// User roles
export type UserRole = 'tourist' | 'planner' | 'admin' | 'super_admin';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Experience/Product types
export interface Experience {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  duration: number; // in hours
  max_participants: number;
  images: string[];
  planner_id: string;
  planner?: User;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

// Booking types
export interface Booking {
  id: string;
  experience_id: string;
  experience?: Experience;
  user_id: string;
  user?: User;
  booking_date: string;
  participants: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

// Review types
export interface Review {
  id: string;
  experience_id: string;
  experience?: Experience;
  user_id: string;
  user?: User;
  booking_id: string;
  booking?: Booking;
  rating: number;
  comment: string;
  planner_reply?: string;
  created_at: string;
  updated_at: string;
}

// Common API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}