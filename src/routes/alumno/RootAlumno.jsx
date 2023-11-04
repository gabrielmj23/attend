import AppNav from "../../components/AppNav";
import NavElem from "../../components/NavElem";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AlumnoContext = createContext({
  nav: {
    Inicio: { ruta: "/alumno", activo: true },
    Ajustes: { ruta: "/alumno/perfil", activo: false },
    visible: false,
  },
  navSetter: () => {},
  user: null,
  userSetter: () => {},
});

function navReducer(state, action) {
  switch (action.type) {
    case "Inicio":
      return {
        Inicio: { ruta: action.ruta, activo: true },
        Ajustes: { ruta: state["Ajustes"].ruta, activo: false },
        visible: true,
      };
    case "Ajustes":
      return {
        Inicio: { ruta: state["Inicio"].ruta, activo: false },
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

function RootAlumno() {
  const [navAlumno, dispatchNav] = useReducer(navReducer, {
    Clases: { ruta: "/alumno", activo: true },
    Ajustes: { ruta: "/alumno/ajustes", activo: false },
    visible: false,
  });

  const [userAlumno, dispatchUser] = useReducer(authReducer, { user: null });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AlumnoContext.Provider
        value={{
          nav: navAlumno,
          navSetter: dispatchNav,
          user: userAlumno,
          userSetter: dispatchUser,
        }}
      >
        <Outlet />
        <AppNav visible={navAlumno.visible}>
          <NavElem
            icono={<SchoolOutlinedIcon />}
            label="Clases"
            ruta={navAlumno["Clases"].ruta || "/"}
            activo={navAlumno["Clases"].activo}
          />
          <NavElem
            icono={<SettingsOutlinedIcon />}
            label="Ajustes"
            ruta={navAlumno["Ajustes"].ruta || "/alumno/ajustes"}
            activo={navAlumno["Ajustes"].activo}
          />
        </AppNav>
      </AlumnoContext.Provider>
    </QueryClientProvider>
  );
}

export { RootAlumno, AlumnoContext };
