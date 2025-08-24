import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Crown, Star } from 'lucide-react';
import { mockUsers } from '../../constants/adminData';

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">활성</span>;
      case 'inactive':
        return <span className="badge badge-secondary">비활성</span>;
      case 'premium':
        return <span className="badge badge-warning">프리미엄</span>;
      case 'vip':
        return <span className="badge badge-primary">VIP</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'vip') return <Crown className="w-4 h-4 text-accent" />;
    if (status === 'premium') return <Star className="w-4 h-4 text-accent" />;
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl text-reading-accent">사용자 관리</h2>
        <div className="flex space-x-3">
          <button className="btn-secondary px-4 py-2">내보내기</button>
          <button className="btn-primary px-4 py-2">초대 발송</button>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="사용자 이름이나 이메일로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input w-full pl-10 pr-4 py-2"
          />
        </div>
        
        <div className="flex space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-input px-3 py-2"
          >
            <option value="all">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="premium">프리미엄</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="book-card paper-texture overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 text-reading-accent">사용자 정보</th>
                <th className="text-left p-4 text-reading-accent">가입일</th>
                <th className="text-left p-4 text-reading-accent">구매 횟수</th>
                <th className="text-left p-4 text-reading-accent">총 구매금액</th>
                <th className="text-left p-4 text-reading-accent">상태</th>
                <th className="text-center p-4 text-reading-accent">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-reading-text">{user.name}</span>
                          {getStatusIcon(user.status)}
                        </div>
                        <div className="text-sm text-reading-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-reading-text">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-reading-text">{user.totalPurchases}회</span>
                  </td>
                  <td className="p-4">
                    <span className="price">{user.totalSpent.toLocaleString()}원</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="btn-ghost p-2" title="보기">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost p-2" title="편집">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost p-2 text-destructive" title="비활성화">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 사용자 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="book-card p-4 text-center paper-texture">
          <div className="text-2xl price mb-1">{mockUsers.length}</div>
          <div className="text-sm text-reading-muted">총 사용자</div>
        </div>
        <div className="book-card p-4 text-center paper-texture">
          <div className="text-2xl price mb-1">
            {mockUsers.filter(user => user.status === 'active').length}
          </div>
          <div className="text-sm text-reading-muted">활성 사용자</div>
        </div>
        <div className="book-card p-4 text-center paper-texture">
          <div className="text-2xl price mb-1">
            {mockUsers.filter(user => user.status === 'premium').length +
             mockUsers.filter(user => user.status === 'vip').length}
          </div>
          <div className="text-sm text-reading-muted">유료 사용자</div>
        </div>
        <div className="book-card p-4 text-center paper-texture">
          <div className="text-2xl price mb-1">
            {mockUsers.reduce((sum, user) => sum + user.totalPurchases, 0)}
          </div>
          <div className="text-sm text-reading-muted">총 구매</div>
        </div>
        <div className="book-card p-4 text-center paper-texture">
          <div className="text-2xl price mb-1">
            {(mockUsers.reduce((sum, user) => sum + user.totalSpent, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-reading-muted">총 매출</div>
        </div>
      </div>
    </div>
  );
}