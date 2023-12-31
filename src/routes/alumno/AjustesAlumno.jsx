import AppHeader from "../../components/AppHeader";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { AlumnoContext } from "./RootAlumno";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";

function AjustesAlumno() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  if (!user) {
    navigate("/alumno/login");
  }
  // Guardar contexto de la navegación actual
  const { navSetter, userSetter } = useContext(AlumnoContext);
  useEffect(() => {
    navSetter({ type: "Ajustes", ruta: "/alumno/ajustes" });
  }, [navSetter]);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Ajustes" color="azul" />
      <div className="flex flex-row gap-5 ps-5 pt-2 align-middle">
        <PersonOutlineIcon fontSize="large" className="my-auto scale-125" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{user.nombre}</p>
          <p className="text-sm font-semibold text-gray-700">{user.correo}</p>
        </div>
      </div>
      <p
        className="ps-5 text-sm text-red-700 underline hover:cursor-pointer hover:text-red-800"
        onClick={() => {
          userSetter({ type: "logout" });
          navSetter({ type: "Visible" });
          navigate("/alumno/login");
        }}
      >
        Cerrar sesión
      </p>
    </div>
  );
}

export default AjustesAlumno;
