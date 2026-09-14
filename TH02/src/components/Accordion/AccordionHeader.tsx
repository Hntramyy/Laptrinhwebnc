import React from 'react';
import type { AccordionHeaderProps } from './types';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';
import { ChevronDown } from 'lucide-react';

/**
 * AccordionHeader Component (Trigger Button)
 * Đóng vai trò là nút kích hoạt đóng/mở panel khi người dùng click
 */
export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  className = '',
  icon,
}) => {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  const handleClick = () => {
    toggleItem(value);
  };

  return (
    <div className={`accordion-header-wrapper ${className}`.trim()}>
      <button
        type="button"
        className={`accordion-header-btn ${isOpen ? 'active' : ''}`}
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${value}`}
        id={`accordion-header-${value}`}
      >
        <span className="accordion-header-title">{children}</span>
        <span className={`accordion-icon ${isOpen ? 'rotate' : ''}`}>
          {icon || <ChevronDown className="default-chevron" size={20} />}
        </span>
      </button>
    </div>
  );
};
