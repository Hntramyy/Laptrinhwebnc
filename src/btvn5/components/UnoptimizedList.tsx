import React, { useEffect, useRef } from 'react';
import type { ProductItem } from '../types';
import { AlertTriangle, Clock, Layers } from 'lucide-react';

interface UnoptimizedListProps {
  products: ProductItem[];
  onRenderMeasured: (durationMs: number, domCount: number) => void;
}

export const UnoptimizedList: React.FC<UnoptimizedListProps> = ({
  products,
  onRenderMeasured,
}) => {
  const startTimeRef = useRef<number>(performance.now());
  startTimeRef.current = performance.now();

  useEffect(() => {
    const duration = performance.now() - startTimeRef.current;
    // Mỗi hàng có 6 ô <td> -> 10.000 hàng = 60.000+ DOM nodes
    onRenderMeasured(Math.round(duration), products.length * 6);
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  return (
    <div className="th05-unoptimized-wrapper">
      {/* Warning Alert */}
      <div className="th05-warning-banner">
        <AlertTriangle size={20} className="text-amber-500 shrink-0" />
        <div>
          <strong>Chế độ TRƯỚC tối ưu (Unoptimized):</strong> Render toàn bộ {products.length.toLocaleString()} phần tử trực tiếp vào DOM. Không có Virtualization, không Memoize component con.
          <div className="text-xs text-amber-800 mt-1">
            Hậu quả: Tiêu tốn ~60.000+ DOM nodes, gây nghẽn Main Thread (TBT cao), FPS tụt khi cuộn và giật lag khi gõ phím.
          </div>
        </div>
      </div>

      {/* Render directly 10,000 items into DOM */}
      <div className="th05-table-container th05-table-unoptimized">
        <table className="th05-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Mã SP</th>
              <th style={{ width: '30%' }}>Tên Sản Phẩm</th>
              <th style={{ width: '20%' }}>Danh Mục</th>
              <th style={{ width: '15%' }}>Giá Bán</th>
              <th style={{ width: '12%' }}>Tồn Kho</th>
              <th style={{ width: '13%' }}>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="th05-table-row">
                <td className="font-mono text-slate-500">{p.code}</td>
                <td className="font-medium text-slate-800">{p.name}</td>
                <td>
                  <span className="th05-cat-pill">{p.category}</span>
                </td>
                <td className="font-bold text-slate-900">{formatCurrency(p.price)}</td>
                <td>
                  <span className={p.stock <= 5 ? 'text-rose-600 font-bold' : ''}>
                    {p.stock} cái
                  </span>
                </td>
                <td>
                  <span className={`th05-status-pill ${p.status}`}>
                    {p.status === 'active'
                      ? 'Đang bán'
                      : p.status === 'low_stock'
                      ? 'Sắp hết'
                      : 'Hết hàng'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
