import React, { useMemo } from 'react';
import type { ProductItem } from '../types';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HeavyAnalyticsChartProps {
  products: ProductItem[];
}

export const HeavyAnalyticsChart: React.FC<HeavyAnalyticsChartProps> = ({ products }) => {
  // Tính toán thống kê dữ liệu 10.000 sản phẩm (Được memoize)
  const stats = useMemo(() => {
    let totalStock = 0;
    let totalValue = 0;
    let outOfStock = 0;
    const catMap: Record<string, { count: number; totalValue: number }> = {};

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      totalStock += p.stock;
      totalValue += p.price * p.stock;
      if (p.stock === 0) outOfStock++;

      if (!catMap[p.category]) {
        catMap[p.category] = { count: 0, totalValue: 0 };
      }
      catMap[p.category].count++;
      catMap[p.category].totalValue += p.price * p.stock;
    }

    return {
      totalStock,
      totalValue,
      outOfStock,
      catList: Object.entries(catMap).map(([name, data]) => ({
        name,
        count: data.count,
        totalValue: data.totalValue,
        percent: Math.round((data.count / products.length) * 100),
      })),
    };
  }, [products]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  return (
    <div className="th05-analytics-card">
      <div className="th05-analytics-header">
        <div className="flex items-center gap-2">
          <div className="th05-analytics-icon">
            <BarChart3 size={20} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="th05-analytics-title">
              Biểu Đồ Phân Tích Dữ Liệu Kho Hàng (Code-Splitting Component)
            </h3>
            <p className="th05-analytics-subtitle">
              Component này được tách bundle độc lập bằng <code>React.lazy</code> và <code>Suspense</code> để giảm kích thước tải trang ban đầu.
            </p>
          </div>
        </div>
      </div>

      {/* Stats KPI grid */}
      <div className="th05-kpi-grid">
        <div className="th05-kpi-item">
          <span className="th05-kpi-label">Tổng sản phẩm</span>
          <span className="th05-kpi-value text-indigo-600">
            {products.length.toLocaleString()} SP
          </span>
        </div>

        <div className="th05-kpi-item">
          <span className="th05-kpi-label">Tổng tồn kho toàn hệ thống</span>
          <span className="th05-kpi-value text-emerald-600">
            {stats.totalStock.toLocaleString()} cái
          </span>
        </div>

        <div className="th05-kpi-item">
          <span className="th05-kpi-label">Tổng giá trị định giá kho</span>
          <span className="th05-kpi-value text-blue-600">
            {formatCurrency(stats.totalValue)}
          </span>
        </div>

        <div className="th05-kpi-item">
          <span className="th05-kpi-label">Hết hàng cần nhập</span>
          <span className="th05-kpi-value text-rose-600">
            {stats.outOfStock} mã SP
          </span>
        </div>
      </div>

      {/* Category Distribution Bar Chart */}
      <div className="th05-chart-bars">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
          Phân bổ 10.000 sản phẩm theo danh mục:
        </h4>
        <div className="space-y-3">
          {stats.catList.map((cat) => (
            <div key={cat.name} className="th05-bar-item">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-800">{cat.name}</span>
                <span className="text-slate-500">
                  {cat.count.toLocaleString()} SP ({cat.percent}%) • {formatCurrency(cat.totalValue)}
                </span>
              </div>
              <div className="th05-bar-track">
                <div
                  className="th05-bar-fill"
                  style={{ width: `${Math.max(10, cat.percent * 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeavyAnalyticsChart;
