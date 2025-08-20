# 저니픽(Journeypick) 정보 구조 설계 (Information Architecture)

## 1. 사이트맵 (Site Map)

- **Home**
- **체험 상품 (Experiences)**
  - 체험 리스트 (검색 결과)
  - 체험 상세
- **로그인/회원가입 (Auth)**
  - 로그인
  - 회원가입
- **마이페이지 (My Page) - Tourist** (로그인 필요)
  - 예약 내역 (Bookings)
  - 찜 목록 (Wishlist)
  - 내가 쓴 리뷰 (My Reviews)
  - 프로필 수정 (Edit Profile)
- **결제 (Checkout)** (로그인 필요)
  - 주문/결제
  - 예약 완료
- **플래너 대시보드 (Planner Dashboard)** (Planner 권한 필요)
  - 대시보드 홈 (개요)
  - 내 체험 관리 (My Experiences)
    - 새 체험 등록 (Add New Experience)
    - 체험 수정 (Edit Experience)
  - 예약 현황 (Bookings Calendar)
  - 프로필 관리 (Planner Profile)
- **관리자 대시보드 (Admin Dashboard)** (Admin 권한 필요)
  - 대시보드 홈 (매출 통계)
  - 상품 승인 관리 (Pending Approvals)
  - 사용자 관리 (User Management)
- **기타 페이지**
  - 저니픽 소개 (About Us)
  - 자주 묻는 질문 (FAQ)
  - 문의하기 (Contact Us)
  - 이용약관 (Terms of Service)
  - 개인정보 처리방침 (Privacy Policy)

## 2. 사용자 흐름 (User Flow)

**- 핵심 과업 1: Tourist의 체험 상품 검색 및 예약**
  1. 사용자가 홈 페이지에서 키워드("Korean cooking class")로 검색하거나 카테고리를 클릭한다.
  2. 체험 리스트 페이지로 이동하여 검색 결과를 확인한다.
  3. 좌측 필터 사이드바에서 날짜, 지역, 가격대를 적용하여 결과를 좁힌다.
  4. 마음에 드는 체험 카드를 클릭하여 체험 상세 페이지로 이동한다.
  5. 이미지 갤러리, 설명, 리뷰를 확인한 후, 예약 위젯에서 원하는 날짜와 인원을 선택한다.
  6. 'Book Now' 버튼을 클릭한다. (비로그인 시 로그인/회원가입 모달 표시)
  7. 결제 페이지로 이동하여 주문 내역을 확인하고 Stripe 결제 양식을 통해 결제를 완료한다.
  8. 예약 완료 페이지로 리디렉션되며, 예약 확인 이메일을 수신한다.

**- 핵심 과업 2: Planner의 신규 체험 상품 등록 및 승인 요청**
  1. Planner 계정으로 로그인 후, 헤더의 'Planner Dashboard' 링크를 클릭한다.
  2. 대시보드에서 '새 체험 등록' 버튼을 클릭한다.
  3. 체험 등록 폼 페이지로 이동한다.
  4. 폼의 각 단계에 따라 체험 제목, 설명(WYSIWYG 에디터), 카테고리, 위치, 가격, 이미지, 예약 가능일(달력)을 입력한다.
  5. 모든 정보를 입력 후 '제출하기(Submit for Review)' 버튼을 클릭한다.
  6. 상품 상태가 '승인 대기(Pending)'로 변경되며, 중간관리자에게 알림이 전송된다.
  7. 내 체험 관리 리스트에서 해당 상품의 상태를 확인할 수 있다.

**- 핵심 과업 3: 중간관리자의 체험 상품 검수 및 승인**
  1. 관리자 계정으로 로그인하여 관리자 대시보드로 이동한다.
  2. 사이드바 메뉴에서 '상품 승인 관리'를 클릭한다.
  3. '승인 대기' 탭에서 새로 제출된 상품 리스트를 확인하고 검수할 상품을 클릭한다.
  4. 상품 상세 정보를 검토한다. (가이드라인 준수 여부, 정보 정확성 등)
  5. 검토 후 '승인(Approve)' 또는 '반려(Reject)' 버튼을 클릭한다.
  6. '반려' 시, 반려 사유를 입력하는 모달이 나타나며, 입력 후 제출하면 Planner에게 알림이 전송된다.
  7. '승인' 시, 상품 상태가 '판매 중(Live)'으로 변경되고 실제 서비스에 노출된다.

## 3. 네비게이션 구조 (Navigation Structure)

