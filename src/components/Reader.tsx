import { useState, useEffect } from 'react';
import { Book, Bookmark, PageType } from '../App';
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark as BookmarkIcon, 
  Settings, 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  Type, 
  Minus, 
  Plus,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

interface ReaderProps {
  book: Book | null;
  navigateTo: (page: PageType, data?: Book | null) => void;
  bookmarks: Bookmark[];
  onAddBookmark: (bookId: string, page: number, note?: string) => void;
  imagesPreloaded?: boolean;
  preloadedImages?: string[];
}

export function Reader({ book, navigateTo, bookmarks, onAddBookmark, imagesPreloaded, preloadedImages }: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(248);
  const [fontSize, setFontSize] = useState(16);
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [readerTheme, setReaderTheme] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [lineHeight, setLineHeight] = useState(1.8);
  const [fontFamily, setFontFamily] = useState('serif');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // 현재 페이지가 북마크되어 있는지 확인
    setIsBookmarked(bookmarks.some(bookmark => bookmark.page === currentPage));
  }, [currentPage, bookmarks]);

  useEffect(() => {
    // 자동 숨김 툴바
    let timeoutId: NodeJS.Timeout;
    if (showToolbar) {
      timeoutId = setTimeout(() => {
        setShowToolbar(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [showToolbar]);

  useEffect(() => {
    // 독서 시간 추적
    const startTime = Date.now();
    const interval = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      const sessionTime = Math.floor((Date.now() - startTime) / 1000);
      console.log(`Reading session: ${sessionTime} seconds`);
    };
  }, []);

  // 페이지가 변경될 때 스크롤을 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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

  const progress = (currentPage / totalPages) * 100;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setShowToolbar(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setShowToolbar(true);
    }
  };

  const handleAddBookmark = () => {
    if (book && !isBookmarked) {
      onAddBookmark(book.id.toString(), currentPage, '');
      setIsBookmarked(true);
      
      // 북마크 추가 알림 자동 숨김
      setTimeout(() => {
        setIsBookmarked(false);
      }, 2000);
    }
  };

  const getThemeClasses = () => {
    switch (readerTheme) {
      case 'light':
        return 'bg-white text-gray-900';
      case 'sepia':
        return 'bg-yellow-50 text-yellow-900';
      default:
        return 'bg-[var(--paper-bg)] text-[var(--paper-text)]';
    }
  };

  const formatReadingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEstimatedReadingTime = () => {
    const wordsPerPage = 300;
    const readingSpeed = 200; // words per minute
    const remainingPages = totalPages - currentPage;
    const remainingMinutes = Math.ceil((remainingPages * wordsPerPage) / readingSpeed);
    return remainingMinutes;
  };

  const mockContent = `
    제${currentPage}장: ${book.title}의 이야기

    ${book.description || '이 책은 독자들에게 새로운 관점과 통찰을 제공합니다.'}

    현대 사회에서 우리는 수많은 정보와 선택의 기로에 서 있습니다. 이러한 환경에서 올바른 판단을 내리고 의미 있는 삶을 살아가는 것은 그 어느 때보다 중요한 과제가 되었습니다.

    저자는 이 책을 통해 복잡한 현실 속에서도 명확한 방향성을 찾을 수 있는 방법들을 제시합니다. 각 장마다 실생활에 적용할 수 있는 구체적인 예시들을 들어가며, 독자들이 쉽게 이해하고 실천할 수 있도록 구성했습니다.

    특히 이번 장에서는 기본적인 개념들을 정리하고, 앞으로 다룰 주요 내용들에 대한 개괄적인 소개를 하겠습니다. 이를 통해 독자들은 전체적인 흐름을 파악하고, 각 주제가 어떻게 연결되어 있는지 이해할 수 있을 것입니다.

    첫 번째로 다룰 주제는 바로 '인식의 전환'입니다. 우리가 세상을 바라보는 관점이 어떻게 우리의 행동과 결과를 좌우하는지에 대해 살펴보겠습니다.

    두 번째로는 '실천의 중요성'에 대해 이야기하겠습니다. 아무리 좋은 이론과 지식을 가지고 있더라도, 실제로 행동으로 옮기지 않으면 의미가 없기 때문입니다.

    마지막으로 '지속가능한 변화'에 대해 논의하겠습니다. 일시적인 변화가 아닌, 오랫동안 유지될 수 있는 변화를 만들어내는 방법들을 제시할 것입니다.

    이 모든 과정을 통해 독자들은 자신만의 고유한 관점을 개발하고, 그에 기반한 의미 있는 행동을 취할 수 있게 될 것입니다.

    ${currentPage > 1 ? `
    앞서 논의한 내용들을 바탕으로, 이번 장에서는 더욱 구체적인 방법론들을 다루어 보겠습니다. 실제 사례들을 통해 이론이 어떻게 현실에 적용되는지 확인할 수 있을 것입니다.
    ` : ''}

    ${currentPage > 100 ? `
    이제 책의 중반부에 접어들면서, 지금까지 학습한 내용들을 통합하여 보다 포괄적인 이해를 도모해 보겠습니다.
    ` : ''}

    ${currentPage > 200 ? `
    책의 마지막 부분에서는 지금까지의 여정을 되돌아보고, 앞으로 나아가야 할 방향에 대해 생각해보는 시간을 가져보겠습니다.
    ` : ''}
  `;

  return (
    <div className="min-h-screen reading-room relative">
      {/* 진행률 바 */}
      <div className="reading-progress fixed top-0 left-0 z-50" style={{ width: `${progress}%` }}></div>

      {/* 상단 툴바 */}
      {showToolbar && (
        <div className="reader-toolbar fixed top-0 left-0 right-0 z-40 px-4 py-3 animate-slide-in">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo('book-detail', book)}
                className="btn-ghost p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-accent" />
                <div className="max-w-xs">
                  <h1 className="font-medium text-reading-text truncate">{book.title}</h1>
                  <p className="text-sm text-reading-muted truncate">{book.author}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-4 text-xs text-reading-muted mr-4">
                <span>독서시간: {formatReadingTime(readingTime)}</span>
                <span>남은시간: 약 {getEstimatedReadingTime()}분</span>
              </div>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="btn-ghost p-2"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddBookmark}
                className={`btn-ghost p-2 ${bookmarks.some(b => b.page === currentPage) ? 'text-accent' : ''}`}
              >
                <BookmarkIcon className={`w-5 h-5 ${bookmarks.some(b => b.page === currentPage) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn-ghost p-2"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="btn-ghost p-2"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 검색 바 */}
      {showSearch && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-[var(--card)] border-b border-border p-4 animate-slide-in">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="텍스트 내에서 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input w-full pl-10 pr-4 py-2"
                autoFocus
              />
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-reading-muted">
                "{searchQuery}"에 대한 검색 결과가 표시됩니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 설정 패널 */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-30 w-80 book-card p-6 animate-slide-in">
          <h3 className="text-lg text-reading-accent mb-4">독서 설정</h3>
          
          <div className="space-y-6">
            {/* 테마 설정 */}
            <div>
              <label className="block text-sm mb-3">독서 테마</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setReaderTheme('dark')}
                  className={`p-3 rounded-lg border ${readerTheme === 'dark' ? 'border-accent bg-accent/10' : 'border-border'} 
                             flex flex-col items-center space-y-1`}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-xs">다크</span>
                </button>
                <button
                  onClick={() => setReaderTheme('sepia')}
                  className={`p-3 rounded-lg border ${readerTheme === 'sepia' ? 'border-accent bg-accent/10' : 'border-border'} 
                             flex flex-col items-center space-y-1`}
                >
                  <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                  <span className="text-xs">세피아</span>
                </button>
                <button
                  onClick={() => setReaderTheme('light')}
                  className={`p-3 rounded-lg border ${readerTheme === 'light' ? 'border-accent bg-accent/10' : 'border-border'} 
                             flex flex-col items-center space-y-1`}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-xs">라이트</span>
                </button>
              </div>
            </div>

            {/* 글꼴 크기 */}
            <div>
              <label className="block text-sm mb-3">글꼴 크기</label>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="btn-ghost p-2"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="btn-ghost p-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 줄 간격 */}
            <div>
              <label className="block text-sm mb-3">줄 간격</label>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setLineHeight(Math.max(1.2, lineHeight - 0.2))}
                  className="btn-ghost p-2"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm">{lineHeight.toFixed(1)}</span>
                <button
                  onClick={() => setLineHeight(Math.min(2.5, lineHeight + 0.2))}
                  className="btn-ghost p-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 글꼴 패밀리 */}
            <div>
              <label className="block text-sm mb-3">글꼴</label>
              <div className="space-y-2">
                {[
                  { id: 'serif', name: '명조체 (Serif)', className: 'font-serif' },
                  { id: 'sans', name: '고딕체 (Sans)', className: 'font-sans' },
                  { id: 'mono', name: '고정폭 (Mono)', className: 'font-mono' }
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setFontFamily(font.id)}
                    className={`w-full text-left p-2 rounded border ${
                      fontFamily === font.id ? 'border-accent bg-accent/10' : 'border-border'
                    } ${font.className}`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 독서 통계 */}
            <div className="border-t border-border pt-4">
              <label className="block text-sm mb-3">독서 통계</label>
              <div className="space-y-2 text-xs text-reading-muted">
                <div className="flex justify-between">
                  <span>현재 세션</span>
                  <span>{formatReadingTime(readingTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>완료율</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>북마크</span>
                  <span>{bookmarks.length}개</span>
                </div>
              </div>
            </div>

            {/* 초기화 */}
            <button
              onClick={() => {
                setFontSize(16);
                setLineHeight(1.8);
                setFontFamily('serif');
                setReaderTheme('dark');
              }}
              className="btn-secondary w-full py-2 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>설정 초기화</span>
            </button>
          </div>
        </div>
      )}

      {/* 메인 독서 영역 */}
      <div 
        className="pt-16 pb-20 px-4 min-h-screen"
        onClick={() => setShowToolbar(!showToolbar)}
      >
        <div className="max-w-4xl mx-auto">
          <div 
            className={`reader-content ${getThemeClasses()} ${
              fontFamily === 'serif' ? 'font-reading' : 
              fontFamily === 'sans' ? 'font-sans' : 'font-mono'
            }`}
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: lineHeight 
            }}
          >
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-reading-muted mb-4">
                <span>페이지 {currentPage} / {totalPages}</span>
                <span>{Math.round(progress)}% 완료</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {mockContent.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4 leading-relaxed">
                    {searchQuery && paragraph.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                      paragraph.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                        part.toLowerCase() === searchQuery.toLowerCase() ? (
                          <mark key={i} className="bg-accent/30 text-accent-foreground rounded px-1">
                            {part}
                          </mark>
                        ) : part
                      )
                    ) : paragraph.trim()}
                  </p>
                )
              ))}
            </div>

            {/* 페이지 하단 정보 */}
            <div className="mt-12 pt-8 border-t border-border text-center">
              <div className="flex items-center justify-between text-sm text-reading-muted">
                <span>{book.title} - {book.author}</span>
                <span>페이지 {currentPage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="btn-ghost p-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 mx-4">
            <div className="flex items-center justify-center space-x-4 text-sm text-reading-muted mb-2">
              <span>페이지 {currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="reading-progress h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="btn-ghost p-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 페이지 터치 영역 */}
      <div className="fixed inset-0 z-10 flex pointer-events-none">
        <div 
          className="flex-1 cursor-pointer pointer-events-auto" 
          onClick={handlePrevPage}
        />
        <div className="flex-1" />
        <div 
          className="flex-1 cursor-pointer pointer-events-auto" 
          onClick={handleNextPage}
        />
      </div>

      {/* 북마크 알림 */}
      {isBookmarked && bookmarks.some(b => b.page === currentPage) && (
        <div className="fixed top-20 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg animate-fade-in z-50">
          <div className="flex items-center space-x-2">
            <BookmarkIcon className="w-4 h-4" />
            <span>북마크가 추가되었습니다</span>
          </div>
        </div>
      )}
    </div>
  );
}