import { Book } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddNewBook } from "./AddNewBook";

type BookManagementProps = {
  books: Book[];
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (bookId: number) => void;
  onAddBook: (newBook: Omit<Book, 'id'>) => void;
};

export const BookManagement = ({ books, onUpdateBook, onDeleteBook, onAddBook }: BookManagementProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">도서 목록</h3>
        {/* 👇 onAddBook 함수를 AddNewBook 컴포넌트로 전달 */}
        <AddNewBook onAddBook={onAddBook} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>저자</TableHead>
            <TableHead>재고</TableHead>
            <TableHead>관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => onUpdateBook(book)}>수정</Button>
                <Button variant="destructive" size="sm" onClick={() => onDeleteBook(book.id)}>삭제</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};