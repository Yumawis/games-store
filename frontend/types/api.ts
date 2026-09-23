export interface ApiResponse<T> {
  message: string
  result: T
}

interface ApiErrorData {
  message: string
  error?: string
  errors?: Record<string, string>
}

export interface ApiError {
  data: ApiErrorData
  status: number
}
