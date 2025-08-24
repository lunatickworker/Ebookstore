# Ebookstore PWA - Windows 설치 가이드

## 필수 선행 조건
- Node.js (버전 18 이상) 설치
- npm 또는 yarn 패키지 매니저

## 1. 프로젝트 초기화
```bash
# 새 프로젝트 폴더 생성 및 이동
mkdir ebookstore-pwa
cd ebookstore-pwa

# package.json 초기화
npm init -y
```

## 2. 핵심 의존성 설치

### React & TypeScript 기본 패키지
```bash
npm install react react-dom
npm install -D @types/react @types/react-dom typescript
```

### Vite 빌드 도구
```bash
npm install -D vite @vitejs/plugin-react
```

### Tailwind CSS V4
```bash
npm install -D @tailwindcss/vite
```

## 3. shadcn/ui 관련 패키지

### Radix UI 컴포넌트 (shadcn/ui 기반)
```bash
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-aspect-ratio
npm install @radix-ui/react-avatar
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-collapsible
npm install @radix-ui/react-context-menu
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-hover-card
npm install @radix-ui/react-label
npm install @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover
npm install @radix-ui/react-progress
npm install @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-select
npm install @radix-ui/react-separator
npm install @radix-ui/react-slider
npm install @radix-ui/react-switch
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-toggle
npm install @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-slot
```

### 유틸리티 라이브러리
```bash
npm install class-variance-authority
npm install clsx
npm install tailwind-merge
npm install lucide-react
```

### 차트 및 데이터 시각화
```bash
npm install recharts
```

### 폼 처리
```bash
npm install react-hook-form@7.55.0
npm install @hookform/resolvers
npm install zod
```

### 날짜 처리
```bash
npm install date-fns
npm install react-day-picker
```

### 특수 컴포넌트
```bash
npm install cmdk
npm install sonner@2.0.3
npm install vaul
npm install embla-carousel-react
npm install react-resizable-panels
npm install input-otp
```

## 4. PWA 관련 패키지
```bash
npm install -D vite-plugin-pwa
npm install -D workbox-window
```

## 5. 추가 유틸리티
```bash
npm install next-themes
npm install react-textarea-autosize
```

## 6. 한 번에 모든 패키지 설치하기

### 운영 의존성 (dependencies)
```bash
npm install react react-dom @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react recharts react-hook-form@7.55.0 @hookform/resolvers zod date-fns react-day-picker cmdk sonner@2.0.3 vaul embla-carousel-react react-resizable-panels input-otp next-themes react-textarea-autosize
```

### 개발 의존성 (devDependencies)
```bash
npm install -D @types/react @types/react-dom typescript vite @vitejs/plugin-react @tailwindcss/vite vite-plugin-pwa workbox-window
```

## 7. package.json 스크립트 설정

package.json 파일에 다음 스크립트를 추가하세요:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

## 8. 설치 확인
```bash
# 개발 서버 실행
npm run dev

# 타입 체크
npm run type-check

# 프로덕션 빌드
npm run build
```

## 9. Windows 특별 고려사항

### PowerShell 실행 정책 설정 (필요시)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 긴 경로명 지원 활성화 (Windows 10/11)
```
컴퓨터 구성 > 관리 템플릿 > 시스템 > 파일 시스템 > "Win32 긴 경로 사용" 정책 활성화
```

### npm 캐시 정리 (설치 오류 시)
```bash
npm cache clean --force
```

## 10. 선택적 패키지 (필요에 따라)

### 애니메이션
```bash
npm install motion/react
```

### 이미지 최적화
```bash
npm install sharp
```

### 추가 아이콘
```bash
npm install react-icons
```

## 설치 완료 후 확인사항

1. 모든 패키지가 정상적으로 설치되었는지 확인
2. TypeScript 컴파일 오류가 없는지 확인
3. 개발 서버가 정상적으로 시작되는지 확인
4. PWA 기능이 작동하는지 확인

## 문제 해결

### 권한 오류 시
```bash
# npm 권한 설정
npm config set registry https://registry.npmjs.org/
```

### 설치 속도 개선
```bash
# npm 대신 yarn 사용 (선택적)
npm install -g yarn
yarn install
```

이제 모든 필요한 패키지가 설치되었습니다. 프로젝트를 시작할 준비가 완료되었습니다!