import { apiClient } from '../lib/api-client'
import type { ApiResponse } from '../types/api'
import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from '../types/auth'

export function login(input: LoginInput): Promise<ApiResponse<LoginResponse>> {
  return apiClient.post<ApiResponse<LoginResponse>>('/auth/login', input)
}

export function register(
  input: RegisterInput,
): Promise<ApiResponse<RegisterResponse>> {
  return apiClient.post<ApiResponse<RegisterResponse>>('/auth/register', input)
}
