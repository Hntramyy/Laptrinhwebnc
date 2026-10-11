# LTWNC - Kho Lưu Trữ Bài Tập Thực Hành Tập Trung (PTIT)

> **Học viện Công nghệ Bưu chính Viễn thông (PTIT)**  
> **Môn học:** Lập trình Web Nâng Cao (LTWNC)  
> **Kiến trúc:** Cấu trúc dự án hợp nhất (Unified Multi-Lab Workspace) trong một thư mục `src/`, dùng chung một bộ `package.json` và cấu hình Vite/TypeScript duy nhất.

---

## 🌟 Ưu Điểm Của Cấu Trúc Hợp Nhất Này

1. **Không phải cài lại packages nhiều lần:** Tất cả các thư viện cần thiết (React 19, Redux Toolkit, React-Redux, Lucide icons, Vite, TypeScript) đã được cài đặt 1 lần duy nhất tại thư mục gốc.
2. **Tiết kiệm dung lượng ổ đĩa:** Thay vì mỗi bài TH01, TH02, TH03, TH04... phải có một thư mục `node_modules` nặng hàng trăm MB, toàn bộ dự án chỉ dùng đúng một thư mục `node_modules` duy nhất.
3. **Thanh điều hướng Switcher thông minh:** Cho phép chuyển đổi tức thì giữa các bài thực hành TH01, TH02, TH03 trên cùng một giao diện chạy tại `http://localhost:5173/`.
4. **Dễ dàng mở rộng cho các bài sau:** Để làm bài TH04, TH05..., bạn chỉ cần tạo thư mục mới `src/th04/` và thêm tab vào `src/App.tsx`.

---

## 📂 Tổ Chức Thư Mục Dự Án

