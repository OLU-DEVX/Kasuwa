import type { Category } from "./constants";

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  originalPrice: string;
  saleScale?: string;
  stock: string;
  category: Category | string;
  images: ProductImage[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
}

export interface Farmer {
  _id?: string;
  name: string;
  email: string;
  farmName?: string;
}

export type NotificationAction =
  | "added to cart"
  | "removed from cart"
  | "added to saved items"
  | "removed from saved items";
