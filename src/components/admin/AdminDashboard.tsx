import React from 'react';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { adminStatsData, monthlyData, pieChartData } from '../../constants/adminData';
import { OptimizedImage, ThumbnailImage } from '../OptimizedImage';
import { Book } from '../../App';

// Props 인터페이스 추가
interface AdminDashboardProps {
  books: Book[];
  stats: {
    totalBooks: number;
    totalUsers: number;
    totalSales: number;
    newBooks: number;
    popularBooks: number;
    bestsellers: number;
  };
}

interface ActivityItem {
  type: 'user' | 'book' | 'sale' | 'review';
  message: string;
  time: string;
  avatar?: string;
  userInitial?: string;
}

interface PieLabelProps {
  name: string;
  percent?: number;
}

const recentActivities: ActivityItem[] = [
  { 
    type: 'user', 
    message: '새로운 사용자 가입: 김독서님', 
    time: '5분 전',
    userInitial: '김',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&q=80&w=100&h=100&fit=crop&crop=face'
  },
  { 
    type: 'book', 
    message: '신간 도서 등록: "독서의 기술"', 
    time: '15분 전',
    avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=100&h=100&fit=crop'
  },
  { 
    type: 'sale', 
    message: '도서 구매: "아토믹 해빗" - 이책벌레님', 
    time: '23분 전',
    userInitial: '이',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&q=80&w=100&h=100&fit=crop&crop=face'
  },
  { 
    type: 'review', 
    message: '새로운 리뷰: "디지털 미니멀리즘" ⭐⭐⭐⭐⭐', 
    time: '1시간 전',
    userInitial: '박',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&w=100&h=100&fit=crop'
  },
  { 
    type: 'user', 
    message: '프리미엄 가입: 박야독님', 
    time: '2시간 전',
    userInitial: '박',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&q=80&w=100&h=100&fit=crop&crop=face'
  }
];

const topBooks = [
  {
    title: "디지털 미니멀리즘",
    author: "칼 뉴포트",
    sales: 1247,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&q=80&w=80&h=120&fit=crop"
  },
  {
    title: "아토믹 해빗",
    author: "제임스 클리어",
    sales: 2156,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&q=80&w=80&h=120&fit=crop"
  },
  {
    title: "사피엔스",
    author: "유발 하라리",
    sales: 3421,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&w=80&h=120&fit=crop"
  }
];

const getActivityColor = (type: ActivityItem['type']): string => {
  switch (type) {
    case 'user':
      return 'bg-accent';
    case 'book':
      return 'bg-primary';
    case 'sale':
      return 'bg-green-500';
    case 'review':
      return 'bg-yellow-500';
    default:
      return 'bg-accent';
  }
};

const formatRevenue = (amount: number): string => {
  return (amount / 1000000).toFixed(1);
};

// Props를 받도록 함수 시그니처 수정하고 default export로 변경
const AdminDashboard: React.FC<AdminDashboardProps> = ({ books, stats }) => {
  const renderCustomizedLabel = (props: PieLabelProps) => {
    const { name, percent } = props;
    const percentValue = percent || 0;
    return `${name} ${(percentValue * 100).toFixed(0)}%`;
  };

  // 실제 전달받은 stats를 사용하되, 기본값으로 adminStatsData 사용
  const displayStats = {
    totalUsers: stats.totalUsers || adminStatsData.totalUsers,
    totalBooks: stats.totalBooks || adminStatsData.totalBooks,
    totalRevenue: stats.totalSales || adminStatsData.totalRevenue,
    activeUsers: adminStatsData.activeUsers,
    newUsersThisMonth: stats.newBooks || adminStatsData.newUsersThisMonth,
    booksAddedThisMonth: adminStatsData.booksAddedThisMonth,
    revenueThisMonth: adminStatsData.revenueThisMonth
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 관리자 환영 섹션 */}
      <div className="book-card p-6 paper-texture warm-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl text-primary-foreground font-medium">관</span>
            </div>
            <div>
              <h2 className="text-xl text-reading-accent mb-1">관리자님, 안녕하세요! 👋</h2>
              <p className="text-reading-muted">오늘도 Ebookstore 운영을 위해 수고하고 계시네요</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&w=200&h=150&fit=crop"
              alt="관리자 배경"
              className="w-24 h-18 rounded-lg opacity-60"
            />
          </div>
        </div>
      </div>

      {/* 주요 지표 - 전달받은 stats 사용 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="book-card p-6 text-center paper-texture warm-glow">
          <Users className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">{displayStats.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-reading-muted">총 사용자</div>
          <div className="text-xs text-accent mt-1">+{displayStats.newUsersThisMonth} (이번 달)</div>
        </div>

        <div className="book-card p-6 text-center paper-texture warm-glow">
          <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">{displayStats.totalBooks.toLocaleString()}</div>
          <div className="text-sm text-reading-muted">총 도서</div>
          <div className="text-xs text-accent mt-1">+{displayStats.booksAddedThisMonth} (이번 달)</div>
        </div>

        <div className="book-card p-6 text-center paper-texture warm-glow">
          <DollarSign className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">{formatRevenue(displayStats.totalRevenue)}M</div>
          <div className="text-sm text-reading-muted">총 매출 (원)</div>
          <div className="text-xs text-accent mt-1">+{formatRevenue(displayStats.revenueThisMonth)}M (이번 달)</div>
        </div>

        <div className="book-card p-6 text-center paper-texture warm-glow">
          <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">{displayStats.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-reading-muted">활성 사용자</div>
          <div className="text-xs text-accent mt-1">24시간 기준</div>
        </div>
      </div>

      {/* 나머지 차트 및 컨텐츠는 기존 코드와 동일 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6">월별 매출</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--reading-muted)" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--reading-muted)" 
                  fontSize={12}
                  tickFormatter={(value: number) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--foreground)'
                  }}
                  formatter={(value: number) => [`${formatRevenue(value)}M원`, '매출']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--accent)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6">카테고리별 도서 분포</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--foreground)'
                  }}
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()}권`, 
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 나머지 섹션들도 동일하게 유지 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6">인기 도서 Top 3</h3>
          <div className="space-y-4">
            {topBooks.map((book, index) => (
              <div key={book.title} className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/30">
                <div className="flex-shrink-0">
                  <ThumbnailImage
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-16 rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      index === 0 ? 'bg-accent text-accent-foreground' :
                      index === 1 ? 'bg-secondary text-secondary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      #{index + 1}
                    </span>
                    <h4 className="font-medium text-reading-text truncate">{book.title}</h4>
                  </div>
                  <p className="text-sm text-reading-muted">{book.author}</p>
                  <p className="text-xs text-accent">판매량: {book.sales.toLocaleString()}권</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6">최근 활동</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={`activity-${index}`} 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <div className="flex-shrink-0">
                  {activity.avatar ? (
                    <ThumbnailImage
                      src={activity.avatar}
                      alt="활동 아바타"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : activity.userInitial ? (
                    <div className={`w-8 h-8 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center`}>
                      <span className="text-xs text-white font-medium">{activity.userInitial}</span>
                    </div>
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-reading-text">{activity.message}</p>
                  <p className="text-xs text-reading-muted">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// default export로 변경
export default AdminDashboard;