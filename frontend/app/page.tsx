import { ProtectedRoute } from '../components/auth/protected-route'

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <h1>Games Store</h1>
      </main>
    </ProtectedRoute>
  )
}
