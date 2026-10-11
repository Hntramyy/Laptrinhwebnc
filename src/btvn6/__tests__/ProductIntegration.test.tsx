import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import { ProductCard } from '../../btvn3/features/products/ProductCard';
import type { Product } from '../../btvn3/features/products/productTypes';

const mockProduct: Product = {
  id: 10,
  title: 'Màn hình Dell UltraSharp 27',
  price: 11500000,
  category: 'screen',
  image: 'https://example.com/dell.jpg',
  stock: 4,
  description: 'Độ phân giải 4K sắc nét',
  rating: { rate: 4.9, count: 88 },
};

describe('Integration Test: Product Components với React Testing Library (RTL)', () => {
  // TEST CASE 25: Integration ProductCard thêm vào giỏ hàng
  it('TC25 - [Integration RTL] ProductCard: render thông tin sản phẩm và dispatch addToCart khi click', () => {
    const onShowToast = vi.fn();

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: { items: [], appliedCoupon: null, isDrawerOpen: false },
        },
      }
    );

    // Tiêu đề và giá xuất hiện
    expect(screen.getByText('Màn hình Dell UltraSharp 27')).toBeInTheDocument();

    // Tìm nút Thêm vào giỏ
    const addBtn = screen.getByRole('button', { name: /Thêm vào giỏ/i });
    fireEvent.click(addBtn);

    // Toast thành công được kích hoạt
    expect(onShowToast).toHaveBeenCalledWith(
      expect.stringContaining('Đã thêm "Màn hình Dell UltraSharp 27" vào giỏ hàng'),
      'success'
    );

    // Store có sản phẩm trong cart
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(10);
  });

  // TEST CASE 26: Integration ProductCard kiểm tra trạng thái hết hàng (stock = 0)
  it('TC26 - [Integration RTL] ProductCard: nút bị vô hiệu hóa (disabled) khi sản phẩm hết hàng (stock = 0)', () => {
    const outOfStockProduct: Product = {
      ...mockProduct,
      id: 11,
      stock: 0,
    };

    const onShowToast = vi.fn();

    renderWithProviders(
      <ProductCard product={outOfStockProduct} onShowToast={onShowToast} />,
      {
        preloadedState: {
          cart: { items: [], appliedCoupon: null, isDrawerOpen: false },
        },
      }
    );

    const addBtn = screen.getByRole('button', { name: /Hết hàng/i });
    expect(addBtn).toBeDisabled();
    expect(screen.getAllByText('Hết hàng').length).toBeGreaterThanOrEqual(1);
  });

  // TEST CASE 27: Integration ProductCard click tiêu đề để mở modal chi tiết sản phẩm
  it('TC27 - [Integration RTL] ProductCard: click tiêu đề sản phẩm để dispatch setSelectedProduct', () => {
    const onShowToast = vi.fn();

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} onShowToast={onShowToast} />,
      {
        preloadedState: {
          products: {
            items: [mockProduct],
            status: 'idle',
            error: null,
            selectedCategory: 'all',
            searchQuery: '',
            sortBy: 'default',
            selectedProduct: null,
          },
        },
      }
    );

    const titleElement = screen.getByText('Màn hình Dell UltraSharp 27');
    fireEvent.click(titleElement);

    const state = store.getState();
    expect(state.products.selectedProduct?.id).toBe(10);
  });
});
