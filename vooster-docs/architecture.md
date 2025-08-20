# Technical Requirements Document (TRD)

## 1. Executive Technical Summary
- **Project Overview**: 본 프로젝트는 Next.js와 Supabase를 기반으로 한 서버리스 아키텍처를 채택하여 외국인 관광객과 로컬 체험 상품 판매자(Planner)를 연결하는 웹 마켓플레이스를 구축합니다. 서버 측 렌더링(SSR)을 통해 검색 엔진 최적화(SEO)를 극대화하고, 통합 백엔드 서비스(BaaS)를 활용하여 개발 속도를 높이고 초기 인프라 관리 비용을 최소화하는 것을 목표로 합니다.
- **Core Technology Stack**: 프론트엔드 및 서버 로직은 Next.js(TypeScript)로 구현하며, 데이터베이스, 인증, 파일 저장소, 서버리스 함수는 Supabase(PostgreSQL)를 사용합니다. 결제 시스템은 Stripe를, 배포는 Vercel을 활용하여 Next.js에 최적화된 CI/CD 환경을 구축합니다.
- **Key Technical Objectives**:
    - **성능**: 상품 상세 페이지의 초기 로딩 시간(LCP) 2.5초 미만 달성.
    - **확장성**: Supabase의 서버리스 아키텍처를 통해 초기 사용자 10,000명 수준의 트래픽을 별도 인프라 증설 없이 처리.
    - **안정성**: Vercel 및 Supabase를 통해 99.5% 이상의 서비스 가용성(Uptime) 확보.
- **Critical Technical Assumptions**:
    - Supabase가 제공하는 인증, 데이터베이스(PostgreSQL), 스토리지, Edge Function 기능만으로 MVP의 모든 백엔드 요구사항을 충족할 수 있다.
    - Vercel의 기본 CI/CD 파이프라인이 프로젝트의 배포 요구사항에 충분하다.
    - Stripe의 표준 결제 연동 방식으로 모든 국가의 관광객 대상 결제를 처리하는 데 문제가 없다.

## 2. Tech Stack

