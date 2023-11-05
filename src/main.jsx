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
import LoginAlumno from "./routes/alumno/LoginAlumno.jsx";
import SignUpAlumno from "./routes/alumno/SignUpAlumno.jsx";
import HomeAlumno from "./routes/alumno/HomeAlumno.jsx";
import AjustesAlumno from "./routes/alumno/AjustesAlumno.jsx";
import { RootAlumno } from "./routes/alumno/RootAlumno.jsx";

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
        path: "docentes",
        element: <VerDocentes />,
      },
      {
        path: "docentes/nuevo",
        element: <NuevoDocente />,
      },
    ],
  },
  {
    path: "/alumno",
    element: <RootAlumno />,
    children: [
      {
        path: "login",
        element: <LoginAlumno />,
      },
      {
        path: "signup",
        element: <SignUpAlumno />,
      },
      {
        path: "home",
        element: <HomeAlumno />,
      },
      {
        path: "ajustes",
        element: <AjustesAlumno />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
