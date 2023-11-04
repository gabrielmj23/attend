import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import { DocenteContext } from "./RootDocente";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerClase } from "../../api/docente";
import CarruselAsistencia from "../../components/CarruselAsistencia";
import Input from "../../components/Input";

function Clase() {
  const { idClase } = useLoaderData();
  const { user, navSetter } = useContext(DocenteContext);

  // Obtener informacion de la clase
  const { isPending, data } = useQuery({
    queryKey: ["claseDocente"],
    queryFn: () => obtenerClase({ idDocente: user.user.uid, idClase }),
  });

  // Guardar contexto de la navegación actual
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/docente/clases/" + idClase });
  }, [navSetter, idClase]);

  return (
    <div className="flex flex-col gap-4">
      {isPending ? (
        <p className="mt-8 text-center">Cargando la clase...</p>
      ) : (
        <>
          <AppHeader titulo={data.nombre} color="amarillo" />
          <div>
            <h2 className="py-3 ps-4 text-2xl font-semibold">Asistencias</h2>
            <CarruselAsistencia idClase={idClase} plan={data.plan} />
          </div>
          <div className="flex w-4/5 flex-col">
            <h2 className="py-3 ps-4 text-2xl font-semibold">Reportes</h2>
            <div className="flex justify-center place-self-center ps-[60px]">
              <Input
                id="nombre"
                name="nombre"
                textoLabel="Buscar un estudiante"
                textoPlaceholder="Buscar"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Clase;
