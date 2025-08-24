'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { Profile, SignUpData, SignInData } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: any }>;
  signIn: (data: SignInData) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 타임아웃 설정 (15초로 늘림 - 재시도 로직 고려)
    const timeoutId = setTimeout(() => {
      console.warn('Auth loading timeout - forcing completion');
      setLoading(false);
    }, 15000);

    // 초기 세션 확인
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
        clearTimeout(timeoutId);
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        setLoading(false);
        clearTimeout(timeoutId);
      });

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      try {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, retryCount: number = 0) => {
    const maxRetries = 3;
    const baseDelay = 1000; // 1초
    const timeoutDuration = 3000; // 3초로 단축
    
    const fetchTimeoutId = setTimeout(() => {
      console.warn(`Profile fetch timeout (attempt ${retryCount + 1}) - completing auth loading`);
      setLoading(false);
    }, timeoutDuration);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      clearTimeout(fetchTimeoutId);

      if (error) {
        console.error(`Error fetching profile (attempt ${retryCount + 1}):`, error);
        
        // 프로필이 아직 생성되지 않았을 가능성 - 재시도
        if (error.code === 'PGRST116' && retryCount < maxRetries) {
          console.log(`Profile not found, retrying in ${baseDelay * (retryCount + 1)}ms...`);
          setTimeout(() => {
            fetchProfile(userId, retryCount + 1);
          }, baseDelay * (retryCount + 1));
          return;
        }
        
        // 최대 재시도 횟수 초과하거나 다른 에러 - 프로필 없이 진행
        setProfile(null);
        setLoading(false);
      } else {
        setProfile(data);
        setLoading(false);
      }
    } catch (error) {
      clearTimeout(fetchTimeoutId);
      console.error(`Error fetching profile (attempt ${retryCount + 1}):`, error);
      
      // 재시도 로직
      if (retryCount < maxRetries) {
        console.log(`Retrying profile fetch in ${baseDelay * (retryCount + 1)}ms...`);
        setTimeout(() => {
          fetchProfile(userId, retryCount + 1);
        }, baseDelay * (retryCount + 1));
        return;
      }
      
      // 최대 재시도 횟수 초과
      setProfile(null);
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    const { email, password, full_name, role = 'tourist' } = data;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role,
        }
      }
    });

    if (authError) return { error: authError };

    // 트리거가 자동으로 프로필을 생성함
    // 사용자가 role을 선택했다면 트리거 실행 후 업데이트
    if (authData.user && role !== 'tourist') {
      // 트리거 실행 대기 후 role 업데이트 (더 안정적으로 2초 대기)
      setTimeout(async () => {
        try {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', authData.user!.id);
          
          if (updateError) {
            console.error('Failed to update user role:', updateError);
          }
        } catch (error) {
          console.error('Error updating user role:', error);
        }
      }, 2000);
    }

    return { error: null };
  };

  const signIn = async (data: SignInData) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isRole = (role: string | string[]) => {
    if (!profile) return false;
    if (Array.isArray(role)) {
      return role.includes(profile.role);
    }
    return profile.role === role;
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}