import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Trajetos from "../pages/Trajetos";
import Perfil from "../pages/Perfil";
import Rotas from "../pages/Rotas";
import Pontos from "../pages/Pontos"
import Percurso from "../pages/Percurso";

const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout NavType="register" />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/register" element={<PageLayout NavType="register" />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/login" element={<PageLayout NavType="login" />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/trajetos" element={<PageLayout NavType="home" />}>
            <Route index element={<Trajetos />} />
          </Route>
          <Route path="/perfil" element={<PageLayout NavType="home" />}>
            <Route index element={<Perfil />} />
          </Route>
          <Route path="/rotas/:trajetoId" element={<PageLayout NavType="home" />}>
            <Route index element={<Rotas />} />
          </Route>
          <Route path="/pontos" element={<PageLayout NavType="home" />}>
            <Route index element={<Pontos />} />
          </Route>
          <Route path="/percurso" element={<PageLayout NavType="home" />}>
            <Route index element={<Percurso />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
