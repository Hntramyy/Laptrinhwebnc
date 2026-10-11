import React, { useState, useMemo, useCallback } from 'react';
import type { AccordionProps } from './types';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

const AccordionRoot: React.FC<AccordionProps> = ({
  defaultValue = undefined,
  children,
  className = '',
}) => {
  const [openValue, setOpenValue] = useState<string | null>(defaultValue ?? null);

  const toggleItem = useCallback((value: string) => {
    setOpenValue((prevValue) => (prevValue === value ? null : value));
  }, []);

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

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Panel: AccordionPanel,
});
