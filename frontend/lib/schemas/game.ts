import { z } from 'zod/v4/mini'
import { CATEGORY_VALUES } from '../../types/game'

export const createGameSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(1, 'El nombre es obligatorio'),
      z.maxLength(200, 'Máximo 200 caracteres'),
    ),
  creationDate: z
    .string()
    .check(z.minLength(1, 'La fecha de creación es obligatoria')),
  categoryType: z.enum(CATEGORY_VALUES as unknown as [string, ...string[]]),
  imageBase64: z.optional(z.string()),
})

export type CreateGameSchema = z.infer<typeof createGameSchema>
