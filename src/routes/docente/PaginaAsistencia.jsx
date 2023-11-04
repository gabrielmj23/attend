import { useContext } from "react";
import { useEffect } from "react";
import { DocenteContext } from "./RootDocente";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAsistencia } from "../../api/asistencia";
import TomarAsistencia from "./TomarAsistencia";
import VerAsistencia from "./VerAsistencia";

function PaginaAsistencia() {
  const { idClase, fecha } = useLoaderData();
  const { user, navSetter, nombreClase, lista } = useContext(DocenteContext);

  // Verificar si se ha hecho o no la asistencia
  const { isPending, data } = useQuery({
    queryKey: ["asistenciaDocente"],
    queryFn: () => getAsistencia(`${user.user.uid}-${idClase}-${fecha}`),
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
      {isPending ? (
        <p className="mt-8 text-center">Cargando la asistencia...</p>
      ) : data ? (
        <VerAsistencia />
      ) : (
        <TomarAsistencia
          idClase={idClase}
          fecha={fecha}
          nombreClase={nombreClase}
          lista={lista}
        />
      )}
    </div>
  );
}

export default PaginaAsistencia;
