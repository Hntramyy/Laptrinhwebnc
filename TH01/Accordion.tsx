import React, { createContext, useContext, useState, ReactNode } from 'react';

// ==========================================
// 1. CONTEXT DEFINITIONS
// ==========================================

// Context chính cho Accordion (quản lý ID panel đang mở)
interface AccordionContextType {
  openId: string | null;
  togglePanel: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Hook dùng nội bộ để truy cập AccordionContext
function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion sub-components phải được bọc trong <Accordion>');
  }
  return context;
}

// Context cho từng Item (chứa ID và trạng thái mở của từng panel)
interface AccordionItemContextType {
  id: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

function useAccordionItemContext(): AccordionItemContextType {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('Accordion.Header và Accordion.Content phải nằm trong <Accordion.Item>');
  }
  return context;
}

// ==========================================
// 2. PROPS INTERFACES
// ==========================================

export interface AccordionProps {
  children: ReactNode;
  defaultOpenId?: string | null;
  className?: string;
}

export interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export interface AccordionHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

// ==========================================
// 3. COMPOUND COMPONENTS IMPLEMENTATION
// ==========================================

/**
 * Root Accordion Component - Quản lý duy nhất 1 panel mở tại một thời điểm
 */
export function Accordion({ children, defaultOpenId = null, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  // Hàm toggle: Nếu click vào panel đang mở thì đóng lại (null), ngược lại mở panel mới
  const togglePanel = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openId, togglePanel }}>
      <div className={`accordion-container ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

/**
 * Accordion.Item Component - Đại diện cho 1 panel đơn lẻ
 */
Accordion.Item = function AccordionItem({ id, children, className = '' }: AccordionItemProps) {
  const { openId } = useAccordionContext();
  const isOpen = openId === id;

  return (
    <AccordionItemContext.Provider value={{ id, isOpen }}>
      <div className={`accordion-item ${isOpen ? 'accordion-item--open' : ''} ${className}`}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

/**
 * Accordion.Header Component - Tiêu đề panel, bấm vào để đóng/mở
 */
Accordion.Header = function AccordionHeader({ children, className = '' }: AccordionHeaderProps) {
  const { togglePanel } = useAccordionContext();
  const { id, isOpen } = useAccordionItemContext();

  return (
    <div
      className={`accordion-header ${className}`}
      onClick={() => togglePanel(id)}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePanel(id);
        }
      }}
    >
      <div className="accordion-header__title">{children}</div>
      <span className={`accordion-header__icon ${isOpen ? 'accordion-header__icon--active' : ''}`}>
        ▼
      </span>
    </div>
  );
};

/**
 * Accordion.Content Component - Nội dung chi tiết của panel (chỉ hiển thị khi isOpen === true)
 */
Accordion.Content = function AccordionContent({ children, className = '' }: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext();

  if (!isOpen) return null;

  return <div className={`accordion-content ${className}`}>{children}</div>;
};
