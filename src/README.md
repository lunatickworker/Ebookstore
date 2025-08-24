# 📚 Ebookstore - 디지털 독서실

> 밤늦은 독서를 위한 편안한 디지털 서점 PWA

![Ebookstore Preview](https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=1200&h=600&fit=crop)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ebookstore-pwa)

## ✨ 주요 기능

### 🌙 다크 독서실 테마
- 눈에 편안한 어두운 테마로 장시간 독서 지원
- 따뜻한 갈색 계열 색상으로 편안한 독서 환경 조성
- 독서 최적화된 폰트 및 타이포그래피

### 📱 완전한 PWA 지원
- 모바일 앱처럼 설치하여 사용 가능
- 오프라인 독서 지원
- 백그라운드 동기화
- 푸시 알림 지원

### 🚀 고급 이미지 최적화
- 지능형 이미지 캐싱 시스템
- 3-5배 빠른 이미지 로딩
- GPU 가속 및 성능 최적화
- Unsplash 이미지 자동 최적화

### 📖 개인 맞춤 독서 환경
- 커스터마이징 가능한 독서 뷰어
- 북마크 및 메모 기능
- 독서 진행률 추적
- 개인 서재 관리

### 📊 독서 통계 및 분석
- 개인 독서 기록 분석
- 독서 패턴 시각화
- 월별/연도별 독서 통계
- 카테고리별 독서 현황

### 🛡️ 완전한 관리자 시스템
- 실시간 대시보드
- 도서 및 사용자 관리
- 판매 분석 및 리포트
- 시스템 모니터링

## 🛠️ 기술 스택

### Frontend
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성
- **Tailwind CSS v4** - 최신 CSS 프레임워크
- **Vite** - 빠른 개발 환경

### UI & Design
- **shadcn/ui** - 모던 UI 컴포넌트
- **Lucide React** - 일관된 아이콘 시스템
- **Motion** - 부드러운 애니메이션
- **Recharts** - 데이터 시각화

### PWA & Performance
- **Vite PWA Plugin** - PWA 기능
- **Custom Image Cache** - 이미지 최적화
- **Service Worker** - 오프라인 지원
- **Web Vitals 최적화** - 성능 최적화

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/yourusername/ebookstore-pwa.git
cd ebookstore-pwa

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# Vercel에 배포
vercel
```

## 📦 프로젝트 구조

```
ebookstore-pwa/
├── components/           # React 컴포넌트
│   ├── admin/           # 관리자 전용 컴포넌트
│   ├── ui/              # shadcn/ui 컴포넌트
│   └── figma/           # Figma 연동 컴포넌트
├── constants/           # 상수 및 데이터
├── styles/              # 글로벌 스타일
├── utils/               # 유틸리티 함수
├── public/              # 정적 파일
└── .github/            # GitHub Actions 워크플로우
```

## 🎨 디자인 시스템

### 색상 팔레트
```css
--primary: #d4a574    /* 따뜻한 갈색 */
--accent: #c8956d     /* 포인트 색상 */
--background: #1a1713 /* 다크 배경 */
--reading-bg: #161410 /* 독서실 배경 */
```

### 타이포그래피
- **헤딩**: Georgia (독서 최적화)
- **본문**: 시스템 폰트 (가독성 최적화)
- **코드**: 모노스페이스 폰트

## 📱 PWA 기능

### 설치 방법
1. 웹사이트 방문
2. 주소창의 "설치" 버튼 클릭
3. 또는 브라우저 메뉴에서 "앱 설치" 선택

### 오프라인 기능
- 캐시된 도서는 오프라인에서도 읽기 가능
- 오프라인 상태에서도 기본 기능 사용 가능
- 네트워크 복구 시 자동 동기화

## 🔧 개발 가이드

### 환경 변수 설정

```env
# .env.local
NODE_ENV=development
VITE_APP_TITLE=Ebookstore
```

### 커스터마이징

#### 테마 색상 변경
`styles/globals.css`에서 CSS 변수 수정:

```css
:root {
  --primary: #your-color;
  --accent: #your-accent;
}
```

#### 새 페이지 추가
1. `components/` 폴더에 새 컴포넌트 생성
2. `App.tsx`에서 라우팅 추가
3. 네비게이션 메뉴에 링크 추가

### 성능 최적화 팁

1. **이미지 최적화**: OptimizedImage 컴포넌트 사용
2. **코드 분할**: React.lazy() 활용
3. **캐싱**: imageCache 유틸리티 활용
4. **번들 최적화**: Vite 설정 조정

## 📊 성능 지표

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🚀 배포

### Vercel (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 자동 배포 설정 완료

### 기타 플랫폼

- **Netlify**: `npm run build` → `dist` 폴더 배포
- **GitHub Pages**: GitHub Actions 워크플로우 사용
- **Firebase Hosting**: Firebase CLI 사용

## 🧪 테스팅

```bash
# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 빌드 테스트
npm run build
```

## 🔒 보안

- CSP (Content Security Policy) 설정
- XSS 방지
- HTTPS 강제 사용
- 민감한 데이터 로컬 저장 방지

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🤝 기여하기

1. 이 레포지토리를 Fork
2. 새 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

### 기여 가이드라인

- TypeScript 사용
- ESLint 규칙 준수
- 반응형 디자인 고려
- 성능 최적화 고려
- 접근성 기준 준수

## 📞 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/yourusername/ebookstore-pwa/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/yourusername/ebookstore-pwa/discussions)

## 🙏 감사의 말

- **Unsplash**: 아름다운 이미지 제공
- **shadcn/ui**: 훌륭한 UI 컴포넌트
- **Tailwind CSS**: 강력한 CSS 프레임워크
- **React 팀**: 놀라운 라이브러리

---

**📚 Made with ❤️ for book lovers**

> 독서는 마음의 양식입니다. Ebookstore와 함께 더 나은 독서 경험을 만들어보세요.

[![GitHub stars](https://img.shields.io/github/stars/yourusername/ebookstore-pwa?style=social)](https://github.com/yourusername/ebookstore-pwa)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/ebookstore-pwa?style=social)](https://github.com/yourusername/ebookstore-pwa)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/ebookstore-pwa)](https://github.com/yourusername/ebookstore-pwa/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/ebookstore-pwa)](https://github.com/yourusername/ebookstore-pwa/blob/main/LICENSE)