import { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { Book } from '@/types';
import { allBooks as initialBooks } from '@/api/mockData';
import { toast } from "sonner";

interface LibraryContextType {
  allBooks: Book[];
  myBooks: Book[];
  addBookToLibrary: (book: Book) => void;
  removeBookFromLibrary: (bookId: number) => void;
  updateBook: (updatedBook: Book) => void;
  deleteBook: (bookId: number) => void;
  addBook: (newBook: Omit<Book, 'id'>) => void;
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [allBooks, setAllBooks] = useState<Book[]>(initialBooks);
  const [myBooks, setMyBooks] = useState<Book[]>([]);

  const addBookToLibrary = useCallback((book: Book) => {
    if (myBooks.find(b => b.id === book.id)) {
      toast.warning(`${book.title}은(는) 이미 내 서재에 있습니다.`);
    } else {
      setMyBooks(prev => [...prev, book]);
      toast.success(`${book.title}을(를) 내 서재에 추가했습니다.`);
    }
  }, [myBooks]);

  const removeBookFromLibrary = useCallback((bookId: number) => {
    setMyBooks(prev => prev.filter(b => b.id !== bookId));
    toast.info("내 서재에서 책을 삭제했습니다.");
  }, []);

  const updateBook = useCallback((updatedBook: Book) => {
    setAllBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
    toast.success("도서 정보가 수정되었습니다.");
  }, []);

  const deleteBook = useCallback((bookId: number) => {
    setAllBooks(prev => prev.filter(b => b.id !== bookId));
    setMyBooks(prev => prev.filter(b => b.id !== bookId));
    toast.error("도서가 전체 목록에서 삭제되었습니다.");
  }, []);
  
  const addBook = useCallback((newBook: Omit<Book, 'id'>) => {
    const bookWithId = { ...newBook, id: Date.now() }; // 임시 ID 생성
    setAllBooks(prev => [bookWithId, ...prev]);
    toast.success(`${newBook.title}이(가) 추가되었습니다.`);
  }, []);

  const value = useMemo(() => ({
    allBooks,
    myBooks,
    addBookToLibrary,
    removeBookFromLibrary,
    updateBook,
    deleteBook,
    addBook,
  }), [allBooks, myBooks, addBookToLibrary, removeBookFromLibrary, updateBook, deleteBook, addBook]);

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};