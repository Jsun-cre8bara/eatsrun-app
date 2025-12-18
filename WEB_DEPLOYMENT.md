# 웹 배포 가이드

이 문서는 eatsrun-app을 웹 서비스로 배포하기 위한 단계별 가이드입니다.

## 사전 준비사항

1. **Node.js 18+** 설치 확인
2. **Expo CLI** 설치 확인 (`npm install -g expo-cli` 또는 `npx expo` 사용)
3. **웹 호스팅 서비스 계정** (Vercel, Netlify, GitHub Pages 등)

## 1. 환경 변수 설정

웹 배포 시 필요한 환경 변수들을 설정해야 합니다:

### `.env` 파일 생성 (선택사항)
```
EXPO_PUBLIC_API_URL=https://your-api-server.com/v1
```

또는 배포 플랫폼의 환경 변수 설정에서:
- `EXPO_PUBLIC_API_URL`: 백엔드 API 서버 URL

## 2. API URL 설정 확인

`src/api/client.ts` 파일에서 웹 환경의 API URL이 올바르게 설정되어 있는지 확인합니다.

현재 설정:
- **웹**: `http://localhost:3000/v1` (개발 환경)
- **프로덕션**: 환경 변수 `EXPO_PUBLIC_API_URL` 또는 직접 수정 필요

## 3. 웹 빌드

### 방법 1: Expo Web Build (권장)

```bash
# 프로젝트 루트에서
npx expo export:web
```

이 명령은 `web-build/` 디렉토리에 정적 파일들을 생성합니다.

### 방법 2: Expo Web 개발 서버

```bash
npm run web
# 또는
npx expo start --web
```

개발 서버가 `http://localhost:8081`에서 실행됩니다.

## 4. 배포 플랫폼별 가이드

### Vercel

1. **Vercel CLI로 배포:**
```bash
npm install -g vercel
npx expo export:web
cd web-build
vercel --prod
```

2. **GitHub 연동 배포:**
   - GitHub에 코드 푸시
   - Vercel 대시보드에서 프로젝트 연결
   - Build Command: `npx expo export:web`
   - Output Directory: `web-build`
   - Environment Variables: `EXPO_PUBLIC_API_URL` 설정

### Netlify

1. **Netlify CLI로 배포:**
```bash
npm install -g netlify-cli
npx expo export:web
netlify deploy --prod --dir=web-build
```

2. **Drag & Drop 배포:**
   - `npx expo export:web` 실행 후 `web-build` 폴더 생성
   - Netlify 대시보드에서 `web-build` 폴더 드래그 & 드롭

### GitHub Pages

```bash
npx expo export:web
cd web-build
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eatsrun-app.git
git push -u origin main --force
```

GitHub 저장소 Settings > Pages에서 `main` 브랜치 선택.

## 5. 웹 특화 설정

### app.json 웹 설정

`app.json`에 웹 관련 설정이 이미 포함되어 있습니다:

```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 추가 웹 최적화 (선택사항)

1. **Service Worker 추가** (PWA 지원)
2. **메타 태그 추가** (SEO 및 공유 최적화)
3. **압축 설정** (Gzip, Brotli)

## 6. 배포 후 확인사항

- [ ] 웹사이트가 정상적으로 로드되는지 확인
- [ ] API 연결이 정상적으로 작동하는지 확인
- [ ] 반응형 디자인이 올바르게 작동하는지 확인
- [ ] 로그인 기능이 정상적으로 작동하는지 확인
- [ ] 모든 주요 화면이 정상적으로 표시되는지 확인

## 7. 웹에서 지원되지 않는 기능

다음 기능들은 웹에서 제한적으로 동작하거나 지원되지 않습니다:

- ❌ **푸시 알림**: 웹에서는 브라우저 알림 API 사용 (별도 구현 필요)
- ⚠️ **카메라 (QR 스캔)**: 웹에서는 브라우저 카메라 API 사용 가능하지만 네이티브만큼 안정적이지 않음
- ⚠️ **위치 서비스**: 브라우저 권한 요청 필요
- ⚠️ **하드웨어 백 버튼**: Android 웹뷰에서만 동작

## 8. 트러블슈팅

### 빌드 에러 발생 시

```bash
# 캐시 삭제 후 재빌드
npx expo export:web --clear
```

### API 연결 오류

- CORS 설정 확인 (백엔드 서버에서 웹 도메인 허용)
- 환경 변수 `EXPO_PUBLIC_API_URL` 확인

### 스타일이 깨지는 경우

- `react-native-web`이 올바르게 설치되어 있는지 확인
- 브라우저 호환성 확인 (Chrome, Firefox, Safari 최신 버전 권장)

## 9. CI/CD 파이프라인 예시

### GitHub Actions (.github/workflows/deploy.yml)

```yaml
name: Deploy to Web

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx expo export:web
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 10. 성능 최적화

웹 배포 시 성능을 위해 다음을 고려하세요:

1. **코드 분할**: Expo가 자동으로 처리
2. **이미지 최적화**: WebP 포맷 사용 고려
3. **캐싱 전략**: 서비스 워커 구현
4. **번들 크기**: 불필요한 의존성 제거

## 추가 리소스

- [Expo Web 문서](https://docs.expo.dev/workflow/web/)
- [React Native Web 문서](https://necolas.github.io/react-native-web/)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [Netlify 배포 가이드](https://docs.netlify.com/)

