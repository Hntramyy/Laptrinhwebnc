'use client';

import { useTransition } from 'react';
import { deleteProductAction } from '@/app/actions/product-actions';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteProductButton({ productId, productTitle }: { productId: string; productTitle: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xoá sản phẩm "${productTitle}" khỏi kho hàng không?`)) {
      startTransition(async () => {
        await deleteProductAction(productId);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors disabled:opacity-50"
      title="Xoá sản phẩm"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}