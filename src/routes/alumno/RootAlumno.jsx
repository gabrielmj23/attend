import AppNav from "../../components/AppNav";
import NavElem from "../../components/NavElem";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { logoutUser } from "../../api/auth";

const AlumnoContext = createContext({
  nav: {
    Clases: { ruta: "/alumno", activo: true },
    Ajustes: { ruta: "/alumno/perfil", activo: false },
    visible: false,
  },
  navSetter: () => {},
  user: null,
  userSetter: () => {},
  colorClase: null,
  setColorClase: () => {},
});

function navReducer(state, action) {
  switch (action.type) {
    case "Clases":
      return {
        Clases: { ruta: action.ruta, activo: true },
        Ajustes: { ruta: state["Ajustes"].ruta, activo: false },
        visible: true,
      };
    case "Ajustes":
      return {
        Clases: { ruta: state["Clases"].ruta, activo: false },
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
      logoutUser()
        .then(() => {
          sessionStorage.removeItem("user");
        })
        .finally(() => {
          return { user: null };
        });
  }
}

function RootAlumno() {
  const [navAlumno, dispatchNav] = useReducer(navReducer, {
    Clases: { ruta: "/alumno/home", activo: true },
    Ajustes: { ruta: "/alumno/ajustes", activo: false },
    visible: false,
  });

  const [userAlumno, dispatchUser] = useReducer(authReducer, { user: null });
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
      <AlumnoContext.Provider
        value={{
          nav: navAlumno,
          navSetter: dispatchNav,
          user: userAlumno,
          userSetter: dispatchUser,
          colorClase,
          setColorClase,
        }}
      >
        <Outlet />
        <AppNav visible={navAlumno.visible}>
          <NavElem
            icono={<SchoolOutlinedIcon />}
            label="Clases"
            ruta={navAlumno["Clases"].ruta || "/"}
            activo={navAlumno["Clases"].activo}
            color="azul"
          />
          <NavElem
            icono={<SettingsOutlinedIcon />}
            label="Ajustes"
            ruta={navAlumno["Ajustes"].ruta || "/alumno/ajustes"}
            activo={navAlumno["Ajustes"].activo}
            color="azul"
          />
        </AppNav>
      </AlumnoContext.Provider>
    </QueryClientProvider>
  );
}

export { RootAlumno, AlumnoContext };
