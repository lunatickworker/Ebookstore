import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, fallbackSrc = "https://via.placeholder.com/150", className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
    };
  }, [src, fallbackSrc]);

  if (isLoading) {
    return <Skeleton className={className} />;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) setImgSrc(fallbackSrc);
        setHasError(true);
      }}
      {...props}
    />
  );
};

export default Image;