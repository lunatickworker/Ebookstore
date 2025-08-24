import { useState } from 'react';
import { User, PageType } from '../App';
import { BookOpen, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface LoginProps {
  navigateTo: (page: PageType) => void;
  onLogin: (user: User) => void;
  imagesPreloaded?: boolean;
  preloadedImages?: string[];
}

export function Login({ navigateTo, onLogin, imagesPreloaded, preloadedImages }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 간단한 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    // 목 로그인 처리
    setTimeout(() => {
      if (email === 'admin@ebookstore.com' && password === 'admin123') {
        onLogin({
          id: 'admin',
          email: email,
          name: '관리자',
          role: 'admin',
          isAdmin: true
        });
      } else {
        onLogin({
          id: 'user1',
          email: email,
          name: email.split('@')[0],
          role: 'user',
          isAdmin: false
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      setEmail('admin@ebookstore.com');
      setPassword('admin123');
    } else {
      setEmail('user@example.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen reading-room flex">
      {/* 독서실 분위기 강화 */}
      <div className="ambient-light"></div>
      
      {/* 좌측 배경 이미지 영역 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&w=800&h=1200&fit=crop"
          alt="독서실 배경"
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-reading-bg/80"></div>
        
        {/* 오버레이 콘텐츠 */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&q=80&w=400&h=300&fit=crop"
                alt="독서 일러스트"
                className="w-32 h-32 mx-auto rounded-full shadow-warm mb-6"
                priority={true}
              />
            </div>
            <h2 className="text-3xl font-serif text-reading-accent mb-4">
              📚 편안한 독서 공간
            </h2>
            <p className="text-lg text-reading-text mb-6 opacity-90">
              밤늦은 독서를 위한 따뜻하고 조용한 디지털 독서실입니다
            </p>
            <div className="space-y-3 text-reading-muted">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>24시간 언제든지 접근 가능</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>수만권의 전자책 컬렉션</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>개인 맞춤 독서 환경</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 우측 로그인 폼 영역 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* 뒤로 가기 버튼 */}
          <button
            onClick={() => navigateTo('home')}
            className="btn-ghost mb-6 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </button>

          {/* 로그인 카드 */}
          <div className="book-card p-8 paper-texture warm-glow animate-fade-in">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-serif text-reading-accent">Ebookstore</h1>
              </div>
              <h2 className="text-xl text-reading-accent mb-2">독서실 입장</h2>
              <p className="text-reading-muted">편안한 독서 환경으로 들어오세요</p>
              
              {/* 작은 일러스트 아이콘 */}
              <div className="mt-4 flex justify-center space-x-4 opacity-60">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xs">📖</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xs">☕</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xs">🌙</span>
                </div>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 animate-slide-in">
                {error}
              </div>
            )}

            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className="form-input w-full pl-10 pr-4 py-3"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="form-input w-full pl-10 pr-12 py-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 옵션 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
                  />
                  <span className="text-sm text-reading-text">로그인 상태 유지</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-accent hover:text-reading-accent transition-colors"
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    <span>로그인 중...</span>
                  </>
                ) : (
                  <span>독서실 입장</span>
                )}
              </button>
            </form>

            {/* 구분선 */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-reading-muted">또는</span>
              </div>
            </div>

            {/* 데모 로그인 */}
            <div className="space-y-3">
              <p className="text-sm text-center text-reading-muted mb-4">
                빠른 체험을 위한 데모 계정
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('user')}
                  className="btn-secondary py-2 text-sm flex items-center justify-center space-x-2"
                >
                  <span className="text-xs">👤</span>
                  <span>일반 사용자</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="btn-secondary py-2 text-sm flex items-center justify-center space-x-2"
                >
                  <span className="text-xs">🛡️</span>
                  <span>관리자</span>
                </button>
              </div>
            </div>

            {/* 회원가입 링크 */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-reading-muted">
                아직 계정이 없으신가요?{' '}
                <button
                  onClick={() => navigateTo('register')}
                  className="text-accent hover:text-reading-accent transition-colors font-medium"
                >
                  회원가입
                </button>
              </p>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-reading-muted">
              🌙 밤늦은 독서를 위한 편안한 환경
            </p>
            <p className="text-xs text-reading-muted opacity-70">
              언제든지 편안하게 독서할 수 있는 24시간 개방 독서실
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}