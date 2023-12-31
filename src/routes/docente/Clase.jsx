import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import { DocenteContext } from "./RootDocente";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerClase, obtenerReportesDeClase } from "../../api/docente";
import CarruselAsistencia from "../../components/CarruselAsistencia";
import Input from "../../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Clase() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const { idClase } = useLoaderData();
  const {
    navSetter,
    setLista,
    setNombreClase,
    colorClase,
    setPeriodoClase,
    setEscuelaClase,
  } = useContext(DocenteContext);

  // Verificar sesión
  if (!user) {
    navigate("/docente/login");
  }

  // Obtener informacion de la clase
  const claseQuery = useQuery({
    queryKey: ["claseDocente"],
    queryFn: () => obtenerClase({ idDocente: user.uid, idClase }),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Obtener información de los reportes
  const reportesQuery = useQuery({
    queryKey: ["reportesClase"],
    queryFn: () => obtenerReportesDeClase(idClase),
    staleTime: 8 * 60 * 60 * 1000,
    cacheTime: 8 * 60 * 60 * 1000,
  });

  // Estado de búsqueda de reportes
  const [busqueda, setBusqueda] = useState("");

  // Guardar contexto de la navegación actual
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/docente/clases/" + idClase });
  }, [navSetter, idClase]);

  // Guardar nombre y lista de la clase una vez haya sido cargada
  if (!claseQuery.isPending && !claseQuery.isError) {
    setNombreClase(claseQuery.data.nombre);
    setLista(claseQuery.data.alumnos);
    setPeriodoClase(claseQuery.data.idPeriodo);
    setEscuelaClase(claseQuery.data.escuela);
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-36">
      {claseQuery.isPending ? (
        <p className="mt-8 text-center">Cargando la clase...</p>
      ) : (
        <>
          <AppHeader
            titulo={claseQuery.data.nombre}
            color={colorClase}
            atras="/docente/home"
          />
          <div>
            <h2 className="py-3 ps-4 text-2xl font-semibold">Asistencias</h2>
            <CarruselAsistencia
              idClase={idClase}
              plan={claseQuery.data.plan}
              color={colorClase}
            />
          </div>
          <div className="flex w-4/5 flex-col">
            <h2 className="py-3 ps-4 text-2xl font-semibold">Reportes</h2>
            {reportesQuery.isPending ? (
              <p className="text-center">Cargando reportes...</p>
            ) : (
              <div className="flex flex-col justify-center gap-6 place-self-center ps-[60px]">
                <Input
                  id="nombre"
                  name="nombre"
                  textoLabel="Buscar un estudiante"
                  textoPlaceholder="Buscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <table className="text-center">
                  <thead>
                    <tr className="border-b">
                      <th className="font-semibold">Nombre</th>
                      <th className="font-semibold">% asistencias</th>
                      <th className="font-semibold">% inasistencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportesQuery.data
                      ?.filter((reporte) => {
                        return reporte
                          .data()
                          .nombre.toLowerCase()
                          .includes(busqueda.toLowerCase());
                      })
                      .map((reporte) => (
                        <tr key={reporte.data().cedula} className="border-b">
                          <td>{reporte.data().nombre}</td>
                          <td>
                            {(
                              (reporte.data().asistencias /
                                reporte.data().totalClases) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              (reporte.data().inasistencias /
                                reporte.data().totalClases) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Clase;
