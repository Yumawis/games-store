'use client'

import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/hooks/use-register'
import { registerSchema } from '@/lib/schemas/auth'
import type { ApiError } from '@/types/api'

const RegisterPage = () => {
  const router = useRouter()
  const registerMutation = useRegister()
  const [formError, setFormError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      names: '',
      lastNames: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      setFormError(null)
      registerMutation.mutate(values, {
        onSuccess: () => {
          router.push('/login')
        },
        onError: (error: unknown) => {
          const apiError = error as ApiError
          setFormError(apiError?.data?.message ?? 'Error al registrar')
        },
      })
    },
  })

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Crear Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="names">Nombres</Label>
              <Input
                id="names"
                name="names"
                type="text"
                placeholder="Tus nombres"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.names}
              />
              {formik.touched.names && formik.errors.names && (
                <p className="text-sm text-destructive">
                  {formik.errors.names}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastNames">Apellidos</Label>
              <Input
                id="lastNames"
                name="lastNames"
                type="text"
                placeholder="Tus apellidos"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastNames}
              />
              {formik.touched.lastNames && formik.errors.lastNames && (
                <p className="text-sm text-destructive">
                  {formik.errors.lastNames}
                </p>
              )}
            </div>

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
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Creando...' : 'Crear Cuenta'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesion
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

export default RegisterPage
