import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './productTypes';
import { productService } from '../../services/productService';

/**
 * RTK Query API Slice (Điểm cộng bài tập)
 * - Tự động quản lý caching, background refetching và deduplication
 * - Cung cấp auto-generated hooks: useGetProductsQuery, useGetProductByIdQuery
 */
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      async queryFn() {
        try {
          const data = await productService.getProducts();
          return { data };
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Lỗi khi tải sản phẩm qua RTK Query';
          return { error: { message } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      async queryFn(id) {
        try {
          const data = await productService.getProductById(id);
          return { data };
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Không tìm thấy sản phẩm';
          return { error: { message } };
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
