import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import { DocenteContext } from "./RootDocente";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerClase } from "../../api/docente";
import CarruselAsistencia from "../../components/CarruselAsistencia";

function Clase() {
  const { id } = useLoaderData();
  const { user, navSetter } = useContext(DocenteContext);

  // Obtener informacion de la clase
  const { isPending, data } = useQuery({
    queryKey: ["claseDocente"],
    queryFn: () => obtenerClase({ idDocente: user.user.uid, idClase: id }),
  });

  // Guardar contexto de la navegación actual
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/docente/clases/" + id });
  }, [navSetter, id]);

  return (
    <div className="flex flex-col gap-4">
      {isPending ? (
        <p className="mt-8 text-center">Cargando la clase...</p>
      ) : (
        <>
          <AppHeader titulo={data.nombre} color="amarillo" />
          <div>
            <h2 className="ps-4 py-3 text-2xl font-semibold">Asistencias</h2>
            <CarruselAsistencia plan={data.plan} />
          </div>
        </>
      )}
    </div>
  );
}

export default Clase;
