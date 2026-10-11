import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCartItems,
  selectIsCartDrawerOpen,
  setCartDrawerOpen,
  selectCartTotalCount,
} from './cartSlice';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';
import { X, ShoppingBag, ShoppingCart } from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const totalCount = useAppSelector(selectCartTotalCount);

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(setCartDrawerOpen(false));
  };

  return (
    <div className="cart-drawer-overlay" onClick={handleClose}>
      <aside
        className="cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <ShoppingCart size={22} className="text-indigo-600" />
            <h2 className="drawer-title">Giỏ hàng của bạn</h2>
            <span className="drawer-count-badge">{totalCount}</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={handleClose}
            title="Đóng giỏ hàng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-cart-icon-bg">
                <ShoppingBag size={48} className="text-slate-300" />
              </div>
              <h3 className="empty-cart-title">Giỏ hàng đang trống</h3>
              <p className="empty-cart-subtext">
                Chưa có sản phẩm nào được chọn. Hãy khám phá bộ sưu tập và thêm sản phẩm bạn yêu thích!
              </p>
              <button
                type="button"
                className="btn-continue-shopping"
                onClick={handleClose}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="cart-items-scroll-area">
              <div className="cart-items-list">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onShowToast={onShowToast}
                  />
                ))}
              </div>

              {/* Summary Section Inside Drawer */}
              <div className="mt-6">
                <CartSummary
                  onOpenCheckout={() => {
                    handleClose();
                    onOpenCheckout();
                  }}
                  onShowToast={onShowToast}
                />
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
