import Login from "../pages/Login/";
import Home from "../pages/Home/";
import Register from "../pages/Register/";
import Dashboard from "../pages/Dashboard/";
import TeamDetails from "../pages/TeamDetails/";
import PokemonDetails from "../pages/PokemonDetails/";
import ForgotPassword from "../pages/ForgotPassword/";
import ResetPassword from "../pages/ResetPassword/";
export const routes = [
  {
    path: "/",
    private: false,
    element: <Home />,
  },
  {
    path: "/login",
    private: false,
    element: <Login />,
  },
  {
    path: "/register",
    private: false,
    element: <Register />,
  },
  {
    path: "/dashboard",
    private: true,
    element: <Dashboard />,
  },
  {
    path: "/team/:teamId",
    private: true,
    element: <TeamDetails />,
  },
  {
    path: "/team/:teamId/:pokemonId",
    private: true,
    element: <PokemonDetails />,
  },
  {
    path: "/forgot-password",
    private: false,
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    private: false,
    element: <ResetPassword />,
  },
];
