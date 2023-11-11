import AppHeader from "../../components/AppHeader";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { DocenteContext } from "./RootDocente";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AjustesDocente() {
  // Guardar contexto de la navegación actual
  const { user, navSetter, userSetter } = useContext(DocenteContext);
  useEffect(() => {
    navSetter({ type: "Ajustes", ruta: "/docente/ajustes" });
  }, [navSetter]);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Ajustes" color="amarillo" />
      <div className="flex flex-row gap-5 ps-5 pt-2 align-middle">
        <PersonOutlineIcon fontSize="large" className="my-auto scale-125" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{user.user.nombre}</p>
          <p className="text-sm font-semibold text-gray-700">
            {user.user.correo}
          </p>
        </div>
      </div>
      <p
        className="ps-5 text-sm text-red-700 underline hover:cursor-pointer hover:text-red-800"
        onClick={() => {
          userSetter({ type: "logout" });
          navSetter({ type: "Visible" });
          navigate("/docente/login");
        }}
      >
        Cerrar sesión
      </p>
    </div>
  );
}

export default AjustesDocente;
