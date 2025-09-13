import { Book, User } from '@/types';

export const allBooks: Book[] = [
  {
    id: 1,
    title: "미드나잇 라이브러리",
    author: "매트 헤이그",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    publisher: "인플루엔셜",
    publicationDate: "2021-04-28",
    pages: 400,
    description: "죽음의 문턱에서 만난 한밤의 도서관, 그곳에서 인생의 두 번째 기회를 얻다.",
    genre: "소설",
    rating: 4.5,
    tags: ["판타지", "힐링"],
    stock: 10,
  },
  {
    id: 2,
    title: "달러구트 꿈 백화점",
    author: "이미예",
    coverImage: "https://images.unsplash.com/photo-1593349349909-478631b2d39d?w=800&q=80",
    publisher: "팩토리나인",
    publicationDate: "2020-07-08",
    pages: 304,
    description: "잠들어야만 입장할 수 있는 비밀 상점, 그곳에서 가장 인기 있는 꿈을 만나다.",
    genre: "소설",
    rating: 4.7,
    tags: ["판타지", "성장"],
    stock: 15,
  },
  // ... (다른 책 데이터 추가) ...
];

export const featuredBooks: Book[] = allBooks.slice(0, 5);

export const mockUsers: User[] = [
    {
        id: 1,
        username: "독서왕",
        email: "reader@example.com",
        avatar: "https://i.pravatar.cc/150?u=reader",
        isAdmin: false,
    },
    {
        id: 2,
        username: "관리자",
        email: "admin@example.com",
        avatar: "https://i.pravatar.cc/150?u=admin",
        isAdmin: true,
    },
];