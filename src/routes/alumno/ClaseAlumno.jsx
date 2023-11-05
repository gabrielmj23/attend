import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AlumnoContext } from "./RootAlumno";
import { useQuery } from "@tanstack/react-query";
import AppHeader from "../../components/AppHeader";
import { getAsistenciasDeAlumno } from "../../api/asistencia";
import BotonAsistencia from "../../components/BotonAsistencia";
import { useEffect } from "react";

const transformarFecha = (fecha) => {
  const aux = fecha.split("-");
  return `${aux[1]}/${aux[0]}/${aux[2]}`;
};

function ClaseAlumno() {
  // Obtener datos de la clase
  const { idClase } = useLoaderData();
  const { user, navSetter } = useContext(AlumnoContext);
  const resumen_clase = user.user.resumen_clases.find(
    (clase) => clase.idClase === idClase,
  );
  const porcentajeInasistencias =
    (resumen_clase.inasistencias / resumen_clase.totalClases) * 100;

  useEffect(() => {
    // Guardar contexto de navegacion
    navSetter({ type: "Clases", ruta: "/alumno/clases" + idClase });
  }, [navSetter, idClase]);

  const { isPending, data } = useQuery({
    queryKey: ["asistenciasAlumno"],
    queryFn: () =>
      getAsistenciasDeAlumno({
        idDocente: resumen_clase.idDocente,
        idClase,
        cedula: user.user.cedula,
      }),
  });

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-28">
      {isPending ? (
        <p className="text-center">Cargando clase...</p>
      ) : (
        <>
          <AppHeader
            color="azul"
            titulo={resumen_clase.nombre}
            atras="/alumno/home"
          />
          <h2 className="py-3 ps-4 text-2xl font-semibold">
            Datos de asistencia
          </h2>
          <p>
            Has faltado a {resumen_clase.inasistencias} clases{" "}
            <strong>({porcentajeInasistencias}% del total)</strong>
          </p>
          <p>Recuerda que un 30% o más de inasistencias te hará reprobar</p>
          <table className="text-center">
            <thead>
              <tr className="border-b">
                <td>Fecha</td>
                <td>Tema</td>
                <td>Asistencia</td>
              </tr>
            </thead>
            <tbody>
              {data.map((asistencia) => (
                <tr key={asistencia.fecha} className="border-b">
                  <td>{transformarFecha(asistencia.fecha)}</td>
                  <td>{asistencia.tema}</td>
                  <td>
                    <BotonAsistencia disabled={asistencia.asistente} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ClaseAlumno;
