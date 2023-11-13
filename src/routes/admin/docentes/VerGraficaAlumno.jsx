import { useLoaderData, Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerReportesDeClase } from "../../../api/docente";
import BarChartIcon from "@mui/icons-material/BarChart";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function VerGraficaAlumno() {
  const { cedula, idClase } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Estado de búsqueda de reportes
  const [busqueda, setBusqueda] = useState("");

  const asistenciaAlumnoQuery = useQuery({
    queryKey: ["obtenerReportesAlumno"],
    queryFn: () => obtenerReportesDeClaseDeAlumno(cedula, idClase),
  });

  let nombreClase,
    nombreAlumno = "";
  let asistencias,
    inasistencias = 0;

  asistenciaAlumnoQuery.isPending
    ? console.log("cargando")
    : ((nombreClase = asistenciaAlumnoQuery.data().nombreClase),
      (nombreAlumno = asistenciaAlumnoQuery.data().nombre),
      (asistencias = asistenciaAlumnoQuery.data().asistencias),
      (inasistencias = asistenciaAlumnoQuery.data().inasistencias));

  return (
    <div>
      <WebNav>
        <Link
          to="/admin/home"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>
      <div>
        <h2 className="pl- py-8 ps-16 text-2xl font-semibold">
          {nombreClase}-{nombreAlumno}
        </h2>
        <div className="flex items-end justify-between"></div>
      </div>
    </div>
  );
}

export default VerGraficaAlumno;
