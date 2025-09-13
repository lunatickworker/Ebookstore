import { Book } from '@/types';
import { featuredBooks } from '@/api/mockData';
import { Button } from '@/components/ui/button';
// 👇 CardFooter를 import 목록에서 제거했습니다.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
// 👇 Image import 경로와 대소문자를 수정했습니다.
import { Image } from '@/components/common/Image';

type HomeProps = {
  onSelectBook: (book: Book) => void;
  navigate: (page: string) => void;
};

export const Home = ({ onSelectBook, navigate }: HomeProps) => {
  return (
    <div className="container mx-auto">
      <section className="text-center my-12">
        <h2 className="text-4xl font-bold">당신을 위한 Ebookstore</h2>
        <p className="text-muted-foreground mt-4">언제 어디서든 원하는 책을 만나보세요.</p>
        <Button size="lg" className="mt-6" onClick={() => navigate('library')}>내 서재 가기</Button>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">추천 도서</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectBook(book)}>
              <CardHeader className="p-0">
                <Image 
                    src={book.coverImage} 
                    alt={book.title}
                    className="aspect-[2/3] w-full h-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg truncate">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};