import { Book } from '@/types';
import { useLibrary } from '@/contexts/LibraryContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// 👇 Image import 경로를 수정했습니다.
import { Image } from '@/components/common/Image';

type BookDetailProps = {
  book: Book;
  onBack: () => void;
  onRead: () => void;
};

export const BookDetail = ({ book, onBack, onRead }: BookDetailProps) => {
  const { addBookToLibrary } = useLibrary();

  return (
    <div className="container mx-auto max-w-4xl">
      <Button variant="outline" onClick={onBack} className="mb-6">← 뒤로가기</Button>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image src={book.coverImage} alt={book.title} className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover" />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-4xl font-bold">{book.title}</h2>
          <p className="text-xl text-muted-foreground mt-2">{book.author}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500">{'★'.repeat(Math.round(book.rating))}{'☆'.repeat(5 - Math.round(book.rating))}</span>
            <span className="ml-2 text-muted-foreground">{book.rating.toFixed(1)}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {book.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <p className="mt-6 leading-relaxed">{book.description}</p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div><strong className="font-semibold">출판사:</strong> {book.publisher}</div>
              <div><strong className="font-semibold">출간일:</strong> {book.publicationDate}</div>
              <div><strong className="font-semibold">페이지:</strong> {book.pages}쪽</div>
              <div><strong className="font-semibold">재고:</strong> {book.stock > 0 ? `${book.stock}권` : '품절'}</div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button size="lg" onClick={onRead}>읽기</Button>
            <Button size="lg" variant="secondary" onClick={() => addBookToLibrary(book)}>내 서재에 추가</Button>
          </div>
        </div>
      </div>
    </div>
  );
};