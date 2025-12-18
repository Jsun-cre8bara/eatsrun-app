# 잇츠Run (Eats Run)

이벤트 참여자를 위한 지역 소비 촉진 플랫폼

## 프로젝트 개요

잇츠Run은 러닝대회, 축제, 단일행사 등 다양한 이벤트 참여자들이 해당 지역에 사전 도착하여 체류하고, 귀가 전 지역 상권에서 소비하도록 유도하는 플랫폼입니다.

## 주요 기능

### 참여자 앱
- ✅ 소셜 로그인 (카카오/네이버)
- ✅ 러너 인증 (이름/전화번호)
- ✅ 행사 선택 및 참여
- ✅ 포스트 방문 및 QR 스캔
- ✅ 게임을 통한 쿠폰 획득 (룰렛, 사다리, 카드, 슬롯, 뽑기)
- ✅ 쿠폰 사용 (QR 코드)
- ✅ 스탬프 수집 및 교환권 획득 (축제)
- ✅ 완주 인증 및 보상 (러너)
- ✅ 지도에서 포스트 위치 확인
- ✅ 푸시 알림

## 기술 스택

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Maps**: react-native-maps
- **Storage**: expo-secure-store (네이티브), AsyncStorage (웹)
- **Notifications**: expo-notifications
- **Camera**: expo-camera
- **Location**: expo-location

## 설치 및 실행

### 필수 요구사항
- Node.js 18+
- npm 또는 yarn
- Expo CLI

### 설치
```bash
npm install
```

### 실행
```bash
# 개발 서버 시작
npm start

# Android 실행
npm run android

# iOS 실행
npm run ios

# 웹 실행
npm run web
```

## 프로젝트 구조

```
eatsrun-app/
├── src/
│   ├── api/           # API 클라이언트
│   ├── components/    # 재사용 가능한 컴포넌트
│   ├── screens/       # 화면 컴포넌트
│   ├── store/         # Zustand 스토어
│   └── utils/         # 유틸리티 함수
├── assets/            # 이미지 및 리소스
├── App.tsx            # 메인 앱 컴포넌트
└── package.json
```

## 주요 화면

1. **SplashScreen** - 앱 로딩
2. **LoginScreen** - 소셜 로그인
3. **VerifyScreen** - 러너 인증
4. **EventListScreen** - 행사 목록
5. **EventDetailScreen** - 행사 상세 및 참여
6. **HomeScreen** - 메인 대시보드
7. **MapScreen** - 포스트 지도
8. **QRScanScreen** - QR 스캔
9. **GameScreen** - 쿠폰 획득 게임
10. **CouponListScreen** - 쿠폰 목록
11. **CouponDetailScreen** - 쿠폰 상세
12. **StampsScreen** - 스탬프 현황
13. **RewardsScreen** - 교환권 목록
14. **FinishScreen** - 완주 인증
15. **MyPageScreen** - 마이페이지

## 환경 설정

### API URL 설정
`src/api/client.ts`에서 API URL을 설정할 수 있습니다:
- 개발 환경: 자동으로 플랫폼별 URL 설정
- 프로덕션: `https://your-api-server.com/v1`로 변경 필요

### 푸시 알림 설정
`src/utils/notifications.ts`에서 Expo 프로젝트 ID를 설정해야 합니다:
```typescript
projectId: 'your-project-id' // Expo 프로젝트 ID로 변경
```

## 개발 모드

개발 모드에서는 테스트 토큰을 사용하여 백엔드 없이도 로그인 및 기본 기능을 테스트할 수 있습니다:
- 카카오: `test-kakao-token`
- 네이버: `test-naver-token`

## 주요 Store

- **authStore**: 인증 상태 관리
- **eventStore**: 행사 데이터 관리
- **couponStore**: 쿠폰 데이터 관리
- **stampStore**: 스탬프 및 교환권 관리
- **gameStore**: 게임 상태 관리
- **postStore**: 포스트 데이터 관리

## 푸시 알림

다음 상황에서 푸시 알림이 발송됩니다:
- 행사 D-1 리마인더
- 쿠폰 획득
- 쿠폰 만료 임박 (1시간 전)
- 스탬프 달성 및 교환권 획득
- 완주 보상

## 라이선스

Private




