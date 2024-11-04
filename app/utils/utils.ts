import { ResponsiveGridColumns } from '../types/types';

export const createGridTemplateColumns = (gridColumns: ResponsiveGridColumns) =>
  Object.fromEntries(
    Object.entries(gridColumns).map(([breakpoint, cols]) => [
      breakpoint,
      `repeat(${cols}, 1fr)`,
    ])
  );

export const formatPrice = (price: number): string => {
  return `${price.toFixed(2).replace('.', ',')}€`;
};

export type LocalStorageKey = 'activeStep' | 'formValues';
