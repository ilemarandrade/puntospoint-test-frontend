'use client';

import { useState, useMemo } from 'react';

interface PaginationOptions<T> {
  data: T[];
  initialItemsPerPage?: number;
  initialPage?: number;
}

interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  currentData: T[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function usePagination<T>({
  data,
  initialItemsPerPage = 10,
  initialPage = 1,
}: PaginationOptions<T>): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const changeItemsPerPage = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage: changeItemsPerPage,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
  };
}
