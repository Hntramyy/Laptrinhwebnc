import { createContext, useContext } from 'react';
import type { AccordionContextType, AccordionItemContextType } from './types';

export const AccordionContext = createContext<AccordionContextType | null>(null);
export const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

export function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion sub-components (Header, Panel, Item) must be rendered inside an <Accordion> provider!'
    );
  }
  return context;
}

export function useAccordionItemContext(): AccordionItemContextType {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'Accordion.Header and Accordion.Panel must be rendered inside an <Accordion.Item>!'
    );
  }
  return context;
}
