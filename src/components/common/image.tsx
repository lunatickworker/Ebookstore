import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/components/ui/utils'; // shadcn/ui의 cn 함수 import

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, fallbackSrc = "https://via.placeholder.com/400x600.png/020817/FFFFFF?text=No+Image", className, containerClassName, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // src가 변경될 때마다 로딩 상태 초기화
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
    };
  }, [src, fallbackSrc]);

  if (isLoading) {
    return (
        <div className={cn("flex items-center justify-center", containerClassName)}>
            <Skeleton className={cn("h-full w-full", className)} />
        </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
};