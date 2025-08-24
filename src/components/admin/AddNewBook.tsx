import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
// sonner import 수정 - 버전 명시 제거
import { toast } from 'sonner';
import { ArrowLeft, Upload, BookOpen, Tag, Star, DollarSign, User, FileText, Image as ImageIcon, Save, Eye, Plus, X } from 'lucide-react';
// OptimizedImage 컴포넌트가 없으므로 일반 img 태그로 대체하는 컴포넌트 생성
import type { Book } from '../../App';

// OptimizedImage 컴포넌트 대체
const OptimizedImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = '/api/placeholder/300/400';
    }}
  />
);

// unsplash_tool이 없으므로 제거하고 대체 함수 생성
const generateImageUrl = (query: string): string => {
  // placeholder 이미지 생성 함수
  return `https://via.placeholder.com/400x600/6366f1/ffffff?text=${encodeURIComponent(query)}`;
};

interface AddNewBookProps {
  onBack: () => void;
  onSave: (book: Omit<Book, 'id'>) => void;
  preloadedImages?: string[];
}

export function AddNewBook({ onBack, onSave, preloadedImages = [] }: AddNewBookProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    originalPrice: '',
    description: '',
    category: '',
    image: '',
    customImage: '',
    rating: 4.5,
    reviews: 0,
    isNew: true,
    isPopular: false,
    isBestseller: false
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isSearchingImage, setIsSearchingImage] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const categories = [
    '소설', '에세이', '자기계발', '비즈니스', '과학', '역사',
    '철학', '예술', '종교', '여행', '요리', '건강',
    '컴퓨터', '외국어', '만화', '아동', '청소년', '기타'
  ];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSearch = async () => {
    if (!formData.title && !formData.category) {
      toast.error('도서 제목 또는 카테고리를 입력해주세요.');
      return;
    }

    setIsSearchingImage(true);
    try {
      const searchQuery = `${formData.title || formData.category} book cover`;
      // Unsplash API 호출 시뮬레이션 - 실제로는 대체 이미지 서비스 사용
      const imageUrls = [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=400'
      ];
      
      const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      setImagePreview(randomImage);
      setFormData(prev => ({ ...prev, image: randomImage }));
      
      toast.success('이미지를 찾았습니다!');
    } catch (error) {
      console.error('이미지 검색 실패:', error);
      toast.error('이미지 검색에 실패했습니다.');
    } finally {
      setIsSearchingImage(false);
    }
  };

  const handleCustomImageUrl = () => {
    if (formData.customImage) {
      setImagePreview(formData.customImage);
      setFormData(prev => ({ ...prev, image: formData.customImage }));
      toast.success('이미지가 설정되었습니다.');
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    // 필수 필드 검증
    if (!formData.title || !formData.author || !formData.price || !formData.category) {
      toast.error('필수 정보를 모두 입력해주세요.');
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error('올바른 가격을 입력해주세요.');
      return;
    }

    const newBook: Omit<Book, 'id'> = {
      title: formData.title,
      author: formData.author,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      rating: formData.rating,
      reviews: formData.reviews,
      isNew: formData.isNew,
      isPopular: formData.isPopular,
      isBestseller: formData.isBestseller
    };

    onSave(newBook);
    toast.success('새 도서가 추가되었습니다!');
  };

  const previewBook: Book = {
    id: 'preview',
    title: formData.title || '제목 없음',
    author: formData.author || '저자 미상',
    price: Number(formData.price) || 0,
    originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
    description: formData.description || '설명이 없습니다.',
    category: formData.category || '기타',
    image: imagePreview,
    rating: formData.rating,
    reviews: formData.reviews,
    isNew: formData.isNew,
    isPopular: formData.isPopular,
    isBestseller: formData.isBestseller
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setIsPreviewMode(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              편집으로 돌아가기
            </Button>
            <h1 className="text-2xl font-bold">도서 미리보기</h1>
          </div>

          {/* 미리보기 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-[2/3] w-full max-w-md mx-auto mb-4">
                    {imagePreview ? (
                      <OptimizedImage
                        src={imagePreview}
                        alt={previewBook.title}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold">{previewBook.title}</h2>
                    <p className="text-muted-foreground">{previewBook.author}</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(previewBook.rating || 0)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({previewBook.reviews})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>도서 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{previewBook.category}</Badge>
                    {previewBook.isNew && <Badge variant="default">신간</Badge>}
                    {previewBook.isPopular && <Badge variant="secondary">인기</Badge>}
                    {previewBook.isBestseller && <Badge variant="destructive">베스트셀러</Badge>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ₩{previewBook.price.toLocaleString()}
                      </span>
                      {previewBook.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₩{previewBook.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">책 소개</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {previewBook.description}
                    </p>
                  </div>

                  {tags.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">태그</h4>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={() => setIsPreviewMode(false)} variant="outline" className="flex-1">
                  계속 편집
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  저장하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              도서 관리로 돌아가기
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              새 도서 추가
            </h1>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              미리보기
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              저장하기
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 기본 정보 입력 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">도서 제목 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="도서 제목을 입력하세요"
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">저자 *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="저자명을 입력하세요"
                    className="form-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">판매가 *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0"
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">정가</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      placeholder="0"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">책 소개</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="도서에 대한 소개를 작성하세요"
                    rows={4}
                    className="form-input"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 추가 설정 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  추가 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">평점</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleInputChange('rating', Number(e.target.value))}
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviews">리뷰 수</Label>
                    <Input
                      id="reviews"
                      type="number"
                      min="0"
                      value={formData.reviews}
                      onChange={(e) => handleInputChange('reviews', Number(e.target.value))}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>도서 상태</Label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => handleInputChange('isNew', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">신간</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">인기</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => handleInputChange('isBestseller', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">베스트셀러</span>
                    </label>
                  </div>
                </div>

                {/* 태그 관리 */}
                <div className="space-y-2">
                  <Label>태그</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="태그를 입력하세요"
                      className="form-input"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 이미지 관리 - 202번째 줄 근처 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  도서 표지
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 이미지 미리보기 */}
                <div className="aspect-[2/3] w-full max-w-sm mx-auto bg-muted rounded-lg overflow-hidden">
                  {imagePreview ? (
                    <OptimizedImage
                      src={imagePreview}
                      alt="도서 표지 미리보기"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                        <p className="text-sm">표지 이미지 없음</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 이미지 검색 */}
                <div className="space-y-2">
                  <Button
                    onClick={handleImageSearch}
                    disabled={isSearchingImage}
                    className="w-full"
                    variant="outline"
                  >
                    {isSearchingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                        이미지 검색 중...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        자동 표지 이미지 검색
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    도서 제목과 카테고리를 기반으로 적합한 표지를 찾습니다
                  </p>
                </div>

                <Separator />

                {/* 직접 URL 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="customImage">직접 이미지 URL 입력</Label>
                  <div className="flex gap-2">
                    <Input
                      id="customImage"
                      value={formData.customImage}
                      onChange={(e) => handleInputChange('customImage', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="form-input"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCustomImageUrl}
                      disabled={!formData.customImage}
                    >
                      적용
                    </Button>
                  </div>
                </div>

                {/* 추천 이미지 */}
                {preloadedImages && preloadedImages.length > 0 && (
                  <div className="space-y-2">
                    <Label>추천 이미지</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {preloadedImages.slice(0, 6).map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setImagePreview(image);
                            setFormData(prev => ({ ...prev, image }));
                          }}
                          className="aspect-[2/3] rounded overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                        >
                          <OptimizedImage
                            src={image}
                            alt={`추천 이미지 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 저장 안내 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">저장 전 확인사항</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>필수 항목(*)이 모두 입력되었는지 확인하세요</li>
                  <li>도서 표지 이미지가 올바르게 표시되는지 확인하세요</li>
                  <li>가격 정보가 정확한지 확인하세요</li>
                  <li>저장 전 미리보기로 최종 확인을 권장합니다</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}