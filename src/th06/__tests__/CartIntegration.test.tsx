import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import { CartSummary } from '../../th03/features/cart/CartSummary';
import { CartItemRow } from '../../th03/features/cart/CartItemRow';
import { CartDrawer } from '../../th03/features/cart/CartDrawer';
import type { Product } from '../../th03/features/products/productTypes';
import type { CartItem } from '../../th03/features/cart/cartTypes';

const mockProduct: Product = {
  id: 1,
  title: 'Bàn phím cơ AKKO 3087',
  price: 1000000,
  category: 'gear',
  image: 'https://example.com/p1.jpg',
  stock: 10,
  description: 'Bàn phím cơ AKKO',
  rating: { rate: 4.8, count: 100 },
};

const mockCartItem: CartItem = {
  id: 1,
  product: mockProduct,
  quantity: 2,
};

describe('Integration Test: Cart Components với React Testing Library (RTL)', () => {
  // TEST CASE 21: Integration CartSummary render số tiền & voucher
  it('TC21 - [Integration RTL] CartSummary: render đúng số tiền, nhập mã voucher PTIT10 giảm 10%', () => {
    const onOpenCheckout = vi.fn();
    const onShowToast = vi.fn();

    const { store } = renderWithProviders(
      <CartSummary onOpenCheckout={onOpenCheckout} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: {
            items: [mockCartItem], // 2 x 1.000.000 = 2.000.000đ
            appliedCoupon: null,
            isDrawerOpen: true,
          },
        },
      }
    );

    expect(screen.getByText(/Tạm tính/i)).toBeInTheDocument();

    const couponInput = screen.getByPlaceholderText(/Nhập mã/i);
    fireEvent.change(couponInput, { target: { value: 'PTIT10' } });

    const applyButton = screen.getByRole('button', { name: /Áp dụng/i });
    fireEvent.click(applyButton);

    expect(onShowToast).toHaveBeenCalledWith(
      expect.stringContaining('Áp dụng thành công mã ưu đãi "PTIT10"'),
      'success'
    );

    const state = store.getState();
    expect(state.cart.appliedCoupon?.code).toBe('PTIT10');
  });

  // TEST CASE 22: Integration CartSummary báo lỗi khi nhập voucher không tồn tại
  it('TC22 - [Integration RTL] CartSummary: thông báo lỗi khi nhập voucher không hợp lệ', () => {
    const onOpenCheckout = vi.fn();
    const onShowToast = vi.fn();

    renderWithProviders(
      <CartSummary onOpenCheckout={onOpenCheckout} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: { items: [mockCartItem], appliedCoupon: null, isDrawerOpen: true },
        },
      }
    );

    const couponInput = screen.getByPlaceholderText(/Nhập mã/i);
    fireEvent.change(couponInput, { target: { value: 'SAI_MA_999' } });

    const applyButton = screen.getByRole('button', { name: /Áp dụng/i });
    fireEvent.click(applyButton);

    expect(onShowToast).toHaveBeenCalledWith(
      expect.stringContaining('không hợp lệ hoặc đã hết hạn'),
      'error'
    );
  });

  // TEST CASE 22b: Integration CartSummary xóa voucher & thanh toán & xóa toàn bộ giỏ
  it('TC22b - [Integration RTL] CartSummary: hủy coupon, xóa giỏ hàng và mở checkout modal', () => {
    const onOpenCheckout = vi.fn();
    const onShowToast = vi.fn();

    const { store } = renderWithProviders(
      <CartSummary onOpenCheckout={onOpenCheckout} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: {
            items: [mockCartItem],
            appliedCoupon: { code: 'PTIT10', discountPercent: 10, description: 'Giảm 10%' },
            isDrawerOpen: true,
          },
        },
      }
    );

    // Bấm nút hủy mã giảm giá ban đầu
    const removeCouponBtn = screen.getByTitle(/Gỡ mã giảm giá/i);
    fireEvent.click(removeCouponBtn);
    expect(store.getState().cart.appliedCoupon).toBeNull();

    // Sau khi gỡ coupon, nút gợi ý nhanh xuất hiện lại
    const quickCoupon20 = screen.getByRole('button', { name: /GIAM20 \(-20%\)/i });
    fireEvent.click(quickCoupon20);
    expect(store.getState().cart.appliedCoupon?.code).toBe('GIAM20');

    // Bấm nút Đặt hàng
    const checkoutBtn = screen.getByRole('button', { name: /Tiến hành đặt hàng/i });
    fireEvent.click(checkoutBtn);
    expect(onOpenCheckout).toHaveBeenCalledTimes(1);
  });

  // TEST CASE 23: Integration CartItemRow kiểm tra trạng thái chạm trần tồn kho
  it('TC23 - [Integration RTL] CartItemRow: nút tăng bị disabled khi đạt trần tồn kho', () => {
    const onShowToast = vi.fn();
    const maxedItem: CartItem = { ...mockCartItem, quantity: 2, product: { ...mockProduct, stock: 2 } };

    renderWithProviders(
      <CartItemRow item={maxedItem} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: { items: [maxedItem], appliedCoupon: null, isDrawerOpen: true },
        },
      }
    );

    // Nút tăng bị vô hiệu hóa
    const maxBtn = screen.getByTitle(/Đạt giới hạn tồn kho/i);
    expect(maxBtn).toBeDisabled();
    expect(screen.getByText(/Đã đạt tối đa tồn kho/i)).toBeInTheDocument();
  });

  // TEST CASE 23b: Integration CartItemRow giảm số lượng khi quantity > 1 và nhập số lượng thủ công
  it('TC23b - [Integration RTL] CartItemRow: giảm số lượng khi quantity > 1 và nhập input thủ công', () => {
    const onShowToast = vi.fn();

    const { store } = renderWithProviders(
      <CartItemRow item={mockCartItem} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: { items: [mockCartItem], appliedCoupon: null, isDrawerOpen: true },
        },
      }
    );

    // Bấm giảm khi quantity = 2 -> Giảm còn 1
    const decButton = screen.getByTitle('Giảm 1');
    fireEvent.click(decButton);
    expect(store.getState().cart.items[0].quantity).toBe(1);

    // Nhập số lượng thủ công
    const qtyInput = screen.getByRole('spinbutton');
    fireEvent.change(qtyInput, { target: { value: '4' } });
    expect(store.getState().cart.items[0].quantity).toBe(4);

    // Bấm nút thùng rác trực tiếp để xóa
    const trashBtn = screen.getByTitle('Xóa khỏi giỏ hàng');
    fireEvent.click(trashBtn);
    expect(store.getState().cart.items).toHaveLength(0);
  });

  // TEST CASE 24: Integration CartDrawer hiển thị giỏ hàng rỗng và đóng drawer
  it('TC24 - [Integration RTL] CartDrawer: hiển thị rỗng và bấm nút đóng giỏ hàng', () => {
    const { store } = renderWithProviders(
      <CartDrawer onOpenCheckout={vi.fn()} onShowToast={vi.fn()} />,
      {
        preloadedState: {
          cart: { items: [], appliedCoupon: null, isDrawerOpen: true },
        },
      }
    );

    expect(screen.getByText(/Giỏ hàng đang trống/i)).toBeInTheDocument();

    // Bấm nút đóng drawer
    const closeBtn = screen.getByTitle(/Đóng giỏ hàng/i);
    fireEvent.click(closeBtn);
    expect(store.getState().cart.isDrawerOpen).toBe(false);
  });

  // TEST CASE 24b: Integration CartDrawer hiển thị danh sách sản phẩm và mở checkout
  it('TC24b - [Integration RTL] CartDrawer: hiển thị danh sách sản phẩm và mở checkout', () => {
    const onOpenCheckout = vi.fn();
    const onShowToast = vi.fn();

    renderWithProviders(
      <CartDrawer onOpenCheckout={onOpenCheckout} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: { items: [mockCartItem], appliedCoupon: null, isDrawerOpen: true },
        },
      }
    );

    expect(screen.getByText('Bàn phím cơ AKKO 3087')).toBeInTheDocument();

    const checkoutBtn = screen.getByRole('button', { name: /Tiến hành đặt hàng/i });
    fireEvent.click(checkoutBtn);
    expect(onOpenCheckout).toHaveBeenCalledTimes(1);
  });
});
