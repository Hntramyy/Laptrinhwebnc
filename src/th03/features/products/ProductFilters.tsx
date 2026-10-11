import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setCategory,
  setSearchQuery,
  setSortBy,
  selectSelectedCategory,
  selectSearchQuery,
  selectSortBy,
  fetchProducts,
  selectProductsStatus,
} from './productsSlice';
import { CATEGORIES_MAP } from '../../services/mockData';
import type { SortOption } from './productTypes';
import { Search, X, SlidersHorizontal, ArrowUpDown, RefreshCw, AlertTriangle } from 'lucide-react';

interface ProductFiltersProps {
  dataSourceMode: 'thunk' | 'rtk-query';
  onRefreshRtk?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  dataSourceMode,
  onRefreshRtk,
}) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sortBy = useAppSelector(selectSortBy);
  const status = useAppSelector(selectProductsStatus);

  const categories = Object.keys(CATEGORIES_MAP);

  const handleCategoryClick = (cat: string) => {
    dispatch(setCategory(cat));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  const handleReload = () => {
    if (dataSourceMode === 'thunk') {
      dispatch(fetchProducts(false));
    } else if (onRefreshRtk) {
      onRefreshRtk();
    }
  };

  const handleSimulateError = () => {
    if (dataSourceMode === 'thunk') {
      dispatch(fetchProducts(true)); // Kích hoạt forceError = true để test trạng thái rejected
    }
  };

  return (
    <div className="filters-section">
      {/* Top Filter Controls: Search & Sort */}
      <div className="filter-controls-bar">
        {/* Search Input */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên, mô tả..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="search-clear-btn"
              title="Xóa tìm kiếm"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action Buttons: Sort & Reload */}
        <div className="filter-actions-right">
          <div className="sort-dropdown-wrapper">
            <ArrowUpDown size={15} className="sort-icon" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
          </div>

          <button
            type="button"
            className="btn-refresh"
            onClick={handleReload}
            disabled={status === 'loading'}
            title="Tải lại danh sách sản phẩm"
          >
            <RefreshCw size={15} className={status === 'loading' ? 'animate-spin' : ''} />
            <span className="btn-text">Làm mới</span>
          </button>

          {dataSourceMode === 'thunk' && (
            <button
              type="button"
              className="btn-simulate-error"
              onClick={handleSimulateError}
              title="Mô phỏng lỗi API để kiểm tra xử lý extraReducers (rejected)"
            >
              <AlertTriangle size={14} />
              <span>Test Lỗi API</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-pills-bar">
        <div className="category-label">
          <SlidersHorizontal size={14} />
          <span>Danh mục:</span>
        </div>
        <div className="category-chips">
          {categories.map((catKey) => {
            const isActive = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                className={`category-chip ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(catKey)}
              >
                {CATEGORIES_MAP[catKey]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
