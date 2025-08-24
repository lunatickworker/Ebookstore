// 타입 정의
export interface AdminBook {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  sales: number;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  addedDate: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  totalPurchases: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'premium' | 'vip' | 'banned';
}

export interface CategoryStats {
  name: string;
  count: number;
  revenue: number;
}

export interface MonthlyStats {
  month: string;
  users: number;
  revenue: number;
  books: number;
}

export interface AdminStats {
  totalUsers: number;
  totalBooks: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  booksAddedThisMonth: number;
  revenueThisMonth: number;
  topCategories: CategoryStats[];
}

// 관리자 통계 데이터
export const adminStatsData: AdminStats = {
  totalUsers: 12458,
  totalBooks: 156432,
  totalRevenue: 45680000,
  activeUsers: 3421,
  newUsersThisMonth: 1205,
  booksAddedThisMonth: 387,
  revenueThisMonth: 8450000,
  topCategories: [
    { name: '자기계발', count: 34521, revenue: 12500000 },
    { name: '소설', count: 28943, revenue: 9800000 },
    { name: '인문학', count: 19832, revenue: 7200000 },
    { name: '기술', count: 15642, revenue: 8900000 },
    { name: '경영', count: 12456, revenue: 6100000 }
  ]
};

export const monthlyData: MonthlyStats[] = [
  { month: '1월', users: 850, revenue: 3200000, books: 320 },
  { month: '2월', users: 920, revenue: 3500000, books: 280 },
  { month: '3월', users: 1150, revenue: 4200000, books: 340 },
  { month: '4월', users: 980, revenue: 3800000, books: 290 },
  { month: '5월', users: 1340, revenue: 4800000, books: 410 },
  { month: '6월', users: 1205, revenue: 4500000, books: 387 }
];

export const mockBooks: AdminBook[] = [
  {
    id: 1,
    title: "디지털 미니멀리즘",
    author: "칼 뉴포트",
    category: "자기계발",
    price: 14500,
    sales: 1247,
    rating: 4.8,
    status: "active",
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "아토믹 해빗",
    author: "제임스 클리어",
    category: "자기계발",
    price: 13500,
    sales: 2156,
    rating: 4.9,
    status: "active",
    addedDate: "2024-01-10"
  },
  {
    id: 3,
    title: "사피엔스",
    author: "유발 하라리",
    category: "인문학",
    price: 16200,
    sales: 3421,
    rating: 4.7,
    status: "active",
    addedDate: "2024-01-05"
  },
  {
    id: 4,
    title: "클린 코드",
    author: "로버트 C. 마틴",
    category: "기술",
    price: 28800,
    sales: 892,
    rating: 4.6,
    status: "active",
    addedDate: "2024-01-20"
  },
  {
    id: 5,
    title: "데이터 과학자의 사고법",
    author: "김진영",
    category: "기술",
    price: 19800,
    sales: 567,
    rating: 4.5,
    status: "active",
    addedDate: "2024-01-25"
  },
  {
    id: 6,
    title: "미드나잇 라이브러리",
    author: "매트 헤이그",
    category: "소설",
    price: 12600,
    sales: 1834,
    rating: 4.4,
    status: "active",
    addedDate: "2024-01-30"
  },
  {
    id: 7,
    title: "생각에 관한 생각",
    author: "대니얼 카너먼",
    category: "인문학",
    price: 18500,
    sales: 2198,
    rating: 4.6,
    status: "active",
    addedDate: "2024-02-01"
  },
  {
    id: 8,
    title: "리팩터링",
    author: "마틴 파울러",
    category: "기술",
    price: 35000,
    sales: 743,
    rating: 4.7,
    status: "active",
    addedDate: "2024-02-05"
  }
];

