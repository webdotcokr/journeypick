-- 간단한 RLS 정책 수정 (핵심 로그인 문제 해결용)

-- 1. 가장 중요한 부분: INSERT 정책 수정
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "System can insert profiles" ON profiles
FOR INSERT WITH CHECK (true);

-- 2. 사용자 자신의 프로필 조회 정책
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

-- 3. 사용자 자신의 프로필 업데이트 정책
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- 4. 트리거 함수 생성/재생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'tourist')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. 트리거 재생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. RLS 활성화 확인
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;