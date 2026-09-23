import { z } from 'zod/v4/mini'

export const loginSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().check(z.minLength(6, 'Mínimo 6 caracteres')),
})

export const registerSchema = z.object({
  names: z
    .string()
    .check(
      z.minLength(1, 'Los nombres son obligatorios'),
      z.maxLength(100, 'Máximo 100 caracteres'),
    ),
  lastNames: z
    .string()
    .check(
      z.minLength(1, 'Los apellidos son obligatorios'),
      z.maxLength(100, 'Máximo 100 caracteres'),
    ),
  email: z.email('Correo electrónico inválido'),
  password: z.string().check(z.minLength(6, 'Mínimo 6 caracteres')),
})

interface ZodSchema {
  safeParse(data: unknown): {
    success: boolean
    error?: { issues: Array<{ path: PropertyKey[]; message: string }> }
  }
}

const toFormikErrors = (result: {
  success: boolean
  error?: { issues: Array<{ path: PropertyKey[]; message: string }> }
}): Record<string, string> => {
  if (result.success) return {}
  const errors: Record<string, string> = {}
  for (const issue of result.error?.issues ?? []) {
    const path = issue.path
      .filter(
        (p): p is string | number =>
          typeof p === 'string' || typeof p === 'number',
      )
      .join('.')
    if (path && !errors[path]) {
      errors[path] = issue.message
    }
  }
  return errors
}

const validateWith = (schema: ZodSchema) => (values: Record<string, unknown>) =>
  toFormikErrors(schema.safeParse(values))

export { validateWith }
