import { apiClient } from '../lib/api-client'
import type { ApiResponse } from '../types/api'
import type { CreateGameInput, Game } from '../types/game'

export function createGame(input: CreateGameInput): Promise<ApiResponse<Game>> {
  return apiClient.post<ApiResponse<Game>>('/games/create', input)
}

export function getAllGames(): Promise<ApiResponse<Game[]>> {
  return apiClient.get<ApiResponse<Game[]>>('/games')
}
