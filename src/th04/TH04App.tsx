import React, { useState } from 'react';
import { useFavoritesStore } from './favoritesStore';
import type { FavoriteProduct } from './favoritesTypes';
import { ProductCard } from './components/ProductCard';
import { FavoriteDrawer } from './components/FavoriteDrawer';
import { ComparisonReview } from './ComparisonReview';
import { MOCK_PRODUCTS } from '../th03/services/mockData';
import {
  Heart,
  Sparkles,
  Search,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  X,
  Star,
  Layers,
  BookOpen,
} from 'lucide-react';
import './TH04.css';

export const TH04App: React.FC = () => {
  // Zustand State
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const setDrawerOpen = useFavoritesStore((state) => state.setDrawerOpen);

  // Local UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<FavoriteProduct | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastAdded, setIsToastAdded] = useState(true);

  const showToast = (message: string, isAdded: boolean) => {
    setToastMessage(message);
    setIsToastAdded(isAdded);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Lọc sản phẩm
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchCat =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = [
    { key: 'all', label: 'Tất cả' },
    { key: 'electronics', label: 'Điện tử' },
    { key: 'fashion', label: 'Thời trang' },
    { key: 'accessories', label: 'Phụ kiện' },
    { key: 'lifestyle', label: 'Đời sống' },
  ];

  return (
    <div className="th04-container">
      {/* HERO SECTION */}
      <header className="th04-hero">
        <div className="th04-badge">
          <Sparkles size={15} />
          <span>LTWNC - Bài Tập Tuần 4 • Quản Lý State Với Zustand</span>
        </div>

        <h1 className="th04-title">
          Tính Năng <span className="th04-title-gradient">Sản Phẩm Yêu Thích</span>
        </h1>

        <p className="th04-subtitle">
          Xây dựng bằng <strong>Zustand store (favoritesStore)</strong> với <code>persist middleware</code> (tự động lưu LocalStorage). Không cần Provider bọc toàn ứng dụng, render tối ưu bằng atomic selectors.
        </p>

        {/* Feature badges */}
        <div className="th04-feature-pills">
          <div className="th04-pill">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>Zustand create() Store</span>
          </div>
          <div className="th04-pill">
            <Heart size={15} className="text-rose-500 fill-rose-500" />
            <span>Thêm / Bỏ 1 sản phẩm khỏi yêu thích</span>
          </div>
          <div className="th04-pill">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>Đồng bộ LocalStorage (persist)</span>
          </div>
          <div className="th04-pill">
            <BookOpen size={15} className="text-blue-500" />
            <span>Kèm đoạn nhận xét so sánh vs Redux Toolkit</span>
          </div>
        </div>
      </header>

      {/* FILTER & TOP ACTION BAR */}
      <section className="th04-controls-card">
        <div className="th04-controls-inner">
          {/* Search box */}
          <div className="th04-search-box">
            <Search size={18} className="th04-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm yêu thích..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="th04-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="th04-search-clear"
                onClick={() => setSearchQuery('')}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Favorites Drawer Trigger Button */}
          <button
            type="button"
            className="th04-btn-open-fav"
            onClick={() => setDrawerOpen(true)}
            title="Mở danh sách sản phẩm yêu thích"
          >
            <Heart
              size={18}
              className={favoritesCount > 0 ? 'fill-white' : ''}
            />
            <span>Mục Yêu Thích</span>
            <span className="th04-badge-count">{favoritesCount}</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="th04-cat-row">
          <span className="th04-cat-label">
            <SlidersHorizontal size={14} /> Danh mục:
          </span>
          <div className="th04-cat-chips">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`th04-cat-chip ${
                  selectedCategory === cat.key ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="th04-catalog-section">
        <div className="th04-section-heading">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-amber-500" />
            <h2 className="th04-section-title">Danh Sách Sản Phẩm</h2>
          </div>
          <span className="th04-count-pill">{filteredProducts.length} sản phẩm</span>
        </div>

        <div className="th04-product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToast={showToast}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* COMPARISON REVIEW SECTION (ĐOẠN NHẬN XÉT 5-7 DÒNG YÊU CẦU ĐỀ BÀI) */}
      <section className="th04-review-section">
        <ComparisonReview />
      </section>

      {/* FAVORITE DRAWER SLIDE-OVER */}
      <FavoriteDrawer
        onSelectProduct={setSelectedProduct}
        onToast={showToast}
      />

      {/* QUICK PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div
          className="th04-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="th04-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="th04-modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={18} />
            </button>

            <div className="th04-modal-grid">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="th04-modal-img"
              />

              <div className="th04-modal-info">
                <span className="th04-category-tag">{selectedProduct.category}</span>
                <h3 className="th04-modal-title">{selectedProduct.title}</h3>

                <div className="flex items-center gap-2 mb-3 text-amber-500 font-bold text-sm">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating.rate} / 5</span>
                  <span className="text-slate-400 text-xs font-normal">
                    ({selectedProduct.rating.count} lượt đánh giá)
                  </span>
                </div>

                <div className="th04-modal-price">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(selectedProduct.price)}
                </div>

                <p className="th04-modal-desc">
                  {(selectedProduct as { description?: string }).description ||
                    'Sản phẩm công nghệ / thời trang chính hãng, bảo hành 12 tháng tại hệ thống cửa hàng.'}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Kho hàng: <strong>{selectedProduct.stock} cái</strong>
                  </span>

                  <button
                    type="button"
                    className="th04-btn-modal-close"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          className={`th04-floating-toast ${
            isToastAdded ? 'toast-add' : 'toast-remove'
          }`}
        >
          <Heart
            size={18}
            className={isToastAdded ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}
          />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
