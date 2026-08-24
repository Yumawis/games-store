export interface Game {
  _id: string
  name: string
  creationDate: string
  categoryType: CategoryCatalogue
  imageBase64?: string
}

export type CategoryCatalogue = 'Deportes' | 'Terror' | 'Aventura'

export const CATEGORY = {
  SPORTS: 'Deportes',
  TERROR: 'Terror',
  ADVENTURE: 'Aventura',
} as const

export const CATEGORY_VALUES: readonly CategoryCatalogue[] = Object.values(
  CATEGORY,
) as readonly CategoryCatalogue[]

export interface CreateGameInput {
  name: string
  creationDate: string
  categoryType: CategoryCatalogue
  imageBase64?: string
}
