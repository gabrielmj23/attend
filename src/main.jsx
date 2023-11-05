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
import VerDocentes from "./routes/admin/docentes/VerDocentes.jsx";
import NuevoDocente from "./routes/admin/docentes/NuevoDocente.jsx";
import LoginDocente from "./routes/docente/LoginDocente.jsx";
import NuevaClase from "./routes/docente/nueva-clase/NuevaClase.jsx";
import NuevoPeriodo from "./routes/admin/periodos/NuevoPeriodo.jsx";
import VerPeriodo from "./routes/admin/periodos/VerPeriodo.jsx";

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
        path: "login",
        element: <LoginDocente />,
      },
      {
        path: "home",
        element: <HomeDocente />,
      },
      {
        path: "clases/nueva",
        element: <NuevaClase />,
      },
      {
        path: "clases/:id",
        element: <Clase />,
        loader: ({ params }) => {
          return {
            id: params.id,
          };
        },
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
      {
        path: "periodos/nuevo",
        element: <NuevoPeriodo />,
      },
      {
        path: "periodos/:idPeriodo",
        element: <VerPeriodo />,
        loader: ({ params }) => {
          return {
            idPeriodo: params.idPeriodo,
          };
        },
      },
      {
        path: "clases/:id",
        element: <Clase />,
        loader: ({ params }) => {
          return {
            id: params.id,
          };
        },
      },
      {
        path: "docentes",
        element: <VerDocentes />,
      },
      {
        path: "docentes/nuevo",
        element: <NuevoDocente />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
