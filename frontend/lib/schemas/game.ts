import { z } from 'zod/v4'
import { CATEGORY_VALUES } from '../../types/game'

export const createGameSchema = z.object({
  name: z
    .string()
    .min(1, 'Nombre es requerido')
    .max(200, 'Maximo 200 caracteres'),
  creationDate: z.string().min(1, 'Fecha de creacion es requerida'),
  categoryType: z.enum(CATEGORY_VALUES as unknown as [string, ...string[]]),
  imageBase64: z.string().optional(),
})

export type CreateGameSchema = z.infer<typeof createGameSchema>
