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

function VerClase() {
  const { idClase } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Estado de búsqueda de reportes
  const [busqueda, setBusqueda] = useState("");

  const asistenciaQuery = useQuery({
    queryKey: ["obtenerReportesAdmin"],
    queryFn: () => obtenerReportesDeClase(idClase),
  });

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const filteredData = asistenciaQuery.data.filter(
      (clase) => clase.data().idClase === idClase,
    );
    const data = filteredData.map((clase) => {
      const claseData = clase.data(); // Obtiene los datos del documento
      return {
        Cedula: claseData.cedula,
        Nombre: claseData.nombre,
        Asistencias: claseData.asistencias,
        Inasistencias: claseData.inasistencias,
        "% de inasistencias":
          (claseData.inasistencias * 100) / claseData.totalClases,
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Reportes");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "reportes.xlsx",
    );
  };

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

      {asistenciaQuery.isPending ? (
        <div>Cargando</div>
      ) : (
        <div>
          <h2 className="pl- py-8 ps-16 text-2xl font-semibold">Clase</h2>
          <div className="flex items-end justify-between">
            <div className="pl-40">
              <Input
                id="bucarAlumno"
                name="bucarAlumno"
                icono={<SearchIcon />}
                textoLabel="Buscar Alumno"
                textoPlaceholder="Alumno"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              ></Input>
            </div>
            <div className="pr-40">
              <Boton
                texto="Generar reporte"
                color="verde"
                icono={<BarChartIcon />}
                onClick={handleDownload}
              />
            </div>
          </div>
          <div className="flex justify-center px-3 py-4">
            <table className="text-md mb-4 w-5/6 rounded shadow-md">
              <thead className="border-b border-black ">
                <tr>
                  <th scope="col" className="px-20">
                    Cédula
                  </th>
                  <th scope="col" className="border-x border-black px-20">
                    Nombre
                  </th>
                  <th scope="col" className="w-1/6 border-x border-black px-2">
                    Asistencias
                  </th>
                  <th scope="col" className="w-1/6 border-x border-black px-2">
                    Inasistencias
                  </th>
                  <th scope="col" className="w-1/6 px-2">
                    % de inasistencias
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {asistenciaQuery.data
                  .filter((clase) => clase.data().idClase === idClase)
                  .filter((clase) =>
                    clase
                      .data()
                      .nombre.toLowerCase()
                      .includes(busqueda.toLowerCase()),
                  )
                  .map((alumno, i) => (
                    <tr key={i} className="text-center">
                      <td>{alumno.data().cedula}</td>
                      <td>{alumno.data().nombre}</td>
                      <td>{alumno.data().asistencias}</td>
                      <td>{alumno.data().inasistencias}</td>
                      <td>
                        {(
                          (alumno.data().inasistencias * 100) /
                          alumno.data().totalClases
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerClase;