```
webnc/
├── package.json              # Khai báo toàn bộ dependencies dùng chung cho mọi bài thực hành
├── tsconfig.json             # Root TypeScript config
├── tsconfig.app.json         # TypeScript compiler options
├── tsconfig.node.json        # Node bundler config
├── vite.config.ts            # Vite bundler config
├── index.html                # HTML entry point chung
│
├── src/
│   ├── main.tsx              # Khởi tạo React 19 và bọc Redux Provider toàn cục
│   ├── App.tsx               # Master App chứa thanh Tabs điều hướng chuyển đổi các bài thực hành
│   ├── App.css               # Styling cho thanh điều hướng và layout chung
│   ├── index.css             # Typography Plus Jakarta Sans, CSS Reset & Design tokens
│   │
│   ├── th01/                 # 📘 BÀI THỰC HÀNH TUẦN 1: TypeScript & Quản Lý Đơn Hàng
│   │   ├── order-management.types.ts  # Enums (OrderStatus, PaymentStatus), Generics (ApiResponse, PaginatedResult), DTOs (Omit, Partial, Pick, Readonly)
│   │   ├── TH01App.tsx                # Giao diện trực quan: Metrics, Form tạo đơn hàng, Bảng tra cứu
│   │   ├── TH01.css                   # Style riêng cho bài TH01
│   │   └── index.ts
│   │
│   ├── th02/                 # 📗 BÀI THỰC HÀNH TUẦN 2: React Advanced Design Patterns
│   │   ├── components/Accordion/      # Compound Component Accordion (Context API, Single Open mode)
│   │   ├── hooks/usePagination.ts     # Generic Custom Hook usePagination<T> (không dùng any)
│   │   ├── data/mockData.ts           # Dữ liệu mẫu sản phẩm & câu hỏi FAQ
│   │   ├── TH02App.tsx                # Giao diện demo kết hợp Accordion & Pagination
│   │   └── TH02.css                   # Style riêng cho bài TH02
│   │
│   ├── th03/                 # 📙 BÀI THỰC HÀNH TUẦN 3: Redux Toolkit Cart Module
│   │   ├── app/
│   │   │   ├── store.ts               # configureStore (cartReducer, productsReducer, productsApi)
│   │   │   └── hooks.ts               # Typed Hooks: useAppDispatch & useAppSelector (100%)
│   │   ├── features/
│   │   │   ├── products/              # productsSlice (createAsyncThunk), productsApi (RTK Query bonus), ProductCard, ProductList, ProductFilters, ProductDetailModal
│   │   │   └── cart/                  # cartSlice (thêm/xóa/sửa, stock limit, voucher, localStorage), CartDrawer, CartItemRow, CartSummary
│   │   ├── services/                  # mockData.ts, productService.ts (Network latency 500ms)
│   │   ├── components/                # Header, Toast, CheckoutModal, ArchitectureDocs
│   │   └── TH03App.tsx                # Giao diện module giỏ hàng hoàn chỉnh
│   │
│   ├── th04/                 # ❤️ BÀI THỰC HÀNH TUẦN 4: Zustand Favorites Module
│   │   ├── favoritesStore.ts          # Zustand store (persist middleware, toggle/remove/clear/isFavorite)
│   │   ├── favoritesTypes.ts          # Type definitions cho FavoriteProduct và FavoritesState
│   │   ├── components/FavoriteButton  # Nút trái tim yêu thích có micro-animation
│   │   ├── components/FavoriteDrawer  # Slide-over xem danh sách yêu thích, xóa từng món, xóa hết
│   │   ├── components/ProductCard     # Card sản phẩm kèm nút yêu thích
│   │   ├── ComparisonReview.tsx       # Đoạn nhận xét 5–7 dòng so sánh ưu/nhược điểm vs Redux Toolkit
│   │   ├── TH04App.tsx                # Giao diện chính module yêu thích
│   │   └── TH04.css                   # Style riêng cho bài TH04
│   │
│   ├── th05/                 # ⚡ BÀI THỰC HÀNH TUẦN 5: Tối Ưu Hiệu Năng React (10.000 Sản Phẩm)
│   │   ├── data/generateDataset.ts    # Sinh dữ liệu mẫu 10.000 sản phẩm trong RAM
│   │   ├── components/UnoptimizedList # Chế độ trước tối ưu: Render 10.000 DOM nodes (Nghẽn TBT)
│   │   ├── components/OptimizedList   # Chế độ sau tối ưu: Virtualization + React.memo (Chỉ ~20 nodes)
│   │   ├── components/HeavyAnalytics  # Code-splitting: Lazy load biểu đồ nặng bằng React.lazy & Suspense
│   │   ├── components/LighthouseModal # Báo cáo đo lường chỉ số Core Web Vitals (FCP, LCP, TBT, CLS)
│   │   ├── TH05App.tsx                # Giao diện so sánh trực tiếp 2 chế độ và Live Render Timer
│   │   ├── TH05.css                   # Styling cho thước đo hiệu năng và huy hiệu điểm số
│   │   └── BAO_CAO_TOI_UU.md          # 📄 Báo cáo hiệu năng tối ưu tuần 5
│   │
│   ├── th06/                 # 🧪 BÀI THỰC HÀNH TUẦN 6: Kiểm Thử Phần Mềm (Software Testing & Coverage)
│   │   ├── __tests__/                 # 33 Test cases (Unit Reducers, Selectors, Async API, RTL Integration, Hooks)
│   │   │   ├── cartSlice.test.ts      # 11 Unit tests cho cart reducer, actions, and selectors
│   │   │   ├── productsSlice.test.ts  # 7 Unit & Async tests (mock API) cho products slice
│   │   │   ├── productService.test.ts # 3 Unit tests cho simulated API service
│   │   │   ├── CartIntegration.test.tsx # 7 Integration tests với React Testing Library
│   │   │   ├── ProductIntegration.test.tsx # 3 Integration tests với RTL
│   │   │   ├── hooks.test.tsx         # 2 Unit tests cho custom hooks
│   │   │   └── testUtils.tsx          # Custom Redux test wrapper
│   │   ├── components/TestReportModal # Modal báo cáo kết quả & Copy Markdown nộp bài
│   │   ├── TH06App.tsx                # Giao diện Test Runner Dashboard, đồng hồ giả lập và bộ lọc test
│   │   ├── TH06.css                   # Styling cho giao diện Test Automation Dashboard
│   │   └── BAO_CAO_KIEM_THU.md        # 📄 Báo cáo chi tiết nộp bài tuần 6
│   │
│   └── (th07, th08...)       # Thư mục cho các bài thực hành tiếp theo
```

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Cài đặt thư viện (Chỉ chạy 1 lần duy nhất tại thư mục gốc):
```powershell
npm install
```

### 2. Khởi động môi trường phát triển:
```powershell
npm run dev
```
Truy cập trình duyệt tại: **`http://localhost:5173/`**

### 3. Chạy toàn bộ 33 Test Cases (Tuần 6):
```powershell
npm test
```

### 4. Chạy kiểm thử đo độ bao phủ mã nguồn (Code Coverage ≥ 70%):
```powershell
npm run test:coverage
```

### 5. Kiểm tra biên dịch TypeScript toàn bộ các bài:
```powershell
npm run build
```

---

## 📝 Hướng Dẫn Thêm Bài Thực Hành Tiếp Theo (VD: TH07)

1. Tạo thư mục mới `src/th07/`.
2. Viết các component của bài TH07 vào thư mục đó (VD: `src/th07/TH07App.tsx`).
3. Mở file [src/App.tsx](file:///c:/Users/ADMIN/webnc/src/App.tsx), thêm một nút Tab mới vào thanh điều hướng và import `TH07App`.
4. Không cần chạy `npm install` hay tạo project Vite mới! Mọi thư viện và cấu hình đã có sẵn.
