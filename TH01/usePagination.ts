import { useState, useMemo, useEffect } from 'react';

/**
 * Interface mô tả kết quả trả về của hook usePagination
 */
export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  canNext: boolean;
  canPrev: boolean;
}

/**
 * Custom Hook usePagination<T> - Phân trang dữ liệu dạng Generic
 * 
 * @param data - Mảng dữ liệu đầu vào kiểu generic T[]
 * @param itemsPerPage - Số phần tử hiển thị trên một trang (default: 5)
 * @param initialPage - Trang bắt đầu (default: 1)
 */
export function usePagination<T>(
  data: T[],
  itemsPerPage: number = 5,
  initialPage: number = 1
): UsePaginationReturn<T> {
  // Tính tổng số trang (tối thiểu là 1 trang nếu data rỗng)
  const totalPages = useMemo(() => {
    if (!data || data.length === 0) return 1;
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  // Quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState<number>(() => {
    return Math.max(1, Math.min(initialPage, totalPages));
  });

  // Tự động điều chỉnh trang hiện tại khi mảng dữ liệu hoặc itemsPerPage thay đổi
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Lấy danh sách phần tử thuộc trang hiện tại
  const currentData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Chuyển tới trang chỉ định
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  // Chuyển sang trang tiếp theo
  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  // Quay về trang trước đó
  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  // Kiểm tra điều kiện enable/disable nút chuyển trang
  const canNext = currentPage < totalPages;
  const canPrev = currentPage > 1;

  return {
    currentPage,
    totalPages,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    canNext,
    canPrev,
  };
}
