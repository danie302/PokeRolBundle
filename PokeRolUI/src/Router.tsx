import { Routes, Route } from "react-router";
import { routes } from "./config/routes";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { PrivateRoutes } from "./config/privateRoutes";
import { getUser, verifyToken } from "./services/auth";
import { useEffect } from "react";
import { setUser } from "./store/users/user";
import { useAppDispatch } from "./store/store";

const validateToken = async () => {
  const isTokenAlive = await verifyToken();
  if(!isTokenAlive) {
    window.location.href = '/login';
  }
}

function Router() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Validate token if user is logged in
    const token = localStorage.getItem('token');
    if(token) {
      validateToken();
    }
    const fetchUser = async () => {
      const user = await getUser();
      // Set user in redux
      dispatch(setUser(user));
    }
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          {routes.map((route) => (
            !route.private ?
              <Route key={route.path} path={route.path} element={route.element} /> : null
          ))}
          <Route element={<PrivateRoutes />}>
            {routes.map((route) => (
              route.private ?
                <Route key={route.path} path={route.path} element={route.element} /> : null
            ))}
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default Router;