- **글로벌 네비게이션 바 (GNB - Global Navigation Bar)**
  - **위치**: 모든 페이지 상단에 고정
  - **구성 (비로그인 시)**: 로고(홈으로 이동), 검색창, 로그인, 회원가입
  - **구성 (Tourist 로그인 시)**: 로고, 검색창, 마이페이지(드롭다운: 예약 내역, 찜 목록, 로그아웃), Planner로 전환
  - **구성 (Planner 로그인 시)**: 로고, 검색창, **Planner 대시보드**, 마이페이지(드롭다운), 로그아웃

- **모바일 하단 탭 네비게이션 (Bottom Tab Navigation)**
  - **위치**: 모바일 화면 하단에 고정
  - **구성**: 홈(Home), 검색(Search), 예약내역(Bookings), 마이페이지(My)
  - **기타 메뉴**: 햄버거 메뉴(☰)를 통해 접근 (e.g., FAQ, 문의하기)

- **대시보드 로컬 네비게이션 (LNB - Local Navigation Bar)**
  - **위치**: Planner 및 Admin 대시보드 페이지의 좌측 사이드바
  - **Planner LNB**: 대시보드 홈, 내 체험 관리, 예약 현황, 프로필 관리
  - **Admin LNB**: 대시보드 홈(매출), 상품 승인 관리, 사용자 관리

- **푸터 (Footer)**
  - **위치**: 모든 페이지 하단
  - **구성**: 저니픽 소개, FAQ, 문의하기, 이용약관, 개인정보 처리방침, 소셜 미디어 링크

## 4. 페이지 계층 구조 (Page Hierarchy)

- / (Depth 1: 홈)
- /experiences (Depth 1: 체험 리스트)
  - /experiences/:id (Depth 2: 체험 상세)
- /checkout (Depth 1: 결제)
  - /checkout/confirmation (Depth 2: 예약 완료)
- /auth (Depth 1)
  - /auth/login (Depth 2: 로그인)
  - /auth/signup (Depth 2: 회원가입)
- /my-page (Depth 1: 마이페이지 - 로그인 필요)
  - /my-page/bookings (Depth 2: 예약 내역)
  - /my-page/wishlist (Depth 2: 찜 목록)
  - /my-page/reviews (Depth 2: 내가 쓴 리뷰)
  - /my-page/profile (Depth 2: 프로필 수정)
- /planner (Depth 1: 플래너 대시보드 - Planner 권한 필요)
  - /planner/dashboard (Depth 2: 대시보드 홈)
  - /planner/experiences (Depth 2: 내 체험 관리)
    - /planner/experiences/new (Depth 3: 새 체험 등록)
    - /planner/experiences/edit/:id (Depth 3: 체험 수정)
  - /planner/calendar (Depth 2: 예약 현황)
- /admin (Depth 1: 관리자 대시보드 - Admin 권한 필요)
  - /admin/dashboard (Depth 2: 매출 통계)
  - /admin/approvals (Depth 2: 상품 승인 관리)

## 5. 콘텐츠 구성 (Content Organization)

| 페이지 | 주요 콘텐츠 요소 |
| :--- | :--- |
| **Home** | - Hero Section (배경 이미지, 메인 카피, 통합 검색창)<br>- 카테고리 바로가기 아이콘/카드<br>- 추천 체험 상품 슬라이더 (e.g., "Top Rated Experiences")<br>- 사용자 후기 섹션<br>- 저니픽 소개 및 CTA |
| **Experience List** | - 페이지 제목 (e.g., "Search results for 'Seoul'")<br>- 필터 사이드바 (가격, 카테고리, 지역, 날짜 선택)<br>- 정렬 옵션 (인기순, 최신순, 가격순)<br>- 보기 전환 토글 (카드 뷰 / 리스트 뷰)<br>- 체험 상품 카드 그리드 |
| **Experience Detail** | - 이미지 갤러리 (썸네일 + 메인 이미지 슬라이드)<br>- 예약 정보 영역 (제목, 가격, 평점/리뷰 수, Planner 정보, '찜하기' 버튼)<br>- 예약 위젯 (날짜 선택 캘린더, 옵션/인원 선택, 'Book Now' CTA)<br>- 상세 정보 탭 (Overview(WYSIWYG), Location(지도+설명), Reviews) |
| **My Page (Tourist)** | - 사용자 프로필 요약 (이름, 프로필 사진)<br>- 탭 네비게이션 (예약 내역, 찜 목록, 내가 쓴 리뷰, 프로필 수정)<br>- **예약 내역**: 예약 상태별(예정/완료/취소) 예약 카드 리스트<br>- **찜 목록**: 찜한 체험 상품 카드 그리드 |
| **Planner Dashboard** | - 요약 통계 카드 (총 예약 수, 예상 수입 등)<br>- 내 체험 상품 리스트 (테이블 형태: 썸네일, 제목, 상태(Live/Pending/Rejected), 가격, 액션 버튼(수정/삭제))<br>- '새 체험 등록' CTA 버튼 |

