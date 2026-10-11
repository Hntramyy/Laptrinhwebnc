import { describe, it, expect } from 'vitest';
import { productService } from '../../btvn3/services/productService';

describe('Unit Test: productService (Simulated API Service)', () => {
  it('TC18 - [Service] getProducts: lấy danh sách sản phẩm mẫu thành công', async () => {
    const products = await productService.getProducts(false);
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('title');
    expect(products[0]).toHaveProperty('price');
  });

  it('TC19 - [Service] getProducts: ném lỗi khi tham số forceError = true', async () => {
    await expect(productService.getProducts(true)).rejects.toThrow(
      'Lỗi kết nối máy chủ API giả lập! Vui lòng thử lại.'
    );
  });

  it('TC20 - [Service] getProductById: lấy sản phẩm tồn tại và ném lỗi khi không tìm thấy', async () => {
    const product = await productService.getProductById(1);
    expect(product.id).toBe(1);

    await expect(productService.getProductById(999999)).rejects.toThrow(
      'Không tìm thấy sản phẩm có mã ID = 999999'
    );
  });
});
