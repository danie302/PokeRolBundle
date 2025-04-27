import { Routes, Route } from "react-router";
import { routes } from "./config/routes";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
function Router() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Container>
    </>
  );
}

export default Router;
