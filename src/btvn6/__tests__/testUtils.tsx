import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../btvn3/features/cart/cartSlice';
import productsReducer from '../../btvn3/features/products/productsSlice';
import type { RootState } from '../../btvn3/app/store';

export function setupTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    } as any,
    preloadedState: preloadedState as any,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof setupTestStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
