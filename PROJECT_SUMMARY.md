# 잇츠Run 프로젝트 구현 요약

## 프로젝트 개요
- **프로젝트명**: 잇츠Run (Eats Run)
- **목적**: 이벤트 참여자를 위한 지역 소비 촉진 플랫폼
- **기술 스택**: React Native (Expo), TypeScript, Zustand, Axios
- **백엔드**: Express.js + Prisma + PostgreSQL (Railway)

---

## 구현 완료된 기능

### 1. 인증 시스템
- ✅ 소셜 로그인 (카카오/네이버)
- ✅ 웹 호환성 (SecureStore → AsyncStorage 자동 전환)
- ✅ 토큰 관리 (Access Token, Refresh Token)
- ✅ 자동 토큰 갱신
- ✅ 테스트 모드 로그인 (백엔드 없이도 동작)

### 2. 화면 구성 (총 18개 화면)

#### 핵심 화면
1. **SplashScreen** - 앱 로딩 및 인증 확인
2. **LoginScreen** - 소셜 로그인
3. **VerifyScreen** - 러너 인증 (이름/전화번호)
4. **HomeScreen** - 메인 대시보드
5. **MyPageScreen** - 마이페이지

#### 행사 관련
6. **EventListScreen** - 행사 목록 (등록 버튼 포함)
7. **EventCreateScreen** - 행사 등록 (API 연동)
8. **EventDetailScreen** - 행사 상세 및 참여

#### 포스트 및 게임
9. **MapScreen** - 포스트 위치 지도 (react-native-maps)
10. **QRScanScreen** - QR 코드 스캔
11. **GameScreen** - 쿠폰 획득 게임 (5종: 룰렛, 사다리, 카드, 슬롯, 뽑기)

#### 쿠폰 관련
12. **CouponListScreen** - 쿠폰 목록
13. **CouponDetailScreen** - 쿠폰 상세 및 QR 코드
14. **CouponResultScreen** - 쿠폰 획득 결과

#### 스탬프 및 기타
15. **StampsScreen** - 스탬프 현황 (축제)
16. **RewardsScreen** - 교환권 목록
17. **FinishScreen** - 완주 인증 (러너)
18. **PostCreateScreen** - 포스트 등록 (지도 위치 선택)

### 3. 상태 관리 (Zustand Store)
- ✅ **authStore** - 인증 상태 관리
- ✅ **eventStore** - 행사 데이터 (CRUD)
- ✅ **couponStore** - 쿠폰 데이터
- ✅ **stampStore** - 스탬프 및 교환권
- ✅ **gameStore** - 게임 상태
- ✅ **postStore** - 포스트 데이터

### 4. 유틸리티
- ✅ **storage.ts** - 플랫폼별 스토리지 (SecureStore/AsyncStorage)
- ✅ **notifications.ts** - 푸시 알림 서비스 (웹 호환)
- ✅ **apiErrorHandler.ts** - API 에러 처리 (개선 완료)
- ✅ **colors.ts** - 색상 테마

### 4-1. 컴포넌트
- ✅ **ErrorDisplay.tsx** - 에러 표시 컴포넌트
- ✅ **NetworkErrorBanner.tsx** - 네트워크 오류 배너

### 5. API 클라이언트
- ✅ 플랫폼별 API URL 자동 설정
- ✅ 토큰 자동 첨부
- ✅ 토큰 만료 시 자동 갱신
- ✅ 네트워크 에러 처리

### 6. 게임 시스템
- ✅ 룰렛 게임 (애니메이션)
- ✅ 사다리타기 게임
- ✅ 카드 뒤집기 게임
- ✅ 슬롯머신 게임
- ✅ 뽑기 게임
- ✅ 카테고리 선택 기능

### 7. 푸시 알림
- ✅ 알림 권한 요청
- ✅ 행사 리마인더 (D-1)
- ✅ 쿠폰 획득 알림
- ✅ 쿠폰 만료 임박 알림
- ✅ 스탬프 달성 알림
- ✅ 완주 보상 알림
- ✅ 웹 호환성 (웹에서는 비활성화)

---

## 프로젝트 구조

```
eatsrun-app/
├── src/
│   ├── api/
│   │   └── client.ts              # API 클라이언트 (Axios)
│   ├── screens/                    # 17개 화면
│   ├── store/                      # 6개 Zustand Store
│   └── utils/                      # 유틸리티 함수
│       ├── storage.ts              # 스토리지 (웹 호환)
│       ├── notifications.ts        # 푸시 알림
│       ├── apiErrorHandler.ts      # 에러 처리
│       └── colors.ts               # 색상 테마
├── App.tsx                         # 메인 앱 (라우팅)
├── index.ts                        # 진입점
└── package.json
```

---

## 주요 설정

### API URL 설정 (`src/api/client.ts`)
- **웹**: `http://localhost:3000/v1`
- **Android 에뮬레이터**: `http://10.0.2.2:3000/v1`
- **iOS 시뮬레이터**: `http://localhost:3000/v1`
- **실제 기기**: 개발자 PC IP 주소 필요

