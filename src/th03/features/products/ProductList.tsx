import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  fetchProducts,
  selectSelectedCategory,
  selectSearchQuery,
  selectSortBy,
} from './productsSlice';
import { useGetProductsQuery } from './productsApi';
import { ProductCard } from './ProductCard';
import type { Product } from './productTypes';
import { AlertCircle, RefreshCw, ShoppingBag, Sparkles } from 'lucide-react';

interface ProductListProps {
  dataSourceMode: 'thunk' | 'rtk-query';
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  dataSourceMode,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();

  // Dữ liệu từ createAsyncThunk
  const thunkProducts = useAppSelector(selectFilteredProducts);
  const thunkStatus = useAppSelector(selectProductsStatus);
  const thunkError = useAppSelector(selectProductsError);

  // Dữ liệu từ RTK Query (Điểm cộng)
  const {
    data: rtkProductsRaw,
    isLoading: isRtkLoading,
    isError: isRtkError,
    error: rtkErrorObj,
    refetch: refetchRtk,
  } = useGetProductsQuery();

  const selectedCategory = useAppSelector(selectSelectedCategory);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sortBy = useAppSelector(selectSortBy);

  // Xử lý lọc và sắp xếp cho chế độ RTK Query
  const filteredRtkProducts = React.useMemo(() => {
    if (!rtkProductsRaw) return [];
    let list = [...rtkProductsRaw];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      list.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return list;
  }, [rtkProductsRaw, selectedCategory, searchQuery, sortBy]);

  // Xác định dữ liệu hiển thị theo chế độ
  const isLoading =
    dataSourceMode === 'thunk' ? thunkStatus === 'loading' : isRtkLoading;
  const isError =
    dataSourceMode === 'thunk' ? thunkStatus === 'failed' : isRtkError;
  const errorMessage =
    dataSourceMode === 'thunk'
      ? thunkError
      : (rtkErrorObj as { message?: string })?.message || 'Lỗi khi tải từ RTK Query';
  const products: Product[] =
    dataSourceMode === 'thunk' ? thunkProducts : filteredRtkProducts;

  const handleRetry = () => {
    if (dataSourceMode === 'thunk') {
      dispatch(fetchProducts(false));
    } else {
      refetchRtk();
    }
  };

  // 1. Trạng thái Đang tải (Skeleton Loading)
  if (isLoading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="product-skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-body">
              <div className="skeleton-tag" />
              <div className="skeleton-title" />
              <div className="skeleton-desc" />
              <div className="skeleton-footer">
                <div className="skeleton-price" />
                <div className="skeleton-button" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Trạng thái Lỗi (Error State với Nút Retry)
  if (isError) {
    return (
      <div className="state-error-box">
        <div className="error-icon-wrapper">
          <AlertCircle size={36} className="text-rose-500" />
        </div>
        <h3 className="error-title">Không thể tải dữ liệu sản phẩm</h3>
        <p className="error-message">{errorMessage}</p>
        <button type="button" className="btn-retry" onClick={handleRetry}>
          <RefreshCw size={16} /> Thử lại ngay
        </button>
      </div>
    );
  }

  // 3. Trạng thái Không có kết quả tìm kiếm (Empty State)
  if (products.length === 0) {
    return (
      <div className="state-empty-box">
        <div className="empty-icon-wrapper">
          <ShoppingBag size={40} className="text-slate-400" />
        </div>
        <h3 className="empty-title">Không tìm thấy sản phẩm phù hợp</h3>
        <p className="empty-desc">
          Hãy thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác để xem thêm sản phẩm.
        </p>
      </div>
    );
  }

  // 4. Danh sách sản phẩm bình thường
  return (
    <div>
      {/* Banner thông báo nguồn dữ liệu */}
      <div className="datasource-indicator-bar">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-500" />
          <span>
            Đang hiển thị dữ liệu qua:{' '}
            <strong className="text-indigo-600 font-semibold">
              {dataSourceMode === 'thunk'
                ? 'createAsyncThunk (productsSlice extraReducers)'
                : 'RTK Query (productsApi & useGetProductsQuery - Điểm cộng)'}
            </strong>
          </span>
        </div>
        <span className="products-count-badge">{products.length} sản phẩm</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onShowToast={onShowToast}
          />
        ))}
      </div>
    </div>
  );
};
