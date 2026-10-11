import { useState, useMemo, useEffect, useCallback } from 'react';

export interface UsePaginationOptions {
  initialItemsPerPage?: number;
  initialPage?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  canNext: boolean;
  canPrev: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemsPerPage: number;
}

export function usePagination<T>(
  data: T[],
  itemsPerPageInput: number = 6,
  options?: UsePaginationOptions
): UsePaginationReturn<T> {
  const [itemsPerPage, setItemsPerPageState] = useState<number>(
    itemsPerPageInput > 0 ? itemsPerPageInput : 6
  );

  const [currentPage, setCurrentPage] = useState<number>(
    options?.initialPage && options.initialPage > 0 ? options.initialPage : 1
  );

  useEffect(() => {
    if (itemsPerPageInput > 0 && itemsPerPageInput !== itemsPerPage) {
      setItemsPerPageState(itemsPerPageInput);
    }
  }, [itemsPerPageInput, itemsPerPage]);

  const totalItems = data.length;
  const totalPages = useMemo(() => {
    if (totalItems === 0) return 1;
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const setItemsPerPage = useCallback((newSize: number) => {
    if (newSize > 0) {
      setItemsPerPageState(newSize);
      setCurrentPage(1);
    }
  }, []);

  const currentData = useMemo(() => {
    if (totalItems === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage, totalItems]);

  const canNext = currentPage < totalPages;
  const canPrev = currentPage > 1;

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
