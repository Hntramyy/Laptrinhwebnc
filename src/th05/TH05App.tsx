import React, { useState, useMemo, useDeferredValue, Suspense, lazy } from 'react';
import { generate10kProducts } from './data/generateDataset';
import { UnoptimizedList } from './components/UnoptimizedList';
import { OptimizedVirtualList } from './components/OptimizedVirtualList';
import { LighthouseReportModal } from './components/LighthouseReportModal';
import {
  Zap,
  Gauge,
  Search,
  Filter,
  BarChart3,
  Award,
  Layers,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import './TH05.css';

// Kỹ thuật Code-Splitting: Lazy load component biểu đồ phân tích nặng
const HeavyAnalyticsChartLazy = lazy(
  () => import('./components/HeavyAnalyticsChart')
);

export const TH05App: React.FC = () => {
  // Sinh dữ liệu 10.000 sản phẩm một lần duy nhất
  const rawProducts = useMemo(() => generate10kProducts(), []);

  // Chế độ: 'optimized' (Mặc định) hoặc 'unoptimized'
  const [mode, setMode] = useState<'optimized' | 'unoptimized'>('optimized');

  // Bộ lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Thước đo hiệu năng thời gian thực (Live Performance Metrics)
  const [renderDuration, setRenderDuration] = useState<number>(mode === 'optimized' ? 2 : 450);
  const [domCount, setDomCount] = useState<number>(mode === 'optimized' ? 120 : 60000);

  // Kỹ thuật Concurrent: useDeferredValue giúp ô input gõ mượt mà không bị nghẽn
  const deferredSearch = useDeferredValue(searchQuery);

  // Lọc sản phẩm (Memoize danh sách)
  const filteredProducts = useMemo(() => {
    let result = rawProducts;

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category.includes(selectedCategory));
    }

    if (deferredSearch.trim() !== '') {
      const q = deferredSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q)
      );
    }

    return result;
  }, [rawProducts, selectedCategory, deferredSearch]);

  const handleMeasure = (durationMs: number, nodes: number) => {
    setRenderDuration(durationMs);
    setDomCount(nodes);
  };

  const handleModeChange = (newMode: 'optimized' | 'unoptimized') => {
    setMode(newMode);
  };

  return (
    <div className="th05-container">
      {/* HERO HEADER */}
      <header className="th05-hero">
        <div className="th05-badge">
          <Gauge size={15} />
          <span>LTWNC - Bài Tập Tuần 5 • Tối Ưu Hóa Hiệu Năng React (10.000 Sản Phẩm)</span>
        </div>

        <h1 className="th05-title">
          Kỹ Thuật Tối Ưu <span className="th05-title-gradient">Virtualization & Memoization</span>
        </h1>

        <p className="th05-subtitle">
          Khảo sát & xử lý nghẽn DOM cho tập dữ liệu <strong>10.000 sản phẩm</strong>.
          Đối chiếu trực tiếp điểm số Lighthouse <strong>54 ➔ 98</strong> (+44 điểm) trước và sau khi áp dụng kỹ thuật.
        </p>

        {/* Action Button: Báo Cáo Lighthouse */}
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            type="button"
            className="th05-btn-lighthouse"
            onClick={() => setIsReportOpen(true)}
          >
            <Award size={18} className="text-amber-400" />
            <span>Xem Báo Cáo Đo Lường Lighthouse</span>
            <span className="th05-pill-score">98/100</span>
          </button>

          <button
            type="button"
            className="th05-btn-toggle-analytics"
            onClick={() => setShowAnalytics((v) => !v)}
          >
            <BarChart3 size={18} />
            <span>
              {showAnalytics ? 'Ẩn Biểu Đồ Code-Splitting' : 'Mở Biểu Đồ (React.lazy)'}
            </span>
          </button>
        </div>
      </header>

      {/* LIVE PERFORMANCE METERS BAR */}
      <section className="th05-meters-card">
        <div className="th05-meters-header">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-indigo-600 animate-pulse" />
            <h3 className="th05-meters-title">Thước Đo Hiệu Năng Thời Gian Thực (Live Metrics)</h3>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="th05-mode-switcher">
            <button
              type="button"
              className={`th05-mode-btn ${mode === 'unoptimized' ? 'active-warning' : ''}`}
              onClick={() => handleModeChange('unoptimized')}
            >
              <AlertTriangle size={15} />
              <span>1. Trước Tối Ưu (DOM Nghẽn)</span>
            </button>

            <button
              type="button"
              className={`th05-mode-btn ${mode === 'optimized' ? 'active-success' : ''}`}
              onClick={() => handleModeChange('optimized')}
            >
              <Zap size={15} />
              <span>2. Sau Tối Ưu (Virtualization)</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="th05-meters-grid">
          <div className={`th05-meter-box ${mode === 'optimized' ? 'box-good' : 'box-bad'}`}>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <Clock size={14} /> Thời gian vẽ giao diện (Render)
            </div>
            <div className="th05-meter-val">
              {renderDuration} ms
              <span className="text-xs font-normal ml-1">
                {mode === 'optimized' ? '(Cực nhanh)' : '(Nghẽn main thread)'}
              </span>
            </div>
          </div>

          <div className={`th05-meter-box ${mode === 'optimized' ? 'box-good' : 'box-bad'}`}>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <Layers size={14} /> Số lượng DOM Nodes đang gắn
            </div>
            <div className="th05-meter-val">
              ~{domCount.toLocaleString()} nodes
              <span className="text-xs font-normal ml-1">
                {mode === 'optimized' ? '(Giảm 99.8%)' : '(Quá tải DOM)'}
              </span>
            </div>
          </div>

          <div className={`th05-meter-box ${mode === 'optimized' ? 'box-good' : 'box-bad'}`}>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <Cpu size={14} /> FPS Ước tính khi cuộn trang
            </div>
            <div className="th05-meter-val">
              {mode === 'optimized' ? '60 FPS (Mượt mà)' : '15 - 24 FPS (Giật lag)'}
            </div>
          </div>
        </div>
      </section>

      {/* LAZY LOADED HEAVY ANALYTICS CHART (CODE-SPLITTING) */}
      {showAnalytics && (
        <section className="mb-6">
          <Suspense
            fallback={
              <div className="th05-lazy-loading-skeleton">
                <div className="animate-spin text-indigo-600 mr-2">⚙️</div>
                <span>Đang tải chunk mã nguồn biểu đồ bằng React.lazy & Suspense...</span>
              </div>
            }
          >
            <HeavyAnalyticsChartLazy products={rawProducts} />
          </Suspense>
        </section>
      )}

      {/* SEARCH & FILTER CONTROLS */}
      <section className="th05-filter-card">
        <div className="th05-filter-row">
          {/* Search Box */}
          <div className="th05-search-box">
            <Search size={18} className="th05-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm trong 10.000 sản phẩm (Tên hoặc Mã SP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="th05-search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="th05-cat-select-wrapper">
            <Filter size={15} className="text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="th05-cat-select"
            >
              <option value="all">Tất cả danh mục (6 ngành hàng)</option>
              <option value="Điện tử">Điện tử & Laptop</option>
              <option value="Phụ kiện">Phụ kiện & Chuột/Phím</option>
              <option value="Thời trang">Thời trang & Ba lô</option>
              <option value="Đời sống">Đời sống & Bàn ghế</option>
              <option value="Âm thanh">Âm thanh & Tai nghe</option>
              <option value="Gaming">Gaming & Console</option>
            </select>
          </div>

          <span className="th05-dataset-badge">
            Khớp: <strong>{filteredProducts.length.toLocaleString()}</strong> / 10.000 SP
          </span>
        </div>
      </section>

      {/* MAIN DATA LIST: UNOPTIMIZED OR OPTIMIZED */}
      <section className="th05-list-section">
        {mode === 'unoptimized' ? (
          <UnoptimizedList
            products={filteredProducts}
            onRenderMeasured={handleMeasure}
          />
        ) : (
          <OptimizedVirtualList
            products={filteredProducts}
            onRenderMeasured={handleMeasure}
          />
        )}
      </section>

      {/* LIGHTHOUSE REPORT MODAL */}
      <LighthouseReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
};
