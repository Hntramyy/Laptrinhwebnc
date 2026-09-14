import React from 'react';
import { Product } from './order-management.types';
import { usePagination } from './usePagination';
import { Accordion } from './Accordion';
import './Accordion.css';

// Dữ liệu mẫu danh sách Sản Phẩm kế thừa từ order-management.types.ts của Bài tập Tuần 1
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'MacBook Pro 14 M3 Max',
    price: 49990000,
    stock: 15,
    category: 'Laptop',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: 'prod-002',
    name: 'iPhone 16 Pro Max 256GB',
    price: 34990000,
    stock: 42,
    category: 'Smartphone',
    createdAt: new Date('2026-02-01'),
  },
  {
    id: 'prod-003',
    name: 'Dell XPS 15 OLED',
    price: 38500000,
    stock: 8,
    category: 'Laptop',
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 'prod-004',
    name: 'Sony WH-1000XM5 Noise Canceling',
    price: 8490000,
    stock: 30,
    category: 'Audio',
    createdAt: new Date('2026-02-12'),
  },
  {
    id: 'prod-005',
    name: 'iPad Pro 11 inch M4',
    price: 26990000,
    stock: 19,
    category: 'Tablet',
    createdAt: new Date('2026-03-01'),
  },
  {
    id: 'prod-006',
    name: 'Bàn phím cơ Keychron K8 Pro',
    price: 2450000,
    stock: 65,
    category: 'Accessories',
    createdAt: new Date('2026-01-20'),
  },
  {
    id: 'prod-007',
    name: 'Chuột không dây Logitech MX Master 3S',
    price: 2290000,
    stock: 50,
    category: 'Accessories',
    createdAt: new Date('2026-02-18'),
  },
  {
    id: 'prod-008',
    name: 'Màn hình LG UltraGear 27 inch 4K',
    price: 12900000,
    stock: 12,
    category: 'Monitor',
    createdAt: new Date('2026-03-05'),
  },
];

/**
 * Component Demo tích hợp Tuần 1 (order-management.types.ts) và Tuần 2 (Accordion + usePagination)
 */
export const ProductDemo: React.FC = () => {
  // Áp dụng custom hook usePagination<Product> cho danh sách sản phẩm (3 item / trang)
  const {
    currentPage,
    totalPages,
    currentData: products,
    nextPage,
    prevPage,
    goToPage,
    canNext,
    canPrev,
  } = usePagination<Product>(MOCK_PRODUCTS, 3);

  // Định dạng hiển thị giá VNĐ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="demo-container">
      <header className="demo-header">
        <h2>📦 Quản Lý Danh Sách Sản Phẩm (LTWNC - Bài Tập Tuần 2)</h2>
        <p>Tích hợp <strong>Compound Accordion (Context API)</strong> &amp; <strong>usePagination&lt;Product&gt;</strong></p>
      </header>

      {/* Accordion hiển thị danh sách sản phẩm trang hiện tại */}
      <div className="demo-accordion-wrapper">
        <Accordion defaultOpenId={products[0]?.id}>
          {products.map((product) => (
            <Accordion.Item key={product.id} id={product.id}>
              <Accordion.Header>
                <div className="product-header-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{formatCurrency(product.price)}</span>
                </div>
              </Accordion.Header>

              <Accordion.Content>
                <div className="product-detail-grid">
                  <div className="detail-item">
                    <strong>Mã Sản Phẩm:</strong> <code>{product.id}</code>
                  </div>
                  <div className="detail-item">
                    <strong>Danh mục:</strong> <span className="badge category-badge">{product.category}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Số lượng tồn kho:</strong>{' '}
                    <span className={`badge ${product.stock > 10 ? 'stock-ok' : 'stock-low'}`}>
                      {product.stock} sản phẩm
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Ngày nhập kho:</strong> {new Date(product.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Điều khiển Phân trang (Pagination Controls) */}
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={prevPage}
          disabled={!canPrev}
        >
          ◄ Trang trước
        </button>

        <div className="pagination-pages">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                className={`page-num ${pageNum === currentPage ? 'page-num--active' : ''}`}
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          className="pagination-btn"
          onClick={nextPage}
          disabled={!canNext}
        >
          Trang sau ►
        </button>

        <div className="pagination-info">
          Trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong> (Tổng {MOCK_PRODUCTS.length} sản phẩm)
        </div>
      </div>
    </div>
  );
};
