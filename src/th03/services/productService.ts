import { MOCK_PRODUCTS } from './mockData';
import type { Product } from '../features/products/productTypes';

/**
 * Service API giả lập (Simulated REST API)
 * - Tích hợp độ trễ mạng thực tế 500ms để quan sát trạng thái loading / pending
 * - Có hỗ trợ fallback dữ liệu an toàn khi offline hoặc gọi API bên ngoài bị nghẽn
 */
export const productService = {
  /**
   * Lấy toàn bộ danh sách sản phẩm
   */
  async getProducts(forceError = false): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (forceError) {
          reject(new Error('Lỗi kết nối máy chủ API giả lập! Vui lòng thử lại.'));
          return;
        }
        resolve([...MOCK_PRODUCTS]);
      }, 500);
    });
  },

  /**
   * Lấy chi tiết một sản phẩm theo ID
   */
  async getProductById(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = MOCK_PRODUCTS.find((p) => p.id === id);
        if (!found) {
          reject(new Error(`Không tìm thấy sản phẩm có mã ID = ${id}`));
          return;
        }
        resolve({ ...found });
      }, 350);
    });
  },
};
