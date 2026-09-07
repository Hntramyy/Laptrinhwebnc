// 1. ENUMS
// Quản lý trạng thái đơn hàng và thanh toán.
// Dùng String Enum để dữ liệu trong DB/API dễ đọc.
export enum OrderStatus {
  PENDING = 'PENDING',         
  PROCESSING = 'PROCESSING',   
  SHIPPED = 'SHIPPED',         
  DELIVERED = 'DELIVERED',     
  CANCELLED = 'CANCELLED',     
}

// Tách riêng trạng thái thanh toán khỏi trạng thái đơn hàng.
export enum PaymentStatus {
  UNPAID = 'UNPAID',           
  PAID = 'PAID',               
}

// 2. BASE INTERFACE
// Các thuộc tính dùng chung cho mọi thực thể.
// readonly giúp bảo vệ ID và thời gian tạo.
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
}

// 3. MAIN ENTITIES

// Khách hàng.
export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
}

// Sản phẩm trong kho.
export interface Product extends BaseEntity {
  name: string;
  price: number;               
  stock: number;               
  category: string;            
}

// Chi tiết sản phẩm trong đơn hàng.
// productName và unitPrice là Snapshot tại thời điểm mua,
// giúp giữ nguyên thông tin lịch sử khi Product thay đổi.
export interface OrderItem {
  productId: string;           
  productName: string;         
  unitPrice: number;           
  quantity: number;            
}


// Đơn hàng: thuộc về một Customer và gồm nhiều OrderItem.
export interface Order extends BaseEntity {
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
}

// 4. UTILITY TYPES & DTOs

// Omit: loại bỏ các trường hệ thống tự sinh/tự xử lý.
export type CreateProductDTO = Omit<Product, keyof BaseEntity>;
export type CreateOrderDTO = Omit<Order, keyof BaseEntity | 'status' | 'paymentStatus' | 'totalAmount'>;

// Partial: cho phép cập nhật một hoặc nhiều thuộc tính.
export type UpdateProductDTO = Partial<CreateProductDTO>;

// Pick: lấy một số trường cần thiết để tạo dữ liệu rút gọn.
export type CustomerSummary = Pick<Customer, 'id' | 'name' | 'email'>;

// Readonly: ngăn thay đổi dữ liệu Order sau khi khóa.
export type ReadonlyOrder = Readonly<Order>;

// 5. GENERIC API RESPONSE

// Chuẩn hóa response API và vẫn đảm bảo Type Safety.
export interface ApiResponse<T> {
  success: boolean;            
  message: string;             
  data: T;                     
}

// 6. THIẾT KẾ TỔNG QUAN
/*
 * - Quan hệ: Customer 1-N Order, Order 1-N OrderItem, OrderItem N-1 Product.
 * - Snapshot trong OrderItem giúp bảo toàn giá và tên sản phẩm tại thời điểm mua.
 * - Omit, Partial, Pick, Readonly giúp tái sử dụng type và kiểm soát dữ liệu.
 * - Generic ApiResponse<T> chuẩn hóa API mà không cần dùng any.
 */
