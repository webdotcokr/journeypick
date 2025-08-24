import { supabase } from '@/lib/supabase/client';
import { PlannerProfile } from '../types';

export class PlannerService {

  static async getPlanners(): Promise<PlannerProfile[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'planner')
        .limit(50); // 한번에 너무 많이 가져오지 않도록 제한

      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }

      if (!profiles || profiles.length === 0) return [];

      // 각 플래너의 통계를 순차적으로 가져와서 무한 로딩 방지
      const plannersWithStats: PlannerProfile[] = [];
      
      for (const profile of profiles) {
        try {
          const stats = await this.getPlannerStats(profile.id);
          const featuredExperiences = await this.getFeaturedExperiences(profile.id);
          
          plannersWithStats.push({
            ...profile,
            stats,
            featuredExperiences,
          } as PlannerProfile);
        } catch (error) {
          console.error(`Error processing planner ${profile.id}:`, error);
          // 에러가 있어도 기본값으로 추가
          plannersWithStats.push({
            ...profile,
            stats: {
              totalExperiences: 0,
              averageRating: 0,
              totalReviews: 0,
              specialties: [],
              priceRange: { min: 0, max: 0 },
            },
            featuredExperiences: [],
          } as PlannerProfile);
        }
      }

      return plannersWithStats;
    } catch (error) {
      console.error('Error fetching planners:', error);
      return []; // 에러 발생시 빈 배열 반환으로 무한 로딩 방지
    }
  }

  static async getPlannerById(plannerId: string): Promise<PlannerProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', plannerId)
        .eq('role', 'planner')
        .single();

      if (error) throw error;
      if (!profile) return null;

      const stats = await this.getPlannerStats(profile.id);
      const featuredExperiences = await this.getFeaturedExperiences(profile.id);

      return {
        ...profile,
        stats,
        featuredExperiences,
      } as PlannerProfile;
    } catch (error) {
      console.error('Error fetching planner:', error);
      throw error;
    }
  }

  private static async getPlannerStats(plannerId: string) {
    try {
      // 먼저 experiences만 가져오기 (조인 없이)
      const { data: experiences, error: experiencesError } = await supabase
        .from('experiences')
        .select('price, rating_avg, rating_count, category_id')
        .eq('planner_id', plannerId)
        .eq('status', 'approved')
        .limit(100); // 제한 설정

      if (experiencesError) {
        console.error('Error fetching experiences:', experiencesError);
        throw experiencesError;
      }

      if (!experiences || experiences.length === 0) {
        return {
          totalExperiences: 0,
          averageRating: 0,
          totalReviews: 0,
          specialties: [],
          priceRange: { min: 0, max: 0 },
        };
      }

      // Calculate stats
      const totalExperiences = experiences.length;
      const totalReviews = experiences.reduce((sum, exp) => sum + (exp.rating_count || 0), 0);
      const validRatings = experiences.filter(exp => exp.rating_avg && exp.rating_avg > 0);
      const averageRating = validRatings.length > 0 
        ? validRatings.reduce((sum, exp) => sum + (exp.rating_avg || 0), 0) / validRatings.length
        : 0;

      const prices = experiences.map(exp => exp.price).filter(Boolean);
      const priceRange = {
        min: prices.length ? Math.min(...prices) : 0,
        max: prices.length ? Math.max(...prices) : 0,
      };

      // 카테고리 정보는 별도로 가져오기 (무한 로딩 방지)
      const categoryIds = [...new Set(experiences.map(exp => exp.category_id).filter(Boolean))];
      let specialties: string[] = [];
      
      if (categoryIds.length > 0) {
        try {
          const { data: categories } = await supabase
            .from('categories')
            .select('id, name')
            .in('id', categoryIds);
          
          if (categories) {
            // 가장 많은 카테고리 찾기
            const categoryCount: { [key: string]: number } = {};
            experiences.forEach(exp => {
              const category = categories.find(cat => cat.id === exp.category_id);
              if (category?.name) {
                categoryCount[category.name] = (categoryCount[category.name] || 0) + 1;
              }
            });

            specialties = Object.entries(categoryCount)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([name]) => name);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
          // 카테고리 가져오기 실패해도 계속 진행
        }
      }

      return {
        totalExperiences,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        specialties,
        priceRange,
      };
    } catch (error) {
      console.error('Error calculating planner stats:', error);
      return {
        totalExperiences: 0,
        averageRating: 0,
        totalReviews: 0,
        specialties: [],
        priceRange: { min: 0, max: 0 },
      };
    }
  }

  private static async getFeaturedExperiences(plannerId: string) {
    try {
      const { data: experiences, error } = await supabase
        .from('experiences')
        .select('id, title, thumbnail_url, price')
        .eq('planner_id', plannerId)
        .eq('status', 'approved')
        .order('rating_avg', { ascending: false, nullsLast: true })
        .limit(3);

      if (error) {
        console.error('Error fetching featured experiences:', error);
        return [];
      }

      return experiences || [];
    } catch (error) {
      console.error('Error fetching featured experiences:', error);
      return [];
    }
  }
}