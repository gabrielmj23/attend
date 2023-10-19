import React from "react";
import ReactDOM from "react-dom/client";
import HomeDocente from "./routes/docente/HomeDocente.jsx";
import Clase from "./routes/docente/Clase.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AjustesDocente from "./routes/docente/AjustesDocente.jsx";
import Landing from "./Landing.jsx";
import { RootDocente } from "./routes/docente/RootDocente.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
