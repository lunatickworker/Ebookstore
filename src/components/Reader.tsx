import { Book } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ReaderProps = {
  book: Book;
  onBack: () => void;
};

export const Reader = ({ book, onBack }: ReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = book.pages;

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto max-w-3xl flex flex-col h-[calc(100vh-150px)]">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={onBack}>← 상세 정보로</Button>
        <h2 className="text-xl font-bold text-center truncate">{book.title}</h2>
        <div className="w-24"></div>
      </div>
      <div className="flex-grow bg-white border rounded-lg p-8 text-black overflow-y-auto">
        <p className="text-lg leading-loose">
            이것은 {currentPage}페이지입니다. 이 책의 내용은 {book.description}으로 시작합니다. 
            실제 전자책 뷰어는 복잡한 구현이 필요하지만, 이 프로젝트에서는 페이지 넘김 기능만 간단히 시뮬레이션합니다. 
            총 {totalPages}페이지 중 현재 {currentPage}페이지를 보고 있습니다.
        </p>
      </div>
      <div className="flex justify-center items-center mt-4 gap-4">
        <Button onClick={goToPrevPage} disabled={currentPage === 1}><ChevronLeft/></Button>
        <span>{currentPage} / {totalPages}</span>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages}><ChevronRight/></Button>
      </div>
    </div>
  );
};