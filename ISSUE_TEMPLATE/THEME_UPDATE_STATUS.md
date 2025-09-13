# 다크 독서실 테마 - 파일 업데이트 현황

## ✅ 이미 업데이트 완료된 파일

### 1. `/App.tsx`
- 다크 테마 기본 적용 (`document.documentElement.classList.add('dark')`)
- `reading-room` 클래스 추가
- TypeScript 인터페이스 정의 유지

### 2. `/styles/globals.css`
- 전체 색상 팔레트를 다크 독서실 테마로 완전 변경
- 독서실 전용 CSS 변수 추가 (`--reading-bg`, `--paper-bg` 등)
- 독서 최적화 스타일 클래스 추가
- 타이포그래피 시스템 업데이트
- 애니메이션 및 특수 효과 추가

## ⚠️ 아직 업데이트되지 않은 파일들 (업데이트 권장)

### 메인 컴포넌트 파일들
```
/components/Home.tsx           - 메인 홈페이지 컴포넌트
/components/Login.tsx          - 로그인 페이지 컴포넌트  
/components/Register.tsx       - 회원가입 페이지 컴포넌트
/components/BookDetail.tsx     - 책 상세 페이지 컴포넌트
/components/Reader.tsx         - 전자책 뷰어 컴포넌트
/components/MyLibrary.tsx      - 내 서재 페이지 컴포넌트
/components/Admin.tsx          - 관리자 페이지 컴포넌트
```

### 이 파일들에 적용해야 할 변경사항
1. **CSS 클래스명 업데이트**: 새로운 독서실 테마 클래스 적용
   - `book-card`, `btn-primary`, `btn-secondary` 등
   - `paper-texture`, `warm-glow`, `reading-progress` 등 새 클래스 활용

2. **색상 스타일 조정**: Tailwind 클래스를 커스텀 CSS 변수로 교체
   - `bg-primary` → `bg-[var(--primary)]` 또는 커스텀 클래스
   - `text-foreground` → `text-[var(--reading-text)]`

3. **독서 친화적 레이아웃**: 
   - 버튼 디자인을 `btn-primary`, `btn-secondary` 클래스로 교체
   - 카드 디자인을 `book-card` 클래스로 교체
   - 입력 필드를 `form-input` 클래스로 교체

4. **애니메이션 추가**:
   - `animate-fade-in`, `animate-slide-in`, `animate-book-flip` 등 활용

## 🔧 업데이트가 필요 없는 파일들

### UI 컴포넌트 (shadcn/ui)
```
/components/ui/*.tsx           - CSS 변수를 사용하므로 자동으로 테마 적용됨
```

### 설정 파일들
```
/tsconfig.json                 - 변경 필요 없음
/vite.config.ts               - 변경 필요 없음
/package.json                 - 변경 필요 없음
/main.tsx                     - 변경 필요 없음
```

### 정적 파일들
```
/public/*                     - PWA 관련 파일들, 변경 필요 없음
```

## 📝 업데이트 우선순위

### 1순위 (즉시 업데이트 권장)
- `/components/Home.tsx` - 사용자가 가장 먼저 보는 페이지
- `/components/Reader.tsx` - 독서 경험의 핵심 컴포넌트

### 2순위 (중요도 높음)
- `/components/BookDetail.tsx` - 구매 결정에 중요한 페이지
- `/components/MyLibrary.tsx` - 사용자 경험 중요

### 3순위 (일반적 중요도)
- `/components/Login.tsx`
- `/components/Register.tsx`
- `/components/Admin.tsx`

## 🎨 테마 적용 예시

### 기존 코드 (업데이트 전)
```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  구매하기
</button>
```

### 새 테마 적용 (업데이트 후)
```jsx
<button className="btn-primary px-4 py-2">
  구매하기
</button>
```

### 또는 더 구체적으로
```jsx
<button className="bg-[var(--primary)] hover:bg-[var(--reading-accent)] 
                   text-[var(--primary-foreground)] px-4 py-2 rounded-[var(--radius-md)]
                   transition-all duration-300 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-warm)]
                   hover:transform hover:-translate-y-1">
  구매하기
</button>
```

## 🚀 다음 단계

1. **Home.tsx 업데이트**: 메인 페이지를 다크 독서실 테마로 변경
2. **Reader.tsx 업데이트**: 독서 인터페이스 최적화
3. **나머지 컴포넌트들 순차적 업데이트**
4. **반응형 디자인 테스트**: 모바일/태블릿에서 테마 확인
5. **접근성 테스트**: 다크 테마에서의 가독성 검증

현재는 **App.tsx**와 **styles/globals.css** 2개 파일만 업데이트되었으며,
나머지 컴포넌트들은 기존 스타일을 유지하고 있어 완전한 테마 적용을 위해서는
추가 업데이트가 필요합니다.