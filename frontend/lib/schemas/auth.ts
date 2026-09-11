import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  names: z
    .string()
    .min(1, 'Los nombres son obligatorios')
    .max(100, 'Máximo 100 caracteres'),
  lastNames: z
    .string()
    .min(1, 'Los apellidos son obligatorios')
    .max(100, 'Máximo 100 caracteres'),
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type RegisterSchema = z.infer<typeof registerSchema>
