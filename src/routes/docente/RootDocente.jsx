import AppNav from "../../components/AppNav";
import NavElem from "../../components/NavElem";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Contexto de la navegación del docente
 * nav: Objeto con rutas y estado de activo
 * navSetter: Función para modificar el estado de nav
 */
const DocenteContext = createContext({
  nav: {
    Clases: { ruta: "/docente", activo: true },
    "Nueva Clase": { ruta: "/docente/clases/nueva", activo: false },
    Ajustes: { ruta: "/docente/ajustes", activo: false },
    visible: false,
  },
  navSetter: () => {},
  user: null,
  userSetter: () => {},
});

/**
 * Función reducer para la navegación de docente
 * El parámetro action contiene en el type la ruta en la que guardar contexto,
 * y en la ruta el nuevo contexto
 */
function navReducer(state, action) {
  switch (action.type) {
    case "Clases":
      return {
        Clases: { ruta: action.ruta, activo: true },
        "Nueva Clase": { ruta: state["Nueva Clase"].ruta, activo: false },
        Ajustes: { ruta: state["Ajustes"].ruta, activo: false },
        visible: true,
      };
    case "Nueva Clase":
      return {
        Clases: { ruta: state["Clases"].ruta, activo: false },
        "Nueva Clase": { ruta: action.ruta, activo: true },
        Ajustes: { ruta: state["Ajustes"].ruta, activo: false },
        visible: true,
      };
    case "Ajustes":
      return {
        Clases: { ruta: state["Clases"].ruta, activo: false },
        "Nueva Clase": { ruta: state["Nueva Clase"].ruta, activo: false },
        Ajustes: { ruta: action.ruta, activo: true },
        visible: true,
      };
    case "Visible":
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.user,
      };
    case "data":
      return {
        user: action.user,
        data: action.data,
      };
    case "logout":
      return {
        user: null,
      };
  }
}

/**
 * Componente base de las rutas que inician con /docente
 */
function RootDocente() {
  const [navDocente, dispatchNav] = useReducer(navReducer, {
    Clases: { ruta: "/docente", activo: true },
    "Nueva Clase": { ruta: "/docente/clases/nueva", activo: false },
    Ajustes: { ruta: "/docente/ajustes", activo: false },
    visible: false,
  });

  const [userDocente, dispatchUser] = useReducer(authReducer, { user: null });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DocenteContext.Provider
        value={{
          nav: navDocente,
          navSetter: dispatchNav,
          user: userDocente,
          userSetter: dispatchUser,
        }}
      >
        <Outlet />
        <AppNav visible={navDocente.visible}>
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
      </DocenteContext.Provider>
    </QueryClientProvider>
  );
}

export { RootDocente, DocenteContext };
