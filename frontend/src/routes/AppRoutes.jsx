import Games from "../pages/Games";
import CreateGame from "../pages/CreateGame";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.GAMES} element={<Games />} />
      <Route path={ROUTES.CREATE_GAME} element={<CreateGame />} />
    </Routes>
  );
};

export default AppRoutes;
