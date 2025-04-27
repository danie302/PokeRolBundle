import Login from "../pages/Login/";
import Home from "../pages/Home/";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
