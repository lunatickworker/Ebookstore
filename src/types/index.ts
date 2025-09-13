export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  description: string;
  genre: string;
  rating: number;
  tags: string[];
  stock: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}