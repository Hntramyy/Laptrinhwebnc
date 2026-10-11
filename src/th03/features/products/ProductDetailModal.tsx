import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedProduct, selectSelectedProduct } from './productsSlice';
import { addToCart, selectCartItems } from '../cart/cartSlice';
import { X, Star, ShoppingBag, Plus, Minus, AlertCircle, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailModalProps {
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ onShowToast }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSelectedProduct);
  const cartItems = useAppSelector(selectCartItems);

  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const itemInCart = cartItems.find((i) => i.id === product.id);
  const currentInCart = itemInCart?.quantity ?? 0;
  const remainingStock = Math.max(0, product.stock - currentInCart);
  const isOutOfStock = product.stock <= 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleClose = () => {
    dispatch(setSelectedProduct(null));
    setQuantity(1);
  };

  const handleIncrease = () => {
    if (quantity < remainingStock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      onShowToast(`Sản phẩm đã hết hàng trong kho!`, 'error');
      return;
    }

    if (remainingStock <= 0) {
      onShowToast(`Bạn đã có tối đa ${currentInCart} sản phẩm trong giỏ!`, 'warning');
      return;
    }

    dispatch(addToCart({ product, quantity }));
    onShowToast(`Đã thêm ${quantity} x "${product.title}" vào giỏ hàng!`, 'success');
    handleClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          title="Đóng modal"
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Modal Left Image */}
          <div className="modal-image-col">
            <img
              src={product.image}
              alt={product.title}
              className="modal-product-img"
            />
            <div className="modal-badges">
              {isOutOfStock ? (
                <span className="stock-badge out-of-stock">Hết hàng</span>
              ) : (
                <span className="stock-badge in-stock">
                  Kho: {product.stock} (Trong giỏ: {currentInCart})
                </span>
              )}
            </div>
          </div>

          {/* Modal Right Info */}
          <div className="modal-info-col">
            <span className="modal-category-tag">{product.category}</span>
            <h2 className="modal-title">{product.title}</h2>

            <div className="modal-rating-row">
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} className="fill-current text-amber-400" />
                <span className="font-semibold text-slate-800">{product.rating.rate}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-sm">{product.rating.count} lượt đánh giá từ khách hàng</span>
            </div>

            <div className="modal-price-box">
              <span className="modal-price">{formatCurrency(product.price)}</span>
              <span className="modal-vat">Đã bao gồm VAT 8%</span>
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Commitments */}
            <div className="modal-perks">
              <div className="perk-item">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
              <div className="perk-item">
                <Truck size={16} className="text-blue-500" />
                <span>Giao hàng miễn phí đơn từ 2.000.000₫</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={16} className="text-violet-500" />
                <span>Đổi trả miễn phí trong 7 ngày</span>
              </div>
            </div>

            {/* Quantity Stepper & Add Button */}
            <div className="modal-action-row">
              <div className="modal-stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || remainingStock === 0}
                >
                  <Minus size={15} />
                </button>
                <span className="stepper-value">{quantity}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={handleIncrease}
                  disabled={quantity >= remainingStock || remainingStock === 0}
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                className={`btn-modal-add ${
                  isOutOfStock || remainingStock === 0 ? 'disabled' : ''
                }`}
                onClick={handleAddToCart}
                disabled={isOutOfStock || remainingStock === 0}
              >
                <ShoppingBag size={18} />
                <span>
                  {isOutOfStock
                    ? 'Hết hàng trong kho'
                    : remainingStock === 0
                    ? 'Đã đạt giới hạn giỏ'
                    : `Thêm vào giỏ (${formatCurrency(product.price * quantity)})`}
                </span>
              </button>
            </div>

            {remainingStock > 0 && remainingStock < product.stock && (
              <p className="modal-stock-hint">
                <AlertCircle size={14} /> Bạn có thể thêm tối đa {remainingStock} sản phẩm nữa vào giỏ.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
