import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { CartCoupon, CartItem, CartState } from './cartTypes';
import type { Product } from '../products/productTypes';
import type { RootState } from '../../app/store';

const STORAGE_KEY = 'ltwnc_th03_cart';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
};

const AVAILABLE_COUPONS: Record<string, CartCoupon> = {
  PTIT10: {
    code: 'PTIT10',
    discountPercent: 10,
    description: 'Ưu đãi sinh viên PTIT: Giảm 10% tổng đơn hàng',
  },
  GIAM20: {
    code: 'GIAM20',
    discountPercent: 20,
    description: 'Mã tri ân đặc biệt: Giảm ngay 20% tổng đơn hàng',
  },
  VIP30: {
    code: 'VIP30',
    discountPercent: 30,
    description: 'Khách hàng VIP: Giảm 30% cho đơn hàng',
  },
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  appliedCoupon: null,
  isDrawerOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      if (product.stock <= 0) return; // Không thể thêm hàng hết kho

      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        const currentQty = state.items[existingIndex].quantity;
        // Kiểm tra không vượt quá tồn kho (Stock limit)
        const newQty = Math.min(product.stock, currentQty + quantity);
        state.items[existingIndex].quantity = newQty;
      } else {
        const validQty = Math.min(product.stock, Math.max(1, quantity));
        state.items.push({
          id: product.id,
          product,
          quantity: validQty,
        });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      saveCartToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          // Khống chế số lượng từ 1 đến số lượng tồn kho của sản phẩm
          item.quantity = Math.min(item.product.stock, quantity);
        }
      }

      saveCartToStorage(state.items);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && item.quantity < item.product.stock) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== id);
        }
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      saveCartToStorage([]);
    },

    applyCoupon: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      const coupon = AVAILABLE_COUPONS[code];
      if (coupon) {
        state.appliedCoupon = coupon;
      }
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },

    toggleCartDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  toggleCartDrawer,
  setCartDrawerOpen,
} = cartSlice.actions;

// Selectors cơ bản
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectAppliedCoupon = (state: RootState) => state.cart.appliedCoupon;
export const selectIsCartDrawerOpen = (state: RootState) => state.cart.isDrawerOpen;

// Memoized Selectors tính toán số lượng và giá tiền
export const selectCartTotalCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity * item.product.price, 0)
);

export const selectCartDiscountAmount = createSelector(
  [selectCartSubtotal, selectAppliedCoupon],
  (subtotal, coupon) => {
    if (!coupon) return 0;
    return Math.round((subtotal * coupon.discountPercent) / 100);
  }
);

export const selectCartShippingFee = createSelector(
  [selectCartSubtotal],
  (subtotal) => {
    if (subtotal === 0) return 0;
    // Miễn phí giao hàng cho đơn từ 2.000.000 ₫ trở lên
    return subtotal >= 2000000 ? 0 : 35000;
  }
);

export const selectCartFinalTotal = createSelector(
  [selectCartSubtotal, selectCartDiscountAmount, selectCartShippingFee],
  (subtotal, discount, shipping) => {
    return Math.max(0, subtotal - discount + shipping);
  }
);

export default cartSlice.reducer;
