import React from 'react';
import type { AccordionPanelProps } from './types';
import { useAccordionItemContext } from './AccordionContext';

/**
 * AccordionPanel Component
 * Hiển thị nội dung chi tiết. Đọc `isOpen` từ AccordionItemContext để render/mở panel.
 */
export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  className = '',
}) => {
  const { value, isOpen } = useAccordionItemContext();

  if (!isOpen) return null;

  return (
    <div
      id={`accordion-panel-${value}`}
      role="region"
      aria-labelledby={`accordion-header-${value}`}
      className={`accordion-panel ${isOpen ? 'accordion-panel-open' : ''} ${className}`.trim()}
    >
      <div className="accordion-panel-content">{children}</div>
    </div>
  );
};
