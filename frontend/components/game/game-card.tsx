import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Game } from '@/types/game'

interface GameCardProps {
  game: Game
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {game.imageBase64 ? (
          <div className="h-64 w-full overflow-hidden rounded-md bg-muted">
            <img
              src={`data:image/png;base64,${game.imageBase64}`}
              alt={game.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-64 w-full items-center justify-center rounded-md bg-muted text-muted-foreground">
            Sin imagen
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{game.creationDate}</span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {game.categoryType}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export { GameCard }
