// Type definitions for Axion Lighting Solutions

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  completedAt: string;
  slug: string;
}