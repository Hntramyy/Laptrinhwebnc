import type { ProductItem } from '../types';

const CATEGORIES = [
  'Điện tử & Laptop',
  'Phụ kiện & Chuột/Phím',
  'Thời trang & Ba lô',
  'Đời sống & Bàn ghế',
  'Âm thanh & Tai nghe',
  'Gaming & Console',
];

const PREFIXES = [
  'Bàn phím cơ',
  'Chuột công thái học',
  'Tai nghe chống ồn',
  'Màn hình đồ họa',
  'Balo công nghệ',
  'Loa Bluetooth',
  'Đồng hồ thông minh',
  'Kính thực tế ảo',
  'Đèn bàn bảo vệ mắt',
  'Cáp sạc nhanh GaN',
];

const SUFFIXES = [
  'Pro Max Edition',
  'V2 Wireless',
  'Ultra OLED 4K',
  'Studio ANC',
  'Titanium Series',
  'Signature 2026',
  'Ergonomic Elite',
  'Creator Spec',
];

/**
 * Sinh nhanh 10.000 sản phẩm mẫu trong bộ nhớ RAM
 */
export function generate10kProducts(): ProductItem[] {
  const items: ProductItem[] = new Array(10000);

  for (let i = 0; i < 10000; i++) {
    const id = i + 1;
    const catIndex = i % CATEGORIES.length;
    const prefix = PREFIXES[i % PREFIXES.length];
    const suffix = SUFFIXES[(i * 3) % SUFFIXES.length];
    const stock = i % 25 === 0 ? 0 : i % 8 === 0 ? 3 : (i % 80) + 5;
    const price = ((i % 180) + 12) * 50000; // Giá từ 600.000đ đến 9.600.000đ

    items[i] = {
      id,
      code: `SP-${String(id).padStart(5, '0')}`,
      name: `${prefix} ${suffix} #${id}`,
      category: CATEGORIES[catIndex],
      price,
      stock,
      rating: Number((4.0 + ((i % 10) * 0.1)).toFixed(1)),
      salesCount: (i * 7) % 950 + 20,
      status: stock === 0 ? 'out_of_stock' : stock <= 5 ? 'low_stock' : 'active',
      createdAt: `2026-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
    };
  }

  return items;
}
