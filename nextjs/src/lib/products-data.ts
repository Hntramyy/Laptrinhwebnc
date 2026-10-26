import type { Product, OrderRecord } from '@/types/product';

let productsStore: Product[] = [
  {
    id: 'ban-phim-nuphy-air75-v2',
    title: 'Bàn phím cơ không dây NuPhy Air75 V2',
    price: 2890000,
    description: 'Bàn phím cơ low-profile siêu mỏng, switch Gateron Low-profile 2.0, kết nối 2.4G/Bluetooth/Type-C, pin 4000mAh.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 128 },
    stock: 8,
  },
  {
    id: 'chuot-logitech-mx-master-3s',
    title: 'Chuột công thái học Logitech MX Master 3S',
    price: 2190000,
    description: 'Cảm biến Darkfield 8000 DPI lướt trên mọi bề mặt, con lăn MagSpeed siêu êm, click giảm 90% tiếng ồn.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.8, count: 342 },
    stock: 15,
  },
  {
    id: 'tai-nghe-sony-wh-1000xm5',
    title: 'Tai nghe chụp tai Sony WH-1000XM5 ANC',
    price: 6990000,
    description: 'Chống ồn chủ động đầu ngành với 8 micro và bộ xử lý V1/QN1, thời lượng pin 30 giờ, âm thanh Hi-Res LDAC.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 215 },
    stock: 5,
  },
  {
    id: 'man-hinh-dell-ultrasharp-u2724d',
    title: 'Màn hình Dell UltraSharp U2724D 2K 120Hz',
    price: 10490000,
    description: 'Màn hình đồ họa IPS Black độ tương phản 2000:1, màu sắc 98% DCI-P3, tần số quét 120Hz mượt mà bảo vệ mắt.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.7, count: 89 },
    stock: 3,
  },
  {
    id: 'balo-bellroy-transit-20l',
    title: 'Balo công nghệ chống nước Bellroy Transit 20L',
    price: 3450000,
    description: 'Chất liệu vải tái chế bền bỉ kháng nước, ngăn chống sốc laptop 16 inch chuyên dụng, quai đeo êm ái thoáng khí.',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.6, count: 74 },
    stock: 10,
  },
  {
    id: 'ao-khoac-gore-tex-pro',
    title: 'Áo khoác gió thể thao Gore-Tex Pro Minimalist',
    price: 1850000,
    description: 'Màng thở chống thấm nước chuẩn bão, trọng lượng nhẹ chỉ 280g, thiết kế tối giản phong cách techwear.',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.5, count: 62 },
    stock: 12,
  },
  {
    id: 'dong-ho-garmin-forerunner-265',
    title: 'Đồng hồ thông minh Garmin Forerunner 265 Music',
    price: 9990000,
    description: 'Màn hình AMOLED cảm ứng rực rỡ, GPS đa băng tần chính xác cao, đo VO2 Max, theo dõi giấc ngủ và năng lượng.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 180 },
    stock: 6,
  },
  {
    id: 'kinh-meta-quest-3',
    title: 'Kính thực tế ảo Meta Quest 3 128GB',
    price: 12900000,
    description: 'Hỗ trợ Mixed Reality độ phân giải 4K+, chip Snapdragon XR2 Gen 2 mạnh mẽ gấp đôi thế hệ cũ, âm thanh 3D.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 320 },
    stock: 0,
  },
  {
    id: 'vi-magsafe-moft',
    title: 'Ví da Nam châm MagSafe MOFT Snap-on',
    price: 690000,
    description: 'Chân đế gập thông minh 3 góc độ, chứa tối đa 3 thẻ ngân hàng, hút nam châm MagSafe cực chắc chắn.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.4, count: 154 },
    stock: 20,
  },
  {
    id: 'den-benq-screenbar-halo',
    title: 'Đèn bàn công nghệ BenQ WiT ScreenBar Halo',
    price: 3890000,
    description: 'Chiếu sáng bất đối xứng không gây lóa màn hình, điều khiển núm xoay không dây, cảm biến tự điều chỉnh ánh sáng.',
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 110 },
    stock: 7,
  },
];

let ordersStore: OrderRecord[] = [
  {
    id: 'order-init-01',
    productId: 'ban-phim-nuphy-air75-v2',
    userId: 'user-customer-01',
    userEmail: 'customer@techstore.vn',
    productTitle: 'Bàn phím cơ không dây NuPhy Air75 V2',
    productPrice: 2890000,
    orderedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    status: 'shipping',
  },
];

export async function getProducts(): Promise<Product[]> {
  return [...productsStore];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return productsStore.find((p) => p.id === id);
}

export async function addProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const slug = data.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const id = `${slug}-${Date.now().toString().slice(-4)}`;
  const newProduct: Product = { ...data, id };
  productsStore.unshift(newProduct);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) return false;
  productsStore.splice(index, 1);
  return true;
}

export async function orderProduct(
  productId: string,
  userId: string,
  userEmail: string
): Promise<{ ok: boolean; error?: string }> {
  const product = productsStore.find((p) => p.id === productId);
  if (!product) return { ok: false, error: 'Không tìm thấy sản phẩm.' };
  if (product.stock <= 0) return { ok: false, error: 'Sản phẩm hiện đang tạm hết hàng.' };

  product.stock -= 1;
  ordersStore.unshift({
    id: `ord-${Date.now()}`,
    productId,
    userId,
    userEmail,
    productTitle: product.title,
    productPrice: product.price,
    orderedAt: new Date().toISOString(),
    status: 'pending',
  });

  return { ok: true };
}

export async function cancelOrder(orderId: string, userId: string): Promise<{ ok: boolean; error?: string }> {
  const index = ordersStore.findIndex((o) => o.id === orderId && o.userId === userId);
  if (index === -1) return { ok: false, error: 'Không tìm thấy đơn hàng cần hủy.' };

  const order = ordersStore[index];
  const product = productsStore.find((p) => p.id === order.productId);
  if (product) {
    product.stock += 1;
  }
  ordersStore.splice(index, 1);
  return { ok: true };
}

export async function getUserOrders(userId: string): Promise<OrderRecord[]> {
  return ordersStore.filter((o) => o.userId === userId);
}