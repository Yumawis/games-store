'use client'

import { ProtectedRoute } from '../components/auth/protected-route'
import { GameCard } from '../components/game/game-card'
import { useGames } from '../hooks/use-games'

const Home = () => {
  const { data, isLoading, isError, error } = useGames()

  const games = data?.result

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Juegos Actuales</h1>

        {isLoading && (
          <p className="text-muted-foreground">Cargando juegos...</p>
        )}

        {isError && (
          <p className="text-destructive">
            Error al cargar juegos:{' '}
            {error?.data?.message ?? 'Error desconocido'}
          </p>
        )}

        {!isLoading && !isError && games?.length === 0 && (
          <p className="text-muted-foreground">No hay juegos registrados.</p>
        )}

        {!isLoading && !isError && games && games.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {games.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        )}
      </main>
    </ProtectedRoute>
  )
}

export default Home
