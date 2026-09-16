'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AddGameDialog } from '@/components/game/add-game-dialog'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

const AppHeader = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [addGameOpen, setAddGameOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold">
            Games Store
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddGameOpen(true)}
              >
                Agregar juego
              </Button>
              <span className="text-sm text-muted-foreground">
                {user?.names}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          )}
        </div>
      </header>
      <AddGameDialog open={addGameOpen} onOpenChange={setAddGameOpen} />
    </>
  )
}

export { AppHeader }
