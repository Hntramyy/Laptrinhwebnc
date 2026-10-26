import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { getProductById } from '@/lib/products-data';
import OrderButton from '@/components/OrderButton';
import { ArrowLeft, Star, ShieldCheck, Truck, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Sản phẩm không tồn tại trong hệ thống TechStore.',
    };
  }

  return {
    title: `${product.title} - ${product.price.toLocaleString('vi-VN')}₫`,
    description: `${product.description} Giá bán: ${product.price.toLocaleString('vi-VN')}₫. Phân phối chính hãng tại TechStore.`,
    alternates: {
      canonical: `https://techstore.vn/products/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | TechStore`,
      description: product.description,
      url: `https://techstore.vn/products/${product.id}`,
      type: 'article',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const session = await auth();
  const isAvailable = product.stock > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    category: product.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(product.rating.rate),
      reviewCount: String(product.rating.count),
    },
    offers: {
      '@type': 'Offer',
      price: String(product.price),
      priceCurrency: 'VND',
      availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://techstore.vn/products/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: 'TechStore Vietnam',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh mục sản phẩm</span>
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {product.category}
                  </span>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      isAvailable
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Còn {product.stock} chiếc sẵn sàng giao</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Tạm hết hàng</span>
                      </>
                    )}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-snug">
                  {product.title}
                </h1>

                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold ml-1 text-zinc-900 dark:text-white">
                      {product.rating.rate}
                    </span>
                  </div>
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-500">{product.rating.count} đánh giá</span>
                </div>
              </div>

              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {product.price.toLocaleString('vi-VN')} ₫
              </div>

              <div className="space-y-2">
                <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Mô Tả Sản Phẩm
                </h2>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <ShieldCheck className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 block">
                    Bảo hành 12T
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <Truck className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 block">
                    Giao siêu tốc
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <RefreshCw className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 block">
                    Lỗi 1 đổi 1
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-60">
                  <OrderButton
                    productId={product.id}
                    stock={product.stock}
                    isLoggedIn={!!session?.user}
                  />
                </div>
                {!session?.user && (
                  <p className="text-xs text-zinc-500">
                    Đăng nhập tài khoản để đặt mua và nhận ưu đãi bảo hành.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}