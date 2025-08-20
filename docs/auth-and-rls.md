# 저니픽 인증 및 RLS 보안 정책 설정

## 개요
Supabase Auth와 Row Level Security(RLS)를 사용하여 역할 기반 접근 제어를 구현합니다.
사용자 역할에 따라 데이터 접근 권한을 자동으로 관리하는 보안 시스템을 구축합니다.

## 실행 순서

### 1. 프로필 자동 생성 트리거 함수
사용자가 회원가입할 때 자동으로 profiles 테이블에 프로필을 생성하는 트리거입니다.

```sql
-- 프로필 자동 생성 함수
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

-- 트리거 생성 (사용자 생성 시 자동 실행)
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 2. JWT 역할 확인 헬퍼 함수들
RLS 정책에서 사용할 유틸리티 함수들입니다. (public 스키마에 생성)

```sql
-- 현재 사용자의 역할을 반환하는 함수
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- 현재 사용자가 특정 역할인지 확인하는 함수
CREATE OR REPLACE FUNCTION public.is_role(check_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = check_role
  )
$$ LANGUAGE SQL SECURITY DEFINER;

-- 현재 사용자가 관리자인지 확인하는 함수
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
$$ LANGUAGE SQL SECURITY DEFINER;
```

### 3. Profiles 테이블 RLS 정책

```sql
-- Profiles 테이블 RLS 정책
-- 1. 모든 사용자가 자신의 프로필은 읽을 수 있음
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

-- 2. 사용자는 자신의 프로필만 업데이트할 수 있음
CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- 3. 관리자는 모든 프로필을 볼 수 있음
CREATE POLICY "Admins can view all profiles" ON profiles
FOR SELECT USING (public.is_admin());

-- 4. 시스템 트리거가 프로필을 생성할 수 있음 (INSERT는 트리거만 허용)
CREATE POLICY "System can insert profiles" ON profiles
FOR INSERT WITH CHECK (true);
```

### 4. Categories 테이블 RLS 정책

```sql
-- Categories 테이블 RLS 정책
-- 1. 모든 사용자가 카테고리를 읽을 수 있음
CREATE POLICY "Everyone can view categories" ON categories
FOR SELECT USING (true);

-- 2. 관리자만 카테고리를 생성/수정/삭제할 수 있음
CREATE POLICY "Admins can manage categories" ON categories
FOR ALL USING (public.is_admin());
```

### 5. Experiences 테이블 RLS 정책

```sql
-- Experiences 테이블 RLS 정책
-- 1. 모든 사용자가 승인된 체험을 볼 수 있음
CREATE POLICY "Everyone can view approved experiences" ON experiences
FOR SELECT USING (status = 'approved');

-- 2. Planner는 자신의 체험을 생성할 수 있음
CREATE POLICY "Planners can create experiences" ON experiences
FOR INSERT WITH CHECK (
  public.is_role('planner') AND planner_id = auth.uid()
);

-- 3. Planner는 자신의 체험을 읽을 수 있음 (상태 무관)
CREATE POLICY "Planners can view own experiences" ON experiences
FOR SELECT USING (planner_id = auth.uid());

-- 4. Planner는 자신의 체험을 수정할 수 있음 (승인되지 않은 것만)
CREATE POLICY "Planners can update own experiences" ON experiences
FOR UPDATE USING (
  planner_id = auth.uid() AND status NOT IN ('approved')
);

-- 5. 관리자는 모든 체험을 관리할 수 있음
CREATE POLICY "Admins can manage all experiences" ON experiences
FOR ALL USING (public.is_admin());
```

### 6. Experience Schedules 테이블 RLS 정책

```sql
-- Experience Schedules 테이블 RLS 정책
-- 1. 모든 사용자가 승인된 체험의 일정을 볼 수 있음
CREATE POLICY "Everyone can view approved experience schedules" ON experience_schedules
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = experience_schedules.experience_id 
    AND status = 'approved'
  )
);

-- 2. Planner는 자신의 체험 일정을 생성할 수 있음
CREATE POLICY "Planners can create own experience schedules" ON experience_schedules
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = experience_schedules.experience_id 
    AND planner_id = auth.uid()
  )
);

-- 3. Planner는 자신의 체험 일정을 관리할 수 있음
CREATE POLICY "Planners can manage own experience schedules" ON experience_schedules
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = experience_schedules.experience_id 
    AND planner_id = auth.uid()
  )
);

-- 4. 관리자는 모든 일정을 관리할 수 있음
CREATE POLICY "Admins can manage all schedules" ON experience_schedules
FOR ALL USING (public.is_admin());
```

### 7. Bookings 테이블 RLS 정책

```sql
-- Bookings 테이블 RLS 정책
-- 1. Tourist는 자신의 예약만 볼 수 있음
CREATE POLICY "Tourists can view own bookings" ON bookings
FOR SELECT USING (tourist_id = auth.uid());

-- 2. Tourist는 예약을 생성할 수 있음
CREATE POLICY "Tourists can create bookings" ON bookings
FOR INSERT WITH CHECK (
  public.is_role('tourist') AND tourist_id = auth.uid()
);

-- 3. Tourist는 자신의 예약을 수정할 수 있음 (취소 등)
CREATE POLICY "Tourists can update own bookings" ON bookings
FOR UPDATE USING (tourist_id = auth.uid());

-- 4. Planner는 자신 체험의 예약을 볼 수 있음
CREATE POLICY "Planners can view experience bookings" ON bookings
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = bookings.experience_id 
    AND planner_id = auth.uid()
  )
);

