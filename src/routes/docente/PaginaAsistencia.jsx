import { useContext } from "react";
import { useEffect } from "react";
import { DocenteContext } from "./RootDocente";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAsistencia } from "../../api/asistencia";
import TomarAsistencia from "./TomarAsistencia";
import VerAsistencia from "./VerAsistencia";
import { useNavigate } from "react-router-dom";
import { obtenerClase } from "../../api/docente";
import { Spinner } from "flowbite-react";

function fechaAString(fecha) {
  const fechaAsDate = fecha.toDate();
  const fechaStr = `${fechaAsDate.getMonth() + 1}-${fechaAsDate.getDate()}-${
    fechaAsDate.getYear() % 100
  }`;
  return fechaStr;
}

function PaginaAsistencia() {
  const navigate = useNavigate();
  const { idClase, fecha } = useLoaderData();
  const { navSetter, nombreClase, lista } = useContext(DocenteContext);
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Verificar sesión
  if (!user) {
    navigate("/docente/login");
  }

  // Verificar si se ha hecho o no la asistencia
  const asistenciaQuery = useQuery({
    queryKey: ["pagAsistencia"],
    queryFn: () => getAsistencia(`${user.uid}-${idClase}-${fecha}`),
  });

  // Obtener semana de la clase
  const claseQuery = useQuery({
    queryKey: ["pagClase"],
    queryFn: () => obtenerClase({ idDocente: user.uid, idClase }),
    enabled: asistenciaQuery.isSuccess && !asistenciaQuery.data,
  });

  // Guardar contexto de la navegación actual
  useEffect(() => {
    navSetter({
      type: "Clases",
      ruta: "/docente/clases/" + idClase + "/" + fecha,
    });
  }, [navSetter, idClase, fecha]);

  // Dirigir a la página adecuada según exista o no la asistencia
  return (
    <div className="flex flex-col gap-4">
      {asistenciaQuery.isPending ? (
        <span className="mt-8 text-center">
          <Spinner /> Cargando la asistencia...
        </span>
      ) : asistenciaQuery.data ? (
        <VerAsistencia idClase={idClase} asistencia={asistenciaQuery.data} />
      ) : claseQuery.isPending ? (
        <span className="mt-8 text-center">
          <Spinner /> Cargando la asistencia
        </span>
      ) : (
        <TomarAsistencia
          idClase={idClase}
          fecha={fecha}
          nombreClase={nombreClase}
          lista={lista}
          semana={
            claseQuery.data.plan.find(
              (clase) => fechaAString(clase.fecha) === fecha,
            ).semana
          }
        />
      )}
    </div>
  );
}

export default PaginaAsistencia;
