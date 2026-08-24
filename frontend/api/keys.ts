export const gamesKeys = {
  all: ['games'] as const,
  detail: (id: string) => ['games', id] as const,
}

export const authKeys = {
  me: ['auth', 'me'] as const,
}
