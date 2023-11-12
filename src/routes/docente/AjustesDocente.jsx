import AppHeader from "../../components/AppHeader";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { DocenteContext } from "./RootDocente";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { agregarAsistencia } from "../../api/asistencia";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

function AjustesDocente() {
  // Guardar contexto de la navegación actual
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  if (!user) {
    navigate("/docente/login");
  }
  const { navSetter, userSetter } = useContext(DocenteContext);
  useEffect(() => {
    navSetter({ type: "Ajustes", ruta: "/docente/ajustes" });
  }, [navSetter]);

  // Mutación para guardar asistencias en lote
  const { isPending, mutate } = useMutation({
    mutationFn: (asistencias) =>
      Promise.all(
        asistencias.map((asistencia) => agregarAsistencia(asistencia)),
      ),
    onError: () => {
      alert("Ocurrió un error sincronizando, intente de nuevo");
    },
    onSuccess: () => {
      alert("Sincronizado con éxito");
      localStorage.setItem("asistencias", JSON.stringify([]));
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Ajustes" color="amarillo" />
      <div className="flex flex-row gap-5 ps-5 pt-2 align-middle">
        <PersonOutlineIcon fontSize="large" className="my-auto scale-125" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{user.nombre}</p>
          <p className="text-sm font-semibold text-gray-700">{user.correo}</p>
        </div>
      </div>
      <p
        className="ps-5 text-sm text-cyan-700 underline hover:cursor-pointer hover:text-cyan-800"
        onClick={async () => {
          const asistencias = JSON.parse(localStorage.getItem("asistencias"));
          if (!asistencias || !asistencias.length) {
            alert("Todo sincronizado!");
          } else {
            mutate(asistencias);
          }
        }}
      >
        Sincronizar asistencias {isPending ? <Spinner /> : null}
      </p>
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
