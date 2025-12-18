# 웹 배포 체크리스트

## ✅ 완료된 작업

### 1. iPhone 14 화면 최적화
- [x] `react-native-safe-area-context` 패키지 설치
- [x] `SafeAreaProvider`를 App.tsx에 추가
- [x] `useSafeAreaHeaderPadding` 유틸리티 함수 생성
- [x] 주요 화면 헤더에 SafeArea 적용:
  - HomeScreen
  - MyPageScreen  
  - EventDetailScreen
  - MapScreen
  - MerchantProfileScreen (편집 버튼 포함)

### 2. 웹 배포 준비
- [x] 웹 배포 가이드 문서 작성 (WEB_DEPLOYMENT.md)

## 📋 추가 작업 필요 (선택사항)

### 나머지 화면 SafeArea 적용

다음 화면들도 동일한 패턴으로 SafeArea를 적용할 수 있습니다:

1. CouponListScreen
2. CouponDetailScreen
3. EventListScreen
4. StampsScreen
5. RewardsScreen
6. PostCreateScreen
7. VerifyScreen
8. GameScreen
9. EventCreateScreen
10. Admin 관련 화면들 (AdminHomeScreen, AdminEventDetailScreen 등)
11. Merchant 관련 화면들 (MerchantHomeScreen 등)

**적용 방법:**
```typescript
// 1. Import 추가
import { useSafeAreaHeaderPadding } from '../utils/safeArea';

// 2. 컴포넌트 내에서 사용
const headerPaddingTop = useSafeAreaHeaderPadding();

// 3. Header View에 적용
<View style={[styles.header, { paddingTop: headerPaddingTop }]}>

// 4. StyleSheet에서 paddingTop 제거
header: {
  // paddingTop: 60, <- 이 줄 제거
  paddingHorizontal: 20,
  paddingBottom: 16,
  ...
}
```

## 🚀 웹 배포 실행 단계

### 빠른 배포 (Vercel 예시)

```bash
# 1. 빌드
npx expo export:web

# 2. 배포 (Vercel CLI)
cd web-build
vercel --prod
```

### 상세한 배포 가이드

`WEB_DEPLOYMENT.md` 파일을 참조하세요.

## ⚠️ 주의사항

1. **API URL 설정**: 웹 배포 전에 `src/api/client.ts`의 웹 환경 API URL을 프로덕션 서버로 변경하세요.

2. **환경 변수**: 배포 플랫폼에서 `EXPO_PUBLIC_API_URL` 환경 변수를 설정하세요.

3. **CORS 설정**: 백엔드 서버에서 웹 도메인의 CORS를 허용해야 합니다.

4. **웹 호환성**: 일부 네이티브 기능(푸시 알림, 카메라 등)은 웹에서 제한적으로 동작합니다.

## 🧪 테스트 체크리스트

웹 배포 전 테스트:

- [ ] 로컬에서 `npm run web` 정상 작동 확인
- [ ] 주요 화면이 정상적으로 표시되는지 확인
- [ ] 로그인 기능 테스트
- [ ] API 연결 테스트
- [ ] 반응형 디자인 확인 (모바일, 태블릿, 데스크톱)
- [ ] iPhone Safari에서 SafeArea가 올바르게 적용되는지 확인

