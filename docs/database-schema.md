# 저니픽 데이터베이스 스키마 설정

## 개요
저니픽 프로젝트의 핵심 데이터베이스 테이블들을 생성하기 위한 SQL 스크립트 모음입니다.
Supabase 대시보드의 SQL Editor에서 순서대로 실행하세요.

## 실행 순서

### 1. Profiles 테이블 생성
사용자 프로필 정보를 저장하는 테이블입니다. `auth.users`를 확장합니다.

```sql
-- Create profiles table to extend auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'tourist' CHECK (role IN ('tourist', 'planner', 'admin', 'super_admin')),
  bio TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to profiles table
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create index for performance
CREATE INDEX idx_profiles_role ON profiles(role);
```

### 2. Categories 테이블 생성
체험 상품 카테고리를 관리하는 테이블입니다.

```sql
-- Create categories table
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Apply updated_at trigger
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Insert default categories
INSERT INTO categories (name, name_ko, description) VALUES
('cooking', '요리 체험', 'Traditional Korean cooking classes and food experiences'),
('culture', '문화 체험', 'Cultural workshops and traditional experiences'),
('art', '예술 체험', 'Art workshops and creative activities'),
('nature', '자연 체험', 'Outdoor activities and nature experiences'),
('history', '역사 체험', 'Historical tours and educational experiences');
```

### 3. Experiences 테이블 생성
체험 상품 정보를 저장하는 메인 테이블입니다.

```sql
-- Create experiences table (renamed from products for clarity)
CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  overview TEXT, -- WYSIWYG content
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  location_text TEXT NOT NULL,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  duration_hours INTEGER,
  max_participants INTEGER CHECK (max_participants > 0),
  min_participants INTEGER DEFAULT 1 CHECK (min_participants > 0),
  
  -- Relationships
  planner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id BIGINT REFERENCES categories(id) NOT NULL,
  
  -- Status and approval workflow
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_approval', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  
  -- Images and media
  thumbnail_url TEXT,
  image_urls TEXT[], -- Array of image URLs
  
  -- SEO and additional info
  tags TEXT[],
  additional_info JSONB,
  
  -- Ratings and reviews
  rating_avg DECIMAL(3,2) DEFAULT 0 CHECK (rating_avg >= 0 AND rating_avg <= 5),
  rating_count INTEGER DEFAULT 0 CHECK (rating_count >= 0),
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Apply updated_at trigger
CREATE TRIGGER update_experiences_updated_at 
  BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX idx_experiences_planner_id ON experiences(planner_id);
CREATE INDEX idx_experiences_category_id ON experiences(category_id);
CREATE INDEX idx_experiences_status ON experiences(status);
CREATE INDEX idx_experiences_rating ON experiences(rating_avg DESC, rating_count DESC);
CREATE INDEX idx_experiences_location ON experiences(location_lat, location_lng);
```

### 4. Experience Schedules 테이블 생성
체험 상품의 일정 관리를 위한 테이블입니다.

```sql
-- Create experience_schedules table for available dates and times
CREATE TABLE experience_schedules (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  available_spots INTEGER NOT NULL CHECK (available_spots >= 0),
  price_override NUMERIC(10,2), -- Override default price if needed
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE experience_schedules ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX idx_experience_schedules_experience_id ON experience_schedules(experience_id);
CREATE INDEX idx_experience_schedules_date ON experience_schedules(date);
CREATE INDEX idx_experience_schedules_status ON experience_schedules(status);
```

### 5. Bookings 테이블 생성
예약 정보를 저장하는 테이블입니다.

```sql
-- Create bookings table (renamed from orders for clarity)
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_number TEXT UNIQUE NOT NULL, -- Human-readable booking number
  
  -- Relationships
  tourist_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  schedule_id BIGINT REFERENCES experience_schedules(id) ON DELETE CASCADE,
  
  -- Booking details
  participants INTEGER NOT NULL CHECK (participants > 0),
  total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
  
  -- Contact information
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  special_requests TEXT,
  
  -- Payment information
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  
  -- Booking status
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled_by_tourist', 'cancelled_by_planner', 'completed', 'no_show')),
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps
  booking_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  experience_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Generate booking number function
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'JP' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('bookings_id_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Apply booking number trigger
CREATE OR REPLACE FUNCTION set_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_number IS NULL THEN
    NEW.booking_number := generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_bookings_booking_number 
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE PROCEDURE set_booking_number();

-- Apply updated_at trigger
CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX idx_bookings_tourist_id ON bookings(tourist_id);
CREATE INDEX idx_bookings_experience_id ON bookings(experience_id);
CREATE INDEX idx_bookings_schedule_id ON bookings(schedule_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_experience_date ON bookings(experience_date);
```

