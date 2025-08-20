# 저니픽(Journeypick) Design Guide

## 1. Overall Mood (전체적인 무드)
저니픽은 한국을 처음 방문하는 외국인 관광객에게 활기차고 신뢰할 수 있는 첫인상을 주는 것을 목표로 합니다. 전체적인 무드는 **'따뜻하고(Warm)', '활기찬(Vibrant)', '친근한(Friendly)'** 세 가지 키워드로 정의됩니다. 밝고 따뜻한 색상과 부드러운 라운드 형태를 사용하여 사용자에게 심리적 안정감을 주고, 낯선 곳에서의 새로운 경험에 대한 기대감과 설렘을 시각적으로 표현합니다. 복잡함보다는 직관성을, 차가움보다는 인간적인 온기를 디자인 전반에 담아냅니다.

## 2. Reference Service (참조 서비스)
글로벌 여행 액티비티 플랫폼의 활기차고 사용자 친화적인 디자인을 참조하여, 저니픽의 핵심 가치인 '즐거운 탐색'과 '쉬운 예약'을 시각적으로 구현합니다.

- **Name**: Klook (클룩)
- **Description**: 전 세계 여행 액티비티, 투어, 교통편 등을 예약할 수 있는 글로벌 자유여행 플랫폼.
- **Design Mood**: 밝은 오렌지 컬러를 포인트로 사용하여 역동적이고 활기찬 여행의 느낌을 강조합니다. 사용자 행동을 유도하는 CTA 버튼이 명확하며, 직관적인 정보 구조로 원하는 상품을 쉽게 찾을 수 있습니다.
- **Primary Color**: `#FF5B00`
- **Secondary Color**: `#FFFFFF`

## 3. Color & Gradient (색상 & 그라데이션)
따뜻하고 활기찬 서비스 무드를 표현하기 위해 채도가 높은 오렌지 컬러를 메인으로 사용하고, 부드러운 아이보리와 신뢰감을 주는 그레이스케일 컬러를 조합하여 균형을 맞춥니다.

- **Primary Color**: `#FF5B00` (Vibrant Orange)
  - 사용자의 핵심 행동(예약, 결제, 상품 등록)을 유도하는 CTA 버튼, 활성화된 상태, 주요 아이콘 등 가장 중요한 요소에 사용됩니다.
- **Secondary Color**: `#FFF4EA` (Light Ivory)
  - 섹션 배경, 카드 호버(Hover) 상태 등 넓은 영역에 부드럽게 사용하여 전체적으로 따뜻하고 편안한 분위기를 조성합니다.
- **Accent Color**:
  - **Text & Elements**:
    - `#222222` (Charcoal): 주요 텍스트(제목, 본문)에 사용하여 가독성을 확보합니다.
    - `#666666` (Warm Gray): 보조 텍스트, 비활성 상태, 아이콘 등에 사용하여 정보의 위계를 표현합니다.
  - **System & Status**:
    - `#007BFF` (Blue): 정보성 알림, 링크 등에 사용합니다.
    - `#28A745` (Green): 성공, 승인 상태를 나타냅니다.
    - `#DC3545` (Red): 오류, 반려, 삭제 상태를 나타냅니다.
- **Mood**: 따뜻함(Warm), 높은 채도(High Saturation), 활기참(Energetic)
- **Color Usage**:
  1.  **Primary**: 가장 중요한 CTA 버튼 및 상호작용 요소.
  2.  **Secondary**: 페이지의 주요 영역을 구분하는 배경색.
  3.  **Charcoal/Gray**: 텍스트 정보의 위계 표현.
  4.  **Accent**: 시스템 상태를 명확히 알리는 용도.

## 4. Typography & Font (타이포그래피 & 폰트)
영문과 한글 모두에서 뛰어난 가독성을 제공하고, 친근한 인상을 주는 'Pretendard' 폰트를 사용합니다. 명확한 위계 설정을 통해 사용자가 정보를 쉽게 인지할 수 있도록 합니다.

- **Font Family**: Pretendard
- **기본 설정**: Line Height 160%, Letter Spacing -0.02em

- **Heading 1**: Pretendard, 32px, Bold (700)
  - 페이지의 가장 큰 제목 (e.g., "Find your next experience")
- **Heading 2**: Pretendard, 24px, Bold (700)
  - 섹션의 제목 (e.g., "Overview", "Reviews")
- **Heading 3**: Pretendard, 20px, SemiBold (600)
  - 카드 제목, 작은 단위의 콘텐츠 그룹 제목
- **Body**: Pretendard, 16px, Regular (400)
  - 일반적인 본문, 상품 설명 등 가장 많이 사용되는 텍스트
- **Caption**: Pretendard, 14px, Regular (400)
  - 보조 설명, 입력 필드 레이블, 메타 데이터(날짜, 작성자 등)
- **Button Text**: Pretendard, 16px, SemiBold (600)

## 5. Layout & Structure (레이아웃 & 구조)
안정적이고 확장 가능한 구조를 위해 그리드 시스템을 기반으로 레이아웃을 설계합니다. 모든 디바이스에서 일관된 사용자 경험을 제공하는 것을 목표로 합니다.

- **Grid System**: 12 Column Grid System
- **Max Width**: 1280px (콘텐츠 영역 중앙 정렬)
- **Spacing Unit**: 8px 기반의 시스템 (8, 16, 24, 32, 40px...)을 사용하여 여백과 간격에 일관성을 부여합니다.
- **Navigation**:
  - **Desktop**: 상단에 고정되는 Top Navigation Bar (Height: 72px)를 사용하여 로고, 검색, 마이페이지, Planner 전환 등 주요 기능에 빠르게 접근할 수 있도록 합니다.
  - **Mobile**: Top Navigation Bar는 로고와 햄버거 메뉴 아이콘으로 축약됩니다.
