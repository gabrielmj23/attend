import WebNav from "../../../components/WebNav";
import { escuelas } from "../../../constants/escuelas";
import { useQuery } from "@tanstack/react-query";
import { obtenerAsistenciasEscuelas } from "../../../api/admin";
import { useState } from "react";
import Seleccionador from "../../../components/Seleccionador";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

function VerEscuelaGrafica() {
  const escuelasQuery = useQuery({
    queryKey: ["obtenerEscuelasQuery"],
    queryFn: () => obtenerAsistenciasEscuelas(),
  });
  const [selectedEscuela, setSelectedEscuela] = useState("");

  escuelasQuery.isPending
    ? console.log("esperando escuelas")
    : console.log("data: ", escuelasQuery.data);

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
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
        <Link
          to="/admin/escuela"
          className="font-bold hover:text-neutral-900 hover:underline"
        >
          Escuelas
        </Link>
      </WebNav>
      {escuelasQuery.isPending ? (
        <span>
          <Spinner color="success" /> Cargando...
        </span>
      ) : (
        <div>
          {" "}
          <h1 className=" pb-4 ps-16 pt-8 text-2xl font-semibold">Escuelas</h1>
          <div className="pl-16">
            <select
              id="escuela"
              name="escuela"
              required={true}
              className="rounded-md p-1 text-sm"
              value={selectedEscuela}
              onChange={(e) => setSelectedEscuela(e.target.value)}
            >
              {escuelas.map((escuela) => (
                <option key={escuela}>{escuela}</option>
              ))}
            </select>
          </div>
          <Seleccionador
            datosGrafica={escuelasQuery.data.filter(
              (e) => e.name === selectedEscuela,
            )}
          />
        </div>
      )}
    </div>
  );
}

export default VerEscuelaGrafica;
