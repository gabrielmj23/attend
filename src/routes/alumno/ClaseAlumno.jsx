import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AlumnoContext } from "./RootAlumno";
import { useQuery } from "@tanstack/react-query";
import AppHeader from "../../components/AppHeader";
import { getAsistenciasDeAlumno } from "../../api/asistencia";
import BotonAsistencia from "../../components/BotonAsistencia";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const transformarFecha = (fecha) => {
  const aux = fecha.split("-");
  return `${aux[1]}/${aux[0]}/${aux[2]}`;
};

function ClaseAlumno() {
  // Obtener datos de la clase
  const { idClase } = useLoaderData();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    navigate("/alumno/login");
  }
  const { navSetter, colorClase } = useContext(AlumnoContext);
  const resumen_clase = user.resumen_clases.find(
    (clase) => clase.uid === idClase,
  );
  const porcentajeInasistencias = (
    (resumen_clase.inasistencias / resumen_clase.totalClases) *
    100
  ).toFixed(2);

  useEffect(() => {
    // Guardar contexto de navegacion
    navSetter({ type: "Clases", ruta: "/alumno/clases/" + idClase });
  }, [navSetter, idClase]);

  const { isPending, data } = useQuery({
    queryKey: ["asistenciasAlumno"],
    queryFn: () =>
      getAsistenciasDeAlumno({
        idClase,
        cedula: user.cedula,
      }),
    staleTime: 1000 * 60 * 60 * 10,
    cacheTime: 1000 * 60 * 60 * 10,
  });

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-28">
      {isPending || !data ? (
        <span className="pt-10 text-center">
          <Spinner /> Cargando clase...
        </span>
      ) : (
        <>
          <AppHeader
            color={colorClase}
            titulo={resumen_clase.nombre}
            atras="/alumno/home"
          />
          <h2 className="py-3 ps-4 text-2xl font-semibold">
            Datos de asistencia
          </h2>
          {data.length === 0 ? (
            <p className="text-center">No hay asistencias registradas</p>
          ) : (
            <div className="flex flex-col justify-center gap-4 px-4">
              <p>
                Has faltado a {data.length} clases{" "}
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
                  {data.map((asistencia, index) => (
                    <tr key={asistencia.fecha} className="border-b">
                      <td>
                        {transformarFecha(
                          `${
                            asistencia.fecha.toDate().getMonth() + 1
                          }-${asistencia.fecha.toDate().getDate()}-${
                            asistencia.fecha.toDate().getYear() % 100
                          }`,
                        )}
                      </td>
                      <td>{asistencia.tema}</td>
                      <td>
                        <BotonAsistencia
                          id={index}
                          asistencia={data}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ClaseAlumno;
