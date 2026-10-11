import type { ReactNode } from 'react';

export interface AccordionContextType {
  openValue: string | null;
  toggleItem: (value: string) => void;
}

export interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
}

export interface AccordionProps {
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export interface AccordionHeaderProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export interface AccordionPanelProps {
  children: ReactNode;
  className?: string;
}
