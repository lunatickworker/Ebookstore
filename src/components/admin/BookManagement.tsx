import { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { toast } from 'sonner';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  BookOpen,
  Filter,
  SortAsc,
  SortDesc,
  TrendingUp,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';
import type { Book } from '../../App';

interface BookManagementProps {
  books: Book[];
  onAddBook: () => void;
  onDeleteBook: (bookId: string | number) => void;
  onUpdateBook: (book: Book) => void;
  preloadedImages?: string[];
}

type SortField = 'title' | 'author' | 'price' | 'rating' | 'reviews' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export function BookManagement({ 
  books, 
  onAddBook, 
  onDeleteBook, 
  onUpdateBook, 
  preloadedImages = [] 
}: BookManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', '소설', '에세이', '자기계발', '비즈니스', '과학', '역사', '철학', '예술'];
  const statusOptions = [
    { value: 'all', label: '전체' },
    { value: 'new', label: '신간' },
    { value: 'popular', label: '인기' },
    { value: 'bestseller', label: '베스트셀러' }
  ];

  // 필터링 및 정렬된 도서 목록
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'new' && book.isNew) ||
                           (selectedStatus === 'popular' && book.isPopular) ||
                           (selectedStatus === 'bestseller' && book.isBestseller);

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // 정렬
    filtered.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });

    return filtered;
  }, [books, searchTerm, selectedCategory, selectedStatus, sortField, sortOrder]);

  const handleDeleteBook = (book: Book) => {
    if (window.confirm(`"${book.title}"을(를) 삭제하시겠습니까?`)) {
      onDeleteBook(book.id);
      toast.success('도서가 삭제되었습니다.');
    }
  };

  const handleQuickEdit = (book: Book, field: keyof Book, value: any) => {
    const updatedBook = { ...book, [field]: value };
    onUpdateBook(updatedBook);
    toast.success('도서 정보가 업데이트되었습니다.');
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getBookStats = () => {
    return {
      total: books.length,
      new: books.filter(book => book.isNew).length,
      popular: books.filter(book => book.isPopular).length,
      bestseller: books.filter(book => book.isBestseller).length,
      avgPrice: books.reduce((sum, book) => sum + book.price, 0) / books.length,
      totalValue: books.reduce((sum, book) => sum + book.price, 0)
    };
  };

  const stats = getBookStats();

  return (
    <div className="space-y-6">
      {/* 헤더 및 통계 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            도서 관리
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>총 {stats.total}권</span>
            <span>•</span>
            <span>신간 {stats.new}권</span>
            <span>•</span>
            <span>평균 가격 ₩{Math.round(stats.avgPrice).toLocaleString()}</span>
            <span>•</span>
            <span>총 가치 ₩{Math.round(stats.totalValue).toLocaleString()}</span>
          </div>
        </div>
        
        <Button 
          onClick={onAddBook}
          className="flex items-center gap-2 btn-primary"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          새도서추가
        </Button>
      </div>

      {/* 빠른 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">전체 도서</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.new}</p>
                <p className="text-xs text-muted-foreground">신간</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600 opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.popular}</p>
                <p className="text-xs text-muted-foreground">인기도서</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600 opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.bestseller}</p>
                <p className="text-xs text-muted-foreground">베스트셀러</p>
              </div>
              <Star className="h-8 w-8 text-red-600 opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="도서 제목이나 저자로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 form-input"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? '전체 카테고리' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              {filteredAndSortedBooks.length}개의 도서가 표시됨
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">정렬:</span>
              <div className="flex gap-1">
                {[
                  { field: 'title', label: '제목' },
                  { field: 'author', label: '저자' },
                  { field: 'price', label: '가격' },
                  { field: 'rating', label: '평점' }
                ].map(({ field, label }) => (
                  <Button
                    key={field}
                    variant={sortField === field ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => toggleSort(field as SortField)}
                    className="flex items-center gap-1"
                  >
                    {label}
                    {sortField === field && (
                      sortOrder === 'asc' ? 
                      <SortAsc className="h-3 w-3" /> : 
                      <SortDesc className="h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 도서 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedBooks.map((book) => (
          <Card key={book.id} className="book-card group hover:shadow-warm">
            <CardContent className="p-4">
              {/* 도서 표지 */}
              <div className="aspect-[2/3] mb-4 relative overflow-hidden rounded-lg bg-muted">
                {book.image ? (
                  <OptimizedImage
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* 상태 배지 */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {book.isNew && <Badge variant="default" className="text-xs">신간</Badge>}
                  {book.isPopular && <Badge variant="secondary" className="text-xs">인기</Badge>}
                  {book.isBestseller && <Badge variant="destructive" className="text-xs">베스트</Badge>}
                </div>

                {/* 액션 메뉴 */}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingBook(book)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        편집
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        미리보기
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteBook(book)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* 도서 정보 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                
                {/* 평점 */}
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(book.rating || 0)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({book.reviews || 0})
                  </span>
                </div>

                {/* 가격 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">
                      ₩{book.price.toLocaleString()}
                    </span>
                    {book.originalPrice && book.originalPrice > book.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₩{book.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                </div>

                {/* 빠른 액션 */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => setEditingBook(book)}
                  >
                    <Edit3 className="h-3 w-3 mr-1" />
                    편집
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs text-destructive hover:text-destructive"
                    onClick={() => handleDeleteBook(book)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    삭제
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 빈 상태 */}
      {filteredAndSortedBooks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">도서를 찾을 수 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              검색 조건을 변경하거나 새 도서를 추가해보세요.
            </p>
            <Button onClick={onAddBook} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              새도서추가
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 하단 요약 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              전체 {books.length}권 중 {filteredAndSortedBooks.length}권 표시됨
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={onAddBook}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                새도서추가
              </Button>
              <Button variant="outline" size="sm">
                전체 내보내기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}