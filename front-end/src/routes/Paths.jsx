import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Trajetos from "../pages/Trajetos";
import Perfil from "../pages/Perfil";
import Rotas from "../pages/Rotas";

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
          {/* Adicionando o parâmetro :id para a rota */}
          <Route path="/rotas/:id" element={<PageLayout NavType="home" />}>
            <Route index element={<Rotas />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
