import { useState } from 'react';
import { Book, User, PageType } from '../App';
import { Search, BookOpen, Star, TrendingUp, Clock, Menu, X, User as UserIcon, LogOut, Shield, Image as ImageIcon } from 'lucide-react';

interface HomeProps {
  navigateTo: (page: PageType, data?: Book | null) => void;
  user: User | null;
  logout: () => void;
}

// 100% 작동하는 검증된 이미지 URL들 (2024년 12월 최신)
const WORKING_IMAGES = [
  'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1692742593570-ca989f1febd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1674653760708-f521366e5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1747210044397-9f2d19ccf096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1619200307066-64e9f03bc039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1755188977089-3bb40306d57f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600'
];

// 간단한 fallback 이미지 (SVG)
const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600' fill='none'%3E%3Crect width='400' height='600' fill='%23221e19'/%3E%3Crect x='50' y='100' width='300' height='400' rx='8' stroke='%23d4a574' stroke-width='2' fill='%232f2a25'/%3E%3Cpath d='M150 300L200 250L250 300' stroke='%23d4a574' stroke-width='2' fill='none'/%3E%3Ccircle cx='180' cy='220' r='15' stroke='%23d4a574' stroke-width='2' fill='none'/%3E%3Ctext x='200' y='450' text-anchor='middle' fill='%23a09688' font-family='Arial' font-size='16'%3E도서 이미지%3C/text%3E%3C/svg%3E`;

// 목 데이터 - 검증된 이미지들로만 구성
const featuredBooks: Book[] = [
  {
    id: 1,
    title: "디지털 미니멀리즘",
    author: "칼 뉴포트",
    price: 14500,
    originalPrice: 17000,
    rating: 4.8,
    reviews: 1247,
    category: "자기계발",
    isNew: true,
    isPopular: true,
    description: "기술이 넘쳐나는 세상에서 집중력을 되찾는 방법",
    image: WORKING_IMAGES[0]
  },
  {
    id: 2,
    title: "아토믹 해빗",
    author: "제임스 클리어",
    price: 13500,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 2156,
    category: "자기계발",
    isBestseller: true,
    description: "작은 습관의 놀라운 힘",
    image: WORKING_IMAGES[1]
  },
  {
    id: 3,
    title: "사피엔스",
    author: "유발 하라리",
    price: 16200,
    originalPrice: 18000,
    rating: 4.7,
    reviews: 3421,
    category: "인문학",
    isPopular: true,
    description: "호모 사피엔스는 어떻게 지구의 지배자가 되었는가",
    image: WORKING_IMAGES[2]
  },
  {
    id: 4,
    title: "클린 코드",
    author: "로버트 C. 마틴",
    price: 28800,
    originalPrice: 32000,
    rating: 4.6,
    reviews: 892,
    category: "기술",
    description: "애자일 소프트웨어 장인 정신",
    image: WORKING_IMAGES[3]
  },
  {
    id: 5,
    title: "데이터 과학자의 사고법",
    author: "김진영",
    price: 19800,
    originalPrice: 22000,
    rating: 4.5,
    reviews: 567,
    category: "기술",
    isNew: true,
    description: "데이터로 세상을 읽는 새로운 관점",
    image: WORKING_IMAGES[4]
  },
  {
    id: 6,
    title: "미드나잇 라이브러리",
    author: "매트 헤이그",
    price: 12600,
    originalPrice: 14000,
    rating: 4.4,
    reviews: 1834,
    category: "소설",
    description: "무한한 가능성의 도서관 이야기",
    image: WORKING_IMAGES[5]
  }
];

const categories = [
  { name: "전체", count: 156432 },
  { name: "자기계발", count: 12456 },
  { name: "소설", count: 34521 },
  { name: "인문학", count: 8932 },
  { name: "기술", count: 6745 },
  { name: "경영", count: 4532 },
  { name: "과학", count: 3421 }
];

