import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// 👇 Props 타입 정의 추가
type UserManagementProps = {
  users: User[];
};

export const UserManagement = ({ users }: UserManagementProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">사용자 관리</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>사용자</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                {user.username}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isAdmin ? <Badge>관리자</Badge> : <Badge variant="secondary">사용자</Badge>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};