import { z } from 'zod/v4/mini'
import { CATEGORY_VALUES } from '../../types/game'

export const ACCEPTED_IMAGE_TYPES = ['image/png'] as const
export const MAX_IMAGE_BYTES = 64 * 1024

const PNG_DATA_URL_RE = /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/

const dataUrlBytes = (value: string): number => {
  const comma = value.indexOf(',')
  if (comma === -1) return 0
  return Math.floor(((value.length - comma - 1) * 3) / 4)
}

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
  imageBase64: z.optional(
    z.string().check(
      z.refine(
        (value) => PNG_DATA_URL_RE.test(value),
        'La imagen debe ser un archivo PNG',
      ),
      z.refine(
        (value) => dataUrlBytes(value) <= MAX_IMAGE_BYTES,
        `La imagen no puede superar ${MAX_IMAGE_BYTES / 1024} KB`,
      ),
    ),
  ),
})

export type CreateGameSchema = z.infer<typeof createGameSchema>
