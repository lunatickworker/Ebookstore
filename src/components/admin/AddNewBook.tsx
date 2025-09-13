import { useState } from 'react';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type AddNewBookProps = {
  onAddBook: (newBook: Omit<Book, 'id'>) => void;
};

export const AddNewBook = ({ onAddBook }: AddNewBookProps) => {
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '', author: '', coverImage: '', publisher: '', publicationDate: '',
    pages: 0, description: '', genre: '', rating: 0, tags: [], stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: name === 'pages' || name === 'stock' || name === 'rating' ? Number(value) : value }));
  };
  
  const handleSubmit = () => {
    // 👇 onAddBook 함수 호출 시 newBook 객체를 인자로 전달
    onAddBook(newBook);
    // 상태 초기화 및 다이얼로그 닫기 로직 추가 가능
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>새 책 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새로운 도서 추가</DialogTitle>
          <DialogDescription>추가할 도서의 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">제목</Label>
                <Input id="title" name="title" value={newBook.title} onChange={handleChange} className="col-span-3" />
            </div>
            {/* ... 다른 input 필드들 ... */}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};