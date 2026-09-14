import { useState } from 'react';
import { Accordion } from './components/Accordion';
import { usePagination } from './hooks/usePagination';
import { MOCK_PRODUCTS, MOCK_FAQ_ITEMS, type Product } from './data/mockData';
import {
  Layers,
  FileCode,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
  HelpCircle,
  Code2,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'accordion' | 'pagination'>('all');

  // =========================================================================
  // KÍCH HOẠT CUSTOM HOOK usePagination<T> CHO MẢNG SẢN PHẨM MOCK_PRODUCTS
  // =========================================================================
  const {
    currentPage,
    totalPages,
    currentData: products,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    canNext,
    canPrev,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage,
  } = usePagination<Product>(MOCK_PRODUCTS, 6);

  return (
    <div className="app-container">
      {/* HERO HEADER */}
      <header className="header-hero">
        <div className="badge-tag">
          <BookOpen size={16} /> LTWNC - Bài Tập Tuần 2 (PTIT)
        </div>
        <h1 className="hero-title">React Advanced Design Patterns</h1>
        <p className="hero-subtitle">
          Xây dựng Compound Component <strong>Accordion</strong> (Context API) & Custom Hook Generic{' '}
          <strong>usePagination&lt;T&gt;</strong>
        </p>
      </header>

      {/* TAB SWITCHER DEMO */}
      <nav className="tab-switcher">
        <button
          className={`nav-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Layers size={18} /> Tất Cả Demo
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'accordion' ? 'active' : ''}`}
          onClick={() => setActiveTab('accordion')}
        >
          <HelpCircle size={18} /> Accordion Component
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'pagination' ? 'active' : ''}`}
          onClick={() => setActiveTab('pagination')}
        >
          <ShoppingBag size={18} /> Phân Trang Sản Phẩm
        </button>
      </nav>

      {/* =========================================================================
          SECTION 1: COMPOUND COMPONENT ACCORDION DEMO
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'accordion') && (
        <section className="section-card">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Layers className="text-primary" size={24} /> Compound Component: Accordion
              </h2>
              <p className="section-desc">
                Nhiều panel nhưng <strong>chỉ mở 1 panel tại một thời điểm</strong>. Sử dụng Context API chia sẻ state ngầm.
              </p>
            </div>
            <span className="badge-tag" style={{ margin: 0 }}>
              <CheckCircle2 size={14} color="#10b981" /> Context API Mode
            </span>
          </div>

          {/* SỬ DỤNG COMPOUND COMPONENT ACCORDION */}
          <Accordion defaultValue="faq-1">
            {MOCK_FAQ_ITEMS.map((item) => (
              <Accordion.Item key={item.id} value={item.id}>
                <Accordion.Header>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: 'rgba(99, 102, 241, 0.15)',
                        color: '#818cf8',
                        fontWeight: 600,
                      }}
                    >
                      {item.tag}
                    </span>
                    <span>{item.question}</span>
                  </div>
                </Accordion.Header>

                <Accordion.Panel>
                  <p>{item.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>

          {/* CODE EXPLANATION SNIPPET */}
          <div className="code-box">
            <div className="code-box-header">
              <span><FileCode size={14} /> Usage Example (Compound Component Pattern)</span>
              <span>JSX / TSX</span>
            </div>
            <pre>
{`<Accordion defaultValue="faq-1">
  <Accordion.Item value="faq-1">
    <Accordion.Header>Tiêu đề Panel 1</Accordion.Header>
    <Accordion.Panel>Nội dung Panel 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="faq-2">
    <Accordion.Header>Tiêu đề Panel 2</Accordion.Header>
    <Accordion.Panel>Nội dung Panel 2</Accordion.Panel>
  </Accordion.Item>
</Accordion>`}
            </pre>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2: CUSTOM HOOK USEPAGINATION<T> DEMO
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'pagination') && (
        <section className="section-card">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <ShoppingBag className="text-primary" size={24} /> Custom Hook: usePagination&lt;T&gt;
              </h2>
              <p className="section-desc">
                Áp dụng cho danh sách sản phẩm với Generic Type <code>&lt;T&gt;</code> tường minh, tuyệt đối không dùng <code>any</code>.
              </p>
            </div>
            <span className="badge-tag" style={{ margin: 0 }}>
              <Code2 size={14} color="#06b6d4" /> Generic Hook &lt;Product&gt;
            </span>
          </div>

          {/* CONTROLS BAR */}
          <div className="controls-bar">
            <div className="info-text">
              Hiển thị từ <strong>{startIndex}</strong> - <strong>{endIndex}</strong> trong tổng số <strong>{totalItems}</strong> sản phẩm (Trang <strong>{currentPage}</strong>/<strong>{totalPages}</strong>)
            </div>

            <div className="page-size-selector">
              <label htmlFor="pageSizeSelect">Số sản phẩm/trang:</label>
              <select
                id="pageSizeSelect"
                className="select-input"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={4}>4 sản phẩm</option>
                <option value={6}>6 sản phẩm</option>
                <option value={8}>8 sản phẩm</option>
                <option value={12}>12 sản phẩm</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="products-grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.title} className="product-img" loading="lazy" />
                  <span className="category-badge">{product.category}</span>
                  <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </div>

                <div className="product-body">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-desc">{product.description}</p>

                  <div className="product-footer">
                    <span className="product-price">\${product.price.toLocaleString()}</span>
                    <span className="product-rating">
                      <Star size={14} fill="#fbbf24" stroke="none" /> {product.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* PAGINATION NAVIGATION BAR */}
          <div className="pagination-controls">
            {/* Nút Prev */}
            <button
              className="pg-btn"
              onClick={prevPage}
              disabled={!canPrev}
              title="Trang trước"
            >
              <ChevronLeft size={18} /> Prev
            </button>

            {/* Các nút bấm nhảy trang trực tiếp */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  className={`pg-btn ${isActive ? 'active' : ''}`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Nút Next */}
            <button
              className="pg-btn"
              onClick={nextPage}
              disabled={!canNext}
              title="Trang tiếp"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>

          {/* CODE EXPLANATION SNIPPET */}
          <div className="code-box">
            <div className="code-box-header">
              <span><FileCode size={14} /> Hook Signature & Usage</span>
              <span>TypeScript</span>
            </div>
            <pre>
{`const {
  currentPage,
  totalPages,
  currentData: products,
  nextPage,
  prevPage,
  goToPage
} = usePagination<Product>(MOCK_PRODUCTS, 6);`}
            </pre>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          Lập Trình Web Nâng Cao (LTWNC) - Bài Tập Tuần 2 &bull; Giảng viên: Ngô Văn Nhận
        </p>
        <p style={{ marginTop: '0.25rem', color: '#6b7280' }}>
          Built with React 18, TypeScript, Context API & Custom Hooks
        </p>
      </footer>
    </div>
  );
}
