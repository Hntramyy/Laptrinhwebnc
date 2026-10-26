import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { getProducts } from '@/lib/products-data';
import OrderButton from '@/components/OrderButton';
import { Sparkles, CheckCircle2, Shield, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cửa Hàng Thiết Bị & Phụ Kiện Công Nghệ Chính Hãng',
  description: 'Kho thiết bị công nghệ chính hãng: bàn phím cơ, chuột công thái học, tai nghe chống ồn, màn hình 2K. Mua sắm an toàn, giao hàng siêu tốc.',
  alternates: {
    canonical: 'https://techstore.vn',
  },
  openGraph: {
    title: 'TechStore - Thiết Bị & Phụ Kiện Công Nghệ Chính Hãng',
    description: 'Kho thiết bị công nghệ chính hãng: bàn phím cơ, chuột công thái học, tai nghe chống ồn, màn hình 2K.',
    url: 'https://techstore.vn',
    type: 'website',
  },
};

const CATEGORY_NAMES: Record<string, string> = {
  electronics: 'Điện tử & Công nghệ',
  accessories: 'Phụ kiện & Đồng hồ',
  fashion: 'Thời trang & Balo',
  lifestyle: 'Đời sống & Setup',
};

export default async function HomePage() {
  const session = await auth();
  const products = await getProducts();

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Danh Mục Sản Phẩm Công Nghệ TechStore',
    description: 'Bàn phím cơ, chuột công thái học, tai nghe chống ồn và màn hình chuyên nghiệp.',
    url: 'https://techstore.vn',
    inLanguage: 'vi',
    provider: {
      '@type': 'OnlineStore',
      name: 'TechStore Vietnam',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hà Nội',
        addressCountry: 'VN',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: product.title,
        url: `https://techstore.vn/products/${product.id}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-900 text-white p-8 md:p-12 shadow-xl shadow-indigo-900/10">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cửa hàng công nghệ phiên bản mới</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Thiết bị & phụ kiện công nghệ đỉnh cao
            </h1>

            <p className="text-indigo-100 text-base md:text-lg leading-relaxed max-w-2xl">
              Nâng tầm không gian làm việc với các sản phẩm bàn phím cơ, chuột công thái học, tai nghe ANC và màn hình đồ hoạ cao cấp.
              Tích hợp xác thực phân quyền 2 vai trò bảo mật với NextAuth và tối ưu SEO.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-indigo-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{products.length} sản phẩm tuyển chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{totalStock} sản phẩm sẵn sàng giao</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-300" />
                <span>Bảo mật phân quyền 3 lớp</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Sản Phẩm Nổi Bật
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Tìm kiếm và theo dõi tình trạng còn/hết của từng sản phẩm.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Còn hàng</span>
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 inline-block ml-3" />
              <span>Hết hàng</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const isAvailable = product.stock > 0;
              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {CATEGORY_NAMES[product.category] || product.category}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}
                      >
                        {isAvailable ? `Còn ${product.stock} chiếc` : 'Hết hàng'}
                      </span>
                    </div>

                    <Link href={`/products/${product.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between text-xs">
                      <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                        {product.price.toLocaleString('vi-VN')} ₫
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {product.rating.rate}
                        </span>
                        <span className="text-zinc-400">({product.rating.count})</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 text-center py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      Chi Tiết
                    </Link>
                    <div className="flex-1">
                      <OrderButton
                        productId={product.id}
                        stock={product.stock}
                        isLoggedIn={!!session?.user}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}