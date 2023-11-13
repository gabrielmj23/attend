import { useLoaderData, Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerReportesDeClase, obtenerClase } from "../../../api/docente";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Modal, Spinner } from "flowbite-react";
import { obtenerNombreClase } from "../../../api/docente";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function VerClase() {
  const { idClase, idDocente } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [reportes, setReportes] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Estado de búsqueda de reportes
  const [busqueda, setBusqueda] = useState("");

  const nombreQuery = useQuery({
    queryKey: ["obtenerNombreClase"],
    queryFn: () => obtenerNombreClase(idDocente, idClase),
  });

  const asistenciaQuery = useQuery({
    queryKey: ["obtenerReportes"],
    queryFn: () => (idClase ? obtenerReportesDeClase(idClase) : null),
    enabled: !!idClase, // No ejecutar la consulta hasta que idClase esté disponible
  });

  const claseQuery = useQuery({
    queryKey: ["obtenerClasePlan"],
    queryFn: () =>
      idDocente && idClase ? obtenerClase({ idDocente, idClase }) : null,
    enabled: !!idDocente && !!idClase, // No ejecutar la consulta hasta que idDocente e idClase estén disponibles
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
      `Reporte ${idClase}.xlsx`,
    );
  };
  let nombreClase = "";
  nombreQuery.isPending
    ? console.log("esperando nombre")
    : console.log((nombreClase = nombreQuery.data));

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

      {asistenciaQuery.isPending ? (
        <div className="flex w-screen flex-row justify-center pt-8">
          <span className="text-center">
            <Spinner color="success" /> Cargando...
          </span>
        </div>
      ) : (
        <>
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
              <Boton
                texto="Ver Plan de Clases"
                tipo="primario"
                icono={<VisibilityIcon />}
                color="verde"
                onClick={() => setOpenModal(true)}
              />
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
                  <tr className="hover:bg-gray-200">
                    <th scope="col" className="px-20">
                      Cédula
                    </th>
                    <th scope="col" className="border-x border-black px-20">
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 border-x border-black px-2"
                    >
                      Asistencias
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 border-x border-black px-2"
                    >
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
                      <tr key={i} className="text-center hover:bg-gray-200">
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
            <div className="flex justify-center"></div>
            {openModal &&
              (claseQuery.isPending ? (
                <p>Cargando plan de clases</p>
              ) : (
                <Modal
                  show={openModal}
                  onClose={() => setOpenModal(false)}
                  className="bg-gray-400"
                >
                  <Modal.Header className="bg-gray-100">
                    <h2 className="font-semibold text-black">Plan de Clase</h2>
                  </Modal.Header>
                  <Modal.Body className="bg-gray-100">
                    <table className="text-md mx-auto mb-4 rounded shadow-md">
                      <thead className="border-y border-black">
                        <tr className="hover:bg-gray-200">
                          <th
                            scope="col"
                            className="border-x border-black px-2"
                          >
                            Fecha
                          </th>
                          <th
                            scope="col"
                            className="border-x border-black px-2"
                          >
                            Semana
                          </th>
                          <th
                            scope="col"
                            className="border-x border-black px-2"
                          >
                            Tema
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-b border-black">
                        {claseQuery.data.plan.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 text-center hover:bg-gray-200"
                          >
                            <td className="border-x border-black px-2">
                              {item.semana}
                            </td>
                            <td className="border-x border-black px-2">
                              {item.fecha.toDate().toLocaleDateString()}
                            </td>
                            <td className="border-x border-black px-4">
                              {item.tema}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Modal.Body>
                </Modal>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VerClase;
