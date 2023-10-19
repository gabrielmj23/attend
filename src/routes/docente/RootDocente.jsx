import AppNav from "../../components/AppNav";
import NavElem from "../../components/NavElem";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";

/**
 * Contexto de la navegación del docente
 * nav: Objeto con rutas y estado de activo
 * navSetter: Función para modificar el estado de nav
 */
const NavDocenteContext = createContext({
  nav: {
    Clases: { ruta: "/docente", activo: true },
    "Nueva Clase": { ruta: "/docente/clases/nueva", activo: false },
    Ajustes: { ruta: "/docente/ajustes", activo: false },
  },
  navSetter: () => {},
});

/**
 * Componente base de las rutas que inician con /docente
 */
function RootDocente() {
  const [navDocente, setNavDocente] = useState({
    Clases: { ruta: "/docente", activo: true },
    "Nueva Clase": { ruta: "/docente/clases/nueva", activo: false },
    Ajustes: { ruta: "/docente/ajustes", activo: false },
  });

  return (
    <NavDocenteContext.Provider
      value={{ nav: navDocente, navSetter: setNavDocente }}
    >
      <Outlet />
      <AppNav>
        <NavElem
          icono={<SchoolOutlinedIcon />}
          label="Clases"
          ruta={navDocente["Clases"].ruta || "/docente"}
          activo={navDocente["Clases"].activo}
        />
        <NavElem
          icono={<AddCircleOutlineOutlinedIcon />}
          label="Nueva Clase"
          ruta={navDocente["Nueva Clase"].ruta || "/docente/clases/nueva"}
          activo={navDocente["Nueva Clase"].activo}
        />
        <NavElem
          icono={<SettingsOutlinedIcon />}
          label="Ajustes"
          ruta={navDocente["Ajustes"].ruta || "/docente/ajustes"}
          activo={navDocente["Ajustes"].activo}
        />
      </AppNav>
    </NavDocenteContext.Provider>
  );
}

export { RootDocente, NavDocenteContext };
