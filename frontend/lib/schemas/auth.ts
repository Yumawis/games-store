import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  names: z
    .string()
    .min(1, 'Nombres son requeridos')
    .max(100, 'Maximo 100 caracteres'),
  lastNames: z
    .string()
    .min(1, 'Apellidos son requeridos')
    .max(100, 'Maximo 100 caracteres'),
  email: z.email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
})

export type RegisterSchema = z.infer<typeof registerSchema>
