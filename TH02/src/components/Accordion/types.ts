import type { ReactNode } from 'react';

/**
 * Context Interface cho Root Accordion Component
 * Quản lý giá trị panel đang mở (chỉ 1 panel tại 1 thời điểm) và hàm toggle
 */
export interface AccordionContextType {
  openValue: string | null;
  toggleItem: (value: string) => void;
}

/**
 * Context Interface cho từng Accordion Item
 * Chia sẻ giá trị value và trạng thái isOpen cho Header và Panel con
 */
export interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
}

/**
 * Props cho Component Root <Accordion>
 */
export interface AccordionProps {
  /** Giá trị panel mở mặc định ban đầu */
  defaultValue?: string;
  /** Các Accordion.Item con */
  children: ReactNode;
  /** Custom CSS class */
  className?: string;
}

/**
 * Props cho Component <Accordion.Item>
 */
export interface AccordionItemProps {
  /** Định danh duy nhất cho từng panel */
  value: string;
  /** Tiêu đề (Header) và Nội dung (Panel) */
  children: ReactNode;
  /** Custom CSS class */
  className?: string;
}

/**
 * Props cho Component <Accordion.Header> (Nút bấm toggle)
 */
export interface AccordionHeaderProps {
  /** Tiêu đề hiển thị */
  children: ReactNode;
  /** Custom CSS class */
  className?: string;
  /** Biểu tượng tùy biến */
  icon?: ReactNode;
}

/**
 * Props cho Component <Accordion.Panel> (Nội dung chi tiết)
 */
export interface AccordionPanelProps {
  /** Nội dung chi tiết của panel */
  children: ReactNode;
  /** Custom CSS class */
  className?: string;
}
