import React from "react";
import SeleccionadorSemanal from "../../../components/SeleccionadorSemanal";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerAsistenciasSemanal } from "../../../api/admin";
import { Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Boton from "../../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function VerClaseGrafica() {
  const params = useParams();

  const asistenciasQuery = useQuery({
    queryKey: ["obtenerAsistenciasSemanal"],
    queryFn: () => obtenerAsistenciasSemanal(params.idClase),
  });

  let informacionSemanal = null;
  let informacionTotal = null;
  asistenciasQuery.isPending
    ? console.log("esperando asistenciasQuery")
    : (console.log(
        "ETESECHHHHHHH",
        asistenciasQuery.data.informacionSemanal,
        asistenciasQuery.data.informacionTotal,
      ),
      (informacionSemanal = asistenciasQuery.data.informacionSemanal),
      (informacionTotal = asistenciasQuery.data.informacionTotal));

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
      </WebNav>

      <h2 className="pl- py-8 ps-16 text-2xl font-semibold">Clase: {}</h2>
      <div className="space-y-4 pb-4">
        <SeleccionadorSemanal
          datosGraficaTotal={informacionTotal}
          datosGraficaSemanal={informacionSemanal}
        />
        <Link
          to={`/admin/clases/${params.idDocente}/${params.idClase}/detalle`}
          className="flex flex-col items-center justify-center hover:underline"
        >
          <Boton
            texto="Ver clases"
            icono={<ArrowForwardIcon />}
            tipo="primario"
            color={"verde"}
          />
        </Link>
      </div>
    </div>
  );
}

export default VerClaseGrafica;
