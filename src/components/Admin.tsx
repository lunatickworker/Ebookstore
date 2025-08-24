// src/components/Admin.tsx
import React, { useState, useEffect } from 'react';
import { Book, PageType } from '../App';
import { BookManagement } from './admin/BookManagement';
import { UserManagement } from './admin/UserManagement';
import { Analytics } from './admin/Analytics';
import AdminDashboard from './admin/AdminDashboard';

interface AdminProps {
  navigateTo: (page: PageType, data?: Book | null) => void;
  books?: Book[];
  stats?: {
    totalBooks: number;
    totalUsers: number;
    totalSales: number;
    newBooks: number;
    popularBooks: number;
    bestsellers: number;
  };
  onAddBook?: () => void;
  onDeleteBook?: (bookId: string | number) => void;  // 시그니처 수정
  onUpdateBook?: (book: Book) => void;
  preloadedImages?: string[];
}

const Admin: React.FC<AdminProps> = ({ 
  navigateTo, 
  books = [], 
  stats = {
    totalBooks: 0,
    totalUsers: 0,
    totalSales: 0,
    newBooks: 0,
    popularBooks: 0,
    bestsellers: 0,
  },
  onAddBook = () => {}, 
  onDeleteBook,
  onUpdateBook,
  preloadedImages = [] 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // BookManagement에 필요한 함수들 정의
  const handleDeleteBook = onDeleteBook || ((bookId: string | number) => {
    const book = books.find(b => b.id === bookId);
    console.log('도서 삭제:', book);
    alert(`도서 삭제 기능이 구현되지 않았습니다. (ID: ${bookId})`);
  });

  const handleUpdateBook = onUpdateBook || ((book: Book) => {
    console.log('도서 업데이트:', book);
    alert(`"${book.title}" 도서 업데이트 기능이 구현되지 않았습니다.`);
  });

  const tabs = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'books', label: '도서 관리', icon: '📚' },
    { id: 'users', label: '사용자 관리', icon: '👥' },
    { id: 'analytics', label: '분석', icon: '📈' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard books={books} stats={stats} />;
      case 'books':
        return (
          <BookManagement 
            books={books} 
            onAddBook={onAddBook}
            onDeleteBook={handleDeleteBook}
            onUpdateBook={handleUpdateBook}
            preloadedImages={preloadedImages}
          />
        );
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <AdminDashboard books={books} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">관리자 패널</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                총 {stats.totalBooks}권의 도서
              </span>
              {/* 홈으로 돌아가기 버튼 */}
              <button 
                onClick={() => navigateTo('home')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <span>🏠</span>
                <span>홈으로</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Admin;