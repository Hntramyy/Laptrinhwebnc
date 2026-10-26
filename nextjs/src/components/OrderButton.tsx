'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { orderProductAction } from '@/app/actions/product-actions';
import { ShoppingCart, Loader2 } from 'lucide-react';

interface OrderButtonProps {
  productId: string;
  stock: number;
  isLoggedIn: boolean;
}

export default function OrderButton({ productId, stock, isLoggedIn }: OrderButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const router = useRouter();

  const handleOrder = () => {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=/products/${productId}`);
      return;
    }

    startTransition(async () => {
      setMessage(null);
      const res = await orderProductAction(productId);
      if (res.success) {
        setMessage({ text: res.message || 'Đặt mua thành công!' });
      } else {
        setMessage({ text: res.message || 'Đặt mua thất bại.', error: true });
      }
    });
  };

  if (stock <= 0) {
    return (
      <button
        disabled
        className="w-full py-2 px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-not-allowed"
      >
        Tạm hết hàng
      </button>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleOrder}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60 rounded-lg shadow-sm transition-all"
      >
        {isPending ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang xử lý...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isLoggedIn ? 'Đặt Mua Ngay' : 'Đăng nhập để mua'}</span>
          </>
        )}
      </button>

      {message && (
        <p
          className={`mt-1.5 text-[11px] font-medium text-center ${
            message.error ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}