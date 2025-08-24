# 로그인 무한 대기 문제 해결 가이드

## 문제 원인 분석
현재 로그인 시 "signing in..." 상태에서 무한 대기하는 문제의 주요 원인:

1. **RLS 정책 충돌**: profiles 테이블의 INSERT 정책이 시스템 트리거 실행을 차단
2. **프로필 조회 타이밍**: 트리거 실행과 클라이언트 프로필 조회 간 타이밍 이슈
3. **에러 핸들링 부족**: 프로필 조회 실패 시 재시도 로직 없음

## 해결 방안

### 1. RLS 정책 수정 (필수)
`fix-rls-policies.sql` 파일을 Supabase SQL Editor에서 실행:

```sql
-- 현재 문제가 되는 정책 제거 후 올바른 정책 생성
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "System can insert profiles" ON profiles FOR INSERT WITH CHECK (true);
```

### 2. useAuth 훅 개선 (완료)
- 프로필 조회 실패 시 자동 재시도 (최대 3회)
- 더 나은 에러 핸들링과 로깅
- 타임아웃 최적화 (3초 → 15초 총 타임아웃)

### 3. 트리거 함수 재생성 (권장)
기존 트리거가 올바르게 작동하지 않을 수 있으므로 재생성:

```sql
-- 트리거 함수와 트리거 재생성
CREATE OR REPLACE FUNCTION public.handle_new_user() ...
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created ...
```

## 적용 방법

### Step 1: Supabase에서 RLS 정책 수정
1. Supabase 대시보드 → SQL Editor 열기
2. `fix-rls-policies.sql` 내용 복사해서 실행
3. `verify-auth-setup.sql`로 정책이 올바르게 적용되었는지 확인

### Step 2: 코드 변경 사항 테스트
1. 개발 서버 재시작: `npm run dev`
2. 새로운 계정으로 회원가입 테스트
3. 기존 계정으로 로그인 테스트
4. 브라우저 개발자 도구에서 콘솔 로그 확인

## 확인 사항

### 성공적인 로그인 플로우:
1. 로그인 시도
2. Supabase 인증 성공
3. 프로필 조회 (재시도 로직 포함)
4. 로딩 완료, 메인 페이지 리다이렉트

### 콘솔 로그에서 확인할 내용:
- ✅ "Profile fetch successful"
- ❌ "Profile not found, retrying in..." (정상적인 재시도)
- ❌ "Error fetching profile" (지속적인 에러는 문제)

## 추가 디버깅

### 만약 여전히 문제가 발생한다면:
1. 브라우저 개발자 도구 → Network 탭에서 API 호출 확인
2. Supabase 대시보드 → Logs에서 RLS 정책 관련 에러 확인
3. `verify-auth-setup.sql`의 모든 쿼리 결과 확인

### 임시 해결책:
RLS 정책 문제가 지속되면 일시적으로 RLS를 비활성화하여 테스트:
```sql
-- 임시: RLS 비활성화 (운영 환경에서는 절대 사용 금지)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

## 예상 결과
- 로그인 시 3초 이내에 프로필 조회 완료
- 프로필이 없는 경우에도 최대 10초 내에 로딩 완료
- 회원가입 시 자동 프로필 생성 정상 작동