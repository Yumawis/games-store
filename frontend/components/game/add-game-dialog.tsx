'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateGame } from '@/hooks/use-games'
import { type CreateGameSchema, createGameSchema } from '@/lib/schemas/game'
import type { ApiError } from '@/types/api'
import { CATEGORY_VALUES, type CreateGameInput } from '@/types/game'

interface AddGameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AddGameDialog = ({ open, onOpenChange }: AddGameDialogProps) => {
  const createGame = useCreateGame()
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<CreateGameSchema>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      name: '',
      creationDate: '',
      categoryType: '',
    },
  })

  const onSubmit = (data: CreateGameSchema) => {
    setFormError(null)
    createGame.mutate(data as CreateGameInput, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
      },
      onError: (error: unknown) => {
        const apiError = error as ApiError
        setFormError(apiError?.data?.message ?? 'Error al crear juego')
      },
    })
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset()
      setFormError(null)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Juego</DialogTitle>
          <DialogDescription>
            Registra un nuevo juego en el catálogo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formError && <p className="text-sm text-destructive">{formError}</p>}

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Nombre del juego</Label>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Nombre del juego"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="creationDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Fecha de creación</Label>
                <Input
                  {...field}
                  id={field.name}
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="categoryType"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Categoría</Label>
                <select
                  {...field}
                  id={field.name}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  aria-invalid={fieldState.invalid}
                >
                  <option value="">Seleccionar categoría</option>
                  {CATEGORY_VALUES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={createGame.isPending}>
              {createGame.isPending ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { AddGameDialog }
