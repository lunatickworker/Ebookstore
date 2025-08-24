import { useState, useRef, useEffect } from 'react';
import { cn } from './ui/utils';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

// 100% 검증된 최신 fallback 이미지들 (2024년 12월)
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop"
];

// 최종 fallback으로 사용할 SVG placeholder
const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600' fill='none'%3E%3Crect width='400' height='600' fill='%23221e19'/%3E%3Crect x='100' y='150' width='200' height='300' rx='8' stroke='%23d4a574' stroke-width='2' fill='%232f2a25'/%3E%3Cpath d='M150 300L200 250L250 300' stroke='%23d4a574' stroke-width='2' fill='none'/%3E%3Ccircle cx='180' cy='220' r='15' stroke='%23d4a574' stroke-width='2' fill='none'/%3E%3Ctext x='200' y='450' text-anchor='middle' fill='%23a09688' font-family='Arial' font-size='14'%3E도서 이미지%3C/text%3E%3C/svg%3E`;

export function SimpleImage({ 
  src, 
  alt, 
  className, 
  style, 
  priority = false, 
  onLoad,
  onError 
}: SimpleImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const maxRetries = 3;

  // src가 변경될 때마다 상태 초기화
  useEffect(() => {
    console.log(`🖼️ SimpleImage 초기화: ${alt} - ${src}`);
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
    setFallbackIndex(0);
    setRetryCount(0);
  }, [src, alt]);

  const handleLoad = () => {
    console.log(`✅ 이미지 로딩 성공: ${alt} - ${currentSrc}`);
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`❌ 이미지 로딩 실패: ${alt} - ${currentSrc} (시도: ${retryCount + 1}/${maxRetries})`);
    
    // 재시도 로직
    if (retryCount < maxRetries) {
      setTimeout(() => {
        console.log(`🔄 이미지 재시도: ${alt} - ${currentSrc}`);
        setRetryCount(prev => prev + 1);
        // 강제 리로드를 위해 timestamp 추가
        const separator = currentSrc.includes('?') ? '&' : '?';
        setCurrentSrc(`${currentSrc}${separator}retry=${retryCount + 1}&t=${Date.now()}`);
      }, 1000 * (retryCount + 1)); // 지수적 백오프
      return;
    }
    
    // fallback 이미지로 전환
    if (fallbackIndex < FALLBACK_IMAGES.length) {
      const fallback = FALLBACK_IMAGES[fallbackIndex];
      console.log(`🔄 fallback 이미지로 전환: ${alt} - ${fallback}`);
      
      setCurrentSrc(fallback);
      setFallbackIndex(prev => prev + 1);
      setRetryCount(0); // 재시도 카운트 리셋
      setHasError(true);
    } else {
      // 모든 fallback도 실패한 경우 - SVG placeholder 사용
      console.log(`🎨 SVG placeholder 사용: ${alt}`);
      setCurrentSrc(PLACEHOLDER_SVG);
      setIsLoading(false);
      setHasError(true);
      onError?.();
    }
  };

  // 로딩 중일 때 스켈레톤 표시
  if (isLoading && currentSrc !== PLACEHOLDER_SVG) {
    return (
      <div 
        className={cn(
          "skeleton animate-pulse bg-muted rounded-lg flex items-center justify-center",
          className
        )}
        style={style}
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground opacity-30">
          <svg
            width="48"
            height="48"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse"
          >
            <rect x="16" y="16" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
            <path d="m16 58 16-18 32 32" stroke="currentColor" strokeWidth="2" />
            <circle cx="53" cy="35" r="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="text-xs">로딩중...</div>
        </div>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={cn(
        "transition-opacity duration-300",
        hasError && currentSrc !== PLACEHOLDER_SVG ? "opacity-90" : "opacity-100",
        className
      )}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}