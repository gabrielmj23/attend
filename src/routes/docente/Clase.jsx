import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import { DocenteContext } from "./RootDocente";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerClase } from "../../api/docente";

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
        <p className="text-center mt-8">Cargando la clase...</p>
      ) : (
        <>
          <AppHeader titulo={data.nombre} color="amarillo" />
        </>
      )}
    </div>
  );
}

export default Clase;
