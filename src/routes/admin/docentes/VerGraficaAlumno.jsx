import { useLoaderData, Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";

import { useQuery } from "@tanstack/react-query";
import { obtenerReportesDeClaseDeAlumno } from "../../../api/docente";
import Seleccionador from "../../../components/Seleccionador";
import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";

function VerGraficaAlumno() {
  const { cedula, idClase } = useLoaderData();

  const asistenciaAlumnoQuery = useQuery({
    queryKey: ["obtenerReportesAlumno"],
    queryFn: () => obtenerReportesDeClaseDeAlumno(cedula, idClase),
  });

  let nombreClase,
    nombreAlumno = "";
  let asistencias,
    inasistencias = 0;

  let datosGrafica = null;
  asistenciaAlumnoQuery.isPending
    ? console.log("cargando")
    : ((nombreClase = asistenciaAlumnoQuery.data.nombreClase),
      (nombreAlumno = asistenciaAlumnoQuery.data.nombre),
      (asistencias = asistenciaAlumnoQuery.data.asistencias),
      (inasistencias = asistenciaAlumnoQuery.data.inasistencias),
      (datosGrafica = [
        {
          name: nombreClase,
          "Asistencias ": asistencias,
          "Inasistencias ": inasistencias,
        },
      ]));

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setShowSpinner(true);
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [asistenciaAlumnoQuery.isPending]);

  return (
    <div>
      <WebNav>
        <Link
          to="/admin/home"
          className="font-bold text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
        <Link
          to="/admin/escuela"
          className=" hover:text-neutral-900 hover:underline"
        >
          Escuelas
        </Link>
      </WebNav>

      {showSpinner ? (
        <span className="pt-8 text-center">
          <Spinner color="success" /> Cargando...
        </span>
      ) : (
        <div>
          <div>
            <h2 className="pl- py-8 ps-16 text-2xl font-semibold">
              {nombreClase}-{nombreAlumno}
            </h2>
            <Seleccionador datosGrafica={datosGrafica} />
          </div>
        </div>
      )}
    </div>
  );
}

export default VerGraficaAlumno;
