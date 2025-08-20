export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          role: 'tourist' | 'planner' | 'admin' | 'super_admin'
          avatar_url: string | null
          phone: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          role?: 'tourist' | 'planner' | 'admin' | 'super_admin'
          avatar_url?: string | null
          phone?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          role?: 'tourist' | 'planner' | 'admin' | 'super_admin'
          avatar_url?: string | null
          phone?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          icon_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          name: string
          description?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          name?: string
          description?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: number
          title: string
          description: string
          overview: string | null
          price: number
          location_text: string
          location_lat: number | null
          location_lng: number | null
          duration_hours: number | null
          max_participants: number | null
          min_participants: number | null
          planner_id: string
          category_id: number
          status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'suspended'
          rejection_reason: string | null
          thumbnail_url: string | null
          image_urls: string[] | null
          tags: string[] | null
          additional_info: Json | null
          rating_avg: number | null
          rating_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          overview?: string | null
          price: number
          location_text: string
          location_lat?: number | null
          location_lng?: number | null
          duration_hours?: number | null
          max_participants?: number | null
          min_participants?: number | null
          planner_id: string
          category_id: number
          status?: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'suspended'
          rejection_reason?: string | null
          thumbnail_url?: string | null
          image_urls?: string[] | null
          tags?: string[] | null
          additional_info?: Json | null
          rating_avg?: number | null
          rating_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          title?: string
          description?: string
          overview?: string | null
          price?: number
          location_text?: string
          location_lat?: number | null
          location_lng?: number | null
          duration_hours?: number | null
          max_participants?: number | null
          min_participants?: number | null
          planner_id?: string
          category_id?: number
          status?: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'suspended'
          rejection_reason?: string | null
          thumbnail_url?: string | null
          image_urls?: string[] | null
          tags?: string[] | null
          additional_info?: Json | null
          rating_avg?: number | null
          rating_count?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      experience_schedules: {
        Row: {
          id: number
          experience_id: number
          date: string
          start_time: string
          end_time: string | null
          available_spots: number
          price_override: number | null
          status: 'available' | 'booked' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: never
          experience_id: number
          date: string
          start_time: string
          end_time?: string | null
          available_spots: number
          price_override?: number | null
          status?: 'available' | 'booked' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: never
          experience_id?: number
          date?: string
          start_time?: string
          end_time?: string | null
          available_spots?: number
          price_override?: number | null
          status?: 'available' | 'booked' | 'cancelled'
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: number
          booking_number: string
          tourist_id: string
          experience_id: number
          schedule_id: number | null
          participants: number
          total_price: number
          contact_name: string
          contact_email: string
          contact_phone: string | null
          special_requests: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          stripe_payment_intent_id: string | null
          stripe_charge_id: string | null
          status: 'confirmed' | 'cancelled_by_tourist' | 'cancelled_by_planner' | 'completed' | 'no_show'
          cancellation_reason: string | null
          cancelled_at: string | null
          booking_date: string
          experience_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          booking_number?: string
          tourist_id: string
          experience_id: number
          schedule_id?: number | null
          participants: number
          total_price: number
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          special_requests?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          stripe_payment_intent_id?: string | null
          stripe_charge_id?: string | null
          status?: 'confirmed' | 'cancelled_by_tourist' | 'cancelled_by_planner' | 'completed' | 'no_show'
          cancellation_reason?: string | null
          cancelled_at?: string | null
          booking_date?: string
          experience_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          booking_number?: string
          tourist_id?: string
          experience_id?: number
          schedule_id?: number | null
          participants?: number
          total_price?: number
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          special_requests?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          stripe_payment_intent_id?: string | null
          stripe_charge_id?: string | null
          status?: 'confirmed' | 'cancelled_by_tourist' | 'cancelled_by_planner' | 'completed' | 'no_show'
          cancellation_reason?: string | null
          cancelled_at?: string | null
          booking_date?: string
          experience_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: number
          booking_id: number
          tourist_id: string
          experience_id: number
          rating: number
          title: string | null
          comment: string
          image_urls: string[] | null
          planner_response: string | null
          planner_responded_at: string | null
          status: 'published' | 'hidden' | 'reported'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          booking_id: number
          tourist_id: string
          experience_id: number
          rating: number
          title?: string | null
          comment: string
          image_urls?: string[] | null
          planner_response?: string | null
          planner_responded_at?: string | null
          status?: 'published' | 'hidden' | 'reported'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          booking_id?: number
          tourist_id?: string
          experience_id?: number
          rating?: number
          title?: string | null
          comment?: string
          image_urls?: string[] | null
          planner_response?: string | null
          planner_responded_at?: string | null
          status?: 'published' | 'hidden' | 'reported'
          created_at?: string
          updated_at?: string
        }
      }
      wishlist: {
        Row: {
          id: number
          tourist_id: string
          experience_id: number
          created_at: string
        }
        Insert: {
          id?: never
          tourist_id: string
          experience_id: number
          created_at?: string
        }
        Update: {
          id?: never
          tourist_id?: string
          experience_id?: number
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          type: string
          title: string
          message: string
          related_booking_id: number | null
          related_experience_id: number | null
          related_review_id: number | null
          is_read: boolean
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: never
          user_id: string
          type: string
          title: string
          message: string
          related_booking_id?: number | null
          related_experience_id?: number | null
          related_review_id?: number | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: never
          user_id?: string
          type?: string
          title?: string
          message?: string
          related_booking_id?: number | null
          related_experience_id?: number | null
          related_review_id?: number | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'tourist' | 'planner' | 'admin' | 'super_admin'
      experience_status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'suspended'
      booking_status: 'confirmed' | 'cancelled_by_tourist' | 'cancelled_by_planner' | 'completed' | 'no_show'
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
      schedule_status: 'available' | 'booked' | 'cancelled'
      review_status: 'published' | 'hidden' | 'reported'
    }
  }
}