### 백엔드 연결
- **데이터베이스**: Railway PostgreSQL
- **연결 정보**: `.env` 파일에 저장됨
- **포트**: 3000

### 웹 호환성
- `expo-secure-store` → 웹에서는 `AsyncStorage` 사용
- `expo-notifications` → 웹에서는 비활성화
- 모든 스토리지 접근이 플랫폼별로 자동 전환

---

## 실행 방법

### 백엔드 API 서버
```bash
cd eatsrun-api
npm run dev
# http://localhost:3000 에서 실행
```

### 프론트엔드 앱
```bash
cd eatsrun-app
npm start
# 또는
npx expo start --clear
```

**플랫폼 선택:**
- `w` - 웹 브라우저
- `i` - iOS 시뮬레이터
- `a` - Android 에뮬레이터
- `r` - 앱 리로드

---

## 주요 기능 플로우

### 러너 플로우
1. 소셜 로그인 → 러너 인증 (이름/전화번호)
2. 행사 선택 → 행사 참여
3. 지도에서 포스트 확인
4. QR 스캔 → 게임 → 쿠폰 획득
5. 상점에서 쿠폰 사용
6. 완주 인증 → 보상 쿠폰 활성화

### 축제 방문자 플로우
1. 소셜 로그인 (인증 불필요)
2. 축제 선택
3. 포스트 방문 → 스탬프 수집
4. 스탬프 달성 → 교환권 획득
5. 교환 포스트에서 기념품 수령

---

## 테스트 모드

개발 모드에서 테스트 토큰 사용 시:
- 로그인: 자동 모의 로그인 처리
- API 실패 시: 자동 폴백으로 모의 데이터 사용
- 완주 인증: 테스트 모드로 동작

**테스트 토큰:**
- 카카오: `test-kakao-token`
- 네이버: `test-naver-token`

---

## 최근 완료된 기능 (2024-12-14)

1. **포스트 생성 기능**
   - 백엔드: POST /v1/posts 엔드포인트 추가
   - 프론트엔드: PostCreateScreen 구현
   - 지도에서 위치 선택 기능
   - MapScreen에 포스트 생성 버튼 추가

2. **데이터베이스 시드 데이터**
   - 4개 행사 (춘천마라톤, 정동진축제, 서울봄축제, 부산해운대)
   - 5개 상점 (식당, 카페)
   - 11개 포스트
   - 7개 쿠폰 템플릿
   - 5개 교환권 템플릿

3. **에러 처리 개선**
   - 일관된 에러 메시지 시스템
   - 사용자 친화적 에러 UI 컴포넌트
   - 네트워크 오류 처리 강화
   - 재시도 기능 자동 제공

## 미구현 항목 (PRD 기준)

### 참여자 앱
- ✅ 모든 화면 구현 완료 (18개)
- ✅ 모든 핵심 기능 구현 완료
- ⚠️ 푸시 알림 (구현 완료, 실제 기기 테스트 필요)
- ⏳ API 호출 최적화 (캐싱, 중복 요청 방지)
- ⏳ 로딩 상태 UI 개선 (스켈레톤, 빈 상태)

### 상점주 앱
- ❌ 미구현 (별도 프로젝트 필요)

### 어드민 웹
- ❌ 미구현 (별도 프로젝트 필요)

---

## 알려진 이슈 및 해결 방법

### 1. 웹에서 실행 안 됨
**원인**: `expo-notifications` 웹 호환성 문제
**해결**: 웹에서는 조건부 로드로 수정 완료

### 2. iOS에서 변경사항 반영 안 됨
**해결**: 캐시 삭제 후 `--clear` 플래그로 재시작

### 3. 타입 에러
**해결**: `navigate` 함수 타입을 `Screen | string`으로 수정

### 4. 백엔드 연결 오류
**해결**: Railway PostgreSQL 연결 정보 확인 완료

---

## 다음 단계 (권장)

### 우선순위 높음
1. **로딩 상태 UI 개선** ⏳
   - 스켈레톤 UI 컴포넌트 추가
   - 빈 상태 (Empty State) UI 추가
   - 로딩 상태 표준화

2. **API 호출 최적화** ⏳
   - 중복 요청 방지
   - API 응답 캐싱
   - 요청 배치 처리

### 우선순위 중간
3. **백엔드 API 완성도 확인** ⏳
   - 엔드포인트 점검
   - 누락된 기능 추가
   - API 문서화

### 우선순위 낮음
4. **상점주 앱 개발** (별도 프로젝트)
5. **어드민 웹 개발** (별도 프로젝트)

**자세한 내용은 `DEVELOPMENT_ROADMAP.md` 참조**

---

## 파일별 주요 기능

### App.tsx
- 화면 라우팅 관리
- 푸시 알림 리스너 설정
- 네비게이션 히스토리 관리

