import { useLibrary } from '@/contexts/LibraryContext';
import { mockUsers } from '@/api/mockData';
import { BookManagement } from './admin/BookManagement';
import { UserManagement } from './admin/UserManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Admin = () => {
  const { allBooks, updateBook, deleteBook, addBook } = useLibrary();
  
  // 사용자 관리 기능은 현재 목업 데이터로만 시뮬레이션합니다.
  const users = mockUsers;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">관리자 대시보드</h2>
      <Tabs defaultValue="books" className="w-full">
        <TabsList>
          <TabsTrigger value="books">도서 관리</TabsTrigger>
          <TabsTrigger value="users">사용자 관리</TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          <BookManagement 
            books={allBooks}
            onUpdateBook={updateBook}
            onDeleteBook={deleteBook}
            onAddBook={addBook}
          />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
};