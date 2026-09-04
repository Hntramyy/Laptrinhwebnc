// ============================================================================
// MODULE: QUẢN LÝ ĐƠN HÀNG (ORDER MANAGEMENT SYSTEM)
// ============================================================================

// --- 1. ENUMS ---
export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
    UNPAID = 'UNPAID',
    PAID = 'PAID',
}

// --- 2. BASE INTERFACE ---
// Tái sử dụng id và createdAt cho các Entity
export interface BaseEntity {
    readonly id: string;
    readonly createdAt: Date;
}

// --- 3. MAIN ENTITIES (4 thực thể chính) ---
export interface Customer extends BaseEntity {
    name: string;
    email: string;
    phone: string;
}

export interface Product extends BaseEntity {
    name: string;
    price: number;
    stock: number;
    category: string;
}

export interface OrderItem {
    productId: string;
    // Snapshot giá và tên sản phẩm tại thời điểm mua (tránh bị thay đổi khi Product đổi giá về sau)
    productName: string;
    unitPrice: number;
    quantity: number;
}

export interface Order extends BaseEntity {
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    totalAmount: number;
}

// --- 4. UTILITY TYPES & DTOs ---
// Omit: Loại bỏ id, createdAt khi client gửi payload tạo mới
export type CreateProductDTO = Omit<Product, keyof BaseEntity>;
export type CreateOrderDTO = Omit<Order, keyof BaseEntity | 'status' | 'paymentStatus' | 'totalAmount'>;

// Partial: Cho phép cập nhật từng phần thông tin sản phẩm
export type UpdateProductDTO = Partial<CreateProductDTO>;

// Pick: Rút gọn thông tin khách hàng khi hiển thị nhanh
export type CustomerSummary = Pick<Customer, 'id' | 'name' | 'email'>;

// Readonly: Đảm bảo tính bất biến của đơn hàng sau khi khởi tạo
export type ReadonlyOrder = Readonly<Order>;

// --- 5. GENERIC API RESPONSE ---
// Generic T giúp tái sử dụng vỏ bọc Response API cho các thực thể mà không dùng 'any'
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
