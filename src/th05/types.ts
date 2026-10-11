export interface ProductItem {
  id: number;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  salesCount: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  createdAt: string;
}

export interface PerformanceReport {
  mode: 'unoptimized' | 'optimized';
  renderTimeMs: number;
  domNodeCount: number;
  fpsEstimate: number;
}

export interface MetricComparison {
  key: string;
  name: string;
  before: string | number;
  after: string | number;
  diff: string;
  unit: string;
  status: 'good' | 'improved';
  description: string;
}
