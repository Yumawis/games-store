import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import { ROUTES } from '../constants/routes'
import Games from '../pages/Games'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.GAMES} element={<Games />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
