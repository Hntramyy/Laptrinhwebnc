export type ProductCategory = 'electronics' | 'fashion' | 'accessories' | 'lifestyle';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
}

export interface OrderRecord {
  id: string;
  productId: string;
  userId: string;
  userEmail: string;
  productTitle: string;
  productPrice: number;
  orderedAt: string;
  status: 'pending' | 'shipping' | 'delivered';
}