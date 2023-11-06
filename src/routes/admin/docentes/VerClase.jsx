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
import { obtenerClase, obtenerReporte } from "../../../api/docente";
import BarChartIcon from "@mui/icons-material/BarChart";
function VerClase() {
  const { idDocente, idClase } = useLoaderData();
  console.log(idDocente, " + ", idClase);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [clasesData, setClasesData] = useState(null);

  const [asistenciaData, setAsistenciaData] = useState(null);

  const claseQuery = useQuery({
    queryKey: ["clase"],
    queryFn: () => obtenerClase({ idDocente, idClase }),
  });

  const asistenciaQuery = useQuery({
    queryKey: ["obtenerReporte"],
    queryFn: () => obtenerReporte(clasesData),
    enabled: !!clasesData,
  });

  useEffect(() => {
    if (!claseQuery.isPending) {
      setClasesData(claseQuery.data);
    }
  }, [claseQuery.isPending, claseQuery.data]);

  useEffect(() => {
    if (!asistenciaQuery.isPending) {
      const asistenciaReporte = asistenciaQuery.data.filter(
        (asistencia) => asistencia.id,
      );
    }
  });

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

      {claseQuery.isPending ? (
        <div>Cargando</div>
      ) : (
        <div>
          <AppHeader
            titulo={"Clase: " + claseQuery.data.nombre}
            color="blanco"
          />
          <div className="flex items-end justify-between">
            <div className="pl-40">
              <Input
                id="bucarAlumno"
                icono={<SearchIcon />}
                textoLabel="Buscar Alumno"
                textoPlaceholder="Alumno"
                value={searchTerm}
                onChange={handleSearchChange}
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
                {claseQuery.data.alumnos.map(
                  (alumno) => (
                    console.log(claseQuery.data.alumnos),
                    (
                      <tr>
                        <td>{alumno.cedula}</td>
                        <td>{alumno.nombre}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerClase;
