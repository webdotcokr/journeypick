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
    // 타임아웃 설정 (10초)
    const timeoutId = setTimeout(() => {
      console.warn('Auth loading timeout - forcing completion');
      setLoading(false);
    }, 10000);

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

  const fetchProfile = async (userId: string) => {
    const fetchTimeoutId = setTimeout(() => {
      console.warn('Profile fetch timeout - completing auth loading');
      setLoading(false);
    }, 5000); // 프로필 조회는 5초로 짧게

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      clearTimeout(fetchTimeoutId);

      if (error) {
        console.error('Error fetching profile:', error);
        // 프로필이 없어도 사용자는 로그인된 상태로 처리
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      clearTimeout(fetchTimeoutId);
      console.error('Error fetching profile:', error);
      setProfile(null);
    } finally {
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

    // 트리거가 자동으로 프로필을 생성하므로 별도 처리 불필요
    // 사용자가 role을 선택했다면 업데이트
    if (authData.user && role !== 'tourist') {
      // 잠시 기다린 후 role 업데이트 (트리거가 실행될 시간을 줌)
      setTimeout(async () => {
        await supabase
          .from('profiles')
          .update({ role })
          .eq('id', authData.user!.id);
      }, 1000);
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