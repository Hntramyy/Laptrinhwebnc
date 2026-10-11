// 1. ENUMS
// Trạng thái đơn hàng (String Enum để dễ đọc API/DB)
export enum OrderStatus {
  PENDING = 'PENDING',       // Mới tạo, chờ xử lý
  PROCESSING = 'PROCESSING', // Đang chuẩn bị/đóng gói
  SHIPPED = 'SHIPPED',       // Đã giao vận chuyển
  DELIVERED = 'DELIVERED',   // Đã giao thành công
  CANCELLED = 'CANCELLED',   // Đã hủy
}

// Trạng thái thanh toán (tách riêng để xử lý COD / hoàn tiền)
export enum PaymentStatus {
  UNPAID = 'UNPAID',     // Chưa thanh toán
  PAID = 'PAID',         // Đã thanh toán
  REFUNDED = 'REFUNDED', // Đã hoàn tiền
}

// 2. BASE ENTITY & GENERICS
// Interface dùng chung, readonly bảo vệ id và createdAt
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}

// Generic chuẩn hóa phản hồi API (tránh dùng 'any')
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Generic cho kết quả phân trang
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 3. MAIN ENTITIES
// Khách hàng
export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

// Sản phẩm
export interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

// Chi tiết đơn hàng (lưu Snapshot giá/tên để giữ lịch sử giao dịch khi Product thay đổi)
export interface OrderItem {
  productId: string;
  productName: string; // Snapshot tên lúc mua
  unitPrice: number;   // Snapshot giá lúc mua
  quantity: number;
}

// Đơn hàng (Customer 1-N Order, Order 1-N OrderItem)
export interface Order extends BaseEntity {
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  shippingAddress: string;
}

// 4. UTILITY TYPES & DTOs
// Omit: Bỏ các trường hệ thống tự sinh khi tạo mới Sản phẩm
export type CreateProductDTO = Omit<Product, keyof BaseEntity>;

// Omit: Bỏ trường tự sinh và các trường quản lý nội bộ khi tạo Đơn hàng
export type CreateOrderDTO = Omit<
  Order,
  keyof BaseEntity | 'status' | 'paymentStatus' | 'totalAmount'
>;

// Partial: Tạo DTO cập nhật Sản phẩm (cho phép truyền 1 hoặc nhiều trường)
export type UpdateProductDTO = Partial<CreateProductDTO>;

// Pick: Tóm tắt thông tin Khách hàng (chỉ lấy id, name, email)
export type CustomerSummary = Pick<Customer, 'id' | 'name' | 'email'>;

// Readonly: Khóa đơn hàng không cho chỉnh sửa sau khi hoàn tất
export type ReadonlyOrder = Readonly<Order>;
