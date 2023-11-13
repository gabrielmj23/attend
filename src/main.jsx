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
import PaginaAsistencia from "./routes/docente/PaginaAsistencia.jsx";
import LoginAlumno from "./routes/alumno/LoginAlumno.jsx";
import SignUpAlumno from "./routes/alumno/SignUpAlumno.jsx";
import HomeAlumno from "./routes/alumno/HomeAlumno.jsx";
import AjustesAlumno from "./routes/alumno/AjustesAlumno.jsx";
import { RootAlumno } from "./routes/alumno/RootAlumno.jsx";
import ClaseAlumno from "./routes/alumno/ClaseAlumno.jsx";
import VerClases from "./routes/admin/docentes/VerClases.jsx";
import VerClase from "./routes/admin/docentes/VerClase.jsx";
import NuevoPeriodo from "./routes/admin/periodos/NuevoPeriodo.jsx";
import VerPeriodo from "./routes/admin/periodos/VerPeriodo.jsx";
import VerPeriodoGrafica from "./routes/admin/docentes/VerPeriodoGrafica.jsx";
import VerClaseGrafica from "./routes/admin/docentes/VerClaseGrafica.jsx";

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
        path: "clases/:idClase",
        element: <Clase />,
        loader: ({ params }) => {
          return {
            idClase: params.idClase,
          };
        },
      },
      {
        path: "clases/:idClase/:fecha",
        element: <PaginaAsistencia />,
        loader: ({ params }) => {
          return {
            idClase: params.idClase,
            fecha: params.fecha,
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
        element: <VerPeriodoGrafica />,
        loader: ({ params }) => {
          return {
            idPeriodo: params.idPeriodo,
          };
        },
      },
      {
        path: "periodos/:idPeriodo/detalle",
        element: <VerPeriodo />,
        loader: ({ params }) => {
          return {
            idPeriodo: params.idPeriodo,
          };
        },
      },
      {
        path: "clases/:idDocente",
        element: <VerClases />,
        loader: ({ params }) => {
          return {
            idDocente: params.idDocente,
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
      {
        path: "clases/:idDocente",
        element: <VerClases />,
        loader: ({ params }) => {
          return {
            idDocente: params.idDocente,
          };
        },
      },
      {
        path: "clases/:idDocente/:idClase",
        element: <VerClaseGrafica />,
        loader: ({ params }) => {
          return {
            idDocente: params.idDocente,
            idClase: params.idClase,
          };
        },
      },
      {
        path: "clases/:idDocente/:idClase/detalle",
        element: <VerClase />,
        loader: ({ params }) => {
          return {
            idDocente: params.idDocente,
            idClase: params.idClase,
          };
        },
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
        path: "clases/:idClase",
        element: <ClaseAlumno />,
        loader: ({ params }) => {
          return {
            idClase: params.idClase,
          };
        },
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
