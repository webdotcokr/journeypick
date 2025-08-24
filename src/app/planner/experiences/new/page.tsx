'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/domains/users/hooks/useAuth';
import { ExperienceForm } from '@/domains/products/components/ExperienceForm';
import { ExperienceService } from '@/domains/products/services/experienceService';
import { CreateExperienceData } from '@/domains/products/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewExperiencePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 인증 상태에 따른 리다이렉트 처리
  useEffect(() => {
    if (!loading) {
      if (!user || !profile) {
        router.push('/auth/signin');
      } else if (profile.role !== 'planner') {
        router.push('/');
      }
    }
  }, [user, profile, loading, router]);

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-warm-gray">Loading...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우 또는 Planner가 아닌 경우
  if (!user || !profile || profile.role !== 'planner') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-warm-gray">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: CreateExperienceData) => {
    setIsSubmitting(true);
    try {
      // 현재 플래너의 ID를 데이터에 추가
      const experienceData = {
        ...data,
        planner_id: user.id,
      };
      
      // ExperienceService를 사용해 상품 생성
      const createdExperience = await ExperienceService.createExperience(experienceData);
      
      console.log('Experience created successfully:', createdExperience);
      
      // 성공 메시지와 함께 대시보드로 이동
      alert('Experience created successfully! It will be reviewed by our team.');
      router.push('/planner/dashboard');
    } catch (error) {
      console.error('Error creating experience:', error);
      alert('Failed to create experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/planner/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-charcoal">Create New Experience</h1>
          <p className="text-warm-gray mt-2">
            Share your unique cultural experience with travelers from around the world
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <ExperienceForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}