'use client';

import { useRef, useTransition, useState } from 'react';
import { addProductAction } from '@/app/actions/product-actions';
import { PlusCircle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AddProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (formData: FormData) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await addProductAction(formData);
      if (res.success) {
        setFeedback({ success: true, message: res.message || 'Thêm thành công!' });
        formRef.current?.reset();
      } else {
        setFeedback({ success: false, message: res.message || 'Thêm thất bại.' });
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      {feedback && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${
            feedback.success
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Tên sản phẩm <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          required
          placeholder="Ví dụ: Bàn phím cơ Keychron Q1 Pro"
          className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Giá bán (VNĐ) <span className="text-red-500">*</span>
          </label>
          <input
            name="price"
            type="number"
            required
            defaultValue={1500000}
            step={10000}
            className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Danh mục
          </label>
          <select
            name="category"
            defaultValue="electronics"
            className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="electronics">Điện tử & Công nghệ</option>
            <option value="accessories">Phụ kiện & Đồng hồ</option>
            <option value="fashion">Thời trang & Balo</option>
            <option value="lifestyle">Đời sống & Setup</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Số lượng tồn kho
          </label>
          <input
            name="stock"
            type="number"
            min={0}
            max={200}
            defaultValue={10}
            className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          URL ảnh sản phẩm
        </label>
        <input
          name="image"
          defaultValue="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80"
          className="w-full px-3 py-2 text-xs font-mono bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Mô tả sản phẩm
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Mô tả thông số kỹ thuật, bảo hành chính hãng..."
          defaultValue="Sản phẩm công nghệ chính hãng, bảo hành 12 tháng 1 đổi 1."
          className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
      >
        {isPending ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang lưu sản phẩm...</span>
          </>
        ) : (
          <>
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Thêm Sản Phẩm Vào Kho</span>
          </>
        )}
      </button>
    </form>
  );
}