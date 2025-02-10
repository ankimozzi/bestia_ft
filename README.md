# 🏠 Real Estate Transaction Management System

## 소개

이 프로젝트는 부동산 거래 프로세스를 단계별로 관리하고 추적할 수 있는 웹 애플리케이션입니다. 매물 선택부터 클로징까지 전체 구매 과정을 체계적으로 관리할 수 있습니다.

## 주요 기능

- 🗺️ 지도 기반 매물 검색 및 조회
- 📝 6단계 구매 프로세스 관리
  1. 부동산 선택 및 가격 협상
  2. 매매계약서 작성
  3. 에스크로 계좌 개설
  4. 주택 검사
  5. 대출 승인
  6. 클로징
- 💰 실시간 가격 정보 제공
- 📊 계약 내용 요약 및 리포트
- 🔄 진행 상황 실시간 추적

## 기술 스택

- Frontend: React + TypeScript
- State Management: Zustand
- Styling: TailwindCSS + Shadcn/ui
- Maps: Google Maps API
- Animation: Framer Motion

## 주요 컴포넌트

- PropertyProcessPage: 전체 구매 프로세스 관리
- ContractSummaryPage: 계약 내용 요약
- MapContainer: 지도 기반 매물 표시
- Step Components: 각 단계별 입력 폼

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 환경 변수 설정

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

## 프로젝트 구조

```
src/
  ├── components/
  │   ├── purchase-steps/    # 구매 단계별 컴포넌트
  │   ├── modals/           # 모달 컴포넌트
  │   └── ui/               # UI 컴포넌트
  ├── pages/                # 페이지 컴포넌트
  ├── store/                # Zustand 스토어
  ├── lib/                  # 유틸리티 함수
  └── types/                # TypeScript 타입 정의
```

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
