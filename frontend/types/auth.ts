import type { User } from './user'

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  names: string
  lastNames: string
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterResponse {
  _id: string
  names: string
  lastNames: string
  email: string
  createdAt: string
}
