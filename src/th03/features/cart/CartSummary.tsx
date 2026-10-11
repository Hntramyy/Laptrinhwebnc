import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCartSubtotal,
  selectCartDiscountAmount,
  selectCartShippingFee,
  selectCartFinalTotal,
  selectAppliedCoupon,
  applyCoupon,
  removeCoupon,
  clearCart,
  selectCartTotalCount,
} from './cartSlice';
import { Tag, Check, X, ShieldAlert, ArrowRight, Trash2, Truck } from 'lucide-react';

interface CartSummaryProps {
  onOpenCheckout: () => void;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  onOpenCheckout,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscountAmount);
  const shipping = useAppSelector(selectCartShippingFee);
  const total = useAppSelector(selectCartFinalTotal);
  const appliedCoupon = useAppSelector(selectAppliedCoupon);
  const totalCount = useAppSelector(selectCartTotalCount);

  const [couponCode, setCouponCode] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (['PTIT10', 'GIAM20', 'VIP30'].includes(code)) {
      dispatch(applyCoupon(code));
      onShowToast(`Áp dụng thành công mã ưu đãi "${code}"!`, 'success');
      setCouponCode('');
    } else {
      onShowToast(`Mã giảm giá "${code}" không hợp lệ hoặc đã hết hạn!`, 'error');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    onShowToast('Đã hủy áp dụng mã giảm giá', 'warning');
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?')) {
      dispatch(clearCart());
      onShowToast('Đã xóa toàn bộ giỏ hàng', 'warning');
    }
  };

  return (
    <div className="cart-summary-card">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
        <h3 className="summary-heading">Thông tin thanh toán</h3>
        <button
          type="button"
          onClick={handleClearAll}
          className="btn-clear-cart"
          title="Xóa tất cả sản phẩm"
        >
          <Trash2 size={14} /> Xóa giỏ hàng
        </button>
      </div>

      {/* Coupon Section */}
      <div className="coupon-container">
        {appliedCoupon ? (
          <div className="coupon-applied-box">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" />
              <div>
                <span className="coupon-code-badge">{appliedCoupon.code}</span>
                <span className="text-xs text-emerald-700 ml-2">
                  (Giảm {appliedCoupon.discountPercent}%)
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="coupon-remove-btn"
              title="Gỡ mã giảm giá"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="coupon-form">
            <div className="coupon-input-wrapper">
              <Tag size={16} className="coupon-icon" />
              <input
                type="text"
                placeholder="Nhập mã ưu đãi (VD: PTIT10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
            </div>
            <button type="submit" className="coupon-submit-btn">
              Áp dụng
            </button>
          </form>
        )}

        {/* Quick voucher hints */}
        {!appliedCoupon && (
          <div className="quick-coupons">
            <span className="text-xs text-slate-500 font-medium">Gợi ý mã:</span>
            <button
              type="button"
              className="quick-coupon-btn"
              onClick={() => {
                dispatch(applyCoupon('PTIT10'));
                onShowToast('Đã áp dụng mã PTIT10 (Giảm 10%)', 'success');
              }}
            >
              PTIT10 (-10%)
            </button>
            <button
              type="button"
              className="quick-coupon-btn"
              onClick={() => {
                dispatch(applyCoupon('GIAM20'));
                onShowToast('Đã áp dụng mã GIAM20 (Giảm 20%)', 'success');
              }}
            >
              GIAM20 (-20%)
            </button>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="breakdown-list">
        <div className="breakdown-row">
          <span className="breakdown-label">Tạm tính ({totalCount} món):</span>
          <span className="breakdown-value">{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="breakdown-row text-emerald-600 font-medium">
            <span className="breakdown-label">
              Giảm giá voucher ({appliedCoupon?.discountPercent}%):
            </span>
            <span className="breakdown-value">-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="breakdown-row">
          <div className="flex items-center gap-1">
            <span className="breakdown-label">Phí giao hàng:</span>
            <Truck size={14} className="text-slate-400" />
          </div>
          <span className="breakdown-value">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-semibold">Miễn phí</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        {subtotal < 2000000 && subtotal > 0 && (
          <div className="freeship-notice">
            <ShieldAlert size={14} /> Mua thêm {formatCurrency(2000000 - subtotal)} để được
            <strong> Miễn phí vận chuyển</strong>
          </div>
        )}

        <div className="total-divider" />

        <div className="breakdown-row total-row">
          <span className="total-label">Tổng thanh toán:</span>
          <span className="total-value">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        type="button"
        className="btn-checkout"
        onClick={onOpenCheckout}
        disabled={totalCount === 0}
      >
        <span>Tiến hành đặt hàng</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
