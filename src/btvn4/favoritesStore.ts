import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { FavoritesState, FavoriteProduct } from './favoritesTypes';

/**
 * Zustand Store: favoritesStore
 * - Quản lý danh sách sản phẩm yêu thích độc lập
 * - Không cần Provider bọc toàn ứng dụng
 * - Tự động đồng bộ hóa với LocalStorage qua persist middleware
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isDrawerOpen: false,

      // Thêm sản phẩm vào danh sách yêu thích
      addFavorite: (product: FavoriteProduct) => {
        const { favorites } = get();
        if (!favorites.some((item) => item.id === product.id)) {
          set({
            favorites: [
              ...favorites,
              { ...product, addedAt: new Date().toLocaleDateString('vi-VN') },
            ],
          });
        }
      },

      // Xóa sản phẩm khỏi danh sách yêu thích
      removeFavorite: (id: number) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },

      // Toggle thêm / bỏ sản phẩm yêu thích (Trả về boolean trạng thái mới)
      toggleFavorite: (product: FavoriteProduct) => {
        const { favorites } = get();
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });
          return false; // Đã bỏ thích
        } else {
          set({
            favorites: [
              ...favorites,
              { ...product, addedAt: new Date().toLocaleDateString('vi-VN') },
            ],
          });
          return true; // Đã thêm thích
        }
      },

      // Kiểm tra sản phẩm có đang được yêu thích hay không
      isFavorite: (id: number) => {
        return get().favorites.some((item) => item.id === id);
      },

      // Xóa tất cả sản phẩm yêu thích
      clearFavorites: () => {
        set({ favorites: [] });
      },

      // Đóng / mở Drawer danh sách yêu thích
      setDrawerOpen: (open: boolean) => {
        set({ isDrawerOpen: open });
      },
    }),
    {
      name: 'ltwnc-th04-favorites-storage', // Key lưu trong LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
