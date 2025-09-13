# 기존 Ebookstore PWA 프로젝트 - Windows 패키지 설치 가이드

## ⚠️ 중요: npm init -y를 실행하지 마세요!

이미 완성된 프로젝트이므로 기존 `package.json` 파일을 유지하고 필요한 패키지들만 설치하면 됩니다.

## 1. 현재 디렉토리 확인
```bash
# 프로젝트 루트 디렉토리에 있는지 확인 (package.json이 있는 폴더)
dir package.json
# 또는
ls package.json
```

## 2. 기존 node_modules 정리 (선택사항)
```bash
# 기존 설치가 있다면 정리
rmdir /s node_modules
del package-lock.json
# 또는 PowerShell에서
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

## 3. 모든 필요한 패키지 한 번에 설치

### 방법 1: npm install (권장)
```bash
npm install
```

만약 package.json에 의존성이 없다면 아래 명령어들을 실행하세요:

### 방법 2: 모든 패키지 수동 설치

#### 핵심 React 패키지
```bash
npm install react react-dom
npm install -D @types/react @types/react-dom typescript
```

#### Vite 빌드 도구
```bash
npm install -D vite @vitejs/plugin-react
```

#### Tailwind CSS V4
```bash
npm install -D @tailwindcss/vite
```

#### shadcn/ui 관련 패키지 (한 번에 설치)
```bash
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @radix-ui/react-slot
```

#### 유틸리티 라이브러리
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
```

#### 차트 및 폼 처리
```bash
npm install recharts react-hook-form@7.55.0 @hookform/resolvers zod
```

#### 날짜 및 특수 컴포넌트
```bash
npm install date-fns react-day-picker cmdk sonner@2.0.3 vaul embla-carousel-react react-resizable-panels input-otp
```

#### PWA 관련
```bash
npm install -D vite-plugin-pwa workbox-window
```

#### 추가 유틸리티
```bash
npm install next-themes react-textarea-autosize
```

## 4. 완전한 package.json 예시

현재 프로젝트에 맞는 `package.json` 파일이 필요하다면:

```json
{
  "name": "ebookstore-pwa",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-checkbox": "^1.1.2",
    "@radix-ui/react-collapsible": "^1.1.1",
    "@radix-ui/react-context-menu": "^2.2.2",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-hover-card": "^1.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.2",
    "@radix-ui/react-navigation-menu": "^1.2.1",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.1",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.1",
    "@radix-ui/react-switch": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "lucide-react": "^0.454.0",
    "recharts": "^2.12.7",
    "react-hook-form": "7.55.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "date-fns": "^4.1.0",
    "react-day-picker": "^9.1.3",
    "cmdk": "^1.0.0",
    "sonner": "2.0.3",
    "vaul": "^1.0.0",
    "embla-carousel-react": "^8.3.0",
    "react-resizable-panels": "^2.1.4",
    "input-otp": "^1.4.1",
    "next-themes": "^0.4.3",
    "react-textarea-autosize": "^8.5.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "typescript": "^5.6.3",
    "vite": "^6.0.1",
    "@vitejs/plugin-react": "^4.3.3",
    "@tailwindcss/vite": "^4.0.0-alpha.26",
    "vite-plugin-pwa": "^0.21.1",
    "workbox-window": "^7.1.0"
  }
}
```

## 5. 설치 확인 및 실행

```bash
# 패키지 설치 확인
npm list

# TypeScript 타입 체크
npm run type-check

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 6. Windows 특별 주의사항

### PowerShell 사용 권장
```powershell
# CMD 대신 PowerShell 사용
npm install
```

### 긴 경로명 문제 해결
```bash
# npm 설정
npm config set prefer-offline true
npm config set progress false
```

### 설치 오류 시 문제해결
```bash
# npm 캐시 정리
npm cache clean --force

# Windows 권한 문제 시
npm config set registry https://registry.npmjs.org/

# 네트워크 시간초과 시
npm config set timeout 60000
```

## 7. 설치 성공 확인

모든 설치가 완료되면:

1. `node_modules` 폴더가 생성되었는지 확인
2. `package-lock.json` 파일이 생성되었는지 확인
3. `npm run dev` 명령어로 개발 서버가 정상 실행되는지 확인
4. 브라우저에서 `http://localhost:5173` (또는 표시된 주소)로 접속 확인

## 8. 자주 발생하는 오류 해결

### "Cannot find module" 오류
```bash
npm install
npm run type-check
```

### "TypeScript errors" 오류
```bash
npx tsc --noEmit --skipLibCheck
```

### 빌드 오류
```bash
npm run build
```

이제 기존 프로젝트에 필요한 모든 패키지가 설치되어 정상적으로 실행할 수 있습니다!