- **Page Structure**:
  - **상품 리스트**: 좌측 필터 사이드바(Sticky), 우측 상품 카드 그리드 레이아웃으로 구성하여 탐색과 필터링을 동시에 편하게 할 수 있도록 합니다.
  - **상품 상세**: 좌측 이미지 갤러리, 우측 예약 정보(가격, 달력, CTA)의 2단 구조로 핵심 정보를 한눈에 파악하게 하고, 스크롤 시 하단에 상세 설명(Overview, Location 등)이 나타나는 구조를 가집니다.

## 6. Visual Style (비주얼 스타일)
친근하고 따뜻한 무드를 시각적으로 일관되게 표현합니다.

- **Icons**:
  - 스타일: 2px 굵기의 외곽선으로 이루어진 Line Icon.
  - 색상: 기본적으로 Warm Gray(`#666666`)를 사용하고, 활성화되거나 중요한 아이콘에는 Primary Color(`#FF5B00`)를 사용합니다.
- **Images & Illustrations**:
  - **이미지**: 실제 체험의 생생함과 신뢰도를 전달하기 위해 고품질의 실제 사진 사용을 최우선으로 합니다.
  - **이미지 형태**: 16px의 둥근 모서리(Border-radius)를 적용하여 부드럽고 친근한 느낌을 줍니다.
  - **일러스트**: 사진으로 표현하기 어려운 개념이나 오류 페이지 등에서 따뜻한 색감의 소프트한 일러스트를 보조적으로 사용합니다.
- **Shadows**:
  - 카드, 모달, 드롭다운 등 상호작용이 필요한 컴포넌트에 부드러운 그림자(`box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08)`)를 사용하여 입체감을 부여하고 시각적 계층을 나눕니다.
- **Corner Radius**:
  - **8px**: 버튼, 입력 필드 등 작은 컴포넌트
  - **16px**: 카드, 이미지 컨테이너 등 큰 컴포넌트
  - 일관된 둥근 모서리 사용으로 전체적인 통일감과 부드러운 인상을 강화합니다.

## 7. UX Guide (UX 가이드)
주 사용자인 **'서비스 초심자(Beginners)'** 관광객에 초점을 맞춥니다. 모든 과정은 직관적이어야 하며, 사용자가 다음 행동을 쉽게 예측할 수 있도록 안내해야 합니다.

1.  **명확성의 원칙 (Clarity First)**: 불필요한 전문 용어를 피하고, 쉽고 보편적인 언어(주로 영어)를 사용합니다. 아이콘과 텍스트를 함께 제공하여 의미를 명확하게 전달합니다.
2.  **신뢰 구축 (Build Trust)**: 실제 사용자의 리뷰와 평점, Planner 프로필, 안전한 결제 시스템(Stripe 로고 노출)을 명확히 보여주어 사용자가 안심하고 예약할 수 있도록 합니다.
3.  **단계적 안내 (Guided Flow)**: 예약 과정을 `날짜 선택` → `결제` → `예약 완료`와 같이 명확한 단계로 구분하고, 현재 어느 단계에 있는지 시각적으로 알려주어 이탈을 방지합니다. Planner의 상품 등록 과정 역시 단계별 가이드를 제공합니다.
4.  **마찰 없는 경험 (Frictionless Interaction)**: 회원가입부터 예약 완료까지의 단계를 최소화하고, 달력에서 예약 가능한 날짜를 시각적으로 명확히 구분하여 불필요한 클릭을 줄입니다.

## 8. UI Component Guide (UI 컴포넌트 가이드)
자주 사용되는 UI 컴포넌트의 스타일을 통일하여 일관된 사용자 경험을 제공합니다.

- **Buttons**:
  - **Primary CTA**: Primary Color(`#FF5B00`) 배경 채움, 흰색 텍스트. 가장 중요한 행동 유도에 사용. (e.g., "Book Now", "Submit")
  - **Secondary**: Primary Color 테두리, Primary Color 텍스트, 투명 배경. 부가적인 행동에 사용. (e.g., "View Details", "Add to Wishlist")
  - **Tertiary/Text**: 테두리와 배경 없이 텍스트만 사용. 덜 중요한 행동에 사용. (e.g., "Cancel")
  - **모든 버튼**: `border-radius: 8px`, `font-weight: 600`.

- **Input Fields**:
  - **Default**: 옅은 회색 테두리(`1px solid #DDDDDD`), `border-radius: 8px`.
  - **Focus**: Primary Color(`#FF5B00`) 테두리(`2px solid`).
  - **Placeholder**: Warm Gray(`#666666`) 색상의 텍스트.

- **Cards (Experience Card)**:
  - `border-radius: 16px`와 부드러운 그림자 효과 적용.
  - **구조**: 상단 이미지 / 하단 [카테고리], [카드 제목(H3)], [가격], [별점 및 리뷰 수].
  - **Hover**: 카드가 살짝 위로 떠오르는 효과(`transform: translateY(-4px)`)를 주어 상호작용이 가능함을 암시.

- **Navigation Bar (상단 바)**:
  - 흰색 배경(`#FFFFFF`)에 아래쪽으로 옅은 그림자 또는 1px 회색 라인으로 콘텐츠와 구분.
  - 높이: 72px, 내부 패딩으로 요소 정렬.
  - 스크롤 시 상단에 고정(Sticky).

- **Calendar**:
  - **선택 가능일**: 기본 텍스트 색상.
  - **선택 불가능일**: 회색(`color: #CCCCCC`) 처리, 비활성화.
  - **선택된 날짜**: Primary Color(`#FF5B00`) 원형 배경, 흰색 텍스트.