export const mockUsers: AdminUser[] = [
  {
    id: 1,
    name: "김독서",
    email: "reader@example.com",
    joinDate: "2024-01-15",
    totalPurchases: 12,
    totalSpent: 180000,
    status: "active"
  },
  {
    id: 2,
    name: "이책벌레",
    email: "bookworm@example.com",
    joinDate: "2024-01-10",
    totalPurchases: 8,
    totalSpent: 124000,
    status: "active"
  },
  {
    id: 3,
    name: "박야독",
    email: "nightread@example.com",
    joinDate: "2024-01-05",
    totalPurchases: 15,
    totalSpent: 220000,
    status: "premium"
  },
  {
    id: 4,
    name: "정서점",
    email: "bookstore@example.com",
    joinDate: "2023-12-20",
    totalPurchases: 25,
    totalSpent: 350000,
    status: "vip"
  },
  {
    id: 5,
    name: "최밤독",
    email: "nightowl@example.com",
    joinDate: "2023-12-15",
    totalPurchases: 6,
    totalSpent: 89000,
    status: "active"
  },
  {
    id: 6,
    name: "한독서광",
    email: "bookmaniac@example.com",
    joinDate: "2023-11-20",
    totalPurchases: 32,
    totalSpent: 478000,
    status: "vip"
  },
  {
    id: 7,
    name: "윤문학",
    email: "literature@example.com",
    joinDate: "2024-01-20",
    totalPurchases: 9,
    totalSpent: 142000,
    status: "premium"
  },
  {
    id: 8,
    name: "조기술",
    email: "techreader@example.com",
    joinDate: "2023-12-01",
    totalPurchases: 18,
    totalSpent: 284000,
    status: "active"
  }
];

export const adminTabs = [
  { id: 'dashboard', label: '대시보드', icon: 'BarChart3' },
  { id: 'books', label: '도서 관리', icon: 'BookOpen' },
  { id: 'users', label: '사용자 관리', icon: 'Users' },
  { id: 'analytics', label: '분석', icon: 'PieChart' },
  { id: 'settings', label: '설정', icon: 'Settings' }
] as const;

export const pieChartData = adminStatsData.topCategories.map((category, index) => ({
  name: category.name,
  value: category.count,
  fill: ['#d4a574', '#c8956d', '#b8845a', '#a67c52', '#8b6914'][index]
}));

// 추가 유틸리티 함수들
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'secondary';
    case 'premium':
      return 'warning';
    case 'vip':
      return 'primary';
    case 'pending':
      return 'warning';
    default:
      return 'secondary';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const getGrowthRate = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// 관리자 권한 레벨
export const AdminRoles = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

// 도서 상태
export const BookStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DRAFT: 'draft',
} as const;

// 사용자 상태
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PREMIUM: 'premium',
  VIP: 'vip',
  BANNED: 'banned',
} as const;

// 카테고리 목록
export const categories = [
  '전체',
  '자기계발',
  '소설',
  '인문학',
  '기술',
  '경영',
  '과학',
  '예술',
  '역사',
  '철학',
  '심리학',
  '건강',
  '요리',
  '여행',
  '취미',
];

// 정렬 옵션
export const sortOptions = [
  { value: 'title', label: '제목순' },
  { value: 'author', label: '저자순' },
  { value: 'price', label: '가격순' },
  { value: 'rating', label: '평점순' },
  { value: 'sales', label: '판매량순' },
  { value: 'addedDate', label: '등록일순' },
];

// 페이지네이션 설정
export const paginationConfig = {
  itemsPerPage: 20,
  maxVisiblePages: 5,
};

// 알림 메시지
export const notifications = {
  bookAdded: '도서가 성공적으로 추가되었습니다.',
  bookUpdated: '도서 정보가 업데이트되었습니다.',
  bookDeleted: '도서가 삭제되었습니다.',
  userUpdated: '사용자 정보가 업데이트되었습니다.',
  userBanned: '사용자가 차단되었습니다.',
  settingsSaved: '설정이 저장되었습니다.',
  backupCompleted: '백업이 완료되었습니다.',
  error: '오류가 발생했습니다. 다시 시도해주세요.',
};