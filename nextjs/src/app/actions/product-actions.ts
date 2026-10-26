'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { addProduct, deleteProduct, orderProduct, cancelOrder } from '@/lib/products-data';
import type { ProductCategory } from '@/types/product';

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function addProductAction(formData: FormData): Promise<ActionResponse> {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Bạn chưa đăng nhập.' };
  }

  if (session.user.role !== 'admin') {
    return { success: false, message: 'Quyền hạn không hợp lệ. Chỉ Quản Trị Viên mới được thêm sản phẩm.' };
  }

  const title = (formData.get('title') as string)?.trim();
  const price = Number(formData.get('price')) || 0;
  const category = (formData.get('category') as ProductCategory) || 'electronics';
  const description = (formData.get('description') as string)?.trim() || '';
  const image =
    (formData.get('image') as string)?.trim() ||
    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80';
  const stock = Number(formData.get('stock')) || 1;

  if (!title || price <= 0) {
    return { success: false, message: 'Tên sản phẩm và giá bán hợp lệ là bắt buộc.' };
  }

  await addProduct({
    title,
    price,
    category,
    description,
    image,
    stock,
    rating: { rate: 5.0, count: 1 },
  });

  revalidatePath('/');
  revalidatePath('/admin/products');
  return { success: true, message: 'Thêm sản phẩm mới vào kho thành công!' };
}

export async function deleteProductAction(productId: string): Promise<ActionResponse> {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Bạn chưa đăng nhập.' };
  }

  if (session.user.role !== 'admin') {
    return { success: false, message: 'Quyền hạn không hợp lệ. Chỉ Quản Trị Viên mới được xoá sản phẩm.' };
  }

  const ok = await deleteProduct(productId);
  if (!ok) {
    return { success: false, message: 'Không tìm thấy sản phẩm cần xoá.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/products');
  return { success: true, message: 'Đã xoá sản phẩm khỏi kho hàng.' };
}

export async function orderProductAction(productId: string): Promise<ActionResponse> {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Vui lòng đăng nhập để đặt mua sản phẩm.' };
  }

  const userId = session.user.id || session.user.email || 'guest';
  const userEmail = session.user.email || 'customer@techstore.vn';

  const result = await orderProduct(productId, userId, userEmail);
  if (!result.ok) {
    return { success: false, message: result.error || 'Đặt hàng không thành công.' };
  }

  revalidatePath('/');
  revalidatePath(`/products/${productId}`);
  revalidatePath('/my-orders');
  return { success: true, message: 'Đặt hàng thành công! Đơn hàng đang được chuẩn bị giao.' };
}

export async function cancelOrderAction(orderId: string): Promise<ActionResponse> {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Vui lòng đăng nhập để thao tác đơn hàng.' };
  }

  const userId = session.user.id || session.user.email || 'guest';

  const result = await cancelOrder(orderId, userId);
  if (!result.ok) {
    return { success: false, message: result.error || 'Hủy đơn hàng thất bại.' };
  }

  revalidatePath('/');
  revalidatePath('/my-orders');
  return { success: true, message: 'Đã hủy đơn hàng thành công.' };
}