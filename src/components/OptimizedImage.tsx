import { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from './ui/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'skeleton' | 'none';
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoadingComplete?: () => void;
  sizes?: string;
}

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9InZhcigtLXJlYWRpbmctbXV0ZWQpIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIj48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjYwIiByeD0iOCIvPjxwYXRoIGQ9Im0yMCAyNDAgNDAtNjAgODAgMTIwIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iODAiIHI9IjE1Ii8+PC9zdmc+';

const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9InZhcigtLW11dGVkKSIgc3RvcC1vcGFjaXR5PSIwLjQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9InZhcigtLXNlY29uZGFyeSkiIHN0b3Atb3BhY2l0eT0iMC4yIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==';

// 이미지 최적화를 위한 Unsplash URL 빌더
const buildOptimizedUnsplashUrl = (
  src: string, 
  width?: number, 
  height?: number, 
  quality = 75
): string => {
  if (!src.includes('unsplash.com')) return src;
  
  const url = new URL(src);
  
  // 적절한 크기 설정 (기본값)
  if (width) url.searchParams.set('w', width.toString());
  if (height) url.searchParams.set('h', height.toString());
  
  // 품질 최적화
  url.searchParams.set('q', quality.toString());
  
  // WebP 포맷 요청 (지원되는 경우)
  url.searchParams.set('fm', 'webp');
  
  // 자동 최적화
  url.searchParams.set('auto', 'format,compress');
  
  // 도서 표지용 크롭 설정
  if (!url.searchParams.has('crop')) {
    url.searchParams.set('crop', 'smart');
    url.searchParams.set('fit', 'crop');
  }
  
  return url.toString();
};

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      priority = false,
      quality = 75,
      placeholder = 'blur',
      blurDataURL,
      fallbackSrc,
      onLoadingComplete,
      className,
      sizes,
      style,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // 최적화된 이미지 URL 생성
    const optimizedSrc = buildOptimizedUnsplashUrl(src, width, height, quality);
    const placeholderSrc = blurDataURL || BLUR_PLACEHOLDER;

    // Intersection Observer를 사용한 lazy loading
    useEffect(() => {
      if (priority || typeof window === 'undefined') return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px', // 50px 앞서 로딩 시작
          threshold: 0.1,
        }
      );

      const currentRef = imgRef.current;
      if (currentRef) {
        observer.observe(currentRef);
        observerRef.current = observer;
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [priority]);

    // 이미지 로딩 완료 핸들러
    const handleLoad = () => {
      setIsLoading(false);
      onLoadingComplete?.();
    };

    // 에러 핸들러
    const handleError = () => {
      console.warn('이미지 로딩 실패:', optimizedSrc);
      
      // 여러 단계의 fallback 시도
      if (!hasError) {
        setHasError(true);
        
        // 원본 URL로 한번 더 시도
        const img = new Image();
        img.onload = () => {
          setHasError(false);
          setIsLoading(false);
          onLoadingComplete?.();
        };
        img.onerror = () => {
          // 최종적으로 실패한 경우에만 에러 상태 유지
          setIsLoading(false);
        };
        
        // 원본 URL이 Unsplash인 경우 최소한의 파라미터로 다시 시도
        if (src.includes('unsplash.com')) {
          const fallbackUrl = new URL(src);
          fallbackUrl.searchParams.delete('w');
          fallbackUrl.searchParams.delete('h');
          fallbackUrl.searchParams.delete('q');
          fallbackUrl.searchParams.delete('fm');
          fallbackUrl.searchParams.delete('auto');
          fallbackUrl.searchParams.delete('crop');
          fallbackUrl.searchParams.delete('fit');
          img.src = fallbackUrl.toString();
        } else {
          img.src = src; // 원본 URL로 시도
        }
      } else {
        setIsLoading(false);
      }
    };

    // 스켈레톤 로더 렌더링
    const renderSkeleton = () => (
      <div
        className={cn(
          "skeleton animate-pulse bg-muted rounded-lg flex items-center justify-center",
          className
        )}
        style={style}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-muted-foreground opacity-30"
        >
          <rect x="16" y="16" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
          <path d="m16 58 16-18 32 32" stroke="currentColor" strokeWidth="2" />
          <circle cx="53" cy="35" r="7" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    );

    // 에러 상태 렌더링
    const renderError = () => (
      <div
        className={cn(
          "bg-muted rounded-lg flex items-center justify-center text-muted-foreground",
          className
        )}
        style={style}
      >
        <div className="text-center p-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-2 opacity-40"
          >
            <rect x="16" y="16" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
            <path d="m16 58 16-18 32 32" stroke="currentColor" strokeWidth="2" />
            <circle cx="53" cy="35" r="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          <p className="text-xs">이미지를 불러올 수 없습니다</p>
        </div>
      </div>
    );

    // 로딩 중이거나 뷰포트에 없는 경우
    if (!isInView && !priority) {
      return placeholder === 'skeleton' ? renderSkeleton() : (
        <div
          ref={imgRef}
          className={cn("bg-muted rounded-lg", className)}
          style={style}
        />
      );
    }

    // 에러 상태
    if (hasError) {
      return fallbackSrc ? (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          style={style}
          {...props}
        />
      ) : (
        renderError()
      );
    }

    return (
      <div className="relative overflow-hidden rounded-lg">
        {/* 블러 플레이스홀더 */}
        {placeholder === 'blur' && isLoading && (
          <img
            src={placeholderSrc}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full object-cover filter blur-sm scale-110",
              className
            )}
            style={style}
          />
        )}

        {/* 스켈레톤 로더 */}
        {placeholder === 'skeleton' && isLoading && renderSkeleton()}

        {/* 메인 이미지 */}
        <img
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            (imgRef as any).current = node;
          }}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={cn(
            "transition-opacity duration-500 rounded-lg",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          style={{
            ...style,
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-50" />
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

// 도서 표지 전용 최적화된 컴포넌트 (2024년 12월 최신 검증된 fallback 시스템)
export const BookCoverImage = forwardRef<HTMLImageElement, Omit<OptimizedImageProps, 'width' | 'height'>>(
  ({ className, src, ...props }, ref) => {
    // 기본 fallback 이미지들 - 100% 검증된 도서 이미지 (2024년 12월)
    const bookFallbacks = [
      'https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?ixlib=rb-4.1.0&q=80&w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1683871268982-a19153dbb35d?ixlib=rb-4.1.0&q=80&w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556566952-11eff3d06ed4?ixlib=rb-4.1.0&q=80&w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1632096936824-565d39f8e5eb?ixlib=rb-4.1.0&q=80&w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1693075586720-ad1cdebc35c8?ixlib=rb-4.1.0&q=80&w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1695037520057-0e9cb68f321d?ixlib=rb-4.1.0&q=80&w=400&h=600&fit=crop'
    ];
    
    // 안정적인 fallback 선택 (무작위가 아닌 순차적)
    const fallbackIndex = Math.abs((src || '').length) % bookFallbacks.length;
    const selectedFallback = bookFallbacks[fallbackIndex];
    
    return (
      <OptimizedImage
        ref={ref}
        src={src}
        fallbackSrc={selectedFallback} // 검증된 fallback 이미지 제공
        width={200}
        height={300}
        quality={80}
        placeholder="blur"
        sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 200px"
        className={cn("book-cover object-cover", className)}
        {...props}
      />
    );
  }
);

BookCoverImage.displayName = 'BookCoverImage';

// 썸네일 전용 최적화된 컴포넌트
export const ThumbnailImage = forwardRef<HTMLImageElement, Omit<OptimizedImageProps, 'width' | 'height'>>(
  ({ className, ...props }, ref) => (
    <OptimizedImage
      ref={ref}
      width={100}
      height={150}
      quality={70}
      placeholder="skeleton"
      sizes="(max-width: 768px) 80px, 100px"
      className={cn("object-cover", className)}
      {...props}
    />
  )
);

ThumbnailImage.displayName = 'ThumbnailImage';