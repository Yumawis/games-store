import { apiClient } from '../lib/api-client'
import type { ApiResponse } from '../types/api'
import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from '../types/auth'

const login = (input: LoginInput): Promise<ApiResponse<LoginResponse>> => {
  return apiClient.post<ApiResponse<LoginResponse>>('/auth/login', input)
}

const register = (
  input: RegisterInput,
): Promise<ApiResponse<RegisterResponse>> => {
  return apiClient.post<ApiResponse<RegisterResponse>>('/auth/register', input)
}

export { login, register }
