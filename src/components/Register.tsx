import { useState } from 'react';
import { User, PageType } from '../App';
import { BookOpen, Eye, EyeOff, Mail, Lock, User as UserIcon, ArrowLeft, Check } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface RegisterProps {
  navigateTo: (page: PageType) => void;
  onLogin: (user: User) => void;
  imagesPreloaded?: boolean;
  preloadedImages?: string[];
}

export function Register({ navigateTo, onLogin, imagesPreloaded, preloadedImages }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!agreeToTerms) {
      newErrors.terms = '이용약관에 동의해주세요.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // 목 회원가입 처리
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        role: 'user',
        isAdmin: false,
        preferences: {
          marketing: agreeToMarketing
        }
      };
      onLogin(newUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { text: '매우 약함', color: 'text-destructive' },
      { text: '약함', color: 'text-destructive' },
      { text: '보통', color: 'text-accent' },
      { text: '강함', color: 'text-accent' },
      { text: '매우 강함', color: 'text-accent' }
    ];

    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen reading-room flex">
      {/* 독서실 분위기 강화 */}
      <div className="ambient-light"></div>
      
      {/* 좌측 배경 이미지 영역 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=800&h=1200&fit=crop"
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
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&q=80&w=400&h=300&fit=crop"
                alt="독서 여정 일러스트"
                className="w-32 h-32 mx-auto rounded-full shadow-warm mb-6"
                priority={true}
              />
            </div>
            <h2 className="text-3xl font-serif text-reading-accent mb-4">
              📖 새로운 독서 여정
            </h2>
            <p className="text-lg text-reading-text mb-6 opacity-90">
              Ebookstore와 함께 특별한 독서 경험을 시작하세요
            </p>
            
            {/* 가입 혜택 */}
            <div className="space-y-4 text-left">
              <h3 className="text-lg text-reading-accent mb-3">가입 혜택</h3>
              <div className="space-y-3 text-reading-muted">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs">🎁</span>
                  </div>
                  <span className="text-sm">신규 가입 무료 도서 3권</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs">📚</span>
                  </div>
                  <span className="text-sm">개인 맞춤 도서 추천</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs">💾</span>
                  </div>
                  <span className="text-sm">무제한 클라우드 저장</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs">📊</span>
                  </div>
                  <span className="text-sm">독서 통계 및 분석</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 우측 회원가입 폼 영역 */}
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

          {/* 회원가입 카드 */}
          <div className="book-card p-8 paper-texture warm-glow animate-fade-in">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-serif text-reading-accent">Ebookstore</h1>
              </div>
              <h2 className="text-xl text-reading-accent mb-2">독서실 회원가입</h2>
              <p className="text-reading-muted">편안한 독서 여정을 시작하세요</p>
              
              {/* 프로그레스 표시 */}
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
                <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
              </div>
            </div>

            {/* 회원가입 폼 */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  이름
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="이름을 입력하세요"
                    className={`form-input w-full pl-10 pr-4 py-3 ${errors.name ? 'border-destructive' : ''}`}
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

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
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className={`form-input w-full pl-10 pr-4 py-3 ${errors.email ? 'border-destructive' : ''}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
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
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className={`form-input w-full pl-10 pr-12 py-3 ${errors.password ? 'border-destructive' : ''}`}
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
                
                {/* 비밀번호 강도 */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300 bg-accent"
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs ${passwordStrength.color}`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                    className={`form-input w-full pl-10 pr-12 py-3 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-reading-text cursor-pointer">
                    <span className="text-accent">[필수]</span> 이용약관 및 개인정보처리방침에 동의합니다.
                    <button type="button" className="text-accent hover:text-reading-accent ml-2 underline">
                      보기
                    </button>
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={agreeToMarketing}
                    onChange={(e) => setAgreeToMarketing(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
                  />
                  <label htmlFor="marketing" className="text-sm text-reading-text cursor-pointer">
                    <span className="text-reading-muted">[선택]</span> 마케팅 정보 수신에 동의합니다.
                    <span className="block text-xs text-reading-muted mt-1">
                      신간 도서, 할인 이벤트 등의 유용한 정보를 받아보세요
                    </span>
                  </label>
                </div>
                
                {errors.terms && (
                  <p className="text-destructive text-sm">{errors.terms}</p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    <span>가입 처리 중...</span>
                  </>
                ) : (
                  <span>독서실 가입하기</span>
                )}
              </button>
            </form>

            {/* 로그인 링크 */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-reading-muted">
                이미 계정이 있으신가요?{' '}
                <button
                  onClick={() => navigateTo('login')}
                  className="text-accent hover:text-reading-accent transition-colors font-medium"
                >
                  로그인
                </button>
              </p>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-reading-muted">
              📚 무료 가입하고 156,432권의 전자책을 만나보세요
            </p>
            <p className="text-xs text-reading-muted opacity-70">
              24시간 언제든지 편안한 독서 환경을 제공합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}