### src/api/client.ts
- Axios 인스턴스 설정
- 플랫폼별 API URL
- 토큰 자동 첨부 및 갱신

### src/utils/storage.ts
- 웹/네이티브 스토리지 자동 전환
- SecureStore (네이티브) / AsyncStorage (웹)

### src/utils/notifications.ts
- 푸시 알림 권한 관리
- 로컬 알림 스케줄링
- 알림 리스너 설정

---

## 데이터 모델 (Prisma Schema 기준)

### 주요 엔티티
- User (사용자)
- Event (행사)
- Post (포스트)
- Coupon (쿠폰)
- Stamp (스탬프)
- Reward (교환권)
- Merchant (상점)

---

## 환경 변수 (백엔드)

### eatsrun-api/.env
```env
DATABASE_URL="postgresql://..." # Railway PostgreSQL
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."
PORT=3000
NODE_ENV=development
```

---

## 완료율

- **참여자 앱**: 98% 완료
  - 모든 화면 구현 ✅
  - 모든 핵심 기능 ✅
  - 푸시 알림 ✅
  - 웹 호환성 ✅

- **백엔드 API**: 설정 완료
  - Railway PostgreSQL 연결 ✅
  - Prisma 스키마 동기화 ✅
  - 서버 실행 가능 ✅

---

## 핵심 파일 목록

### 프론트엔드
- `App.tsx` - 메인 앱
- `src/api/client.ts` - API 클라이언트
- `src/store/*.ts` - 상태 관리 (6개)
- `src/screens/*.tsx` - 화면 (17개)
- `src/utils/*.ts` - 유틸리티 (4개)

### 백엔드
- `eatsrun-api/src/app.ts` - Express 서버
- `eatsrun-api/prisma/schema.prisma` - DB 스키마
- `eatsrun-api/src/routes/*.ts` - API 라우트
- `eatsrun-api/src/services/*.ts` - 비즈니스 로직

---

## 실행 체크리스트

### 백엔드 실행
- [ ] `cd eatsrun-api`
- [ ] `.env` 파일 확인 (Railway DB 연결 정보)
- [ ] `npm run db:generate` (Prisma 클라이언트 생성)
- [ ] `npm run db:push` (스키마 동기화)
- [ ] `npm run dev` (서버 실행)
- [ ] `http://localhost:3000/health` 확인

### 프론트엔드 실행
- [ ] `cd eatsrun-app`
- [ ] `npm install` (의존성 설치)
- [ ] `npm start` 또는 `npx expo start --clear`
- [ ] 플랫폼 선택 (w/i/a)
- [ ] 로그인 테스트
- [ ] 기능 테스트

---

## 주요 수정 사항 (최근)

1. **웹 호환성 개선**
   - SecureStore → AsyncStorage 자동 전환
   - expo-notifications 웹에서 조건부 로드

2. **타입 에러 수정**
   - navigate 함수 타입 수정
   - Screen 타입과 string 타입 호환

3. **푸시 알림 구현**
   - 모든 알림 타입 구현
   - 웹 호환성 처리

4. **에러 처리 개선**
   - API 에러 핸들러 추가
   - 네트워크 에러 처리

---

## 기술 스택 상세

### 프론트엔드
- React Native 0.81.5
- Expo SDK 54
- TypeScript 5.9.2
- Zustand 5.0.9 (상태 관리)
- Axios 1.13.2 (HTTP 클라이언트)
- react-native-maps 1.20.1 (지도)
- expo-camera 17.0.10 (QR 스캔)
- expo-location 19.0.8 (위치)
- expo-notifications 0.29.14 (푸시 알림)

### 백엔드
- Node.js 18+
- Express.js 4.18.2
- TypeScript 5.3.3
- Prisma 5.7.0 (ORM)
- PostgreSQL (Railway)
- JWT (인증)

---

## API 엔드포인트 구조

```
/v1/auth/*          - 인증
/v1/users/*         - 사용자
/v1/events/*        - 행사
/v1/posts/*         - 포스트
/v1/games/*         - 게임
/v1/coupons/*       - 쿠폰
/v1/stamps/*        - 스탬프/교환권
/v1/merchants/*     - 상점
/v1/admin/*         - 어드민
```

---

## 완료된 작업 요약

1. ✅ 모든 참여자 앱 화면 구현 (18개)
2. ✅ 상태 관리 시스템 구축 (6개 Store)
3. ✅ API 클라이언트 및 에러 처리 (개선 완료)
4. ✅ 웹 호환성 개선
5. ✅ 푸시 알림 시스템
6. ✅ 게임 시스템 (5종)
7. ✅ 지도 기능
8. ✅ 백엔드 연결 설정
9. ✅ 포스트 생성 기능
10. ✅ 데이터베이스 시드 데이터
11. ✅ 에러 처리 개선 (일관된 메시지, 사용자 친화적 UI)

---

이 요약을 기준으로 새로 진행하시면 됩니다!

