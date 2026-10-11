import React from 'react';
import type { Product } from './productTypes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItems } from '../cart/cartSlice';
import { setSelectedProduct } from './productsSlice';
import { ShoppingCart, Star, Eye, AlertCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onShowToast }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  // Tính toán số lượng đã có trong giỏ hàng để so sánh với tồn kho
  const itemInCart = cartItems.find((item) => item.id === product.id);
  const qtyInCart = itemInCart?.quantity ?? 0;
  const isOutOfStock = product.stock <= 0;
  const isMaxStockReached = qtyInCart >= product.stock && !isOutOfStock;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOutOfStock) {
      onShowToast(`Sản phẩm "${product.title}" hiện đã hết hàng trong kho!`, 'error');
      return;
    }

    if (isMaxStockReached) {
      onShowToast(
        `Bạn đã có ${qtyInCart} sản phẩm trong giỏ (tối đa theo tồn kho hiện tại)!`,
        'warning'
      );
      return;
    }

    dispatch(addToCart({ product }));
    onShowToast(`Đã thêm "${product.title}" vào giỏ hàng!`, 'success');
  };

  const handleViewDetail = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className="product-card group">
      {/* Product Image & Badges */}
      <div className="product-image-wrapper" onClick={handleViewDetail}>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />

        {/* Stock Badge */}
        <div className="badge-container">
          {isOutOfStock ? (
            <span className="stock-badge out-of-stock">
              <AlertCircle size={12} /> Hết hàng
            </span>
          ) : product.stock <= 5 ? (
            <span className="stock-badge low-stock">
              Chỉ còn {product.stock} cái
            </span>
          ) : (
            <span className="stock-badge in-stock">
              <Check size={12} /> Còn {product.stock}
            </span>
          )}
        </div>

        {/* Quick View Overlay Button */}
        <button
          type="button"
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetail();
          }}
          title="Xem chi tiết"
        >
          <Eye size={16} /> Chi tiết
        </button>
      </div>

      {/* Product Info */}
      <div className="product-content">
        <div className="product-category-row">
          <span className="product-category-tag">{product.category}</span>
          <div className="product-rating">
            <Star size={13} className="star-icon fill-current" />
            <span className="rating-value">{product.rating.rate}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        </div>

        <h3 className="product-title" onClick={handleViewDetail} title={product.title}>
          {product.title}
        </h3>

        <p className="product-desc">{product.description}</p>

        {/* Price & Action Button */}
        <div className="product-footer">
          <div className="price-container">
            <span className="price-label">Giá niêm yết</span>
            <span className="product-price">{formatCurrency(product.price)}</span>
          </div>

          <button
            type="button"
            className={`btn-add-cart ${
              isOutOfStock
                ? 'btn-disabled'
                : isMaxStockReached
                ? 'btn-maxed'
                : 'btn-active'
            }`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxStockReached}
          >
            <ShoppingCart size={16} />
            <span>
              {isOutOfStock
                ? 'Hết hàng'
                : isMaxStockReached
                ? `Đạt tối đa (${qtyInCart})`
                : qtyInCart > 0
                ? `Thêm tiếp (${qtyInCart})`
                : 'Thêm vào giỏ'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
