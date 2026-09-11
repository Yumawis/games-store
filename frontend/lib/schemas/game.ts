import { z } from 'zod/v4'
import { CATEGORY_VALUES } from '../../types/game'

export const createGameSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(200, 'Máximo 200 caracteres'),
  creationDate: z.string().min(1, 'La fecha de creación es obligatoria'),
  categoryType: z.enum(CATEGORY_VALUES as unknown as [string, ...string[]]),
  imageBase64: z.string().optional(),
})

export type CreateGameSchema = z.infer<typeof createGameSchema>
