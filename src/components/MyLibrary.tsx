import { useState } from 'react';
import { Book, User, Bookmark, PageType } from '../App';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Clock, 
  Calendar,
  ArrowLeft,
  Download,
  Play,
  BookmarkIcon,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { BookCoverImage, ThumbnailImage } from './OptimizedImage';

interface MyLibraryProps {
  navigateTo: (page: PageType, data?: Book | null) => void;
  user: User | null;
  myBooks: Book[];
  bookmarks: Record<string, Bookmark[]>;
  imagesPreloaded?: boolean;
  preloadedImages?: string[];
}

export function MyLibrary({ navigateTo, user, myBooks, bookmarks, imagesPreloaded, preloadedImages }: MyLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'author' | 'progress'>('recent');
  const [filterBy, setFilterBy] = useState<'all' | 'reading' | 'completed' | 'bookmarked'>('all');
  const [activeTab, setActiveTab] = useState<'library' | 'stats' | 'bookmarks'>('library');

  if (!user) {
    return (
      <div className="min-h-screen reading-room flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-reading-accent mb-4">로그인이 필요합니다</h2>
          <button
            onClick={() => navigateTo('login')}
            className="btn-primary px-6 py-2"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const filteredBooks = myBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filterBy) {
      case 'bookmarked':
        return matchesSearch && bookmarks[book.id.toString()]?.length > 0;
      case 'reading':
        return matchesSearch && bookmarks[book.id.toString()]?.length > 0;
      case 'completed':
        return matchesSearch && !bookmarks[book.id.toString()]?.length;
      default:
        return matchesSearch;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'progress':
        const aBookmarks = bookmarks[a.id.toString()]?.length || 0;
        const bBookmarks = bookmarks[b.id.toString()]?.length || 0;
        return bBookmarks - aBookmarks;
      default: // recent
        return new Date(b.purchaseDate || '').getTime() - new Date(a.purchaseDate || '').getTime();
    }
  });

  const totalBookmarks = Object.values(bookmarks).reduce((sum, bookmarkList) => sum + bookmarkList.length, 0);
  const booksWithBookmarks = Object.keys(bookmarks).filter(bookId => bookmarks[bookId].length > 0).length;
  const averageRating = myBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / myBooks.length || 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'rating-star fill-current' : 'rating-star-empty'}`}
      />
    ));
  };

  const getReadingProgress = (bookId: string) => {
    const bookmarkCount = bookmarks[bookId]?.length || 0;
    return Math.min(bookmarkCount * 10, 100); // 임시 진행률 계산
  };

  // 책 이미지 URL 생성
  const getBookImageUrl = (book: Book, index?: number) => {
    if (book.image) return book.image;
    if (book.cover) return book.cover;
    
    // 프리로드된 이미지가 있다면 사용
    if (preloadedImages && preloadedImages[index ?? 0]) {
      return preloadedImages[index ?? 0];
    }
    
    // 기본 이미지 (다양한 책 이미지)
    const bookImages = [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3'
    ];
    
    return bookImages[Number(book.id) % bookImages.length];
  };

  return (
    <div className="min-h-screen reading-room">
      {/* 독서실 분위기 강화 */}
      <div className="ambient-light"></div>
      
      {/* 헤더 */}
      <header className="nav-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo('home')}
                className="btn-ghost flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>홈으로</span>
              </button>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-accent" />
                <h1 className="text-lg font-serif text-reading-accent">내 서재</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-reading-muted">{user.name}님의 서재</span>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <nav className="category-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 py-4">
            {[
              { id: 'library', label: '내 책', icon: BookOpen },
              { id: 'stats', label: '독서 통계', icon: TrendingUp },
              { id: 'bookmarks', label: '북마크', icon: BookmarkIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id ? 'nav-link active' : 'nav-link'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'library' && (
          <div className="space-y-6">
            {/* 검색 및 필터 */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* 검색 */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="책 제목이나 저자로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input w-full pl-10 pr-4 py-2"
                />
              </div>

              {/* 필터 및 정렬 */}
              <div className="flex space-x-3">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="form-input px-3 py-2"
                >
                  <option value="all">전체</option>
                  <option value="reading">읽는 중</option>
                  <option value="completed">완독</option>
                  <option value="bookmarked">북마크</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="form-input px-3 py-2"
                >
                  <option value="recent">최근 구매순</option>
                  <option value="title">제목순</option>
                  <option value="author">저자순</option>
                  <option value="progress">진행률순</option>
                </select>

                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 통계 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="book-card p-4 text-center">
                <div className="text-2xl price mb-1">{myBooks.length}</div>
                <div className="text-sm text-reading-muted">보유 도서</div>
              </div>
              <div className="book-card p-4 text-center">
                <div className="text-2xl price mb-1">{booksWithBookmarks}</div>
                <div className="text-sm text-reading-muted">읽는 중</div>
              </div>
              <div className="book-card p-4 text-center">
                <div className="text-2xl price mb-1">{totalBookmarks}</div>
                <div className="text-sm text-reading-muted">북마크</div>
              </div>
              <div className="book-card p-4 text-center">
                <div className="text-2xl price mb-1">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-reading-muted">평균 평점</div>
              </div>
            </div>

            {/* 책 목록 */}
            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg text-reading-accent mb-2">
                  {searchQuery ? '검색 결과가 없습니다' : '아직 구매한 책이 없습니다'}
                </h3>
                <p className="text-reading-muted mb-6">
                  {searchQuery ? '다른 검색어로 시도해보세요' : '새로운 책을 구매해보세요'}
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="btn-primary px-6 py-2"
                >
                  책 둘러보기
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'book-grid' : 'space-y-4'}>
                {filteredBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className={`${viewMode === 'grid' ? 'book-card cursor-pointer' : 'book-card p-4 cursor-pointer'} 
                              animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigateTo('book-detail', book)}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        {/* 그리드 뷰 */}
                        <div className="relative">
                          <div className="book-cover bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                            <BookCoverImage
                              src={getBookImageUrl(book, index)}
                              alt={book.title}
                              priority={index < 6}
                              className="w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          
                          {/* 진행률 */}
                          <div className="absolute bottom-0 left-0 right-0 bg-card/90 p-2 rounded-b-lg">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div 
                                className="reading-progress h-1 rounded-full"
                                style={{ width: `${getReadingProgress(book.id.toString())}%` }}
                              />
                            </div>
                            <div className="text-xs text-reading-muted mt-1">
                              {getReadingProgress(book.id.toString())}% 완료
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h4 className="font-medium text-foreground mb-1 truncate overflow-hidden">{book.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(book.rating || 0)}
                            <span className="text-xs text-muted-foreground ml-1">{book.rating}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-reading-muted">
                              {book.purchaseDate && new Date(book.purchaseDate).toLocaleDateString()}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateTo('reader', book);
                              }}
                              className="btn-primary px-3 py-1 text-xs"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              읽기
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* 리스트 뷰 */
                      <div className="flex space-x-4">
                        <div className="w-16 h-24 bg-gradient-to-br from-secondary to-muted rounded flex-shrink-0 overflow-hidden">
                          <ThumbnailImage
                            src={getBookImageUrl(book, index)}
                            alt={book.title}
                            priority={index < 3}
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground mb-1 truncate overflow-hidden">{book.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(book.rating || 0)}
                            <span className="text-xs text-muted-foreground ml-1">{book.rating}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-reading-muted">
                            <span>구매일: {book.purchaseDate && new Date(book.purchaseDate).toLocaleDateString()}</span>
                            <span>진행률: {getReadingProgress(book.id.toString())}%</span>
                            {bookmarks[book.id.toString()]?.length > 0 && (
                              <span>북마크: {bookmarks[book.id.toString()].length}개</span>
                            )}
                          </div>

                          <div className="w-full bg-muted rounded-full h-1 mt-2">
                            <div 
                              className="reading-progress h-1 rounded-full"
                              style={{ width: `${getReadingProgress(book.id.toString())}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateTo('reader', book);
                            }}
                            className="btn-primary px-3 py-1 text-xs"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            읽기
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // 다운로드 기능
                            }}
                            className="btn-secondary px-3 py-1 text-xs"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            다운로드
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fade-in">
            {/* 독서 통계 대시보드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 총 독서량 */}
              <div className="book-card p-6 text-center paper-texture">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl text-reading-accent mb-2">총 독서량</h3>
                <div className="text-3xl price mb-2">{myBooks.length}</div>
                <div className="text-reading-muted">권 보유</div>
              </div>

              {/* 이번 달 목표 */}
              <div className="book-card p-6 text-center paper-texture">
                <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl text-reading-accent mb-2">이번 달 목표</h3>
                <div className="text-3xl price mb-2">{booksWithBookmarks}/3</div>
                <div className="text-reading-muted">권 완독</div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="reading-progress h-2 rounded-full"
                    style={{ width: `${Math.min((booksWithBookmarks / 3) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* 독서 시간 */}
              <div className="book-card p-6 text-center paper-texture">
                <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl text-reading-accent mb-2">독서 시간</h3>
                <div className="text-3xl price mb-2">24</div>
                <div className="text-reading-muted">시간 (이번 달)</div>
              </div>
            </div>

            {/* 카테고리별 분석 */}
            <div className="book-card p-6 paper-texture">
              <h3 className="text-xl text-reading-accent mb-6">카테고리별 독서 현황</h3>
              <div className="space-y-4">
                {Object.entries(
                  myBooks.reduce((acc, book) => {
                    const category = book.category || '기타';
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-reading-text">{category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="reading-progress h-2 rounded-full"
                          style={{ width: `${(count / myBooks.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-reading-accent font-medium w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 월별 독서 현황 */}
            <div className="book-card p-6 paper-texture">
              <h3 className="text-xl text-reading-accent mb-6">월별 독서 현황</h3>
              <div className="grid grid-cols-12 gap-1 h-32">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="flex flex-col justify-end">
                    <div 
                      className="bg-accent rounded-t"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                    <div className="text-xs text-reading-muted text-center mt-1">
                      {i + 1}월
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-reading-accent">전체 북마크</h2>
            
            {Object.entries(bookmarks).filter(([_, bookmarkList]) => bookmarkList.length > 0).length === 0 ? (
              <div className="text-center py-12">
                <BookmarkIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg text-reading-accent mb-2">북마크가 없습니다</h3>
                <p className="text-reading-muted mb-6">책을 읽으면서 북마크를 추가해보세요</p>
                <button
                  onClick={() => setActiveTab('library')}
                  className="btn-primary px-6 py-2"
                >
                  내 책 보기
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(bookmarks)
                  .filter(([_, bookmarkList]) => bookmarkList.length > 0)
                  .map(([bookId, bookmarkList]) => {
                    const book = myBooks.find(b => b.id.toString() === bookId);
                    if (!book) return null;

                    const bookIndex = myBooks.findIndex(b => b.id.toString() === bookId);

                    return (
                      <div key={bookId} className="book-card p-6 paper-texture">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-16 bg-gradient-to-br from-secondary to-muted rounded overflow-hidden">
                            <ThumbnailImage
                              src={getBookImageUrl(book, bookIndex)}
                              alt={book.title}
                              className="w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-reading-text">{book.title}</h4>
                            <p className="text-sm text-reading-muted">{book.author}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {bookmarkList.map((bookmark, index) => (
                            <div key={index} className="border-l-2 border-accent pl-4 py-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm price">페이지 {bookmark.page}</span>
                                <span className="text-xs text-reading-muted">
                                  {new Date(bookmark.date).toLocaleDateString()}
                                </span>
                              </div>
                              {bookmark.note && (
                                <p className="text-reading-text text-sm">{bookmark.note}</p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                          <button
                            onClick={() => navigateTo('reader', book)}
                            className="btn-primary px-4 py-2 text-sm"
                          >
                            이어서 읽기
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}