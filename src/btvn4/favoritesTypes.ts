export interface FavoriteProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  addedAt?: string;
}

export interface FavoritesState {
  favorites: FavoriteProduct[];
  isDrawerOpen: boolean;
  
  // Actions
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (product: FavoriteProduct) => boolean; // Trả về true nếu vừa thêm, false nếu vừa xóa
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
  setDrawerOpen: (open: boolean) => void;
}
