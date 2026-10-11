export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'MacBook Pro 16 M3 Max',
    category: 'Laptop',
    price: 3499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop',
    description: 'Chip Apple M3 Max siêu mạnh mẽ với 36GB RAM Unified, thiết kế sang trọng đẳng cấp.',
    inStock: true,
  },
  {
    id: 2,
    title: 'Dell XPS 15 OLED',
    category: 'Laptop',
    price: 2199,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop',
    description: 'Màn hình 3.5K OLED rực rỡ, viền siêu mỏng InfinitiEdge, Intel Core i9 thế hệ 13.',
    inStock: true,
  },
  {
    id: 3,
    title: 'iPhone 15 Pro Max 256GB',
    category: 'Smartphone',
    price: 1199,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop',
    description: 'Khung vỏ Titan hàng không vũ trụ, nút Action Button mới, camera Zoom quang 5x.',
    inStock: true,
  },
  {
    id: 4,
    title: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphone',
    price: 1299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop',
    description: 'Tích hợp Galaxy AI thông minh, bút S-Pen quyền năng, khung Titanium bền bỉ.',
    inStock: true,
  },
  {
    id: 5,
    title: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    price: 399,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
    description: 'Tai nghe chống ồn chủ động tốt nhất thế giới, thời lượng pin liên tục lên đến 30h.',
    inStock: true,
  },
  {
    id: 6,
    title: 'Apple Watch Ultra 2',
    category: 'Smartwatch',
    price: 799,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop',
    description: 'Khung Titan 49mm hầm hố, chống nước 100m, màn hình sáng 3000 nits đỉnh cao.',
    inStock: false,
  },
  {
    id: 7,
    title: 'iPad Pro 12.9 M2 Liquid Retina',
    category: 'Tablet',
    price: 1099,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop',
    description: 'Màn hình mini-LED XDR chân thực, hỗ trợ Apple Pencil Hover đỉnh cao vẽ minh họa.',
    inStock: true,
  },
  {
    id: 8,
    title: 'Bàn phím cơ Keychron Q1 Pro',
    category: 'Accessories',
    price: 199,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop',
    description: 'Custom keyboard vỏ nhôm nguyên khối, kết nối Bluetooth / 2.4Ghz, hotswap switch.',
    inStock: true,
  },
  {
    id: 9,
    title: 'Chuột không dây Logitech MX Master 3S',
    category: 'Accessories',
    price: 99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop',
    description: 'Con lăn cuộn cuộn MagSpeed 1000 dòng/giây, click chuột siêu êm Quiet Clicks 90%.',
    inStock: true,
  },
  {
    id: 10,
    title: 'Màn hình LG UltraGear 27GR95QE OLED',
    category: 'Monitor',
    price: 899,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop',
    description: 'Màn hình gaming OLED 240Hz, phản hồi 0.03ms, độ phủ màu DCI-P3 98.5%.',
    inStock: true,
  },
  {
    id: 11,
    title: 'Loa Marshall Stanmore III',
    category: 'Audio',
    price: 379,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop',
    description: 'Thiết kế Vintage phong cách Rock & Roll, chất âm trầm nội lực bùng nổ không gian.',
    inStock: false,
  },
  {
    id: 12,
    title: 'PlayStation 5 Slim Edition',
    category: 'Gaming',
    price: 499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop',
    description: 'Máy chơi game thế hệ mới hỗ trợ đồ họa 4K 120Hz, ổ cứng SSD tốc độ cao 1TB.',
    inStock: true,
  },
];

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '1. Compound Component Pattern là gì và khi nào nên áp dụng?',
    answer:
      'Compound Component Pattern là mô hình thiết kế giúp các component nhỏ (cha - con) phối hợp với nhau để tạo thành một khối chức năng hoàn chỉnh. Pattern này cho phép chia sẻ state ngầm thông qua React Context API mà không cần người dùng phải truyền props thủ công qua nhiều tầng (prop drilling). Rất thích hợp cho các UI phức tạp như Accordion, Tabs, Menu Dropdown, Modal Wizard.',
    tag: 'Design Pattern',
  },
  {
    id: 'faq-2',
    question: '2. Tại sao Accordion chỉ cho phép mở 1 panel tại một thời điểm?',
    answer:
      'Yêu cầu đề bài Buổi 2 đặt ra quy tắc "Single Open Accordion". Khi người dùng nhấp mở panel mới, panel cũ sẽ tự động đóng lại. Việc này được quản lý tập trung bởi state openValue trong Context. Khi gọi hàm toggleItem(val), nếu trùng openValue thì đóng (set null), ngược lại đặt openValue = val.',
    tag: 'Accordion Logic',
  },
  {
    id: 'faq-3',
    question: '3. Custom Hook usePagination<T> có ưu điểm gì nổi bật?',
    answer:
      'Custom hook usePagination<T> đóng gói hoàn toàn logic phân trang (tính số trang, cắt mảng, điều hướng trang trước/sau, giới hạn trang). Việc sử dụng Generic Type <T> giúp hook dùng được cho MỌI loại đối tượng mà không bị mất Type Safety và tuyệt đối không sử dụng any.',
    tag: 'Custom Hook',
  },
  {
    id: 'faq-4',
    question: '4. Làm thế nào để đảm bảo tính phân tách giữa Logic và UI?',
    answer:
      'Logic state được tách bạch hoàn toàn trong Hook usePagination<T> và AccordionContext. Các Component UI chỉ đảm nhận nhiệm vụ hiển thị và lắng nghe sự kiện người dùng (OnClick). UI không trực tiếp xử lý các phép toán cắt mảng hay quản lý state lồng nhau.',
    tag: 'Clean Architecture',
  },
  {
    id: 'faq-5',
    question: '5. Thời hạn nộp bài và tiêu chí chấm điểm ra sao?',
    answer:
      'Bài tập Tuần 2 môn Lập trình Web nâng cao được phép nộp sau thời gian hết hạn trước giờ học Buổi 3. Tiêu chí đánh giá gồm: Accordion hoạt động chuẩn mở 1 đóng khác, usePagination generic không dùng any, tách bạch logic & UI, code sạch có comment giải thích rõ ràng.',
    tag: 'Quy định nộp bài',
  },
];
