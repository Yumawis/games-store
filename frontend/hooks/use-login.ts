import { useMutation } from '@tanstack/react-query'
import { login } from '../api/auth'
import type { LoginInput } from '../types/auth'

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
  })
}
