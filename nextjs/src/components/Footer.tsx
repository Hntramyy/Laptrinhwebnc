import Link from 'next/link';
import { Cpu, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">TechStore</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Cửa hàng thiết bị & phụ kiện công nghệ hàng đầu, phân phối chính hãng bàn phím cơ, chuột công thái học, màn hình và phụ kiện thông minh.
            </p>
            <div className="text-xs text-zinc-500">
              © 2026 TechStore Vietnam. Bảo lưu mọi quyền.
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 text-sm">Liên Kết Nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Trang Chủ & Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/my-orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Đơn Hàng Của Tôi
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Quản Trị Kho Hàng
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Cổng Đăng Nhập
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 text-sm">Thông Tin Liên Hệ</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span>Số 96A Trần Phú, P. Mộ Lao, Q. Hà Đông, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>support@techstore.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>1900 6868 (8:00 - 21:00 hàng ngày)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}