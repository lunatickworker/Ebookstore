import { useState } from 'react';
import { Book, User, PageType } from '../App';
import { ArrowLeft, Star, ShoppingCart, BookOpen, Heart, Share2, Download, Clock, Tag, Users, TrendingUp } from 'lucide-react';
import { BookCoverImage, ThumbnailImage } from './OptimizedImage';

interface BookDetailProps {
  book: Book | null;
  navigateTo: (page: PageType, data?: Book | null) => void;
  user: User | null;
  onPurchase: (book: Book) => void;
  myBooks: Book[];
  imagesPreloaded?: boolean;
  preloadedImages?: string[];
}

export function BookDetail({ book, navigateTo, user, onPurchase, myBooks, imagesPreloaded, preloadedImages }: BookDetailProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'details'>('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen reading-room flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-reading-accent mb-4">책을 찾을 수 없습니다</h2>
          <button
            onClick={() => navigateTo('home')}
            className="btn-primary px-6 py-2"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const isPurchased = myBooks.some(myBook => myBook.id === book.id);
  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;

  const handlePurchase = async () => {
    if (!user) {
      navigateTo('login');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onPurchase(book);
      setIsLoading(false);
    }, 1000);
  };

  const handleRead = () => {
    navigateTo('reader', book);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'rating-star fill-current' : 'rating-star-empty'}`}
      />
    ));
  };

  // 목 데이터
  const reviews = [
    {
      id: 1,
      user: "독서가김씨",
      rating: 5,
      date: "2024-01-15",
      content: "정말 유익한 책이었습니다. 특히 실무에 바로 적용할 수 있는 내용들이 많아서 좋았어요.",
      helpful: 24
    },
    {
      id: 2,
      user: "북러버",
      rating: 4,
      date: "2024-01-10",
      content: "기대했던 것보다 더 좋았습니다. 저자의 관점이 독특하고 신선했어요.",
      helpful: 18
    },
    {
      id: 3,
      user: "야간독서러",
      rating: 5,
      date: "2024-01-05",
      content: "밤늦게 읽기에 딱 좋은 책입니다. 다크 테마에서 읽으니 눈이 편해요.",
      helpful: 31
    }
  ];

  const relatedBooks = [
    { 
      id: 101, 
      title: "관련 도서 1", 
      author: "저자명", 
      price: 15000, 
      rating: 4.5,
      image: preloadedImages?.[0] || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3"
    },
    { 
      id: 102, 
      title: "관련 도서 2", 
      author: "저자명", 
      price: 18000, 
      rating: 4.7,
      image: preloadedImages?.[1] || "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3"
    },
    { 
      id: 103, 
      title: "관련 도서 3", 
      author: "저자명", 
      price: 12000, 
      rating: 4.3,
      image: preloadedImages?.[2] || "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3"
    },
  ];

  // 책 이미지 URL 결정 (우선순위: book.image -> book.cover -> 기본 이미지)
  const bookImageUrl = book.image || book.cover || preloadedImages?.[0] || 
    `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop&crop=smart`;

  return (
    <div className="min-h-screen reading-room">
      {/* 독서실 분위기 강화 */}
      <div className="ambient-light"></div>
      
      {/* 헤더 */}
      <header className="nav-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigateTo('home')}
              className="btn-ghost mr-4 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>홈으로</span>
            </button>
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-accent" />
              <h1 className="text-lg font-serif text-reading-accent">책 상세정보</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 책 정보 (좌측) */}
          <div className="lg:col-span-2">
            <div className="book-card p-8 paper-texture warm-glow animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 책 커버 */}
                <div className="flex justify-center">
                  <div className="book-cover w-64 h-96 bg-gradient-to-br from-secondary to-muted flex items-center justify-center group overflow-hidden">
                    <BookCoverImage
                      src={bookImageUrl}
                      alt={book.title}
                      priority={true}
                      className="w-full h-full animate-book-flip transition-transform duration-500 group-hover:scale-105"
                      onLoadingComplete={() => {
                        console.log(`Book cover loaded: ${book.title}`);
                      }}
                    />
                  </div>
                </div>

                {/* 책 정보 */}
                <div className="space-y-6">
                  {/* 배지들 */}
                  <div className="flex flex-wrap gap-2">
                    {book.isNew && <span className="badge badge-success">NEW</span>}
                    {book.isBestseller && <span className="badge badge-warning">베스트셀러</span>}
                    {book.isPopular && <span className="badge badge-primary">인기</span>}
                    <span className="badge badge-secondary">{book.category}</span>
                  </div>

                  {/* 제목과 저자 */}
                  <div>
                    <h2 className="text-2xl md:text-3xl text-reading-accent mb-2">{book.title}</h2>
                    <p className="text-lg text-reading-text opacity-90">{book.author}</p>
                  </div>

                  {/* 평점 */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(book.rating || 0)}
                    </div>
                    <span className="text-reading-accent font-medium">{book.rating}</span>
                    <span className="text-reading-muted">
                      ({book.reviews?.toLocaleString()}개 리뷰)
                    </span>
                  </div>

                  {/* 가격 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl price">{book.price.toLocaleString()}원</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <>
                          <span className="price-original text-lg">{book.originalPrice.toLocaleString()}원</span>
                          <span className="badge badge-destructive">{discount}% 할인</span>
                        </>
                      )}
                    </div>
                    {book.originalPrice && book.originalPrice > book.price && (
                      <p className="text-sm text-accent">
                        {(book.originalPrice - book.price).toLocaleString()}원 절약!
                      </p>
                    )}
                  </div>

                  {/* 액션 버튼들 */}
                  <div className="space-y-3">
                    {isPurchased ? (
                      <button
                        onClick={handleRead}
                        className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>읽기 시작</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePurchase}
                        disabled={isLoading}
                        className="btn-primary w-full py-3 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                            <span>구매 처리 중...</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>구매하기</span>
                          </>
                        )}
                      </button>
                    )}

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`btn-secondary flex-1 py-2 flex items-center justify-center space-x-2 ${isFavorite ? 'text-destructive' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        <span>찜하기</span>
                      </button>
                      <button className="btn-secondary flex-1 py-2 flex items-center justify-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>공유</span>
                      </button>
                    </div>
                  </div>

                  {/* 추가 정보 */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-reading-muted">
                      <Clock className="w-4 h-4" />
                      <span>예상 독서시간: 3-4시간</span>
                    </div>
                    <div className="flex items-center space-x-2 text-reading-muted">
                      <Download className="w-4 h-4" />
                      <span>즉시 다운로드</span>
                    </div>
                    <div className="flex items-center space-x-2 text-reading-muted">
                      <Users className="w-4 h-4" />
                      <span>{book.reviews?.toLocaleString()}명이 읽었음</span>
                    </div>
                    <div className="flex items-center space-x-2 text-reading-muted">
                      <TrendingUp className="w-4 h-4" />
                      <span>이달의 인기도서</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="mt-8">
              {/* 탭 헤더 */}
              <div className="flex space-x-1 mb-6">
                {[
                  { id: 'description', label: '책 소개' },
                  { id: 'reviews', label: '리뷰' },
                  { id: 'details', label: '상세정보' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 탭 내용 */}
              <div className="book-card p-6 paper-texture">
                {activeTab === 'description' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xl text-reading-accent mb-4">책 소개</h3>
                    <p className="text-reading-text leading-relaxed">
                      {book.description || `${book.title}는 ${book.author}가 쓴 뛰어난 작품입니다. 이 책은 독자들에게 새로운 관점과 통찰을 제공하며, 
                      깊이 있는 내용으로 많은 사람들에게 사랑받고 있습니다. 특히 ${book.category} 분야에 관심이 있는 독자들에게 
                      강력히 추천하는 책입니다.`}
                    </p>
                    <p className="text-reading-text leading-relaxed">
                      저자는 이 책을 통해 복잡한 개념들을 쉽게 설명하고, 실생활에 적용할 수 있는 실용적인 조언들을 제공합니다. 
                      각 장마다 핵심 내용을 정리해두어 독자들이 내용을 쉽게 이해하고 기억할 수 있도록 구성되어 있습니다.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl text-reading-accent">독자 리뷰</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(book.rating || 0)}
                        </div>
                        <span className="text-reading-accent font-medium">{book.rating}</span>
                        <span className="text-reading-muted">({reviews.length}개 리뷰)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium text-reading-text">{review.user}</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-reading-muted">{review.date}</span>
                          </div>
                          <p className="text-reading-text mb-2">{review.content}</p>
                          <button className="text-sm text-accent hover:text-reading-accent transition-colors">
                            도움됨 ({review.helpful})
                          </button>
                        </div>
                      ))}
                    </div>

                    {user && (
                      <div className="border-t border-border pt-4">
                        <button className="btn-secondary px-4 py-2">
                          리뷰 작성하기
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xl text-reading-accent mb-4">상세 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-reading-muted">저자</span>
                          <span className="text-reading-text">{book.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-reading-muted">카테고리</span>
                          <span className="text-reading-text">{book.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-reading-muted">평점</span>
                          <span className="text-reading-text">{book.rating}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-reading-muted">리뷰 수</span>
                          <span className="text-reading-text">{book.reviews?.toLocaleString()}개</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-reading-muted">파일 형식</span>
                          <span className="text-reading-text">EPUB, PDF</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-reading-muted">파일 크기</span>
                          <span className="text-reading-text">2.4 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-reading-muted">출간일</span>
                          <span className="text-reading-text">2024년 1월</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-reading-muted">언어</span>
                          <span className="text-reading-text">한국어</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 사이드바 (우측) */}
          <div className="space-y-6">
            {/* 관련 도서 */}
            <div className="book-card p-6 paper-texture">
              <h3 className="text-lg text-reading-accent mb-4">관련 도서</h3>
              <div className="space-y-4">
                {relatedBooks.map((relatedBook, index) => (
                  <div key={relatedBook.id} className="flex space-x-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors">
                    <div className="w-12 h-16 bg-gradient-to-br from-secondary to-muted rounded flex-shrink-0 overflow-hidden">
                      <ThumbnailImage
                        src={relatedBook.image}
                        alt={relatedBook.title}
                        priority={index < 2}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-reading-text text-sm mb-1 truncate overflow-hidden">
                        {relatedBook.title}
                      </h4>
                      <p className="text-xs text-reading-muted mb-1">{relatedBook.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm price">{relatedBook.price.toLocaleString()}원</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 rating-star fill-current" />
                          <span className="text-xs text-reading-muted">{relatedBook.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 저자 정보 */}
            <div className="book-card p-6 paper-texture">
              <h3 className="text-lg text-reading-accent mb-4">저자 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">
                      {book.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-reading-text">{book.author}</h4>
                    <p className="text-sm text-reading-muted">저자</p>
                  </div>
                </div>
                <p className="text-sm text-reading-text">
                  {book.category} 분야의 전문가로, 다수의 베스트셀러를 집필한 저명한 작가입니다.
                </p>
                <button className="btn-ghost text-sm px-4 py-2 w-full">
                  저자의 다른 책 보기
                </button>
              </div>
            </div>

            {/* 독서 통계 */}
            <div className="book-card p-6 paper-texture">
              <h3 className="text-lg text-reading-accent mb-4">독서 통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-reading-muted">이 책을 읽은 사람</span>
                  <span className="text-reading-accent font-medium">{book.reviews?.toLocaleString()}명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-reading-muted">평균 독서 시간</span>
                  <span className="text-reading-accent font-medium">3.5시간</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-reading-muted">완독률</span>
                  <span className="text-reading-accent font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-reading-muted">재구매율</span>
                  <span className="text-reading-accent font-medium">12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}