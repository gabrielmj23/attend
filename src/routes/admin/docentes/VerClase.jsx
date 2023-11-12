import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import AppHeader from "../../../components/AppHeader";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerReportesDeClase, obtenerClase } from "../../../api/docente";
import BarChartIcon from "@mui/icons-material/BarChart";
import { set } from "react-hook-form";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function VerClase() {
  const { idDocente, idClase } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [reportes, setReportes] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Estado de búsqueda de reportes
  const [busqueda, setBusqueda] = useState("");

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

  const [mostrarPlan, setMostrarPlan] = useState(false);
  return (
    console.log("ID CLASE", idClase, " ID DOCENTE", idDocente),
    (
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
            <div className="flex justify-center">
              <Boton
                texto="Ver Plan de Clases"
                tipo="primario"
                icono={mostrarPlan ? <VisibilityIcon /> : <VisibilityOffIcon />}
                color="verde"
                onClick={() => setMostrarPlan(!mostrarPlan)}
              />
            </div>
            {mostrarPlan &&
              (claseQuery.isPending ? (
                <p>Cargando plan de clases</p>
              ) : (
                <div className="flex justify-center px-3 py-4">
                  <table className="text-md mb-4 w-1/2 rounded shadow-md">
                    <thead className="border-y border-black">
                      <tr className="">
                        <th scope="col" className="border-x border-black px-2">
                          Fecha
                        </th>
                        <th scope="col" className="border-x border-black px-2">
                          Semana
                        </th>
                        <th scope="col" className="border-x border-black px-2">
                          Tema
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b border-black">
                      {claseQuery.data.plan.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 py-2 text-center"
                        >
                          <td className="border-x border-black px-2">
                            {item.fecha.toDate().toLocaleDateString()}{" "}
                          </td>
                          <td className="border-x border-black px-2">
                            {item.semana}
                          </td>
                          <td className="border-x border-black px-4">
                            {item.tema}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  );
}

export default VerClase;
