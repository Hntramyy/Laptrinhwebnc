/**
 * ============================================================================
 * MODULE: QUẢN LÝ ĐƠN HÀNG (ORDER MANAGEMENT SYSTEM)
 * File: TH01/order-management.types.ts
 * Role: Middle Backend Engineer (TypeScript Specialist)
 * ============================================================================
 * 
 * GIẢI THÍCH TỔNG QUAN THIẾT KẾ:
 * File này chứa toàn bộ hệ thống Type/Interface phục vụ module Quản lý đơn hàng.
 * Thiết kế tuân thủ nghiêm ngặt các tiêu chí:
 * 1. Type Safety & Strict Typing: Không dùng `any`, đảm bảo kiểm soát kiểu dữ liệu 100%.
 * 2. Reusability (DRY): Sử dụng BaseEntity, Generics và các Utility Types (Omit, Partial, Pick, Readonly) để tái sử dụng code.
 * 3. Domain Integrity: Bảo vệ tính toàn vẹn dữ liệu tài chính/lịch sử thông qua kỹ thuật Snapshot & Immutability.
 */

// ============================================================================
// 1. ENUMS (Định nghĩa tập hợp các giá trị trạng thái cố định trong hệ thống)
// ============================================================================

/**
 * OrderStatus: Quản lý vòng đời (Lifecycle) của đơn hàng từ khi khởi tạo đến khi hoàn tất/hủy.
 * Giải thích thiết kế: Sử dụng String Enum để dữ liệu lưu trong Database hoặc log API 
 * hiển thị dạng chuỗi rõ ràng (VD: 'PENDING') thay vì số vô nghĩa (0, 1, 2).
 */
export enum OrderStatus {
  PENDING = 'PENDING',         // Đơn hàng mới tạo, chờ xác nhận từ hệ thống
  PROCESSING = 'PROCESSING',   // Đang đóng gói / chuẩn bị hàng tại kho
  SHIPPED = 'SHIPPED',         // Đã giao cho đơn vị vận chuyển
  DELIVERED = 'DELIVERED',     // Giao hàng thành công tới khách hàng
  CANCELLED = 'CANCELLED',     // Đơn hàng đã bị hủy
}

/**
 * PaymentStatus: Quản lý trạng thái dòng tiền thanh toán của đơn hàng.
 * Giải thích thiết kế: Tách biệt trạng thái thanh toán khỏi trạng thái vận chuyển (OrderStatus) 
 * vì đơn hàng có thể đã giao (DELIVERED) nhưng thanh toán COD chưa đối soát (UNPAID).
 */
export enum PaymentStatus {
  UNPAID = 'UNPAID',           // Chưa thanh toán thành công
  PAID = 'PAID',               // Đã thanh toán thành công
}

// ============================================================================
// 2. BASE INTERFACE (Interface cơ sở tái sử dụng cho các thực thể)
// ============================================================================

/**
 * BaseEntity: Chứa các thuộc tính định danh và thời gian dùng chung cho mọi thực thể trong DB.
 * Giải thích thiết kế:
 * - `readonly id`: Khóa chính duy nhất. Dùng `readonly` để ngăn chặn việc cố tình hoặc vô ý sửa ID sau khi khởi tạo.
 * - `readonly createdAt`: Thời gian tạo bản ghi, không thể thay đổi sau khi tạo (Immutable audit log).
 */
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
}

// ============================================================================
// 3. MAIN ENTITIES (4 Thực thể chính theo yêu cầu đề bài)
// ============================================================================

/**
 * THỰC THỂ 1: Customer (Khách hàng)
 * Đại diện cho thông tin người mua hàng. Kế thừa BaseEntity để có id và createdAt.
 */
export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
}

/**
 * THỰC THỂ 2: Product (Sản phẩm)
 * Đại diện cho hàng hóa trong kho. Kế thừa BaseEntity để có id và createdAt.
 */
export interface Product extends BaseEntity {
  name: string;
  price: number;               // Đơn giá niêm yết hiện tại của sản phẩm
  stock: number;               // Số lượng tồn kho khả dụng
  category: string;            // Danh mục sản phẩm
}

/**
 * THỰC THỂ 3: OrderItem (Chi tiết sản phẩm trong đơn hàng)
 * 
 * GIẢI THÍCH CHI TIẾT THIẾT KẾ (RẤT QUAN TRỌNG TRONG BACKEND):
 * - Quan hệ: N - 1 với Product, thuộc về 1 Order.
 * - `productName` và `unitPrice`: Đây là dạng "SNAPSHOT DỮ LIỆU" tại thời điểm đặt hàng.
 *   Lý do: Khi sản phẩm thay đổi giá hoặc tên trong tương lai (bảng Product), đơn hàng đã mua trong quá khứ 
 *   vẫn phải giữ nguyên giá gốc lúc mua để báo cáo tài chính và hóa đơn không bị sai lệch.
 */
export interface OrderItem {
  productId: string;           // Khóa ngoại liên kết với Product.id
  productName: string;         // Snapshot tên sản phẩm tại thời điểm mua
  unitPrice: number;           // Snapshot đơn giá tại thời điểm mua
  quantity: number;            // Số lượng mua
}

/**
 * THỰC THỂ 4: Order (Đơn hàng)
 * 
 * GIẢI THÍCH CHI TIẾT THIẾT KẾ QUAN HỆ DỮ LIỆU:
 * - Kế thừa BaseEntity: Có id và createdAt tự động.
 * - Quan hệ 1 - N với OrderItem: Trường `items: OrderItem[]` chứa danh sách chi tiết các mặt hàng.
 * - Quan hệ N - 1 với Customer: Trường `customerId: string` liên kết đến người mua.
 * - `totalAmount`: Tổng giá trị thanh toán của toàn bộ đơn hàng.
 */
