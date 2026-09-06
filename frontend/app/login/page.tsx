'use client'

import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/hooks/use-login'
import { useAuth } from '@/lib/auth-context'
import { loginSchema } from '@/lib/schemas/auth'
import type { ApiError } from '@/types/api'

const LoginPage = () => {
  const { setAuth } = useAuth()
  const router = useRouter()
  const loginMutation = useLogin()
  const [formError, setFormError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setFormError(null)
      loginMutation.mutate(values, {
        onSuccess: (response) => {
          setAuth(response.result.user, response.result.token)
          router.push('/')
        },
        onError: (error: unknown) => {
          const apiError = error as ApiError
          setFormError(apiError?.data?.message ?? 'Error al iniciar sesion')
        },
      })
    },
  })

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Iniciar Sesion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-destructive">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contrasena</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-destructive">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            No tienes cuenta?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Registrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

export default LoginPage
