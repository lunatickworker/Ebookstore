# 🤝 Ebookstore PWA 기여 가이드

Ebookstore PWA 프로젝트에 관심을 가져주셔서 감사합니다! 

## 🚀 빠른 시작

### 1. 개발 환경 설정
```bash
# 리포지토리 포크 및 클론
git clone https://github.com/YOUR_USERNAME/ebookstore-pwa.git
cd ebookstore-pwa

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 2. 브랜치 전략
```bash
# 새로운 기능 개발
git checkout -b feature/새로운-기능

# 버그 수정
git checkout -b bugfix/버그-설명

# 문서 업데이트
git checkout -b docs/문서-업데이트
```

## 📋 기여 방법

### 🐛 버그 리포트
1. [Issues](https://github.com/YOUR_USERNAME/ebookstore-pwa/issues)에서 버그 리포트 템플릿 사용
2. 재현 가능한 단계 제공
3. 스크린샷이나 영상 첨부 (가능한 경우)

### 💡 기능 제안
1. 먼저 Issue로 기능 제안
2. 커뮤니티 피드백 수집
3. 승인 후 개발 시작

### 🔧 코드 기여

#### 코딩 스타일
- **TypeScript** 사용 필수
- **ESLint** 규칙 준수
- **다크 독서실 테마** 일관성 유지
- **PWA 가이드라인** 준수

#### 커밋 메시지 규칙
```bash
# 형태
type(scope): 간결한 설명

# 예시
feat(reader): 북마크 추가 기능 구현
fix(auth): 로그인 오류 수정
docs(readme): 설치 가이드 업데이트
style(ui): 다크 테마 색상 조정
refactor(admin): 관리자 페이지 코드 개선
test(utils): 이미지 캐시 테스트 추가
```

#### PR 가이드라인
1. **기능별로 작은 PR** 만들기
2. **명확한 제목과 설명** 작성
3. **테스트 통과** 확인
4. **스크린샷 첨부** (UI 변경 시)
5. **관련 이슈 링크**

## 🎯 개발 우선순위

### 🔥 높은 우선순위
- [ ] PWA 성능 최적화
- [ ] 접근성 개선
- [ ] 모바일 UX 향상
- [ ] 오프라인 기능 강화

### 📚 중간 우선순위  
- [ ] 새로운 도서 카테고리
- [ ] 검색 기능 개선
- [ ] 사용자 설정 확장
- [ ] 다국어 지원

### 🎨 낮은 우선순위
- [ ] 테마 옵션 추가
- [ ] 애니메이션 개선
- [ ] 통계 대시보드
- [ ] 소셜 기능

## 🧪 테스트

### 로컬 테스트
```bash
# 린트 검사
npm run lint

# 빌드 테스트
npm run build

# 프리뷰 확인
npm run preview
```

### PWA 테스트 체크리스트
- [ ] 모바일에서 설치 가능
- [ ] 오프라인에서 기본 기능 동작
- [ ] 다크 테마 일관성 유지
- [ ] 성능 점수 90+ 유지
- [ ] 접근성 기준 충족

## 📱 PWA 가이드라인

### 필수 준수사항
- **다크 독서실 테마** 일관성
- **오프라인 우선** 설계
- **모바일 친화적** UI
- **빠른 로딩** 시간
- **접근성** 고려

### 성능 기준
- Lighthouse Score 90+
- First Contentful Paint < 2초
- Largest Contentful Paint < 2.5초
- Cumulative Layout Shift < 0.1

## 🎨 디자인 시스템

### 색상 팔레트
```css
--primary: #d4a574;     /* 따뜻한 골드 */
--background: #1a1713;   /* 깊은 브라운 */
--card: #221e19;         /* 카드 배경 */
--accent: #c8956d;       /* 강조 색상 */
```

### 컴포넌트 가이드
- shadcn/ui 컴포넌트 활용
- 일관된 간격 시스템
- 부드러운 애니메이션
- 읽기 친화적 타이포그래피

## 📞 도움이 필요하다면

- 💬 [Discussions](https://github.com/YOUR_USERNAME/ebookstore-pwa/discussions)
- 🐛 [Issues](https://github.com/YOUR_USERNAME/ebookstore-pwa/issues)
- 📧 이메일: your-email@example.com

## 🏆 기여자 인정

모든 기여자는 README에 인정받습니다:
- 코드 기여자
- 버그 리포터  
- 기능 제안자
- 문서 개선자
- 디자인 기여자

## 📄 라이선스

이 프로젝트에 기여함으로써 MIT 라이선스 하에 코드를 배포하는 것에 동의합니다.

---

**함께 더 나은 독서 경험을 만들어가요! 📚✨**