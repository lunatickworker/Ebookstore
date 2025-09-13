import { useLibrary } from '@/contexts/LibraryContext';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// 👇 Image import 경로를 수정했습니다.
import { Image } from '@/components/common/Image';

type MyLibraryProps = {
  onSelectBook: (book: Book) => void;
};

export const MyLibrary = ({ onSelectBook }: MyLibraryProps) => {
  const { myBooks, removeBookFromLibrary } = useLibrary();

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6">내 서재</h2>
      {myBooks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">내 서재에 책이 없습니다.</p>
          <p className="text-muted-foreground mt-2">홈에서 원하는 책을 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {myBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <div className="cursor-pointer" onClick={() => onSelectBook(book)}>
                <CardHeader className="p-0">
                  <Image src={book.coverImage} alt={book.title} className="aspect-[2/3] w-full h-full object-cover"/>
                </CardHeader>
                <CardContent className="p-3">
                  <CardTitle className="text-md truncate">{book.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                </CardContent>
              </div>
              <CardFooter className="p-3">
                <Button variant="outline" size="sm" className="w-full" onClick={() => removeBookFromLibrary(book.id)}>
                  삭제
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};