## 6. 인터랙션 패턴 (Interaction Patterns)

- **모달 (Modal)**: 로그인/회원가입, 이미지 상세 보기, 결제 전 최종 확인, 반려 사유 입력 등 포커스가 필요한 짧은 과업에 사용.
- **캘린더/날짜 선택기 (Calendar/Date Picker)**: 체험 예약 날짜 선택, 대시보드 기간별 데이터 조회 시 사용. 예약 불가능한 날짜는 비활성화 처리.
- **탭 (Tabs)**: 체험 상세 페이지(개요/위치/리뷰), 마이페이지(예약/찜/리뷰) 등 연관 콘텐츠 그룹을 전환하며 보여줄 때 사용.
- **아코디언 (Accordion)**: FAQ 페이지에서 질문을 클릭하면 답변이 펼쳐지는 형태로 사용.
- **WYSIWYG 에디터 (What You See Is What You Get Editor)**: Planner가 체험 상품의 상세 설명을 텍스트 서식, 이미지 삽입 등 자유롭게 편집할 수 있도록 제공.
- **무한 스크롤 (Infinite Scroll)**: 체험 리스트 페이지에서 사용자가 스크롤을 내리면 다음 페이지의 상품을 자동으로 로드하여 탐색 경험을 부드럽게 함.
- **툴팁 (Tooltip)**: 아이콘이나 특정 용어에 마우스를 올렸을 때 간단한 도움말을 제공.

## 7. URL 구조 (URL Structure)

- **규칙**: 명사형, 소문자, 여러 단어는 하이픈(-)으로 연결 (kebab-case).
- **사용자 친화성**: URL만으로 페이지 내용을 유추할 수 있도록 직관적으로 설계.
- **일반 리소스**: `/{resource}` (e.g., `/experiences`, `/my-page`)
- **리소스 상세**: `/{resource}/:id` (e.g., `/experiences/123-korean-cooking-class-in-seoul`)
- **사용자별 페이지**: `/{user-role}/{feature}` (e.g., `/my-page/bookings`, `/planner/experiences`)
- **액션 페이지**: `/{resource}/new`, `/{resource}/edit/:id` (e.g., `/planner/experiences/new`)

## 8. 컴포넌트 계층 구조 (Component Hierarchy)

- **Global Components (전역 컴포넌트)**
  - `Header`: 로고, 네비게이션 링크, 검색창, 사용자 메뉴 포함
  - `Footer`: 회사 정보 및 정책 링크 포함
  - `Navigation`: Desktop GNB, Mobile Bottom Tab Navigation
  - `Search Bar`: 키워드 입력을 위한 통합 검색 컴포넌트

- **Shared Components (공유/원자적 컴포넌트)**
  - `Button`: Primary, Secondary, Text 등 다양한 형태의 버튼
  - `InputField`: 텍스트, 비밀번호, 숫자 등 입력 필드
  - `Card`:
    - `ExperienceCard`: 체험 리스트에 사용되는 카드 (이미지, 제목, 가격, 평점)
    - `ReviewCard`: 리뷰 섹션에 사용되는 카드 (작성자, 별점, 코멘트)
    - `StatsCard`: 대시보드용 통계 요약 카드
  - `Modal`: 배경을 어둡게 하고 중앙에 콘텐츠를 띄우는 컴포넌트
  - `Calendar`: 날짜 선택 UI
  - `Tabs`: 탭 인터페이스
  - `Avatar`: 사용자 프로필 이미지
  - `WYSIWYGEditor`: 서식 있는 텍스트 편집기

- **Page-Specific Components (페이지 특화 컴포넌트)**
  - `HomePage`:
    - `HeroSection`
  - `ExperienceListPage`:
    - `FilterSidebar`
  - `ExperienceDetailPage`:
    - `ImageGallery`
    - `BookingWidget`
  - `DashboardPage`:
    - `DataTable` (상품/사용자 리스트 표시용)
    - `Chart` (매출 통계 시각화용)