export interface Order extends BaseEntity {
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
}

// ============================================================================
// 4. UTILITY TYPES & DTOs (Tái sử dụng bằng Omit, Partial, Pick, Readonly)
// ============================================================================

/**
 * UTILITY TYPE 1: Omit<T, K>
 * Giải thích thiết kế:
 * - `CreateProductDTO`: Khi Client gửi request tạo sản phẩm mới, các trường hệ thống tự sinh 
 *   như `id` và `createdAt` chưa tồn tại trong DB. Dùng `Omit` để loại bỏ các trường này ra khỏi DTO.
 * - `CreateOrderDTO`: Tương tự, loại bỏ `id`, `createdAt` cùng các trường do Backend tự tính toán/xử lý 
 *   như `status`, `paymentStatus`, `totalAmount`.
 */
export type CreateProductDTO = Omit<Product, keyof BaseEntity>;
export type CreateOrderDTO = Omit<Order, keyof BaseEntity | 'status' | 'paymentStatus' | 'totalAmount'>;

/**
 * UTILITY TYPE 2: Partial<T>
 * Giải thích thiết kế:
 * - `UpdateProductDTO`: Khi thực hiện API PATCH để cập nhật sản phẩm, người dùng có thể chỉ muốn sửa 1 thuộc tính 
 *   (ví dụ sửa giá hoặc số lượng tồn kho). `Partial` giúp biến tất cả các trường thành optional (có thể có hoặc không).
 */
export type UpdateProductDTO = Partial<CreateProductDTO>;

/**
 * UTILITY TYPE 3: Pick<T, K>
 * Giải thích thiết kế:
 * - `CustomerSummary`: Trong danh sách đơn hàng hoặc màn hình xem nhanh, hệ thống chỉ cần hiển thị thông tin 
 *   rút gọn của Customer. `Pick` giúp trích xuất đúng 3 trường cần thiết (`id`, `name`, `email`), tối ưu dung lượng payload API.
 */
export type CustomerSummary = Pick<Customer, 'id' | 'name' | 'email'>;

/**
 * UTILITY TYPE 4: Readonly<T>
 * Giải thích thiết kế:
 * - `ReadonlyOrder`: Sau khi đơn hàng hoàn tất hoặc bị khóa, dùng `Readonly` để đóng nắp dữ liệu, 
 *   đảm bảo tất cả các thuộc tính của Order đều không thể bị ghi đè (chống side-effect trong mã nguồn backend).
 */
export type ReadonlyOrder = Readonly<Order>;

// ============================================================================
// 5. GENERIC TYPE (Định nghĩa cấu trúc API Response dùng chung)
// ============================================================================

/**
 * GENERIC INTERFACE: ApiResponse<T>
 * 
 * GIẢI THÍCH CHI TIẾT THIẾT KẾ GENERIC:
 * - Tham số Generic `<T>` đại diện cho kiểu dữ liệu thực sự trả về trong trường `data`.
 * - Lý do sử dụng: Giúp bọc chuẩn hóa Response cho TẤT CẢ các API (VD: ApiResponse<Order>, 
 *   ApiResponse<Product[]>, ApiResponse<CustomerSummary>) mà không bao giờ phải dùng `any`.
 */
export interface ApiResponse<T> {
  success: boolean;            // Trạng thái thành công hay thất bại (true/false)
  message: string;             // Thông điệp phản hồi cho client
  data: T;                     // Dữ liệu động được kiểm soát kiểu chặt chẽ bởi Generic <T>
}

// ============================================================================
// 6. TÓM TẮT GIẢI THÍCH LỰA CHỌN THIẾT KẾ (DESIGN RATIONALE SUMMARY)
// ============================================================================
/*
  =============================================================================
  BÁO CÁO TÓM TẮT LÝ DO THIẾT KẾ (CHO ĐỀ BÀI BUỔI 1):
  =============================================================================
  1. QUAN HỆ DỮ LIỆU & BẢO VỆ DỮ LIỆU TÀI CHÍNH (SNAPSHOT PATTERN):
     - Hệ thống gồm 4 thực thể: Customer, Product, OrderItem, Order với mối quan hệ 
       chặt chẽ (Customer 1-N Order, Order 1-N OrderItem, OrderItem N-1 Product).
     - OrderItem chứa 'unitPrice' và 'productName' dưới dạng Snapshot để bảo vệ tính 
       chính xác của hóa đơn/doanh thu khi giá niêm yết trong bảng Product biến động.

  2. TÁI SỬ DỤNG VỚI UTILITY TYPES (Omit, Partial, Pick, Readonly):
     - Omit<T, K>: Tạo CreateProductDTO/CreateOrderDTO chuẩn xác bằng cách loại bỏ các 
       trường tự sinh từ Database.
     - Partial<T>: Định nghĩa UpdateProductDTO linh hoạt cho các thao tác Patch/Update.
     - Pick<T, K>: Tạo CustomerSummary rút gọn dữ liệu payload truyền qua mạng.
     - Readonly<T>: Đảm bảo Immutability cho đơn hàng, tránh lỗi ghi đè dữ liệu.

  3. SỬ DỤNG GENERIC HỢP LÝ (KHÔNG DÙNG ANY):
     - Interface ApiResponse<T> sử dụng Generic <T> để chuẩn hóa tất cả phản hồi API 
       trong hệ thống backend mà vẫn giữ được tính Type Safety 100%.
*/
