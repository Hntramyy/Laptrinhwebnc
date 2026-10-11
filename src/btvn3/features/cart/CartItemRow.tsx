import React from 'react';
import type { CartItem } from './cartTypes';
import { useAppDispatch } from '../../app/hooks';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateQuantity,
} from './cartSlice';
import { Plus, Minus, Trash2, AlertCircle } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onShowToast }) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const isAtMaxStock = quantity >= product.stock;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleIncrement = () => {
    if (isAtMaxStock) {
      onShowToast(
        `Không thể tăng thêm! Tồn kho của "${product.title}" chỉ còn ${product.stock} cái.`,
        'warning'
      );
      return;
    }
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(item.id));
      onShowToast(`Đã xóa "${product.title}" khỏi giỏ hàng`, 'warning');
      return;
    }
    dispatch(decrementQuantity(item.id));
  };

  const handleManualQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed) || parsed <= 0) return;

    if (parsed > product.stock) {
      onShowToast(
        `Số lượng vượt quá tồn kho (${product.stock} cái). Đã đặt về mức tối đa.`,
        'warning'
      );
      dispatch(updateQuantity({ id: item.id, quantity: product.stock }));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: parsed }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    onShowToast(`Đã xóa "${product.title}" khỏi giỏ hàng`, 'warning');
  };

  return (
    <div className="cart-item-card">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="cart-item-img"
      />

      {/* Product Details & Actions */}
      <div className="cart-item-details">
        <div className="flex justify-between items-start gap-2">
          <h4 className="cart-item-title">{product.title}</h4>
          <button
            type="button"
            className="cart-item-trash-btn"
            onClick={handleRemove}
            title="Xóa khỏi giỏ hàng"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="cart-item-unit-price">
          Đơn giá: {formatCurrency(product.price)}
        </div>

        {/* Quantity Controls & Line Total */}
        <div className="cart-item-actions-row">
          <div className="cart-stepper">
            <button
              type="button"
              className="stepper-btn-sm"
              onClick={handleDecrement}
              title={quantity === 1 ? 'Xóa khỏi giỏ' : 'Giảm 1'}
            >
              <Minus size={13} />
            </button>

            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={handleManualQuantityChange}
              className="stepper-input-sm"
            />

            <button
              type="button"
              className="stepper-btn-sm"
              onClick={handleIncrement}
              disabled={isAtMaxStock}
              title={isAtMaxStock ? 'Đạt giới hạn tồn kho' : 'Tăng 1'}
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="cart-item-line-total">
            {formatCurrency(product.price * quantity)}
          </div>
        </div>

        {/* Stock Limit Alert */}
        {isAtMaxStock && (
          <p className="cart-stock-warning">
            <AlertCircle size={12} /> Đã đạt tối đa tồn kho ({product.stock} cái)
          </p>
        )}
      </div>
    </div>
  );
};
