import { ProtectedRoute } from '../components/auth/protected-route'

const Home = () => {
  return (
    <ProtectedRoute>
      <main>
        <h1>Games Store</h1>
      </main>
    </ProtectedRoute>
  )
}

export default Home
