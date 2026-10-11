export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
  stock: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  sortBy: SortOption;
  selectedProduct: Product | null;
}
