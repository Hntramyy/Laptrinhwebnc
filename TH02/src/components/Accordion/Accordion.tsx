import React, { useState, useMemo, useCallback } from 'react';
import type { AccordionProps } from './types';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

/**
 * Compound Component Accordion Root
 * 
 * Đặc điểm cốt lõi:
 * 1. Nhiều panel nhưng CHỈ MỞ 1 PANEL TẠI 1 THỜI ĐIỂM (Single Open Accordion Mode).
 * 2. Dùng Context API tương tự pattern Tabs để các component con kết nối ngầm.
 * 
 * Cú pháp Compound Component:
 * <Accordion defaultValue="item-1">
 *   <Accordion.Item value="item-1">
 *     <Accordion.Header>Tiêu đề 1</Accordion.Header>
 *     <Accordion.Panel>Nội dung 1</Accordion.Panel>
 *   </Accordion.Item>
 * </Accordion>
 */
const AccordionRoot: React.FC<AccordionProps> = ({
  defaultValue = null,
  children,
  className = '',
}) => {
  // State lưu giữ giá trị của panel duy nhất đang được mở
  const [openValue, setOpenValue] = useState<string | null>(defaultValue);

  /**
   * Hàm toggle trạng thái đóng/mở item:
   * - Nếu item đang được mở -> click lại sẽ đóng panel (set openValue = null)
   * - Nếu item chưa mở -> set openValue = value mới (tự động đóng panel trước đó)
   */
  const toggleItem = useCallback((value: string) => {
    setOpenValue((prevValue) => (prevValue === value ? null : value));
  }, []);

  // Memoize giá trị context để tránh re-render không cần thiết cho các component con
  const contextValue = useMemo(
    () => ({
      openValue,
      toggleItem,
    }),
    [openValue, toggleItem]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={`accordion-root ${className}`.trim()}>{children}</div>
    </AccordionContext.Provider>
  );
};

// Gán static sub-components theo đúng Compound Component Pattern
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Panel: AccordionPanel,
});
