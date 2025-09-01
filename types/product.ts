export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isNew: boolean;
  isOnSale: boolean;
  slug: string;
  stock: number;
  material?: string;
  dimensions?: string;
  weight?: string;
  colors?: string[];
  features?: string[];
  reviews?: { rating: number; comment: string; user: string }[];
  sku: string;           // New required field

}