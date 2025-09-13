import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type LoginProps = {
  onLoginSuccess: () => void;
  navigate: (page: string) => void;
};

export const Login = ({ onLoginSuccess, navigate }: LoginProps) => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username)) {
      onLoginSuccess();
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>계속하려면 로그인하세요. (테스트: 독서왕 또는 관리자)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">사용자 이름</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="사용자 이름을 입력하세요"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">로그인</Button>
            <Button variant="link" onClick={() => navigate('register')}>계정이 없으신가요? 회원가입</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};