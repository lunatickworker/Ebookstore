import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { BookDetail } from './components/BookDetail';
import { Reader } from './components/Reader';
import { MyLibrary } from './components/MyLibrary';
import Admin from './components/Admin';
import { Register } from './components/Register';

// Export interfaces for use by components
export interface Book {
  id: string | number;
  title: string;
  author: string;
  price: number;
  image?: string;
  cover?: string;
  description?: string;
  category?: string;
  rating?: number;
  originalPrice?: number;
  purchaseDate?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
  preferences?: {
    marketing?: boolean;
  };
}

export interface Bookmark {
  page: number;
  note: string;
  date: string;
}

export type PageType = 'home' | 'login' | 'register' | 'book-detail' | 'reader' | 'my-library' | 'admin' | 'add-new-book';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [bookmarks, setBookmarks] = useState<Record<string, Bookmark[]>>({});

  useEffect(() => {
    // 다크 독서실 테마를 기본으로 적용
    document.documentElement.classList.add('dark');
    document.body.classList.add('reading-room');

    // 로컬 스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem('user');
    const savedBooks = localStorage.getItem('myBooks');
    const savedBookmarks = localStorage.getItem('bookmarks');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    if (savedBooks) {
      try {
        setMyBooks(JSON.parse(savedBooks));
      } catch (error) {
        console.error('Error parsing books data:', error);
        localStorage.removeItem('myBooks');
      }
    }
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error parsing bookmarks data:', error);
        localStorage.removeItem('bookmarks');
      }
    }
  }, []);

  const navigateTo = (page: PageType, data: Book | null = null) => {
    setCurrentPage(page);
    if (data) setSelectedBook(data);
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigateTo('home');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigateTo('home');
  };

  const purchaseBook = (book: Book) => {
    const newBooks = [...myBooks, {
      ...book,
      purchaseDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }];
    setMyBooks(newBooks);
    localStorage.setItem('myBooks', JSON.stringify(newBooks));
  };

  const addBookmark = (bookId: string, page: number, note = '') => {
    const newBookmarks = {
      ...bookmarks,
      [bookId]: [...(bookmarks[bookId] || []), { page, note, date: new Date().toISOString() }]
    };
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} user={user} logout={logout} />;
      case 'login':
        return <Login navigateTo={navigateTo} onLogin={login} />;
      case 'register':
        return <Register navigateTo={navigateTo} onLogin={login} />;
      case 'book-detail':
        return (
          <BookDetail
            book={selectedBook}
            navigateTo={navigateTo}
            user={user}
            onPurchase={purchaseBook}
            myBooks={myBooks}
          />
        );
      case 'reader':
        return (
          <Reader
            book={selectedBook}
            navigateTo={navigateTo}
            bookmarks={bookmarks[selectedBook?.id?.toString() || ''] || []}
            onAddBookmark={addBookmark}
          />
        );
      case 'my-library':
        return (
          <MyLibrary
            navigateTo={navigateTo}
            user={user}
            myBooks={myBooks}
            bookmarks={bookmarks}
          />
        );
      case 'admin':
        return (
          <Admin
            navigateTo={navigateTo}
            books={[]} // 실제 books 데이터
            stats={{
              totalBooks: 0,
              totalUsers: 0,
              totalSales: 0,
              newBooks: 0,
              popularBooks: 0,
              bestsellers: 0,
            }}
            onAddBook={() => { }} // 실제 함수 구현
            preloadedImages={[]} // 실제 이미지 배열
          />
        );
      default:
        return <Home navigateTo={navigateTo} user={user} logout={logout} />;
    }
  };

  return (
    <div className="min-h-screen bg-background reading-room">
      {renderPage()}
    </div>
  );
}