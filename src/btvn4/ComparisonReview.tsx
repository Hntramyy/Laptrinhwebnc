import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, Scale } from 'lucide-react';

export const ComparisonReview: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const reviewText = `1. Cấu hình & Boilerplate: Zustand tinh gọn vượt trội, không cần Redux Provider bọc ứng dụng, không cần configureStore, slice hay action types cồng kềnh.
2. Hiệu năng & Re-render: Zustand hỗ trợ atomic selector (VD: useFavoritesStore(s => s.favorites.length)) tự động tối ưu render mà không cần cài đặt Reselect hay combineReducers.
3. Kích thước thư viện: Zustand siêu nhẹ (~1KB) so với Redux Toolkit (~15-30KB gồm RTK, Redux core, Immer), giúp tối ưu Core Web Vitals và thời gian tải trang.
4. Trải nghiệm phát triển (DX): Cú pháp Zustand trực quan dạng hook thông thường (set/get), tích hợp middleware như persist (lưu LocalStorage) chỉ với 1 dòng bọc.
5. Khả năng mở rộng: Redux Toolkit chiếm ưu thế khi dự án rất lớn cần chuẩn hóa quy trình, Redux DevTools time-travel sâu và RTK Query caching API phức tạp.
6. Đánh giá kết luận: Với tính năng độc lập và gọn nhẹ như "Sản phẩm yêu thích", lựa chọn Zustand đem lại hiệu suất cao, code sạch và tiết kiệm thời gian phát triển hơn nhiều so với Redux Toolkit.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="th04-review-card">
      <div className="th04-review-header">
        <div className="flex items-center gap-2">
          <div className="th04-review-icon">
            <Scale size={20} className="text-amber-500" />
          </div>
          <div>
            <h3 className="th04-review-title">
              Đoạn Nhận Xét So Sánh Zustand vs Redux Toolkit (Đề Bài Yêu Cầu)
            </h3>
            <p className="th04-review-subtitle">
              Đáp ứng tiêu chí: Viết đoạn nhận xét 5–7 dòng so sánh ưu / nhược điểm của Zustand so với Redux Toolkit
            </p>
          </div>
        </div>

        <button
          type="button"
          className="th04-btn-copy"
          onClick={handleCopy}
          title="Sao chép đoạn nhận xét để nộp bài"
        >
          {copied ? (
            <>
              <Check size={15} className="text-emerald-500" />
              <span>Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>Sao chép nộp bài</span>
            </>
          )}
        </button>
      </div>

      {/* Nội dung nhận xét 6 dòng chuẩn quy định */}
      <div className="th04-review-body">
        <blockquote className="th04-quote">
          <p>
            <strong>1. Cấu hình & Boilerplate:</strong> Zustand tinh gọn vượt trội, không cần Redux Provider bọc ứng dụng, không cần configureStore, slice hay action types cồng kềnh.
          </p>
          <p>
            <strong>2. Hiệu năng & Re-render:</strong> Zustand hỗ trợ atomic selector (VD: <code>useFavoritesStore(s =&gt; s.favorites.length)</code>) tự động tối ưu render mà không cần cài đặt Reselect hay combineReducers.
          </p>
          <p>
            <strong>3. Kích thước thư viện:</strong> Zustand siêu nhẹ (~1KB) so với Redux Toolkit (~15–30KB gồm RTK, Redux core, Immer), giúp tối ưu Core Web Vitals và thời gian tải trang.
          </p>
          <p>
            <strong>4. Trải nghiệm phát triển (DX):</strong> Cú pháp Zustand trực quan dạng hook thông thường (set/get), tích hợp middleware như <code>persist</code> (lưu LocalStorage) chỉ với 1 dòng bọc.
          </p>
          <p>
            <strong>5. Khả năng mở rộng:</strong> Redux Toolkit chiếm ưu thế khi dự án rất lớn cần chuẩn hóa quy trình, Redux DevTools time-travel sâu và RTK Query caching API phức tạp.
          </p>
          <p>
            <strong>6. Đánh giá kết luận:</strong> Với tính năng độc lập và gọn nhẹ như "Sản phẩm yêu thích", lựa chọn Zustand đem lại hiệu suất cao, code sạch và tiết kiệm thời gian phát triển hơn nhiều so với Redux Toolkit.
          </p>
        </blockquote>
      </div>

      {/* Bảng đối chiếu nhanh */}
      <div className="th04-compare-table-wrapper">
        <table className="th04-compare-table">
          <thead>
            <tr>
              <th>Tiêu chí</th>
              <th>Zustand (Lựa chọn TH04)</th>
              <th>Redux Toolkit (TH03)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Setup Provider</strong></td>
              <td className="text-emerald-600 font-semibold">Không cần Provider</td>
              <td>Bắt buộc &lt;Provider store={'{store}'}&gt;</td>
            </tr>
            <tr>
              <td><strong>Kích thước (Bundle)</strong></td>
              <td className="text-emerald-600 font-semibold">~1.1 KB (Siêu nhẹ)</td>
              <td>~20 - 35 KB</td>
            </tr>
            <tr>
              <td><strong>Tối ưu Re-render</strong></td>
              <td className="text-emerald-600 font-semibold">Atomic Selectors tự nhiên</td>
              <td>Dùng Reselect memoized selectors</td>
            </tr>
            <tr>
              <td><strong>Lưu trữ LocalStorage</strong></td>
              <td className="text-emerald-600 font-semibold">persist middleware có sẵn</td>
              <td>Tự viết subscribe hoặc redux-persist</td>
            </tr>
            <tr>
              <td><strong>Độ phức tạp học tập</strong></td>
              <td className="text-emerald-600 font-semibold">Rất thấp (Như React useState)</td>
              <td>Trung bình - cao (Actions, Thunks, Reducers)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
