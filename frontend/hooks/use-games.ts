import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createGame, getAllGames } from '../api/games'
import { gamesKeys } from '../api/keys'
import { useAuth } from '../lib/auth-context'
import type { ApiError, ApiResponse } from '../types/api'
import type { CreateGameInput, Game } from '../types/game'

const useGames = () => {
  const { isAuthenticated } = useAuth()

  return useQuery<ApiResponse<Game[]>, ApiError>({
    queryKey: gamesKeys.all,
    queryFn: getAllGames,
    enabled: isAuthenticated,
  })
}

const useCreateGame = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<Game>, ApiError, CreateGameInput>({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesKeys.all })
    },
  })
}

export { useCreateGame, useGames }
