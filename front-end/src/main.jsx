import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";

import Home from "./routes/Home/Home.jsx";
import Login from "./routes/Login/Login.jsx";
import Register from "./routes/Register/Register.jsx";
import Trajetos from "./routes/Trajetos/Trajetos.jsx";
import Pontos from "./routes/Pontos/Pontos.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/trajetos",
        element: <Trajetos />,
      },
      {
        path: "/pontos",
        element: <Pontos />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
