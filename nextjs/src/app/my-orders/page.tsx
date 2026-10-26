import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserOrders } from '@/lib/products-data';
import CancelOrderButton from '@/components/CancelOrderButton';
import { ShoppingBag, Calendar, ArrowRight, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Đơn Hàng Của Tôi',
  description: 'Lịch sử đơn mua thiết bị và trạng thái vận chuyển của bạn tại TechStore.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/my-orders');
  }

  const userId = session.user.id || session.user.email || '';
  const orders = await getUserOrders(userId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Đơn Hàng Của Tôi
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Theo dõi tình trạng xử lý và lịch sử đặt mua thiết bị công nghệ của tài khoản ({session.user.email}).
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <span>Khám phá thêm sản phẩm</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4 p-8">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Bạn chưa có đơn hàng nào</h2>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Hãy dạo qua danh mục sản phẩm công nghệ để chọn cho mình thiết bị phù hợp nhất nhé!
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-500/20 transition-all"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-semibold">Tên Thiết Bị</th>
                  <th className="py-4 px-6 font-semibold">Giá Bán</th>
                  <th className="py-4 px-6 font-semibold">Ngày Đặt Hàng</th>
                  <th className="py-4 px-6 font-semibold">Trạng Thái</th>
                  <th className="py-4 px-6 font-semibold text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {orders.map((record) => {
                  const orderDate = new Date(record.orderedAt).toLocaleDateString('vi-VN');

                  return (
                    <tr key={record.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <Link
                          href={`/products/${record.productId}`}
                          className="font-bold text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors block"
                        >
                          {record.productTitle}
                        </Link>
                        <span className="text-xs text-zinc-400 font-mono">Mã đơn: {record.id}</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-indigo-600 dark:text-indigo-400 text-xs">
                        {record.productPrice.toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{orderDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                          <Clock className="w-3 h-3" />
                          <span>{record.status === 'shipping' ? 'Đang vận chuyển' : 'Đang chuẩn bị'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <CancelOrderButton orderId={record.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}