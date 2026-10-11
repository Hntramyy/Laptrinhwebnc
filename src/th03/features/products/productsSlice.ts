import { createSlice, createAsyncThunk, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Product, ProductsState, SortOption } from './productTypes';
import { productService } from '../../services/productService';
import type { RootState } from '../../app/store';

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'default',
  selectedProduct: null,
};

/**
 * createAsyncThunk lấy danh sách sản phẩm từ API giả lập
 */
export const fetchProducts = createAsyncThunk<
  Product[],
  boolean | void,
  { rejectValue: string }
>('products/fetchProducts', async (forceError, { rejectWithValue }) => {
  try {
    const data = await productService.getProducts(Boolean(forceError));
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Không thể tải danh sách sản phẩm');
  }
});

/**
 * createAsyncThunk lấy chi tiết một sản phẩm
 */
export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const data = await productService.getProductById(id);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Không tìm thấy sản phẩm');
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    updateStockAfterCheckout: (
      state,
      action: PayloadAction<{ id: number; quantity: number }[]>
    ) => {
      action.payload.forEach(({ id, quantity }) => {
        const product = state.items.find((p) => p.id === id);
        if (product) {
          product.stock = Math.max(0, product.stock - quantity);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Đã xảy ra lỗi không xác định';
      })
      // fetchProductById
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const {
  setCategory,
  setSearchQuery,
  setSortBy,
  setSelectedProduct,
  updateStockAfterCheckout,
} = productsSlice.actions;

// Selectors
export const selectProductsState = (state: RootState) => state.products;
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectSortBy = (state: RootState) => state.products.sortBy;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;

// Memoized Selector lọc và sắp xếp sản phẩm
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSelectedCategory, selectSearchQuery, selectSortBy],
  (products, category, query, sort) => {
    let result = [...products];

    // Lọc theo Category
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Lọc theo Tìm kiếm
    if (query.trim() !== '') {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sắp xếp
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating-desc') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }
);

export default productsSlice.reducer;
