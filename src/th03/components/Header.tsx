import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleCartDrawer, selectCartTotalCount } from '../features/cart/cartSlice';
import { ShoppingCart, Sparkles, Layers, BookOpen, Database } from 'lucide-react';

interface HeaderProps {
  dataSourceMode: 'thunk' | 'rtk-query';
  onToggleDataSourceMode: () => void;
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  dataSourceMode,
  onToggleDataSourceMode,
  onOpenDocs,
}) => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartTotalCount);

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo & Subject Info */}
        <div className="brand-group">
          <div className="brand-icon-box">
            <Layers size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="brand-badge">LTWNC • TH03</span>
              <span className="brand-subbadge">Redux Toolkit Module</span>
            </div>
            <h1 className="brand-title">E-Commerce Redux Store</h1>
          </div>
        </div>

        {/* Right Actions: Mode Switcher, Docs, Cart Button */}
        <div className="header-actions">
          {/* Data Source Switcher Button (Điểm cộng RTK Query) */}
          <button
            type="button"
            className={`mode-toggle-btn ${
              dataSourceMode === 'rtk-query' ? 'mode-rtk-active' : 'mode-thunk-active'
            }`}
            onClick={onToggleDataSourceMode}
            title="Chuyển đổi giữa createAsyncThunk và RTK Query"
          >
            {dataSourceMode === 'rtk-query' ? (
              <>
                <Sparkles size={16} className="text-amber-500 animate-pulse" />
                <span className="mode-label">
                  Chế độ: <strong>RTK Query (Bonus)</strong>
                </span>
              </>
            ) : (
              <>
                <Database size={16} className="text-blue-500" />
                <span className="mode-label">
                  Chế độ: <strong>createAsyncThunk</strong>
                </span>
              </>
            )}
          </button>

          {/* Architecture Docs Button */}
          <button
            type="button"
            className="btn-docs-toggle"
            onClick={onOpenDocs}
            title="Xem sơ đồ & báo cáo kiến trúc Redux Toolkit"
          >
            <BookOpen size={17} />
            <span className="docs-text">Báo cáo kiến trúc</span>
          </button>

          {/* Cart Icon Trigger */}
          <button
            type="button"
            className="header-cart-btn"
            onClick={() => dispatch(toggleCartDrawer())}
            title="Mở giỏ hàng"
          >
            <ShoppingCart size={20} />
            <span className="cart-btn-label">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="header-cart-badge animate-bounce-subtle">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
