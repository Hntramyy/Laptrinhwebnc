import { describe, it, expect, vi, beforeEach } from 'vitest';
import productsReducer, {
  setCategory,
  setSearchQuery,
  setSortBy,
  setSelectedProduct,
  updateStockAfterCheckout,
  fetchProducts,
  fetchProductById,
  selectFilteredProducts,
} from '../../th03/features/products/productsSlice';
import type { Product, ProductsState } from '../../th03/features/products/productTypes';
import { productService } from '../../th03/services/productService';
import type { RootState } from '../../th03/app/store';

const mockProductList: Product[] = [
  {
    id: 101,
    title: 'Bàn phím cơ Akko Pro',
    price: 1500000,
    category: 'gear',
    image: 'https://example.com/akko.jpg',
    stock: 8,
    description: 'Switch Gateron Yellow mượt mà',
    rating: { rate: 4.8, count: 50 },
  },
  {
    id: 102,
    title: 'Tai nghe Sony WH-1000XM5',
    price: 6900000,
    category: 'audio',
    image: 'https://example.com/sony.jpg',
    stock: 3,
    description: 'Chống ồn chủ động đỉnh cao',
    rating: { rate: 4.9, count: 120 },
  },
  {
    id: 103,
    title: 'Chuột không dây Logitech G304',
    price: 790000,
    category: 'gear',
    image: 'https://example.com/g304.jpg',
    stock: 15,
    description: 'Mắt đọc Hero tiết kiệm pin',
    rating: { rate: 4.6, count: 210 },
  },
];

describe('Unit & Async Tests: productsSlice & AsyncThunks with Mock API', () => {
  let initialState: ProductsState;

  beforeEach(() => {
    vi.restoreAllMocks();
    initialState = {
      items: [],
      status: 'idle',
      error: null,
      selectedCategory: 'all',
      searchQuery: '',
      sortBy: 'default',
      selectedProduct: null,
    };
  });

  // TEST CASE 11: Set category filter
  it('TC11 - [Unit] setCategory: cập nhật bộ lọc danh mục chính xác', () => {
    const nextState = productsReducer(initialState, setCategory('gear'));
    expect(nextState.selectedCategory).toBe('gear');
  });

  // TEST CASE 12: Set search query & sort
  it('TC12 - [Unit] setSearchQuery & setSortBy: cập nhật từ khóa và tùy chọn sắp xếp', () => {
    const stateWithQuery = productsReducer(initialState, setSearchQuery('tai nghe'));
    expect(stateWithQuery.searchQuery).toBe('tai nghe');

    const stateWithSort = productsReducer(stateWithQuery, setSortBy('price-asc'));
    expect(stateWithSort.sortBy).toBe('price-asc');
  });

  // TEST CASE 13: updateStockAfterCheckout trừ số lượng tồn kho chính xác
  it('TC13 - [Unit] updateStockAfterCheckout: trừ số lượng tồn kho của các sản phẩm đã thanh toán', () => {
    const stateWithItems: ProductsState = {
      ...initialState,
      items: [...mockProductList],
    };

    const nextState = productsReducer(
      stateWithItems,
      updateStockAfterCheckout([
        { id: 101, quantity: 3 }, // 8 - 3 = 5
        { id: 102, quantity: 3 }, // 3 - 3 = 0
      ])
    );

    const p101 = nextState.items.find((p) => p.id === 101);
    const p102 = nextState.items.find((p) => p.id === 102);

    expect(p101?.stock).toBe(5);
    expect(p102?.stock).toBe(0);
  });

  // TEST CASE 14: Memoized Selector selectFilteredProducts lọc và sắp xếp
  it('TC14 - [Unit Selector] selectFilteredProducts: lọc theo danh mục, từ khóa và sắp xếp giá tăng dần', () => {
    const mockRoot = {
      cart: { items: [], appliedCoupon: null, isDrawerOpen: false },
      products: {
        items: [...mockProductList],
        status: 'succeeded',
        error: null,
        selectedCategory: 'gear',
        searchQuery: 'akko',
        sortBy: 'price-asc',
        selectedProduct: null,
      },
    } as unknown as RootState;

    const filtered = selectFilteredProducts(mockRoot);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(101);
  });

  // TEST CASE 15: ASYNC TEST - Mock API fetchProducts resolved thành công
  it('TC15 - [Async + Mock API] fetchProducts.fulfilled: tải danh sách sản phẩm thành công khi API phản hồi', async () => {
    // Mock API productService.getProducts trả về mockProductList
    const spyGetProducts = vi
      .spyOn(productService, 'getProducts')
      .mockResolvedValueOnce([...mockProductList]);

    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchProducts();
    const result = await thunk(dispatch, getState, undefined);

    expect(spyGetProducts).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('products/fetchProducts/fulfilled');
    expect(result.payload).toEqual(mockProductList);

    // Kiểm tra reducer xử lý action fulfilled
    const nextState = productsReducer(initialState, result);
    expect(nextState.status).toBe('succeeded');
    expect(nextState.items).toHaveLength(3);
    expect(nextState.items[0].title).toBe('Bàn phím cơ Akko Pro');
  });

  // TEST CASE 16: ASYNC TEST - Mock API fetchProducts rejected khi có lỗi mạng
  it('TC16 - [Async + Mock API] fetchProducts.rejected: chuyển trạng thái failed và lưu message khi API lỗi', async () => {
    // Mock API productService.getProducts throw error
    const spyGetProducts = vi
      .spyOn(productService, 'getProducts')
      .mockRejectedValueOnce(new Error('Máy chủ API 500: Server Timeout'));

    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchProducts();
    const result = await thunk(dispatch, getState, undefined);

    expect(spyGetProducts).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('products/fetchProducts/rejected');
    expect(result.payload).toBe('Máy chủ API 500: Server Timeout');

    // Kiểm tra reducer xử lý action rejected
    const nextState = productsReducer(initialState, result);
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Máy chủ API 500: Server Timeout');
  });

  // TEST CASE 17: ASYNC TEST - Mock API fetchProductById
  it('TC17 - [Async + Mock API] fetchProductById: lấy chi tiết một sản phẩm theo ID từ API mock', async () => {
    const singleProduct = mockProductList[1];
    vi.spyOn(productService, 'getProductById').mockResolvedValueOnce(singleProduct);

    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchProductById(102);
    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toBe('products/fetchProductById/fulfilled');
    expect(result.payload).toEqual(singleProduct);

    const nextState = productsReducer(initialState, result);
    expect(nextState.selectedProduct?.id).toBe(102);
  });
});
