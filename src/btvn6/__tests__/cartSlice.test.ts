import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  selectCartTotalCount,
  selectCartSubtotal,
  selectCartDiscountAmount,
  selectCartShippingFee,
  selectCartFinalTotal,
} from '../../btvn3/features/cart/cartSlice';
import type { CartState } from '../../btvn3/features/cart/cartTypes';
import type { Product } from '../../btvn3/features/products/productTypes';
import type { RootState } from '../../btvn3/app/store';

const mockProductA: Product = {
  id: 1,
  title: 'Bàn phím cơ AKKO 3087',
  price: 1200000,
  category: 'gear',
  image: 'https://example.com/p1.jpg',
  stock: 5,
  description: 'Bàn phím cơ cao cấp',
  rating: { rate: 4.8, count: 120 },
};

const mockProductB: Product = {
  id: 2,
  title: 'Chuột Logitech G Pro X',
  price: 2500000,
  category: 'gear',
  image: 'https://example.com/p2.jpg',
  stock: 10,
  description: 'Chuột không dây siêu nhẹ',
  rating: { rate: 4.9, count: 250 },
};

describe('Unit Test: cartSlice Reducer & Actions', () => {
  let initialState: CartState;

  beforeEach(() => {
    localStorage.clear();
    initialState = {
      items: [],
      appliedCoupon: null,
      isDrawerOpen: false,
    };
  });

  // TEST CASE 1: Thêm sản phẩm mới vào giỏ hàng
  it('TC01 - [Unit] addToCart: thêm sản phẩm mới vào giỏ với số lượng mặc định là 1', () => {
    const nextState = cartReducer(initialState, addToCart({ product: mockProductA }));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].product.id).toBe(mockProductA.id);
    expect(nextState.items[0].quantity).toBe(1);
  });

  // TEST CASE 2: Thêm sản phẩm đã có trong giỏ -> tăng số lượng
  it('TC02 - [Unit] addToCart: tăng số lượng khi sản phẩm đã tồn tại trong giỏ', () => {
    const stateWithOne = cartReducer(initialState, addToCart({ product: mockProductA, quantity: 2 }));
    const stateWithTwo = cartReducer(stateWithOne, addToCart({ product: mockProductA, quantity: 1 }));
    expect(stateWithTwo.items).toHaveLength(1);
    expect(stateWithTwo.items[0].quantity).toBe(3);
  });

  // TEST CASE 3: Không cho phép vượt quá số lượng tồn kho (Stock limit)
  it('TC03 - [Unit] addToCart: khống chế số lượng không vượt quá số lượng tồn kho (stock limit)', () => {
    // mockProductA có stock = 5
    const state = cartReducer(initialState, addToCart({ product: mockProductA, quantity: 99 }));
    expect(state.items[0].quantity).toBe(5);
  });

  // TEST CASE 4: Xóa sản phẩm khỏi giỏ hàng
  it('TC04 - [Unit] removeFromCart: loại bỏ sản phẩm ra khỏi giỏ hàng chính xác theo ID', () => {
    const stateWithItems: CartState = {
      ...initialState,
      items: [
        { id: mockProductA.id, product: mockProductA, quantity: 2 },
        { id: mockProductB.id, product: mockProductB, quantity: 1 },
      ],
    };

    const nextState = cartReducer(stateWithItems, removeFromCart(mockProductA.id));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].id).toBe(mockProductB.id);
  });

  // TEST CASE 5: Cập nhật số lượng và tự xóa khi quantity <= 0
  it('TC05 - [Unit] updateQuantity: cập nhật số lượng và tự động xóa khỏi giỏ nếu quantity <= 0', () => {
    const stateWithItem: CartState = {
      ...initialState,
      items: [{ id: mockProductA.id, product: mockProductA, quantity: 3 }],
    };

    // Cập nhật lên 4
    const stateUpdated = cartReducer(stateWithItem, updateQuantity({ id: mockProductA.id, quantity: 4 }));
    expect(stateUpdated.items[0].quantity).toBe(4);

    // Cập nhật về 0 -> phải bị xóa
    const stateRemoved = cartReducer(stateUpdated, updateQuantity({ id: mockProductA.id, quantity: 0 }));
    expect(stateRemoved.items).toHaveLength(0);
  });

  // TEST CASE 6: Tăng giảm số lượng qua increment/decrement
  it('TC06 - [Unit] incrementQuantity / decrementQuantity: thay đổi từng đơn vị chính xác', () => {
    const stateWithItem: CartState = {
      ...initialState,
      items: [{ id: mockProductA.id, product: mockProductA, quantity: 2 }],
    };

    const incState = cartReducer(stateWithItem, incrementQuantity(mockProductA.id));
    expect(incState.items[0].quantity).toBe(3);

    const decState = cartReducer(incState, decrementQuantity(mockProductA.id));
    expect(decState.items[0].quantity).toBe(2);
  });

  // TEST CASE 7: Áp dụng mã giảm giá (Voucher) hợp lệ và xóa voucher
  it('TC07 - [Unit] applyCoupon & removeCoupon: áp dụng mã PTIT10 giảm 10% và xóa mã', () => {
    const appliedState = cartReducer(initialState, applyCoupon('ptit10')); // Kiểm tra cả chữ thường
    expect(appliedState.appliedCoupon).not.toBeNull();
    expect(appliedState.appliedCoupon?.code).toBe('PTIT10');
    expect(appliedState.appliedCoupon?.discountPercent).toBe(10);

    const removedState = cartReducer(appliedState, removeCoupon());
    expect(removedState.appliedCoupon).toBeNull();
  });

  // TEST CASE 8: Làm rỗng giỏ hàng (clearCart)
  it('TC08 - [Unit] clearCart: làm rỗng toàn bộ giỏ hàng và reset coupon', () => {
    const stateWithItems: CartState = {
      items: [{ id: mockProductA.id, product: mockProductA, quantity: 2 }],
      appliedCoupon: { code: 'PTIT10', discountPercent: 10, description: 'Test' },
      isDrawerOpen: true,
    };

    const emptyState = cartReducer(stateWithItems, clearCart());
    expect(emptyState.items).toEqual([]);
    expect(emptyState.appliedCoupon).toBeNull();
  });

  // TEST CASE 8b: addToCart với stock <= 0 và decrementQuantity về 0
  it('TC08b - [Unit Branch] không thêm hàng khi stock <= 0 và decrement từ 1 về 0 sẽ tự xóa khỏi giỏ', () => {
    const outOfStock: Product = { ...mockProductA, stock: 0 };
    const noAddState = cartReducer(initialState, addToCart({ product: outOfStock }));
    expect(noAddState.items).toHaveLength(0);

    const stateWithOne: CartState = {
      ...initialState,
      items: [{ id: mockProductA.id, product: mockProductA, quantity: 1 }],
    };
    const decToZero = cartReducer(stateWithOne, decrementQuantity(mockProductA.id));
    expect(decToZero.items).toHaveLength(0);
  });
});

