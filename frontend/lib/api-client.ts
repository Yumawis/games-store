import type { ApiError } from '../types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_GAMES_STORE_API_URL ?? ''

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = auth.getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function handle401(): never {
  if (typeof window !== 'undefined') {
    auth.clearToken()
    window.location.href = '/'
  }
  throw new Error('Sesion expirada')
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string> | undefined),
  }

  const response = await fetch(url, { ...options, headers })

  if (response.status === 401) {
    handle401()
  }

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const error: ApiError = {
      data: body?.data ?? { message: 'Error desconocido' },
      status: response.status,
    }
    throw error
  }

  return body as T
}

export const auth = {
  setToken(token: string): void {
    localStorage.setItem('token', token)
  },

  clearToken(): void {
    localStorage.removeItem('token')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },
}

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' })
  },

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },
}
