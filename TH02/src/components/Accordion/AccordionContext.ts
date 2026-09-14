import { createContext, useContext } from 'react';
import type { AccordionContextType, AccordionItemContextType } from './types';

/**
 * Context quản lý state chung cho toàn bộ Accordion
 */
export const AccordionContext = createContext<AccordionContextType | null>(null);

/**
 * Context truyền dữ liệu item (value, isOpen) xuống các sub-component con
 */
export const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

/**
 * Custom Hook an toàn để đọc AccordionContext
 * Ném ra ngoại lệ rõ ràng nếu dùng outside <Accordion>
 */
export function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion sub-components (Header, Panel, Item) must be rendered inside an <Accordion> provider!'
    );
  }
  return context;
}

/**
 * Custom Hook an toàn để đọc AccordionItemContext
 * Ném ra ngoại lệ rõ ràng nếu dùng outside <Accordion.Item>
 */
export function useAccordionItemContext(): AccordionItemContextType {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'Accordion.Header and Accordion.Panel must be rendered inside an <Accordion.Item>!'
    );
  }
  return context;
}
