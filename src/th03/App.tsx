import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/products/productsSlice';
import {
  toggleCartDrawer,
  selectCartTotalCount,
  selectCartFinalTotal,
} from './features/cart/cartSlice';
import { Header } from './components/Header';
import { ProductFilters } from './features/products/ProductFilters';
import { ProductList } from './features/products/ProductList';
import { ProductDetailModal } from './features/products/ProductDetailModal';
import { CartDrawer } from './features/cart/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { ToastContainer, type ToastItem } from './components/Toast';
import {
  Layers,
  Sparkles,
  Database,
  ShoppingCart,
  BookOpen,
  CheckCircle2,
  Package,
} from 'lucide-react';
import './App.css';

export default function App() {
  const dispatch = useAppDispatch();
  const cartTotalCount = useAppSelector(selectCartTotalCount);
  const cartFinalTotal = useAppSelector(selectCartFinalTotal);

  // Chế độ nguồn dữ liệu: createAsyncThunk vs RTK Query (Điểm cộng)
  const [dataSourceMode, setDataSourceMode] = useState<'thunk' | 'rtk-query'>('thunk');

  // Quản lý Modal & Drawer
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Quản lý Toast thông báo
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Tải danh sách sản phẩm ban đầu bằng createAsyncThunk
  useEffect(() => {
    dispatch(fetchProducts(false));
  }, [dispatch]);

  const showToast = (
    message: string,
    type: 'success' | 'warning' | 'error' = 'success'
  ) => {
    const newToast: ToastItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleDataSourceMode = () => {
    const nextMode = dataSourceMode === 'thunk' ? 'rtk-query' : 'thunk';
    setDataSourceMode(nextMode);
    if (nextMode === 'rtk-query') {
      showToast(
        'Đã kích hoạt chế độ RTK Query (productsApi) - Điểm cộng bài tập!',
        'success'
      );
    } else {
      showToast('Đã kích hoạt chế độ chuẩn: createAsyncThunk (productsSlice)', 'success');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  return (
    <div className="app-layout">
      {/* HEADER CHÍNH */}
      <Header
        dataSourceMode={dataSourceMode}
        onToggleDataSourceMode={handleToggleDataSourceMode}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      <main className="main-content">
        {/* HERO SECTION GIỚI THIỆU BÀI TẬP */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <Layers size={15} />
              <span>LTWNC - Bài Tập Tuần 3 • Redux Toolkit Cart Module</span>
            </div>

            <h1 className="hero-title">
              Quản Lý Giỏ Hàng Chuẩn <span className="gradient-text">Feature-Based</span>
            </h1>

            <p className="hero-description">
              Hệ thống giỏ hàng hoàn chỉnh xây dựng bằng <strong>Redux Toolkit</strong>,
              tách biệt <code>features/cart</code> và <code>features/products</code>.
              Chỉ sử dụng <code>useAppDispatch</code> và <code>useAppSelector</code> đã gõ kiểu TypeScript.
            </p>

            {/* Feature Highlights Pills */}
            <div className="hero-features-list">
              <div className="hero-feature-pill">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>createAsyncThunk (pending / fulfilled / rejected)</span>
              </div>
              <div className="hero-feature-pill highlight-rtk">
                <Sparkles size={15} className="text-amber-500" />
                <span>RTK Query (Điểm cộng)</span>
              </div>
              <div className="hero-feature-pill">
                <Package size={15} className="text-blue-500" />
                <span>Kiểm soát tồn kho (Stock limit)</span>
              </div>
              <div className="hero-feature-pill">
                <Database size={15} className="text-violet-500" />
                <span>Đồng bộ LocalStorage tự động</span>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="hero-actions-bar">
              <button
                type="button"
                className="hero-btn-primary"
                onClick={() => dispatch(toggleCartDrawer())}
              >
                <ShoppingCart size={17} />
                <span>
                  Xem giỏ hàng{' '}
                  {cartTotalCount > 0 && `(${cartTotalCount} món - ${formatCurrency(cartFinalTotal)})`}
                </span>
              </button>

              <button
                type="button"
                className="hero-btn-secondary"
                onClick={() => setIsDocsOpen(true)}
              >
                <BookOpen size={17} />
                <span>Xem báo cáo kiến trúc</span>
              </button>
            </div>
          </div>
        </section>

        {/* BỘ LỌC VÀ TÌM KIẾM SẢN PHẨM */}
        <section className="catalog-section">
          <ProductFilters
            dataSourceMode={dataSourceMode}
            onRefreshRtk={() => {
              showToast('Đang làm mới cache RTK Query...', 'success');
            }}
          />

          {/* DANH SÁCH LƯỚI SẢN PHẨM */}
          <ProductList
            dataSourceMode={dataSourceMode}
            onShowToast={showToast}
          />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-title">Học phần: Lập trình Web Nâng Cao (LTWNC)</span>
            <p className="footer-sub">
              Khoa Công nghệ Thông tin - Học viện Công nghệ Bưu chính Viễn thông (PTIT)
            </p>
          </div>
          <div className="footer-right">
            <span>Redux Toolkit v2 • React 19 • TypeScript • Feature-Based Architecture</span>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <ProductDetailModal onShowToast={showToast} />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onShowToast={showToast}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onShowToast={showToast}
      />

      <ArchitectureDocs
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* TOAST NOTIFICATION CONTAINER */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
