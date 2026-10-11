import React from 'react';
import { X, CheckCircle, FolderTree, Cpu, Flame, Layers, Award } from 'lucide-react';

interface ArchitectureDocsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocs: React.FC<ArchitectureDocsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="docs-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="docs-header">
          <div className="flex items-center gap-2">
            <div className="docs-header-icon">
              <Award size={20} className="text-amber-500" />
            </div>
            <div>
              <h2 className="docs-title">Báo Cáo Kiến Trúc Redux Toolkit (TH03)</h2>
              <p className="docs-subtitle">
                Đáp ứng 100% tiêu chí đề bài Lập trình Web Nâng Cao & Tích hợp RTK Query điểm cộng
              </p>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            title="Đóng báo cáo"
          >
            <X size={20} />
          </button>
        </div>

        <div className="docs-body">
          {/* Section 1: Checklist đề bài */}
          <section className="docs-section">
            <h3 className="section-title">
              <CheckCircle size={18} className="text-emerald-500" />
              Bảng kiểm nghiệm đáp ứng yêu cầu (Criteria Matrix)
            </h3>
            <div className="criteria-grid">
              <div className="criterion-item checked">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <strong>Cấu trúc Feature-based</strong>
                  <p>Chia tách độc lập `features/cart`, `features/products`, `app/store.ts`, `app/hooks.ts`.</p>
                </div>
              </div>

              <div className="criterion-item checked">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <strong>productsSlice với createAsyncThunk</strong>
                  <p>Xử lý đủ 3 trạng thái pending / fulfilled / rejected với API giả lập có network latency.</p>
                </div>
              </div>

              <div className="criterion-item checked">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <strong>Điểm cộng RTK Query</strong>
                  <p>Tích hợp `productsApi` (createApi, baseQuery, cache tags) với nút chuyển đổi trực tiếp trên UI.</p>
                </div>
              </div>

              <div className="criterion-item checked">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <strong>cartSlice đầy đủ nghiệp vụ</strong>
                  <p>Thêm, xóa, cập nhật số lượng, kiểm tra giới hạn tồn kho (Stock limit) và lưu trữ LocalStorage.</p>
                </div>
              </div>

              <div className="criterion-item checked">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <strong>Chỉ dùng Typed Hooks</strong>
                  <p>100% component UI dùng `useAppDispatch` và `useAppSelector` đã gõ kiểu từ `app/hooks.ts`.</p>
                </div>
              </div>

              <div className="criterion-item checked">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <strong>Memoized Selectors (Reselect)</strong>
                  <p>Tính toán tổng tiền, chiết khấu voucher, và lọc tìm kiếm tối ưu tránh re-render thừa.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Cây thư mục */}
          <section className="docs-section">
            <h3 className="section-title">
              <FolderTree size={18} className="text-blue-500" />
              Sơ đồ tổ chức thư mục chuẩn Feature-Based
            </h3>
            <pre className="code-block-tree">
{`TH03/
├── app/
│   ├── store.ts            # configureStore (cartReducer, productsReducer, productsApi)
│   └── hooks.ts            # Typed useAppDispatch, useAppSelector
├── features/
│   ├── products/
│   │   ├── productTypes.ts  # Types: Product, ProductRating, ProductsState
│   │   ├── productsSlice.ts # createAsyncThunk (fetchProducts) + extraReducers
│   │   ├── productsApi.ts   # RTK Query (createApi, useGetProductsQuery) [ĐIỂM CỘNG]
│   │   ├── ProductCard.tsx  # Hiển thị card sản phẩm, badge stock, nút thêm giỏ
│   │   ├── ProductList.tsx  # Grid sản phẩm, skeleton loading, retry error
│   │   ├── ProductFilters.tsx # Lọc danh mục, tìm kiếm, sort, test lỗi API
│   │   └── ProductDetailModal.tsx # Xem chi tiết, chọn số lượng theo tồn kho
│   └── cart/
│       ├── cartTypes.ts     # Types: CartItem, CartCoupon, CartState
│       ├── cartSlice.ts     # Thêm/Xóa/Sửa số lượng, Stock check, LocalStorage
│       ├── CartDrawer.tsx   # Sidebar giỏ hàng trượt mượt mà
│       ├── CartItemRow.tsx  # Hàng sản phẩm trong giỏ: Stepper (+/-), xóa
│       └── CartSummary.tsx  # Chi tiết hóa đơn, nhập mã voucher, nút thanh toán
├── services/
│   ├── mockData.ts         # Mock 12 sản phẩm hình ảnh đẹp, giá VND, số lượng stock
│   └── productService.ts   # API giả lập có delay 500ms và xử lý lỗi kết nối
├── components/
│   ├── Header.tsx          # Logo, chuyển chế độ Thunk/RTK Query, badge giỏ hàng
│   ├── Toast.tsx           # Hệ thống thông báo toast góc màn hình
│   ├── CheckoutModal.tsx   # Form đặt hàng, cập nhật trừ kho, hóa đơn thành công
│   └── ArchitectureDocs.tsx# Báo cáo kiến trúc bài tập này
└── src/
    ├── App.tsx             # Component gốc kết nối toàn bộ luồng
    ├── App.css / index.css # Style thiết kế hiện đại, typography Plus Jakarta Sans
    └── main.tsx            # Redux <Provider store={store}> bọc ứng dụng`}
            </pre>
          </section>

          {/* Section 3: So sánh Thunk vs RTK Query */}
          <section className="docs-section">
            <h3 className="section-title">
              <Cpu size={18} className="text-violet-500" />
              So sánh luồng createAsyncThunk và RTK Query trong dự án
            </h3>
            <div className="table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>createAsyncThunk (Chuẩn đề bài)</th>
                    <th>RTK Query (Điểm cộng)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Nơi quản lý state</strong></td>
                    <td>Trong `productsSlice.ts` qua `extraReducers`</td>
                    <td>Tự động quản lý trong API cache reducer</td>
                  </tr>
                  <tr>
                    <td><strong>Trạng thái loading/error</strong></td>
                    <td>Thủ công gán `state.status`, `state.error`</td>
                    <td>Auto-generated: `isLoading`, `isError`, `error`</td>
                  </tr>
                  <tr>
                    <td><strong>Cơ chế Caching</strong></td>
                    <td>Tự quản lý nếu muốn tránh fetch lại</td>
                    <td>Tự động cache theo endpoint & tags (`Product`)</td>
                  </tr>
                  <tr>
                    <td><strong>Cách kích hoạt</strong></td>
                    <td>`dispatch(fetchProducts())` trong `useEffect`</td>
                    <td>Chỉ cần gọi hook `useGetProductsQuery()`</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