describe('Unit Test: Cart Selectors (Tính toán tổng số lượng & đơn giá)', () => {
  const mockRootState = {
    cart: {
      items: [
        { id: mockProductA.id, product: mockProductA, quantity: 2 }, // 2 * 1.200.000 = 2.400.000
        { id: mockProductB.id, product: mockProductB, quantity: 1 }, // 1 * 2.500.000 = 2.500.000
      ],
      appliedCoupon: {
        code: 'PTIT10',
        discountPercent: 10,
        description: 'Giảm 10%',
      },
      isDrawerOpen: false,
    },
    products: { items: [], status: 'idle', error: null, selectedCategory: 'all', searchQuery: '', sortBy: 'default', selectedProduct: null },
  } as unknown as RootState;

  it('TC09 - [Unit Selector] tính chính xác tổng số lượng (totalCount) và tạm tính (subtotal)', () => {
    const count = selectCartTotalCount(mockRootState);
    expect(count).toBe(3); // 2 + 1 = 3

    const subtotal = selectCartSubtotal(mockRootState);
    expect(subtotal).toBe(4900000); // 2.400.000 + 2.500.000
  });

  it('TC10 - [Unit Selector] tính chính xác giảm giá coupon, phí vận chuyển và tổng tiền cuối cùng', () => {
    // Subtotal = 4.900.000 >= 2.000.000 -> Miễn phí ship (0đ)
    const discount = selectCartDiscountAmount(mockRootState);
    expect(discount).toBe(490000); // 10% của 4.900.000

    const shipping = selectCartShippingFee(mockRootState);
    expect(shipping).toBe(0); // Free ship

    const finalTotal = selectCartFinalTotal(mockRootState);
    expect(finalTotal).toBe(4410000); // 4.900.000 - 490.000 + 0 = 4.410.000
  });
});
