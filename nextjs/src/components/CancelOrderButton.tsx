'use client';

import { useTransition, useState } from 'react';
import { cancelOrderAction } from '@/app/actions/product-actions';
import { RotateCcw, Loader2 } from 'lucide-react';

export default function CancelOrderButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');

  const handleCancel = () => {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
      setErrorMsg('');
      startTransition(async () => {
        const res = await cancelOrderAction(orderId);
        if (!res.success) {
          setErrorMsg(res.message || 'Lỗi khi hủy đơn hàng');
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-all disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <RotateCcw className="w-3.5 h-3.5 text-red-500" />
        )}
        <span>{isPending ? 'Đang hủy...' : 'Hủy Đơn'}</span>
      </button>
      {errorMsg && <p className="text-[10px] text-red-600 mt-1">{errorMsg}</p>}
    </div>
  );
}