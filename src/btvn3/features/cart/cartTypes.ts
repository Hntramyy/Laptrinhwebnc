import type { Product } from '../products/productTypes';

export interface CartItem {
  id: number; // Product ID
  product: Product;
  quantity: number;
}

export interface CartCoupon {
  code: string;
  discountPercent: number; // e.g. 10 for 10%
  description: string;
}

export interface CartState {
  items: CartItem[];
  appliedCoupon: CartCoupon | null;
  isDrawerOpen: boolean;
}
