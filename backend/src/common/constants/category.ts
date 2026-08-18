export type CategoryCatalogue = 'Deportes' | 'Terror' | 'Aventura';

export const CATEGORY = {
  SPORTS: 'Deportes',
  TERROR: 'Terror',
  ADVENTURE: 'Aventura',
} as const;

export const CATEGORY_VALUES: readonly CategoryCatalogue[] =
  Object.values(CATEGORY);