| Category | Technology / Library | Reasoning (Why it's chosen for this project) |
|---|---|---|
| **Frontend** | Next.js (with TypeScript) | SSR/SSG 지원으로 상품 페이지 SEO에 필수적이며, Vercel 배포와 최상의 시너지를 냄. TypeScript는 타입 안정성을 제공하여 유지보수 비용을 절감. |
| **Backend Platform** | Supabase | PostgreSQL DB, 인증, 스토리지, Edge Function을 통합 제공하여 백엔드 개발 복잡도를 낮추고 MVP 개발 속도를 극대화. 사용자 역할 기반 접근 제어(RLS)에 용이. |
| **Database** | Supabase (PostgreSQL) | 관계형 데이터 모델링에 적합하며, Supabase 플랫폼에 내장되어 있어 별도 설정 없이 즉시 사용 가능. |
| **Payment Gateway** | Stripe | 글로벌 결제 처리에 대한 강력한 지원과 우수한 개발자 문서를 제공. PRD 요구사항에 명시됨. |
| **Deployment / Hosting** | Vercel | Next.js에 최적화된 배포 환경, 자동 CI/CD, 서버리스 함수 및 글로벌 CDN을 기본 제공하여 빠르고 안정적인 서비스 운영이 가능. |
| **Styling** | Tailwind CSS | 유틸리티 우선 접근 방식으로 신속한 UI 개발을 지원하며, 컴포넌트 기반 아키텍처와 잘 맞음. |
| **Form Management** | React Hook Form | 불필요한 리렌더링을 최소화하여 폼 성능을 최적화하고, 유효성 검사 로직을 간결하게 작성할 수 있음. |
| **WYSIWYG Editor** | Tiptap | 가볍고 확장성이 높은 헤드리스 에디터로, React 환경과 통합이 용이하여 Planner의 상품 설명 작성 기능 구현에 적합. |

## 3. System Architecture Design

### Top-Level building blocks
- **Frontend Application (Next.js on Vercel)**: 사용자와의 모든 상호작용을 처리하는 웹 애플리케이션. UI 렌더링, 데이터 페칭, 클라이언트 상태 관리를 담당.
    - **Sub-building blocks**: UI Components(React), Page Routes(SSR/SSG), API Routes(서버리스 함수), Client-side Data Fetching (SWR/React Query).
- **Backend Platform (Supabase)**: 프로젝트의 핵심 백엔드 서비스를 제공하는 통합 플랫폼. 데이터 영속성, 사용자 인증 및 권한 관리, 파일 저장을 책임짐.
    - **Sub-building blocks**: PostgreSQL Database, Auth(JWT 기반), Storage(상품 이미지 등), Edge Functions(보안이 필요한 로직 처리).
- **External Services**: 프로젝트 기능을 보완하는 외부 연동 서비스.
    - **Sub-building blocks**: Stripe (결제 처리), Google Maps API (지도 표시).

### Top-Level Component Interaction Diagram
```mermaid
graph TD
    subgraph "User's Browser"
        A[Tourist/Planner/Admin]
    end

    subgraph "Vercel Platform"
        B[Next.js Frontend] --"API Calls"--> C
        B --"Render"--> A
        C[API Routes / Serverless Functions] --"Secure Operations"--> E[Stripe API]
    end

    subgraph "Supabase Platform"
        D[Database (PostgreSQL)]
        F[Auth]
        G[Storage]
        H[Edge Functions]
    end

    C --"DB Queries / Auth"--> D
    B --"Direct DB/Auth/Storage Calls"--> D
    B --"Direct DB/Auth/Storage Calls"--> F
    B --"Direct DB/Auth/Storage Calls"--> G
    C --"Webhook Handling"--> H

```

- **사용자 요청 처리**: 사용자는 브라우저를 통해 Vercel에 배포된 Next.js 애플리케이션에 접근. Next.js는 페이지를 서버에서 렌더링하여 사용자에게 전달.
- **데이터 통신**: 대부분의 데이터 조회/수정(상품 목록, 마이페이지 정보 등)은 클라이언트에서 Supabase JS 라이브러리를 통해 Supabase DB, Auth, Storage와 직접 통신. 이 때, PostgreSQL의 행 수준 보안(RLS) 정책이 각 사용자의 권한을 강제함.
- **보안 및 결제 처리**: 결제 세션 생성, 웹훅 처리 등 민감한 작업은 Next.js API Route 또는 Supabase Edge Function을 통해 서버 측에서 안전하게 처리되며, 이 함수들이 Stripe API와 통신함.
- **역할 기반 접근**: Supabase Auth는 'Tourist', 'Planner', '중간관리자', '최고관리자' 역할을 JWT 내 커스텀 클레임(Custom Claim)으로 관리하고, RLS 정책은 이 역할을 기반으로 데이터 접근을 제어.

### Code Organization & Convention
**Domain-Driven Organization Strategy**
- **Domain Separation**: 코드를 비즈니스 도메인(`users`, `products`, `orders`, `reviews`, `admin`) 중심으로 구성하여 응집도를 높이고 결합도를 낮춤.
- **Layer-Based Architecture**: 각 도메인 내에서 `components`(UI), `hooks`(로직), `services`(API 통신), `types`(데이터 모델)와 같이 계층별로 파일을 분리하여 관심사를 명확히 함.
- **Feature-Based Modules**: '상품 등록', '결제' 등 특정 기능과 관련된 파일들을 하나의 폴더에 그룹화하여 관리.
- **Shared Components**: 여러 도메인에서 공통으로 사용되는 UI 컴포넌트, 유틸리티 함수, 타입 등은 최상위 `shared` 디렉토리에서 관리.

**Universal File & Folder Structure**
```
/
├── public/                 # 정적 에셋 (이미지, 폰트)
├── src/
│   ├── app/                # Next.js App Router (페이지 및 레이아웃)
│   │   ├── (auth)/         # 로그인, 회원가입 등 인증 관련 페이지
│   │   ├── admin/          # 관리자 대시보드 페이지
│   │   ├── products/       # 상품 목록, 상세 페이지
│   │   └── ...             # 기타 페이지 라우트
│   ├── components/         # 재사용 가능한 UI 컴포G넌트 (도메인 비종속적)
│   │   ├── layout/
│   │   └── ui/             # 버튼, 인풋 등 기본 UI 요소
│   ├── domains/            # 비즈니스 도메인별 로직 및 컴포넌트
│   │   ├── products/
│   │   │   ├── components/ # 상품 도메인에 특화된 컴포넌트 (ProductCard)
│   │   │   ├── hooks/      # useProducts 훅
│   │   │   └── services/   # 상품 관련 API 호출 함수
│   │   ├── users/
│   │   ├── orders/
│   │   └── ...
│   ├── lib/                # Supabase 클라이언트, Stripe 클라이언트 등 외부 라이브러리 설정
│   ├── styles/             # 전역 CSS, Tailwind CSS 설정
│   └── types/              # 전역적으로 사용되는 TypeScript 타입 정의
├── next.config.js
└── tsconfig.json
```

### Data Flow & Communication Patterns
- **Client-Server Communication**: 클라이언트는 Supabase JS SDK를 사용하여 DB와 직접 통신하거나, Next.js API Route에 HTTP 요청(GET, POST, PUT, DELETE)을 보내 비즈니스 로직을 처리. 데이터 페칭에는 SWR 또는 React Query를 사용하여 캐싱, 재검증 로직을 단순화.
- **Database Interaction**: Supabase의 PostgREST API를 통해 CRUD 작업을 수행. 복잡한 쿼리는 PostgreSQL 함수(Stored Procedure)로 작성하여 API로 호출. 모든 DB 접근은 사전에 정의된 RLS(Row Level Security) 정책에 의해 통제됨.
- **External Service Integration**: Stripe 결제는 클라이언트에서 결제 세션을 요청하고, 서버(API Route/Edge Function)에서 Stripe API를 호출하여 세션을 생성한 후 클라이언트에 ID를 반환하는 패턴을 사용. 결제 완료 등 이벤트는 Stripe 웹훅을 통해 서버로 전달됨.
- **Real-time Communication**: Planner의 상품 승인/반려, 신규 예약 발생 시 이메일 알림과 함께 Supabase Realtime 기능을 구독하여 대시보드나 마이페이지에 실시간 알림을 표시.
- **Data Synchronization**: 데이터의 유일한 원천(Single Source of Truth)은 Supabase DB. 클라이언트의 상태는 DB 데이터와 동기화되며, 데이터 변경 시 SWR/React Query의 자동 재검증 기능을 통해 UI를 최신 상태로 유지.

## 4. Performance & Optimization Strategy

- **SSR/SSG 활용**: 상품 목록 및 상세 페이지는 SSR(Server-Side Rendering)을 적용하여 초기 로딩 속도와 SEO를 최적화. 자주 변경되지 않는 소개 페이지 등은 SSG(Static Site Generation)를 사용.
- **이미지 최적화**: 사용자가 업로드하는 모든 이미지는 Supabase Storage에 저장하고, Next.js의 `<Image>` 컴포넌트를 사용하여 자동으로 WebP 포맷 변환 및 사이즈 최적화를 수행. 이미지는 Vercel의 글로벌 CDN을 통해 전송.
- **데이터베이스 최적화**: 자주 조회되는 컬럼(가격, 지역, 카테고리 등)에 인덱스를 생성하여 필터링 및 검색 성능을 향상. 복잡한 조인은 뷰(View) 또는 함수로 미리 정의하여 쿼리 복잡도를 줄임.
- **코드 스플리팅 및 지연 로딩**: Next.js의 자동 코드 스플리팅을 활용하여 페이지별로 필요한 JavaScript만 로드. 사용자의 상호작용이 필요한 무거운 컴포넌트(예: 지도, WYSIWYG 에디터)는 `next/dynamic`을 사용해 지연 로딩(Lazy Loading) 처리.

## 5. Implementation Roadmap & Milestones
### Phase 1: Foundation (MVP Implementation)
- **Core Infrastructure**: Supabase 프로젝트 생성 (DB 스키마, Auth 설정), Next.js 프로젝트 초기화, Vercel 연동 및 CI/CD 파이프라인 구축.
- **Essential Features**:
    - Tourist: 회원가입/로그인, 상품 탐색(검색/필터), 상세 조회, Stripe 결제, 마이페이지(예약 내역).
    - Planner: 회원가입/로그인, 상품 등록 폼(WYSIWYG 포함), 마이페이지(등록 상품 관리).
    - Admin: 중간관리자 상품 승인/반려 워크플로우.
- **Basic Security**: Supabase RLS 정책 설정(사용자 역할별 데이터 접근 제어).
- **Development Setup**: 로컬 개발 환경 구성, Git 브랜치 전략 수립.
- **Timeline**: 8주

### Phase 2: Feature Enhancement
- **Advanced Features**: 최고관리자용 통계/매출 대시보드 구현(차트, 데이터 export). 예약 완료 고객 대상 리뷰 및 평점 시스템 구현(Planner 답글 기능 포함).
- **Performance Optimization**: Phase 1 런칭 후 수집된 데이터를 기반으로 느린 쿼리 튜닝 및 프론트엔드 성능 개선.
- **Enhanced Security**: Stripe 웹훅 서명 검증 강화, API 요청 속도 제한(Rate Limiting) 적용.
- **Monitoring Implementation**: Vercel Analytics 및 외부 모니터링 툴(Sentry 등)을 연동하여 에러 트래킹 및 성능 모니터링 시스템 구축.
- **Timeline**: 4주

## 6. Risk Assessment & Mitigation Strategies
### Technical Risk Analysis
- **Technology Risks**:
    - **리스크**: Supabase 기능(특히 Edge Functions)의 한계로 인해 복잡한 백엔드 로직 구현이 어려워질 가능성.
    - **완화 전략**: 개발 초기 단계에 복잡도가 높은 기능(예: 정산 로직)에 대한 PoC(Proof of Concept)를 진행. 필요 시 해당 기능만 별도의 서버리스 플랫폼(예: AWS Lambda)으로 분리하는 방안을 고려.
- **Performance Risks**:
    - **리스크**: 사용자 및 상품 데이터 증가 시 필터링 및 검색 기능의 성능 저하 발생 가능성.
    - **완화 전략**: 데이터베이스 인덱싱 전략을 사전에 수립하고 부하 테스트를 수행. 검색 기능의 복잡도가 높아질 경우, PostgreSQL의 전문 검색(Full-text search) 기능을 도입하거나 추후 검색 전용 엔진(예: Algolia) 도입을 검토.
- **Security Risks**:
    - **리스크**: Supabase의 RLS(Row Level Security) 정책 설정 오류로 인한 데이터 노출 또는 권한 문제 발생.
    - **완화 전략**: 모든 RLS 정책에 대해 단위 테스트 및 통합 테스트 케이스를 작성하여 자동화된 검증 절차를 마련. 정기적인 보안 코드 리뷰를 수행.
- **Integration Risks**:
    - **리스크**: Stripe 등 외부 PG사의 정책 변경으로 인한 결제 로직 장애 발생.
    - **완화 전략**: Stripe API 버전 관리를 명확히 하고, 공식 개발자 문서 및 뉴스레터를 정기적으로 모니터링. 결제 실패 시 예외 처리 및 로깅을 철저히 하여 신속한 원인 파악이 가능하도록 함.

### Project Delivery Risks
- **Timeline Risks**:
    - **리스크**: 관리자 승인 워크플로우 및 상태 관리 로직의 복잡성을 과소평가하여 개발 일정이 지연될 위험.
    - **완화 전략**: 개발 초기에 상태 다이어그램(State Diagram)을 명확히 정의하고, 관련된 모든 이해관계자(기획, 개발)의 합의를 거침. 해당 기능의 개발 우선순위를 높여 조기에 착수.
- **Resource Risks**:
    - **리스크**: Next.js 및 Supabase에 대한 팀의 숙련도 부족으로 인한 개발 생산성 저하.
    - **완화 전략**: 공식 문서를 기반으로 한 내부 스터디 및 코드 리뷰를 활성화. 복잡한 구현에 앞서 페어 프로그래밍을 통해 지식을 공유.
- **Quality Risks**:
    - **리스크**: 빠른 MVP 개발에 집중한 나머지 테스트 커버리지가 부족하여 런칭 후 버그가 다수 발생할 가능성.
    - **완화 전략**: 핵심 기능(결제, 예약, 승인)에 대한 통합 테스트는 반드시 작성. 2주 스프린트의 마지막 날을 '안정화의 날'로 지정하여 테스트 보강 및 버그 수정에 집중.
- **Deployment Risks**:
    - **리스크**: 개발 환경과 운영 환경(Vercel/Supabase)의 미세한 차이로 인해 배포 후 예상치 못한 오류 발생.
    - **완화 전략**: 개발(Development), 스테이징(Staging), 운영(Production) 환경을 분리하여 운영 환경과 동일한 구성의 스테이징 환경에서 충분한 테스트를 거친 후 배포.