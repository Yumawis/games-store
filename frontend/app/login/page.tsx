'use client'

import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLogin } from '../../hooks/use-login'
import { useAuth } from '../../lib/auth-context'
import { loginSchema } from '../../lib/schemas/auth'
import type { ApiError } from '../../types/api'

export default function LoginPage() {
  const { setAuth } = useAuth()
  const router = useRouter()
  const loginMutation = useLogin()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values, {
        onSuccess: (response) => {
          setAuth(response.result.user, response.result.token)
          router.push('/')
        },
        onError: (error: unknown) => {
          const apiError = error as ApiError
          alert(apiError?.data?.message ?? 'Error al iniciar sesion')
        },
      })
    },
  })

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-bold">Iniciar Sesion</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            disabled={loginMutation.isPending}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          No tienes cuenta?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  )
}
