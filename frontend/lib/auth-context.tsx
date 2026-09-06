'use client'

import { createContext, use, useCallback, useEffect, useState } from 'react'
import type { User } from '../types/user'
import { auth } from './api-client'

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = auth.getToken()
    if (storedToken) {
      setToken(storedToken)
    }
    setIsLoading(false)
  }, [])

  const setAuth = useCallback((u: User, t: string) => {
    auth.setToken(t)
    setUser(u)
    setToken(t)
  }, [])

  const logout = useCallback(() => {
    auth.clearToken()
    setUser(null)
    setToken(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextValue => {
  const ctx = use(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider')
  }
  return ctx
}

export { AuthProvider, useAuth }