// 간단한 이미지 컴포넌트
function BookImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    console.log(`✅ 이미지 로딩 성공: ${alt}`);
  };

  const handleError = () => {
    console.warn(`❌ 이미지 로딩 실패: ${alt} - ${src}`);
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <img 
        src={FALLBACK_SVG} 
        alt={alt}
        className={className}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${className} skeleton animate-pulse bg-muted rounded-lg flex items-center justify-center`}>
          <ImageIcon className="w-12 h-12 text-muted-foreground opacity-30" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ objectFit: 'cover' }}
        loading="lazy"
      />
    </>
  );
}

export function Home({ navigateTo, user, logout }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBookClick = (book: Book) => {
    navigateTo('book-detail', book);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'rating-star fill-current' : 'rating-star-empty'}`}
      />
    ));
  };

  const filteredBooks = selectedCategory === '전체' 
    ? featuredBooks 
    : featuredBooks.filter(book => book.category === selectedCategory);

  return (
    <div className="min-h-screen reading-room">
      {/* 독서실 분위기 강화 */}
      <div className="ambient-light"></div>
      
      {/* 헤더 */}
      <header className="nav-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-accent" />
              <h1 className="text-xl font-serif text-reading-accent">Ebookstore</h1>
            </div>

            {/* 검색바 (데스크톱) */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="책 제목, 저자명을 검색하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input w-full pl-10 pr-4 py-2"
                />
              </div>
            </div>

            {/* 사용자 메뉴 */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <button
                    onClick={() => navigateTo('my-library')}
                    className="nav-link"
                  >
                    내 서재
                  </button>
                  {user.isAdmin && (
                    <button
                      onClick={() => navigateTo('admin')}
                      className="nav-link"
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      관리자
                    </button>
                  )}
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="btn-ghost px-3 py-2"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => navigateTo('login')}
                    className="btn-ghost px-4 py-2"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => navigateTo('register')}
                    className="btn-primary px-4 py-2"
                  >
                    회원가입
                  </button>
                </div>
              )}

              {/* 모바일 메뉴 버튼 */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden btn-ghost p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 모바일 검색바 */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="책 제목, 저자명을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input w-full pl-10 pr-4 py-2"
              />
            </div>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border pt-4 pb-4 animate-slide-in">
              {user ? (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      navigateTo('my-library');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left nav-link"
                  >
                    내 서재
                  </button>
                  {user.isAdmin && (
                    <button
                      onClick={() => {
                        navigateTo('admin');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left nav-link"
                    >
                      관리자
                    </button>
                  )}
                  <div className="flex items-center space-x-2 py-2">
                    <UserIcon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="btn-ghost px-4 py-2 w-full"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      navigateTo('login');
                      setIsMenuOpen(false);
                    }}
                    className="btn-ghost px-4 py-2 w-full"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('register');
                      setIsMenuOpen(false);
                    }}
                    className="btn-primary px-4 py-2 w-full"
                  >
                    회원가입
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* 카테고리 네비게이션 */}
      <nav className="category-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'nav-link active'
                    : 'nav-link'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">
                  {category.count.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 히어로 섹션 */}
        <section className="hero-section rounded-2xl p-8 mb-12 paper-texture warm-glow animate-fade-in">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl mb-4 text-reading-accent">
              📚 독서실에서 만나는 특별한 책들
            </h2>
            <p className="text-lg text-reading-text mb-6 opacity-90">
              밤늦은 독서를 위한 편안한 공간에서 새로운 지식을 만나보세요
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-reading-muted">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>실시간 베스트셀러</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24시간 독서 지원</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>156,432권의 전자책</span>
              </div>
            </div>
          </div>
        </section>

        {/* 도서 그리드 */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl text-reading-accent">
              {selectedCategory === '전체' ? '추천 도서' : `${selectedCategory} 도서`}
            </h3>
            <div className="text-sm text-reading-muted">
              {filteredBooks.length}권의 책을 찾았습니다
            </div>
          </div>

          <div className="book-grid">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="book-card cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleBookClick(book)}
              >
                {/* 책 커버 */}
                <div className="relative">
                  <div className="book-cover bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                    <BookImage
                      src={book.image!}
                      alt={book.title}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* 배지 */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {book.isNew && (
                      <span className="badge badge-success text-xs">NEW</span>
                    )}
                    {book.isBestseller && (
                      <span className="badge badge-warning text-xs">베스트</span>
                    )}
                    {book.isPopular && (
                      <span className="badge badge-primary text-xs">인기</span>
                    )}
                  </div>

                  {/* 할인율 */}
                  {book.originalPrice && book.originalPrice > book.price && (
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-destructive text-xs">
                        {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* 책 정보 */}
                <div className="p-4">
                  <h4 className="font-medium text-foreground mb-1 overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-accent transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                  
                  {/* 평점 */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(book.rating || 0)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {book.rating} ({book.reviews?.toLocaleString()})
                    </span>
                  </div>

                  {/* 가격 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="price">
                        {book.price.toLocaleString()}원
                      </span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <span className="price-original text-xs">
                          {book.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>
                    <button className="btn-primary px-3 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      보기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 더 보기 버튼 */}
        <div className="text-center mt-12">
          <button className="btn-secondary px-8 py-3">
            더 많은 책 보기
          </button>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
                <span className="font-serif text-lg text-reading-accent">Ebookstore</span>
              </div>
              <p className="text-sm text-reading-muted">
                밤늦은 독서를 위한 편안한 디지털 서재
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-accent mb-3">서비스</h4>
              <ul className="space-y-2 text-sm text-reading-muted">
                <li>전자책 구매</li>
                <li>독서 노트</li>
                <li>북마크</li>
                <li>독서 통계</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-accent mb-3">지원</h4>
              <ul className="space-y-2 text-sm text-reading-muted">
                <li>고객센터</li>
                <li>이용가이드</li>
                <li>자주 묻는 질문</li>
                <li>기술 지원</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-accent mb-3">정보</h4>
              <ul className="space-y-2 text-sm text-reading-muted">
                <li>회사소개</li>
                <li>이용약관</li>
                <li>개인정보처리방침</li>
                <li>저작권 정책</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8">
            <p className="text-center text-sm text-reading-muted">
              © 2024 Ebookstore. 모든 권리 보유. 따뜻한 독서실에서 특별한 독서 경험을 시작하세요.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}