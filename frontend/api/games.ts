import { apiClient } from '../lib/api-client'
import type { ApiResponse } from '../types/api'
import type { CreateGameInput, Game } from '../types/game'

const createGame = (input: CreateGameInput): Promise<ApiResponse<Game>> => {
  return apiClient.post<ApiResponse<Game>>('/games/create', input)
}

const getAllGames = (): Promise<ApiResponse<Game[]>> => {
  return apiClient.get<ApiResponse<Game[]>>('/games')
}

export { createGame, getAllGames }
