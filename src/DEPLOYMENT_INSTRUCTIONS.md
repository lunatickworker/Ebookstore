# Ebookstore PWA 배포 가이드

## 🚀 Vercel 배포 (추천)

### 1. GitHub 연동을 통한 자동 배포

1. **GitHub 리포지토리 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ebookstore PWA"
   git branch -M main
   git remote add origin https://github.com/your-username/ebookstore-pwa.git
   git push -u origin main
   ```

2. **Vercel 계정 연동**
   - [Vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인
   - "New Project" → GitHub 리포지토리 선택
   - 자동 설정 확인 후 "Deploy" 클릭

### 2. Vercel CLI를 통한 배포

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **로그인 및 배포**
   ```bash
   vercel login
   vercel --prod
   ```

### 3. 배포 후 확인사항

- ✅ PWA 설치 가능한지 확인
- ✅ 다크 독서실 테마 정상 작동
- ✅ 이미지 캐싱 동작 확인
- ✅ 오프라인 기능 테스트
- ✅ 모바일 반응형 확인

## 🔧 환경 설정

### Vercel 환경 변수 (선택사항)
대시보드 → Settings → Environment Variables에서 설정:

```env
# API 키 (향후 확장용)
VITE_API_BASE_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id

# PWA 설정
VITE_APP_NAME=Ebookstore
VITE_APP_SHORT_NAME=Ebookstore
VITE_APP_DESCRIPTION="밤늦은 독서를 위한 편안한 디지털 서점"
```

## 📱 PWA 아이콘 교체

배포 전 `/public/` 폴더의 아이콘들을 실제 이미지로 교체하세요:

- `favicon.ico` (16x16, 32x32)
- `apple-touch-icon.png` (180x180)
- `pwa-192x192.png` (192x192)
- `pwa-512x512.png` (512x512)
- `masked-icon.svg` (벡터 아이콘)

## 🌐 도메인 설정

### 커스텀 도메인 연결
1. Vercel 프로젝트 → Settings → Domains
2. 도메인 추가 및 DNS 설정
3. SSL 자동 설정 확인

### 추천 도메인명
- `ebookstore.com`
- `reading-room.app`
- `digitallibrary.kr`
- `bookstore-pwa.com`

## 🔍 SEO 최적화

### 1. sitemap.xml 업데이트
`/public/sitemap.xml`에서 실제 도메인으로 수정:
```xml
<loc>https://your-actual-domain.com/</loc>
```

### 2. robots.txt 업데이트
`/public/robots.txt`에서 실제 도메인으로 수정:
```txt
Sitemap: https://your-actual-domain.com/sitemap.xml
```

### 3. meta 태그 확인
`/public/index.html`의 meta 태그들이 올바른지 확인

## 📊 성능 모니터링

### 배포 후 체크리스트
- [ ] Lighthouse 점수 (90+ 목표)
- [ ] Core Web Vitals 확인
- [ ] PWA 설치 테스트
- [ ] 오프라인 기능 확인
- [ ] 이미지 로딩 최적화 확인
- [ ] 모바일 사용성 테스트

### 성능 도구
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🐛 트러블슈팅

### 일반적인 문제들

1. **이미지 로딩 실패**
   - Unsplash 이미지 URL 확인
   - CORS 정책 확인
   - 이미지 캐싱 설정 점검

2. **PWA 설치 안됨**
   - manifest.json 유효성 검사
   - HTTPS 연결 확인
   - 서비스 워커 등록 확인

3. **다크 테마 적용 안됨**
   - CSS 변수 로딩 확인
   - 테마 초기화 코드 점검

## 📞 지원

배포 관련 문제가 있다면:
1. Vercel 문서 확인: https://vercel.com/docs
2. GitHub Issues에 문제 보고
3. 커뮤니티 지원 요청

---

**배포 성공! 🎉**

이제 누구나 접속할 수 있는 완전한 서점 PWA가 완성되었습니다.
사용자들이 편안한 독서 경험을 할 수 있도록 지속적으로 개선해보세요.