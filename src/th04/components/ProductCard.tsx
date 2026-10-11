import React from 'react';
import type { FavoriteProduct } from '../favoritesTypes';
import { FavoriteButton } from './FavoriteButton';
import { useFavoritesStore } from '../favoritesStore';
import { Star, Check, AlertCircle, Heart } from 'lucide-react';

interface ProductCardProps {
  product: FavoriteProduct;
  onToast: (message: string, isAdded: boolean) => void;
  onSelect: (product: FavoriteProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToast,
  onSelect,
}) => {
  const isFav = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === product.id)
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleFavorite(product);
    onToast(
      added
        ? `Đã thêm "${product.title}" vào mục yêu thích!`
        : `Đã xóa "${product.title}" khỏi mục yêu thích.`,
      added
    );
  };

  return (
    <div className="th04-product-card" onClick={() => onSelect(product)}>
      {/* Top Image & Favorite Heart Button */}
      <div className="th04-img-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="th04-product-img"
          loading="lazy"
        />

        {/* Favorite Button on Image Corner */}
        <div className="th04-heart-position">
          <FavoriteButton product={product} onToggleToast={onToast} size={20} />
        </div>

        {/* Category & Stock Badges */}
        <span className="th04-category-tag">{product.category}</span>
        {product.stock <= 0 ? (
          <span className="th04-stock-tag out-of-stock">
            <AlertCircle size={12} /> Hết hàng
          </span>
        ) : (
          <span className="th04-stock-tag in-stock">
            <Check size={12} /> Còn {product.stock}
          </span>
        )}
      </div>

      {/* Product Content */}
      <div className="th04-product-body">
        <div className="th04-rating-row">
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{product.rating.rate}</span>
          </div>
          <span className="text-xs text-slate-400">({product.rating.count} đánh giá)</span>
        </div>

        <h3 className="th04-product-title" title={product.title}>
          {product.title}
        </h3>

        <div className="th04-product-footer">
          <span className="th04-price">{formatCurrency(product.price)}</span>

          <button
            type="button"
            className={`th04-quick-fav-btn ${isFav ? 'is-fav' : ''}`}
            onClick={handleToggle}
          >
            <Heart size={15} className={isFav ? 'fill-current' : ''} />
            <span>{isFav ? 'Đã thích' : 'Yêu thích'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
