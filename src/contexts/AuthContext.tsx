import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/api/mockData';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (username: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string): boolean => {
    // 실제 앱에서는 API 호출이 필요합니다.
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      toast.success(`${username}님, 환영합니다!`);
      return true;
    }
    toast.error("사용자를 찾을 수 없습니다.");
    return false;
  };

  const logout = () => {
    toast.info("로그아웃 되었습니다.");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};