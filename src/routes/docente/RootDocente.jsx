import AppNav from "../../components/AppNav";
import NavElem from "../../components/NavElem";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { logoutUser } from "../../api/auth";

/**
 * Contexto de la navegación del docente
 * nav: Objeto con rutas y estado de activo
 * navSetter: Función para modificar el estado de nav
 * user: Usuario actual
 * userSetter: Función para modificar el usuario actual
 * lista: Lista de estudiantes de la clase actual
 * setLista: Función para modificar la lista de estudiantes de la clase actual
 * nombreClase: Nombre de la clase actual
 * setNombreClase: Función para modificar el nombre de la clase actual
 */
const DocenteContext = createContext({
  nav: {
    Clases: { ruta: "/docente/home", activo: true },
    "Nueva Clase": { ruta: "/docente/clases/nueva", activo: false },
    Ajustes: { ruta: "/docente/ajustes", activo: false },
    visible: false,
  },
  navSetter: () => {},
  user: null,
  userSetter: () => {},
  lista: null,
  setLista: () => {},
  nombreClase: null,
  setNombreClase: () => {},
  colorClase: null,
  setColorClase: () => {},
  periodoClase: null,
  setPeriodoClase: () => {},
  escuelaClase: null,
  setEscuelaClase: () => {},
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

/**
 * Función reducer para la autenticación
 */
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      sessionStorage.setItem("user", JSON.stringify(action.user));
      return {
        user: action.user,
      };
    case "data":
      return {
        user: action.user,
        data: action.data,
      };
    case "logout":
      logoutUser()
        .then(() => {
          sessionStorage.removeItem("user");
        })
        .finally(() => {
          return { user: null };
        });
  }
}

/**
 * Componente base de las rutas que inician con /docente
 */
function RootDocente() {
  // Navegación
  const [navDocente, dispatchNav] = useReducer(navReducer, {
    Clases: { ruta: "/docente/home", activo: true },
    "Nueva Clase": { ruta: "/docente/clases/nueva", activo: false },
    Ajustes: { ruta: "/docente/ajustes", activo: false },
    visible: false,
  });
  // Autenticación
  const [userDocente, dispatchUser] = useReducer(authReducer, { user: null });
  // Clase
  const [lista, setLista] = useState(null);
  const [nombreClase, setNombreClase] = useState(null);
  const [periodoClase, setPeriodoClase] = useState(null);
  const [escuelaClase, setEscuelaClase] = useState(null);
  const [colorClase, setColorClase] = useState(null);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "offlineFirst",
      },
      mutations: {
        networkMode: "offlineFirst",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <DocenteContext.Provider
        value={{
          nav: navDocente,
          navSetter: dispatchNav,
          user: userDocente,
          userSetter: dispatchUser,
          lista,
          setLista,
          nombreClase,
          setNombreClase,
          periodoClase,
          setPeriodoClase,
          escuelaClase,
          setEscuelaClase,
          colorClase,
          setColorClase,
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
