import React from 'react';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '../favoritesStore';
import type { FavoriteProduct } from '../favoritesTypes';

interface FavoriteButtonProps {
  product: FavoriteProduct;
  onToggleToast?: (message: string, isAdded: boolean) => void;
  size?: number;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  onToggleToast,
  size = 18,
  className = '',
}) => {
  // Atomic selector: chỉ re-render component này khi trạng thái favorite của product.id thay đổi
  const isFav = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === product.id)
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleFavorite(product);
    if (onToggleToast) {
      if (added) {
        onToggleToast(`Đã thêm "${product.title}" vào danh sách yêu thích!`, true);
      } else {
        onToggleToast(`Đã bỏ "${product.title}" khỏi danh sách yêu thích.`, false);
      }
    }
  };

  return (
    <button
      type="button"
      className={`th04-fav-btn ${isFav ? 'is-active' : ''} ${className}`.trim()}
      onClick={handleClick}
      title={isFav ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
      aria-label={isFav ? 'Bỏ yêu thích' : 'Yêu thích'}
    >
      <Heart
        size={size}
        className={`heart-icon ${isFav ? 'fill-rose-500 text-rose-500 animate-heart-beat' : 'text-slate-400'}`}
      />
    </button>
  );
};
