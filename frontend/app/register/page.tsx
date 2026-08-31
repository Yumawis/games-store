'use client'

import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRegister } from '../../hooks/use-register'
import { registerSchema } from '../../lib/schemas/auth'
import type { ApiError } from '../../types/api'

export default function RegisterPage() {
  const router = useRouter()
  const registerMutation = useRegister()

  const formik = useFormik({
    initialValues: {
      names: '',
      lastNames: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerMutation.mutate(values, {
        onSuccess: () => {
          alert('Registro exitoso. Ahora puedes iniciar sesion.')
          router.push('/login')
        },
        onError: (error: unknown) => {
          const apiError = error as ApiError
          alert(apiError?.data?.message ?? 'Error al registrar')
        },
      })
    },
  })

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-bold">Crear Cuenta</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="names" className="block text-sm font-medium">
              Nombres
            </label>
            <input
              id="names"
              name="names"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.names}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            {formik.touched.names && formik.errors.names && (
              <p className="mt-1 text-sm text-destructive">
                {formik.errors.names}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastNames" className="block text-sm font-medium">
              Apellidos
            </label>
            <input
              id="lastNames"
              name="lastNames"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastNames}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            {formik.touched.lastNames && formik.errors.lastNames && (
              <p className="mt-1 text-sm text-destructive">
                {formik.errors.lastNames}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-destructive">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {registerMutation.isPending ? 'Creando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Ya tienes cuenta?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Inicia sesion
          </Link>
        </p>
      </div>
    </main>
  )
}
