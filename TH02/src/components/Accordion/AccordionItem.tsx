import React, { useMemo } from 'react';
import type { AccordionItemProps } from './types';
import { AccordionItemContext, useAccordionContext } from './AccordionContext';

/**
 * AccordionItem Component
 * Nhận prop `value` duy nhất cho item, tính toán `isOpen` từ AccordionContext
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  className = '',
}) => {
  const { openValue } = useAccordionContext();

  // Kiểm tra xem item này có trùng với openValue đang mở trong Accordion hay không
  const isOpen = openValue === value;

  const contextValue = useMemo(
    () => ({
      value,
      isOpen,
    }),
    [value, isOpen]
  );

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div
        className={`accordion-item ${isOpen ? 'accordion-item-open' : ''} ${className}`.trim()}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};