### 6. Reviews 테이블 생성
리뷰 및 평점을 저장하는 테이블입니다.

```sql
-- Create reviews table
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  
  -- Relationships
  booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE NOT NULL UNIQUE, -- One review per booking
  tourist_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  
  -- Review images
  image_urls TEXT[],
  
  -- Planner response
  planner_response TEXT,
  planner_responded_at TIMESTAMPTZ,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'reported')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Apply updated_at trigger
CREATE TRIGGER update_reviews_updated_at 
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_tourist_id ON reviews(tourist_id);
CREATE INDEX idx_reviews_experience_id ON reviews(experience_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- Function to update experience rating
CREATE OR REPLACE FUNCTION update_experience_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the experience rating and count
  UPDATE experiences
  SET 
    rating_avg = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews
      WHERE experience_id = COALESCE(NEW.experience_id, OLD.experience_id)
      AND status = 'published'
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE experience_id = COALESCE(NEW.experience_id, OLD.experience_id)
      AND status = 'published'
    )
  WHERE id = COALESCE(NEW.experience_id, OLD.experience_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for rating updates
CREATE TRIGGER update_experience_rating_on_insert
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_experience_rating();

CREATE TRIGGER update_experience_rating_on_update
  AFTER UPDATE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_experience_rating();

CREATE TRIGGER update_experience_rating_on_delete
  AFTER DELETE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_experience_rating();
```

### 7. Wishlist 테이블 생성
사용자 찜 목록을 위한 테이블입니다.

```sql
-- Create wishlist table
CREATE TABLE wishlist (
  id BIGSERIAL PRIMARY KEY,
  tourist_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Ensure unique wishlist items per user
  UNIQUE(tourist_id, experience_id)
);

-- Enable RLS
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX idx_wishlist_tourist_id ON wishlist(tourist_id);
CREATE INDEX idx_wishlist_experience_id ON wishlist(experience_id);
```

### 8. Notifications 테이블 생성
시스템 알림을 위한 테이블입니다.

```sql
-- Create notifications table
CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Notification content
  type TEXT NOT NULL, -- 'booking_confirmed', 'experience_approved', 'new_review', etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Related entities (optional)
  related_booking_id BIGINT REFERENCES bookings(id) ON DELETE SET NULL,
  related_experience_id BIGINT REFERENCES experiences(id) ON DELETE SET NULL,
  related_review_id BIGINT REFERENCES reviews(id) ON DELETE SET NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

## 스키마 검증 쿼리

테이블 생성 후 검증을 위한 쿼리들:

```sql
-- 1. 생성된 테이블 목록 확인
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. 각 테이블의 컬럼 정보 확인
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 3. Foreign Key 제약조건 확인
SELECT 
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public';

-- 4. RLS 정책 활성화 상태 확인
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE schemaname = 'public';
```

## 테스트 데이터 삽입 (선택사항)

```sql
-- Sample profile (tourist)
INSERT INTO profiles (id, full_name, role) 
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'tourist');

-- Sample profile (planner)  
INSERT INTO profiles (id, full_name, role)
VALUES ('123e4567-e89b-12d3-a456-426614174001', 'Kim Planner', 'planner');

-- Sample experience
INSERT INTO experiences (title, description, price, location_text, planner_id, category_id, status)
VALUES (
  'Korean Cooking Class',
  'Learn to make traditional Korean dishes',
  50000,
  'Gangnam, Seoul',
  '123e4567-e89b-12d3-a456-426614174001',
  1,
  'approved'
);
```

## 참고사항

1. **RLS 정책**: 모든 테이블에 RLS가 활성화되어 있지만, 실제 정책은 별도 작업에서 설정해야 합니다.

2. **트리거 함수**: `update_updated_at_column()` 함수는 모든 테이블의 `updated_at` 자동 업데이트에 사용됩니다.

3. **성능 최적화**: 주요 쿼리에서 사용될 컬럼들에 인덱스가 생성되어 있습니다.

4. **데이터 무결성**: 적절한 CHECK 제약조건과 Foreign Key 관계가 설정되어 있습니다.