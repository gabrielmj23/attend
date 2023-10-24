import React from "react";
import ReactDOM from "react-dom/client";
import HomeDocente from "./routes/docente/HomeDocente.jsx";
import Clase from "./routes/docente/Clase.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AjustesDocente from "./routes/docente/AjustesDocente.jsx";
import Landing from "./Landing.jsx";
import { RootDocente } from "./routes/docente/RootDocente.jsx";
import HomeAdmin from "./routes/admin/HomeAdmin.jsx";
import LoginAdmin from "./routes/admin/LoginAdmin.jsx";
import SignUpAdmin from "./routes/admin/SignUpAdmin.jsx";
import { RootAdmin } from "./routes/admin/RootAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/docente",
    element: <RootDocente />,
    children: [
      {
        path: "",
        element: <HomeDocente />,
      },
      {
        path: "clases/nueva",
        element: <Clase />,
      },
      {
        path: "clases/:id",
        element: <Clase />,
      },
      {
        path: "ajustes",
        element: <AjustesDocente />,
      },
    ],
  },
  {
    path: "/admin",
    element: <RootAdmin />,
    children: [
      {
        path: "login",
        element: <LoginAdmin />,
      },
      {
        path: "signup",
        element: <SignUpAdmin />,
      },
      {
        path: "home",
        element: <HomeAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