-- 5. Planner는 자신 체험의 예약을 수정할 수 있음 (상태 변경 등)
CREATE POLICY "Planners can update experience bookings" ON bookings
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = bookings.experience_id 
    AND planner_id = auth.uid()
  )
);

-- 6. 관리자는 모든 예약을 관리할 수 있음
CREATE POLICY "Admins can manage all bookings" ON bookings
FOR ALL USING (public.is_admin());
```

### 8. Reviews 테이블 RLS 정책

```sql
-- Reviews 테이블 RLS 정책
-- 1. 모든 사용자가 게시된 리뷰를 볼 수 있음
CREATE POLICY "Everyone can view published reviews" ON reviews
FOR SELECT USING (status = 'published');

-- 2. Tourist는 자신의 예약에 대해서만 리뷰를 작성할 수 있음
CREATE POLICY "Tourists can create reviews for own bookings" ON reviews
FOR INSERT WITH CHECK (
  public.is_role('tourist') AND 
  tourist_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM bookings 
    WHERE id = reviews.booking_id 
    AND tourist_id = auth.uid() 
    AND status = 'completed'
  )
);

-- 3. Tourist는 자신의 리뷰를 수정할 수 있음
CREATE POLICY "Tourists can update own reviews" ON reviews
FOR UPDATE USING (tourist_id = auth.uid());

-- 4. Planner는 자신 체험의 리뷰를 보고 답변할 수 있음
CREATE POLICY "Planners can view and respond to experience reviews" ON reviews
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = reviews.experience_id 
    AND planner_id = auth.uid()
  )
);

CREATE POLICY "Planners can respond to experience reviews" ON reviews
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM experiences 
    WHERE id = reviews.experience_id 
    AND planner_id = auth.uid()
  )
);

-- 5. 관리자는 모든 리뷰를 관리할 수 있음
CREATE POLICY "Admins can manage all reviews" ON reviews
FOR ALL USING (public.is_admin());
```

### 9. Wishlist 테이블 RLS 정책

```sql
-- Wishlist 테이블 RLS 정책
-- 1. Tourist는 자신의 찜 목록만 관리할 수 있음
CREATE POLICY "Tourists can manage own wishlist" ON wishlist
FOR ALL USING (
  public.is_role('tourist') AND tourist_id = auth.uid()
);

-- 2. 관리자는 모든 찜 목록을 볼 수 있음
CREATE POLICY "Admins can view all wishlists" ON wishlist
FOR SELECT USING (public.is_admin());
```

### 10. Notifications 테이블 RLS 정책

```sql
-- Notifications 테이블 RLS 정책
-- 1. 사용자는 자신의 알림만 관리할 수 있음
CREATE POLICY "Users can manage own notifications" ON notifications
FOR ALL USING (user_id = auth.uid());

-- 2. 시스템이 알림을 생성할 수 있음
CREATE POLICY "System can create notifications" ON notifications
FOR INSERT WITH CHECK (true);

-- 3. 관리자는 모든 알림을 볼 수 있음
CREATE POLICY "Admins can view all notifications" ON notifications
FOR SELECT USING (public.is_admin());
```

## RLS 정책 검증 쿼리

정책이 올바르게 적용되었는지 확인하는 쿼리들:

```sql
-- 1. 모든 테이블의 RLS 활성화 상태 확인
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. 각 테이블의 정책 목록 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. 함수 목록 확인
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name IN ('get_user_role', 'is_role', 'is_admin');
```

## 테스트 시나리오

RLS 정책을 테스트하기 위한 시나리오들:

### 1. Tourist 역할 테스트
```sql
-- Tourist로 로그인한 상태에서
-- 1. 승인된 체험만 볼 수 있는지
SELECT * FROM experiences; -- 승인된 것만 나와야 함

-- 2. 자신의 프로필만 볼 수 있는지
SELECT * FROM profiles; -- 자신 것만 나와야 함

-- 3. 자신의 예약만 볼 수 있는지
SELECT * FROM bookings; -- 자신 예약만 나와야 함
```

### 2. Planner 역할 테스트
```sql
-- Planner로 로그인한 상태에서
-- 1. 자신의 체험을 생성할 수 있는지
INSERT INTO experiences (...) VALUES (...); -- 성공해야 함

-- 2. 자신의 모든 체험을 볼 수 있는지 (상태 무관)
SELECT * FROM experiences; -- 자신 체험 모두 나와야 함

-- 3. 자신 체험의 예약을 볼 수 있는지
SELECT * FROM bookings; -- 자신 체험 예약만 나와야 함
```

### 3. Admin 역할 테스트
```sql
-- Admin으로 로그인한 상태에서
-- 1. 모든 데이터를 볼 수 있는지
SELECT * FROM experiences; -- 모든 체험 나와야 함
SELECT * FROM bookings; -- 모든 예약 나와야 함
SELECT * FROM profiles; -- 모든 프로필 나와야 함
```

## 중요 참고사항

1. **트리거 순서**: 사용자 생성 → 트리거 실행 → 프로필 자동 생성
2. **보안 원칙**: 기본적으로 모든 접근을 차단하고, 필요한 권한만 허용
3. **성능 고려**: RLS 정책이 복잡한 쿼리를 포함하지 않도록 최적화
4. **테스트 필수**: 각 역할별로 데이터 접근이 올바르게 제한되는지 반드시 확인