import { useState } from 'react';
import { Home } from '@/components/Home';
import { Login } from '@/components/Login';
import { Register } from '@/components/Register';
import { MyLibrary } from '@/components/MyLibrary';
import { Admin } from '@/components/Admin';
import { BookDetail } from '@/components/BookDetail';
import { Reader } from '@/components/Reader';
import { useAuth } from './contexts/AuthContext';
import { Book } from './types';
import { Button } from '@/components/ui/button';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { user, logout } = useAuth();

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    navigate('detail');
  };

  const renderPage = () => {
    if (currentPage === 'reader' && selectedBook) {
      return <Reader book={selectedBook} onBack={() => navigate('detail')} />;
    }
    if (currentPage === 'detail' && selectedBook) {
      return <BookDetail book={selectedBook} onBack={() => navigate('home')} onRead={() => navigate('reader')} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onSelectBook={handleSelectBook} navigate={navigate} />;
      case 'login':
        return <Login onLoginSuccess={() => navigate('home')} navigate={navigate} />;
      case 'register':
        return <Register onRegisterSuccess={() => navigate('login')} />;
      case 'library':
        return user ? <MyLibrary onSelectBook={handleSelectBook} /> : <Login onLoginSuccess={() => navigate('library')} navigate={navigate} />;
      case 'admin':
        return user?.isAdmin ? <Admin /> : <div className='text-center'><h2>접근 권한이 없습니다. 관리자에게 문의하세요.</h2></div>;
      default:
        return <Home onSelectBook={handleSelectBook} navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background reading-room text-foreground">
      <header className="p-4 flex justify-between items-center border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('home')}>
          📚 Ebookstore PWA
        </h1>
        <nav className="space-x-2">
          <Button variant="ghost" onClick={() => navigate('home')}>홈</Button>
          <Button variant="ghost" onClick={() => navigate('library')}>내 서재</Button>
          {user?.isAdmin && <Button variant="ghost" onClick={() => navigate('admin')}>관리자</Button>}
          {user ? (
            <Button onClick={logout}>로그아웃</Button>
          ) : (
            <Button onClick={() => navigate('login')}>로그인</Button>
          )}
        </nav>
      </header>
      <main className="p-4 md:p-6">
        {renderPage()}
      </main>
    </div>
  );
}