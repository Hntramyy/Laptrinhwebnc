import React, { useState } from 'react';
import {
  OrderStatus,
  PaymentStatus,
  type Customer,
  type Product,
  type Order,
  type OrderItem,
  type CreateOrderDTO,
} from './order-management.types';
import {
  FileCode,
  Package,
  Users,
  CreditCard,
  Plus,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  DollarSign,
  Layers,
} from 'lucide-react';
import './TH01.css';

// Dữ liệu mẫu khởi tạo cho TH01
const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Nguyễn Văn An',
    email: 'an.nv@gmail.com',
    phone: '0901234567',
    address: '122 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    createdAt: new Date('2026-03-01T10:00:00Z'),
  },
  {
    id: 'CUST-002',
    name: 'Trần Thị Bình',
    email: 'binh.tt@gmail.com',
    phone: '0912345678',
    address: 'Km10 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    createdAt: new Date('2026-03-05T14:30:00Z'),
  },
  {
    id: 'CUST-003',
    name: 'Lê Hoàng Cường',
    email: 'cuong.lh@gmail.com',
    phone: '0987654321',
    address: '97 Man Thiện, Hiệp Phú, TP. Thủ Đức, TP.HCM',
    createdAt: new Date('2026-03-10T09:15:00Z'),
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PROD-001',
    name: 'Bàn phím cơ NuPhy Air75 V2',
    price: 2890000,
    stock: 12,
    category: 'Phụ kiện máy tính',
    createdAt: new Date('2026-02-15T08:00:00Z'),
  },
  {
    id: 'PROD-002',
    name: 'Chuột Logitech MX Master 3S',
    price: 2190000,
    stock: 20,
    category: 'Phụ kiện máy tính',
    createdAt: new Date('2026-02-15T08:00:00Z'),
  },
  {
    id: 'PROD-003',
    name: 'Tai nghe Sony WH-1000XM5',
    price: 6990000,
    stock: 8,
    category: 'Âm thanh',
    createdAt: new Date('2026-02-20T08:00:00Z'),
  },
  {
    id: 'PROD-004',
    name: 'Màn hình Dell UltraSharp 27"',
    price: 10490000,
    stock: 5,
    category: 'Màn hình',
    createdAt: new Date('2026-02-25T08:00:00Z'),
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerId: 'CUST-001',
    shippingAddress: '122 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    status: OrderStatus.DELIVERED,
    paymentStatus: PaymentStatus.PAID,
    totalAmount: 5080000,
    createdAt: new Date('2026-03-12T15:20:00Z'),
    items: [
      {
        productId: 'PROD-001',
        productName: 'Bàn phím cơ NuPhy Air75 V2',
        unitPrice: 2890000,
        quantity: 1,
      },
      {
        productId: 'PROD-002',
        productName: 'Chuột Logitech MX Master 3S',
        unitPrice: 2190000,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD-9822',
    customerId: 'CUST-002',
    shippingAddress: 'Km10 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    status: OrderStatus.SHIPPED,
    paymentStatus: PaymentStatus.PAID,
    totalAmount: 6990000,
    createdAt: new Date('2026-03-14T11:45:00Z'),
    items: [
      {
        productId: 'PROD-003',
        productName: 'Tai nghe Sony WH-1000XM5',
        unitPrice: 6990000,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD-9823',
    customerId: 'CUST-003',
    shippingAddress: '97 Man Thiện, Hiệp Phú, TP. Thủ Đức, TP.HCM',
    status: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.UNPAID,
    totalAmount: 13380000,
    createdAt: new Date('2026-03-15T08:30:00Z'),
    items: [
      {
        productId: 'PROD-001',
        productName: 'Bàn phím cơ NuPhy Air75 V2',
        unitPrice: 2890000,
        quantity: 1,
      },
      {
        productId: 'PROD-004',
        productName: 'Màn hình Dell UltraSharp 27"',
        unitPrice: 10490000,
        quantity: 1,
      },
    ],
  },
];

export const TH01App: React.FC = () => {
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Form state tạo đơn hàng mới
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].id);
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === selectedCustomer);
    const prod = products.find((p) => p.id === selectedProduct);
    if (!customer || !prod) return;

    // Sử dụng CreateOrderDTO type chuẩn theo đề bài
    const newOrderDto: CreateOrderDTO = {
      customerId: customer.id,
      shippingAddress: customer.address || 'Địa chỉ mặc định',
      items: [
        {
          productId: prod.id,
          productName: prod.name, // Snapshot
          unitPrice: prod.price,  // Snapshot
          quantity: orderQuantity,
        },
      ],
    };

    // Tạo Order thực thể
    const createdOrder: Order = {
      ...newOrderDto,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
      totalAmount: prod.price * orderQuantity,
      createdAt: new Date(),
    };

    setOrders([createdOrder, ...orders]);
  };

  const filteredOrders =
    statusFilter === 'ALL'
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === PaymentStatus.PAID)
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return <span className="th01-badge bg-green"><CheckCircle size={13} /> {status}</span>;
      case OrderStatus.SHIPPED:
        return <span className="th01-badge bg-blue"><Truck size={13} /> {status}</span>;
      case OrderStatus.PROCESSING:
        return <span className="th01-badge bg-yellow"><Clock size={13} /> {status}</span>;
      case OrderStatus.PENDING:
        return <span className="th01-badge bg-purple"><Clock size={13} /> {status}</span>;
      case OrderStatus.CANCELLED:
        return <span className="th01-badge bg-red"><XCircle size={13} /> {status}</span>;
    }
  };

  return (
    <div className="th01-container">
      {/* HEADER */}
      <div className="th01-hero">
        <span className="th01-pill">
          <FileCode size={15} /> LTWNC - Bài Tập Tuần 1 (PTIT)
        </span>
        <h1 className="th01-title">TypeScript & Hệ Thống Quản Lý Đơn Hàng</h1>
        <p className="th01-subtitle">
          Mô hình hóa Enums, Generics (<code>ApiResponse&lt;T&gt;</code>, <code>PaginatedResult&lt;T&gt;</code>) và Utility Types (<code>Omit</code>, <code>Partial</code>, <code>Pick</code>, <code>Readonly</code>).
        </p>
      </div>

      {/* METRICS CARDS */}
      <div className="th01-metrics-grid">
        <div className="th01-metric-card">
          <div className="th01-metric-icon bg-blue">
            <Users size={20} />
          </div>
          <div>
            <span className="th01-metric-label">Khách hàng</span>
            <h3 className="th01-metric-value">{customers.length}</h3>
          </div>
        </div>

        <div className="th01-metric-card">
          <div className="th01-metric-icon bg-purple">
            <Package size={20} />
          </div>
          <div>
            <span className="th01-metric-label">Sản phẩm</span>
            <h3 className="th01-metric-value">{products.length}</h3>
          </div>
        </div>

        <div className="th01-metric-card">
          <div className="th01-metric-icon bg-yellow">
            <CreditCard size={20} />
          </div>
          <div>
            <span className="th01-metric-label">Tổng đơn hàng</span>
            <h3 className="th01-metric-value">{orders.length}</h3>
          </div>
        </div>

        <div className="th01-metric-card">
          <div className="th01-metric-icon bg-green">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="th01-metric-label">Doanh thu đã thu</span>
            <h3 className="th01-metric-value">{formatCurrency(totalRevenue)}</h3>
          </div>
        </div>
      </div>

      {/* CREATE ORDER & TYPE SYSTEM EXPLAINER */}
      <div className="th01-two-col">
        {/* Form Tạo Đơn Hàng Demo */}
        <div className="th01-card">
          <h2 className="th01-card-title">
            <Plus size={18} /> Tạo Đơn Hàng Mới (CreateOrderDTO)
          </h2>
          <form onSubmit={handleCreateOrder} className="th01-form">
            <div className="th01-form-group">
              <label>Khách hàng:</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="th01-form-group">
              <label>Sản phẩm:</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatCurrency(p.price)}
                  </option>
                ))}
              </select>
            </div>

            <div className="th01-form-group">
              <label>Số lượng:</label>
              <input
                type="number"
                min={1}
                max={10}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
              />
            </div>

            <button type="submit" className="th01-btn-submit">
              Khởi Tạo Đơn Hàng
            </button>
          </form>
        </div>

        {/* Cấu Trúc Types Giới Thiệu */}
        <div className="th01-card">
          <h2 className="th01-card-title">
            <Layers size={18} /> Minh Họa Hệ Thống Type TypeScript
          </h2>
          <ul className="th01-types-list">
            <li>
              <strong>Snapshot Pattern:</strong> <code>OrderItem</code> lưu <code>productName</code> & <code>unitPrice</code> tại thời điểm mua, không sợ giá sản phẩm thay đổi sau này.
            </li>
            <li>
              <strong>BaseEntity:</strong> <code>readonly id</code> và <code>readonly createdAt</code> ngăn chặn mutate dữ liệu nền tảng.
            </li>
            <li>
              <strong>CreateOrderDTO:</strong> Sử dụng <code>Omit&lt;Order, ...&gt;</code> loại bỏ các trường hệ thống tự sinh (id, createdAt, totalAmount, status).
            </li>
            <li>
              <strong>ReadonlyOrder:</strong> Khóa toàn bộ dữ liệu đơn hàng sau khi hoàn tất.
            </li>
          </ul>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="th01-card mt-6">
        <div className="th01-table-header">
          <h2 className="th01-card-title">Danh Sách Đơn Hàng</h2>
          <div className="th01-filter-tabs">
            {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                className={`th01-filter-btn ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="th01-table-responsive">
          <table className="th01-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>Sản Phẩm & Chi Tiết</th>
                <th>Tổng Tiền</th>
                <th>Thanh Toán</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const customer = customers.find((c) => c.id === order.customerId);
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="font-mono font-bold text-blue-600">{order.id}</span>
                      <div className="text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td>
                      <strong>{customer?.name || order.customerId}</strong>
                      <div className="text-xs text-slate-500">{order.shippingAddress}</div>
                    </td>
                    <td>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          • {item.productName} x <strong>{item.quantity}</strong> ({formatCurrency(item.unitPrice)})
                        </div>
                      ))}
                    </td>
                    <td>
                      <strong className="text-slate-900">{formatCurrency(order.totalAmount)}</strong>
                    </td>
                    <td>
                      <span
                        className={`th01-badge ${
                          order.paymentStatus === PaymentStatus.PAID
                            ? 'bg-green'
                            : 'bg-yellow'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>{getStatusBadge(order.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
