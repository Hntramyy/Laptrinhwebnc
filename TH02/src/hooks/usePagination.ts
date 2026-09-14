import { useState, useMemo, useEffect, useCallback } from 'react';

export interface UsePaginationOptions {
  /** Số lượng phần tử hiển thị trên một trang (mặc định: 6) */
  initialItemsPerPage?: number;
  /** Trang bắt đầu hiển thị ban đầu (mặc định: 1) */
  initialPage?: number;
}

/**
 * Interface kết quả trả về của custom hook usePagination<T>
 * Tuyệt đối không dùng type `any`
 */
export interface UsePaginationReturn<T> {
  /** Số trang hiện tại (1-indexed) */
  currentPage: number;
  /** Tổng số trang */
  totalPages: number;
  /** Mảng dữ liệu của trang hiện tại */
  currentData: T[];
  /** Hàm chuyển sang trang kế tiếp */
  nextPage: () => void;
  /** Hàm quay lại trang trước đó */
  prevPage: () => void;
  /** Hàm di chuyển đến trang chỉ định */
  goToPage: (page: number) => void;
  /** Thay đổi số lượng item hiển thị mỗi trang */
  setItemsPerPage: (itemsPerPage: number) => void;
  /** Biến kiểm tra có thể Next được không */
  canNext: boolean;
  /** Biến kiểm tra có thể Prev được không */
  canPrev: boolean;
  /** Vị trí bắt đầu của danh sách hiện tại (1-indexed cho UI) */
  startIndex: number;
  /** Vị trí kết thúc của danh sách hiện tại (1-indexed cho UI) */
  endIndex: number;
  /** Tổng số item của toàn bộ dữ liệu gốc */
  totalItems: number;
  /** Số item mỗi trang hiện tại */
  itemsPerPage: number;
}

/**
 * Custom Hook usePagination<T>
 * Tách biệt hoàn toàn logic phân trang với phần hiển thị (UI).
 * Dùng được cho MỌI kiểu dữ liệu T[] nhờ Generic Type <T>.
 * 
 * @param data Mảng dữ liệu gốc T[]
 * @param itemsPerPageInput Số lượng sản phẩm/item trên 1 trang
 * @param options Tùy chọn nâng cao (initialPage...)
 */
export function usePagination<T>(
  data: T[],
  itemsPerPageInput: number = 6,
  options?: UsePaginationOptions
): UsePaginationReturn<T> {
  // Lấy cấu hình số item/trang từ param hoặc options
  const [itemsPerPage, setItemsPerPageState] = useState<number>(
    itemsPerPageInput > 0 ? itemsPerPageInput : 6
  );

  // State lưu trang hiện tại
  const [currentPage, setCurrentPage] = useState<number>(
    options?.initialPage && options.initialPage > 0 ? options.initialPage : 1
  );

  // Cập nhật itemsPerPage nếu param truyền vào thay đổi
  useEffect(() => {
    if (itemsPerPageInput > 0 && itemsPerPageInput !== itemsPerPage) {
      setItemsPerPageState(itemsPerPageInput);
    }
  }, [itemsPerPageInput, itemsPerPage]);

  // Tính tổng số trang (ít nhất là 1 trang nếu mảng rỗng)
  const totalItems = data.length;
  const totalPages = useMemo(() => {
    if (totalItems === 0) return 1;
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // Đảm bảo currentPage luôn hợp lệ trong khoảng [1, totalPages]
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Hàm chuyển trang chính với kiểm tra giới hạn
  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
    },
    [totalPages]
  );

  // Hàm chuyển trang tiếp theo
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  // Hàm quay lại trang trước
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Hàm thay đổi số item/trang
  const setItemsPerPage = useCallback((newSize: number) => {
    if (newSize > 0) {
      setItemsPerPageState(newSize);
      setCurrentPage(1); // Reset về trang 1 khi đổi số item/trang
    }
  }, []);

  // Tính toán slice mảng dữ liệu cho trang hiện tại
  const currentData = useMemo(() => {
    if (totalItems === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage, totalItems]);

  // Biến cờ boolean hỗ trợ disable nút bấm UI
  const canNext = currentPage < totalPages;
  const canPrev = currentPage > 1;

  // Tính vị trí hiển thị (VD: "Hiển thị 1 - 6 trên tổng 20")
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    canNext,
    canPrev,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage,
  };
}
