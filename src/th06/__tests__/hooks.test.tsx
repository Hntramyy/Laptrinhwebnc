import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../th03/app/hooks';
import { setupTestStore } from './testUtils';
import { addToCart } from '../../th03/features/cart/cartSlice';
import type { Product } from '../../th03/features/products/productTypes';

const sampleProduct: Product = {
  id: 99,
  title: 'USB SanDisk 64GB',
  price: 250000,
  category: 'gear',
  image: 'https://example.com/usb.jpg',
  stock: 20,
  description: 'USB tốc độ cao 3.0',
  rating: { rate: 4.7, count: 50 },
};

describe('Unit Test: Typed Custom Hooks (useAppDispatch & useAppSelector)', () => {
  it('TC28 - [Hook] useAppSelector: truy xuất chính xác state từ Redux store', () => {
    const store = setupTestStore({
      cart: {
        items: [{ id: 99, product: sampleProduct, quantity: 2 }],
        appliedCoupon: null,
        isDrawerOpen: false,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAppSelector((state) => state.cart.items), {
      wrapper,
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0].quantity).toBe(2);
    expect(result.current[0].product.title).toBe('USB SanDisk 64GB');
  });

  it('TC29 - [Hook] useAppDispatch: thực thi dispatch action thành công và làm thay đổi state', () => {
    const store = setupTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result: dispatchResult } = renderHook(() => useAppDispatch(), { wrapper });
    const { result: stateResult } = renderHook(
      () => useAppSelector((state) => state.cart.items),
      { wrapper }
    );

    expect(stateResult.current).toHaveLength(0);

    act(() => {
      dispatchResult.current(addToCart({ product: sampleProduct, quantity: 1 }));
    });

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].id).toBe(99);
  });
});
