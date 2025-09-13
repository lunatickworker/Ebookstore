# 🚀 GitHub & Vercel 배포 가이드

## 📋 체크리스트

배포 전 확인사항:
- [ ] 모든 파일이 올바른 위치에 있는지 확인
- [ ] package.json의 dependencies 확인
- [ ] 이미지 URL들이 유효한지 확인
- [ ] 로컬에서 빌드 테스트 완료

## 🔧 1단계: 로컬 환경 설정

### Git 초기화 및 설정
```bash
# 프로젝트 폴더에서 실행
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "🎉 Initial commit: Complete Ebookstore PWA

✨ Features:
- 다크 독서실 테마 적용
- 완전한 PWA 기능
- 이미지 최적화 시스템
- 관리자 대시보드
- 반응형 디자인
- TypeScript + Tailwind CSS v4"
```

## 📦 2단계: GitHub 레포지토리 생성

### GitHub에서 새 레포지토리 생성
1. [GitHub.com](https://github.com) 로그인
2. "New repository" 버튼 클릭
3. 레포지토리 설정:
   - **Repository name**: `ebookstore-pwa`
   - **Description**: `📚 밤늦은 독서를 위한 편안한 디지털 서점 PWA`
   - **Visibility**: Public (또는 Private)
   - **README 체크박스 해제** (이미 있음)

### 원격 저장소 연결 및 푸시
```bash
# 원격 저장소 연결 (YOUR_USERNAME을 실제 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/ebookstore-pwa.git

# 메인 브랜치로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 🌐 3단계: Vercel 배포

### 방법 1: Vercel 웹 대시보드 (권장)

1. **Vercel 가입**: [vercel.com](https://vercel.com) 방문
2. **GitHub 연결**: "Continue with GitHub" 선택
3. **프로젝트 import**:
   - "New Project" 클릭
   - GitHub에서 `ebookstore-pwa` 레포지토리 선택
   - "Import" 클릭

4. **프로젝트 설정**:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Deploy 버튼 클릭**

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포 (프로젝트 폴더에서)
vercel

# 프로덕션 배포
vercel --prod
```

## 🔧 4단계: 환경 변수 설정 (필요시)

Vercel 대시보드에서:
1. 프로젝트 → Settings → Environment Variables
2. 필요한 환경 변수 추가:
   ```
   NODE_ENV=production
   VITE_APP_TITLE=Ebookstore
   ```

## 📱 5단계: PWA 기능 확인

배포 후 확인사항:
- [ ] PWA 설치 가능 여부
- [ ] Service Worker 등록 확인
- [ ] 오프라인 기능 테스트
- [ ] 이미지 캐싱 작동 확인

### PWA 테스트 방법
1. Chrome DevTools → Lighthouse 실행
2. PWA 카테고리에서 점수 확인
3. Application 탭에서 Service Worker 상태 확인

## 🔄 6단계: 자동 배포 설정

### GitHub Actions 워크플로우 활성화
1. `.github/workflows/deploy.yml` 파일이 있는지 확인
2. Vercel 토큰 설정:
   - Vercel 대시보드 → Settings → Tokens
   - 새 토큰 생성
   - GitHub 레포지토리 → Settings → Secrets and variables → Actions
   - 다음 secrets 추가:
     ```
     VERCEL_TOKEN: <your-vercel-token>
     ORG_ID: <your-team-id>
     PROJECT_ID: <your-project-id>
     ```

## 🛠️ 트러블슈팅

### 자주 발생하는 문제들

#### 1. 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 2. 이미지 로딩 문제
- Unsplash URL이 유효한지 확인
- CORS 정책 확인
- 이미지 캐시 설정 확인

#### 3. Service Worker 등록 실패
- `public/sw.js` 파일 존재 확인
- 브라우저 콘솔에서 에러 메시지 확인
- HTTPS 연결 확인

#### 4. 타입스크립트 에러
```bash
# 타입 체크
npm run type-check

# tsconfig.json 설정 확인
```

## 📊 성능 최적화

### Vercel 설정 최적화
1. **Functions**: Edge Functions 사용 고려
2. **Analytics**: Web Analytics 활성화
3. **Speed Insights**: Core Web Vitals 모니터링

### 이미지 최적화
- Vercel Image Optimization 활용
- WebP 포맷 사용
- 적절한 이미지 크기 설정

## 🔗 유용한 링크

- **Vercel 문서**: https://vercel.com/docs
- **PWA 가이드**: https://web.dev/progressive-web-apps/
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **Vite 문서**: https://vitejs.dev/

## 📈 배포 후 할 일

1. **도메인 연결**: Custom domain 설정
2. **Analytics 설정**: Google Analytics 또는 Vercel Analytics
3. **SEO 최적화**: Meta tags 및 sitemap 추가
4. **모니터링 설정**: Error tracking 및 성능 모니터링

## 🎉 배포 완료!

축하합니다! 🎊 

당신의 Ebookstore PWA가 성공적으로 배포되었습니다.

**배포 URL**: `https://ebookstore-pwa.vercel.app`

이제 전 세계 누구나 당신의 디지털 독서실을 방문할 수 있습니다!

---

### 다음 단계 제안

- 📊 Google Analytics 연동
- 🔍 SEO 최적화
- 📱 앱스토어 등록 (PWA-to-APK)
- 🌍 다국어 지원
- 🔔 푸시 알림 시스템
- 💳 결제 시스템 연동