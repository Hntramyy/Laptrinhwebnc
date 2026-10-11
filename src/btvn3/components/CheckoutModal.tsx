import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectCartFinalTotal,
  selectAppliedCoupon,
  clearCart,
} from '../features/cart/cartSlice';
import { updateStockAfterCheckout } from '../features/products/productsSlice';
import { X, CheckCircle, PackageCheck, CreditCard, Banknote, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartFinalTotal);
  const appliedCoupon = useAppSelector(selectAppliedCoupon);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay' | 'banking'>('cod');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      onShowToast('Vui lòng điền đầy đủ thông tin nhận hàng!', 'warning');
      return;
    }

    // 1. Cập nhật trừ tồn kho trong productsSlice
    const stockDeductions = items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
    }));
    dispatch(updateStockAfterCheckout(stockDeductions));

    // 2. Tạo mã đơn hàng ngẫu nhiên
    const generatedCode = `PTIT-${Date.now().toString().slice(-6)}`;
    setOrderCode(generatedCode);

    // 3. Xóa giỏ hàng
    dispatch(clearCart());

    // 4. Bật màn hình thành công
    setIsSuccess(true);
    onShowToast(`Đặt hàng thành công! Mã đơn hàng: ${generatedCode}`, 'success');
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          title="Đóng modal"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="checkout-success-view">
            <div className="success-icon-box">
              <CheckCircle size={56} className="text-emerald-500 animate-bounce" />
            </div>
            <h2 className="success-title">Đặt hàng thành công!</h2>
            <p className="success-subtitle">
              Cảm ơn bạn đã trải nghiệm module giỏ hàng Redux Toolkit của bài tập TH03.
            </p>

            <div className="order-details-box">
              <div className="detail-item">
                <span className="text-slate-500">Mã đơn hàng:</span>
                <strong className="text-indigo-600 font-mono text-base">{orderCode}</strong>
              </div>
              <div className="detail-item">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="font-medium text-slate-800">{fullName}</span>
              </div>
              <div className="detail-item">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-medium text-slate-800">{phone}</span>
              </div>
              <div className="detail-item">
                <span className="text-slate-500">Địa chỉ giao:</span>
                <span className="font-medium text-slate-800 text-right">{address}</span>
              </div>
              <div className="detail-item">
                <span className="text-slate-500">Phương thức:</span>
                <span className="font-medium text-slate-800 uppercase">{paymentMethod}</span>
              </div>
              {appliedCoupon && (
                <div className="detail-item text-emerald-600">
                  <span>Mã ưu đãi áp dụng:</span>
                  <span className="font-semibold">{appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn-finish-checkout"
              onClick={handleFinish}
            >
              <PackageCheck size={18} /> Hoàn tất và Tiếp tục
            </button>
          </div>
        ) : (
          <div>
            <div className="checkout-header">
              <h2 className="checkout-title">Xác nhận thanh toán</h2>
              <p className="checkout-subtitle">
                Vui lòng nhập thông tin giao hàng để hoàn tất đơn hàng
              </p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label className="form-label">Họ và tên người nhận *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại liên hệ *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0987654321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Địa chỉ nhận hàng chi tiết *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phương thức thanh toán</label>
                <div className="payment-options">
                  <label
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="hidden"
                    />
                    <Banknote size={18} className="text-emerald-600" />
                    <span>COD (Thanh toán khi nhận hàng)</span>
                  </label>

                  <label
                    className={`payment-option ${paymentMethod === 'banking' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'banking'}
                      onChange={() => setPaymentMethod('banking')}
                      className="hidden"
                    />
                    <CreditCard size={18} className="text-blue-600" />
                    <span>Chuyển khoản QR Code ngân hàng</span>
                  </label>
                </div>
              </div>

              {/* Order quick summary */}
              <div className="checkout-total-box">
                <div className="flex justify-between items-center text-sm text-slate-600 mb-1">
                  <span>Số lượng mặt hàng:</span>
                  <span className="font-medium">{items.length} loại sản phẩm</span>
                </div>
                <div className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  <span>Số tiền cần thanh toán:</span>
                  <span className="text-indigo-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="checkout-footer-buttons">
                <button
                  type="button"
                  className="btn-cancel-checkout"
                  onClick={onClose}
                >
                  Quay lại giỏ hàng
                </button>
                <button type="submit" className="btn-confirm-checkout">
                  <ShieldCheck size={18} /> Xác nhận đặt mua
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
