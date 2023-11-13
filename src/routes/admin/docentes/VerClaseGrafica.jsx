import SeleccionadorSemanal from "../../../components/SeleccionadorSemanal";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerAsistenciasSemanal } from "../../../api/admin";
import { Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Boton from "../../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { obtenerNombreClase } from "../../../api/docente";
import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";

function VerClaseGrafica() {
  const params = useParams();
  console.log("hola");

  const asistenciasQuery = useQuery({
    queryKey: ["obtenerAsistenciasSemanal"],
    queryFn: () => obtenerAsistenciasSemanal(params.idClase),
  });

  const nombreQuery = useQuery({
    queryKey: ["obtenerNombreClase"],
    queryFn: () => obtenerNombreClase(params.idDocente, params.idClase),
  });

  let nombreClase = "";
  nombreQuery.isPending
    ? console.log("esperando nombre")
    : console.log((nombreClase = nombreQuery.data));

  let informacionSemanal = null;
  let informacionTotal = null;
  asistenciasQuery.isPending
    ? 0
    : ((informacionSemanal = asistenciasQuery.data.informacionSemanal),
      (informacionTotal = asistenciasQuery.data.informacionTotal));

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setShowSpinner(true);
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [asistenciasQuery.isPending]);

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
          <h2 className="pl- py-8 ps-16 text-2xl font-semibold">
            Clase: {nombreClase}
          </h2>
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
                texto="Ver detalle"
                icono={<ArrowForwardIcon />}
                tipo="primario"
                color={"verde"}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerClaseGrafica;
