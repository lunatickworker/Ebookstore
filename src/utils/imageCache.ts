// 단순한 이미지 유틸리티 - 복잡한 캐시 제거
export const WORKING_BOOK_IMAGES = [
  'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1692742593570-ca989f1febd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1674653760708-f521366e5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1747210044397-9f2d19ccf096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1619200307066-64e9f03bc039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1755188977089-3bb40306d57f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400&h=600',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&q=80&w=400&h=600&fit=crop'
];

// SVG fallback 이미지
export const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600' fill='none'%3E%3Crect width='400' height='600' fill='%23221e19'/%3E%3Crect x='50' y='100' width='300' height='400' rx='8' stroke='%23d4a574' stroke-width='2' fill='%232f2a25'/%3E%3Cpath d='M150 300L200 250L250 300' stroke='%23d4a574' stroke-width='2' fill='none'/%3E%3Ccircle cx='180' cy='220' r='15' stroke='%23d4a574' stroke-width='2' fill='none'/%3E%3Ctext x='200' y='450' text-anchor='middle' fill='%23a09688' font-family='Arial' font-size='16'%3E도서 이미지%3C/text%3E%3C/svg%3E`;

// 랜덤 이미지 선택 함수
export function getRandomBookImage(): string {
  const randomIndex = Math.floor(Math.random() * WORKING_BOOK_IMAGES.length);
  return WORKING_BOOK_IMAGES[randomIndex];
}

// 인덱스로 이미지 선택 함수
export function getBookImageByIndex(index: number): string {
  return WORKING_BOOK_IMAGES[index % WORKING_BOOK_IMAGES.length];
}

// 이미지 URL 유효성 검사 (간단한 버전)
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http') || url.startsWith('data:image');
}

// 안전한 이미지 URL 반환
export function getSafeImageUrl(url: string, fallbackIndex: number = 0): string {
  if (isValidImageUrl(url)) {
    return url;
  }
  return getBookImageByIndex(fallbackIndex);
}