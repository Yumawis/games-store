import Games from "../pages/Games";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import MainLayout from "../components/layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.GAMES} element={<Games />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
